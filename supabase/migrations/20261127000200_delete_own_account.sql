create function public.delete_own_account(confirmation_email text) returns void
language plpgsql security definer set search_path = '' as $$
declare
  caller_id uuid := auth.uid();
  account_email text;
begin
  if caller_id is null then
    raise insufficient_privilege using message = 'Sign in to delete your account';
  end if;

  select email into account_email from auth.users where id = caller_id for update;
  if not found then
    return; -- A retry after a successful deletion.
  end if;
  if account_email is null or lower(trim(confirmation_email)) is distinct from lower(account_email) then
    raise exception 'Account email does not match' using errcode = '22023';
  end if;

  -- Foreign keys remove this user's employer profile and listings in the same transaction.
  delete from auth.users where id = caller_id;
end
$$;

revoke all on function public.delete_own_account(text) from public, anon, authenticated;
grant execute on function public.delete_own_account(text) to authenticated;

-- A deleted reviewer may still have an unexpired access token on another device.
create or replace function public.pending_listing_reviews() returns setof public.employer_contracts
language plpgsql stable security definer set search_path = '' as $$
begin
  if (auth.jwt()->'app_metadata'->'listing_admin') is distinct from 'true'::jsonb
     or not exists (select 1 from auth.users where id = auth.uid()) then
    raise insufficient_privilege using message = 'Listing administrator access required';
  end if;
  return query select c.* from public.employer_contracts c where c.status = 'pending'
    order by c.created_at, c.id;
end
$$;

create or replace function public.review_listing(listing_id uuid, expected_revision uuid, approve boolean) returns boolean
language plpgsql security definer set search_path = '' as $$
begin
  if (auth.jwt()->'app_metadata'->'listing_admin') is distinct from 'true'::jsonb
     or not exists (select 1 from auth.users where id = auth.uid()) then
    raise insufficient_privilege using message = 'Listing administrator access required';
  end if;
  update public.employer_contracts
    set status = case when approve then 'published' else 'draft' end
    where id = listing_id and status = 'pending' and revision = expected_revision
      and (approve is false or (approve is true and closes_on >= (now() at time zone 'Europe/London')::date));
  return found;
end
$$;
