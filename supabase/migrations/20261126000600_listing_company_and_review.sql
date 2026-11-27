alter table public.employer_contracts
  add column company_name text check (
    company_name = trim(company_name) and length(company_name) between 1 and 140
    and company_name ~ '[^[:space:]]' and company_name !~ '[[:cntrl:]]'
  ),
  add column revision uuid not null default gen_random_uuid(),
  drop constraint employer_contracts_status_check,
  add check (status in ('draft', 'pending', 'published', 'closed')),
  add check (status <> 'pending' or company_name is not null);

-- Legacy public listings use the profile name until their next reviewed edit.
revoke update (company_name) on public.employer_profiles from authenticated;
grant insert (company_name), update (company_name) on public.employer_contracts to authenticated;

create function public.advance_listing_revision() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.revision := gen_random_uuid();
  return new;
end
$$;
create trigger advance_listing_revision before update on public.employer_contracts
  for each row execute function public.advance_listing_revision();

-- Owners may withdraw or resubmit a published listing. Only review can publish it.
alter policy employer_owns_contract on public.employer_contracts
  with check (owner_id = (select auth.uid()) and coalesce((select auth.jwt())->>'email', '') <> ''
              and status <> 'published');

create or replace view public.open_employer_listings with (security_barrier = true) as
  select c.id, coalesce(c.company_name, p.company_name) as company_name, c.title, c.location,
         c.duration, c.day_rate_gbp, c.ir35, c.description, c.apply_url, c.closes_on, c.created_at,
         c.employment_type, c.fully_remote, c.discipline, c.languages, c.salary_gbp,
         c.salary_max_gbp, c.other_language
  from public.employer_contracts c join public.employer_profiles p using (owner_id)
  where c.status = 'published' and c.closes_on >= (now() at time zone 'Europe/London')::date;

create function public.pending_listing_reviews() returns setof public.employer_contracts
language plpgsql stable security definer set search_path = '' as $$
begin
  if (auth.jwt()->'app_metadata'->'listing_admin') is distinct from 'true'::jsonb then
    raise insufficient_privilege using message = 'Listing administrator access required';
  end if;
  return query select c.* from public.employer_contracts c where c.status = 'pending'
    order by c.created_at, c.id;
end
$$;

create function public.review_listing(listing_id uuid, expected_revision uuid, approve boolean) returns boolean
language plpgsql security definer set search_path = '' as $$
begin
  if (auth.jwt()->'app_metadata'->'listing_admin') is distinct from 'true'::jsonb then
    raise insufficient_privilege using message = 'Listing administrator access required';
  end if;
  update public.employer_contracts
    set status = case when approve then 'published' else 'draft' end
    where id = listing_id and status = 'pending' and revision = expected_revision
      and (approve is false or (approve is true and closes_on >= (now() at time zone 'Europe/London')::date));
  return found;
end
$$;

revoke all on function public.pending_listing_reviews(), public.review_listing(uuid, uuid, boolean) from public, anon, authenticated;
grant execute on function public.pending_listing_reviews(), public.review_listing(uuid, uuid, boolean) to authenticated;
