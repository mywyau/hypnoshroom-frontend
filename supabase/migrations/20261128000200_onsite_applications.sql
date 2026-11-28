alter table public.employer_contracts
  add column apply_onsite boolean not null default false,
  drop constraint listing_application_route_required,
  add constraint listing_application_route_required check (
    status not in ('pending','published') or apply_onsite or apply_url is not null or apply_email is not null
  ) not valid;
grant insert (apply_onsite), update (apply_onsite) on public.employer_contracts to authenticated;

create or replace view public.open_employer_listings with (security_barrier = true) as
  select c.id, coalesce(c.company_name, p.company_name) as company_name, c.title, c.location,
         c.duration, c.day_rate_gbp, c.ir35, c.description, c.apply_url, c.closes_on, c.created_at,
         c.employment_type, c.fully_remote, c.discipline, c.languages, c.salary_gbp,
         c.salary_max_gbp, c.other_language, c.hybrid, c.apply_email, c.apply_onsite
  from public.employer_contracts c join public.employer_profiles p using (owner_id)
  where c.status = 'published' and c.closes_on >= (now() at time zone 'Europe/London')::date;

create table public.role_applications (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.employer_contracts on delete cascade,
  applicant_id uuid references auth.users on delete cascade,
  email text not null check (email = lower(trim(email)) and length(email) between 3 and 254),
  applicant_name text not null check (length(trim(applicant_name)) between 1 and 140),
  message text not null default '' check (length(message) <= 3000),
  role_title text not null,
  recipient text not null,
  created_at timestamptz not null default now(),
  submitted_at timestamptz,
  unique (listing_id,email)
);
create index role_applications_email on public.role_applications(email);
create index role_applications_applicant on public.role_applications(applicant_id);

-- Recheck availability both before the upload and when it is committed. The lock
-- serializes submission with closing, editing or deleting the listing.
create function public.check_application_recipient() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  current_recipient text;
  current_title text;
begin
  select coalesce(c.company_name,p.company_name), c.title into current_recipient,current_title
  from public.employer_contracts c join public.employer_profiles p using (owner_id)
  where c.id = new.listing_id and c.apply_onsite and c.status = 'published'
    and c.closes_on >= (now() at time zone 'Europe/London')::date for share of c;
  if not found or current_recipient is distinct from new.recipient or current_title is distinct from new.role_title then
    raise exception using errcode = 'P0001', message = 'Listing changed or closed';
  end if;
  return new;
end $$;
revoke all on function public.check_application_recipient() from public, anon, authenticated;
create trigger check_application_recipient before insert or update on public.role_applications
  for each row execute function public.check_application_recipient();

alter table public.role_applications enable row level security;
revoke all on public.role_applications from public, anon, authenticated;
grant select (id,listing_id,applicant_name,email,message,submitted_at) on public.role_applications to authenticated;
grant select, insert, update, delete on public.role_applications to service_role;
grant select (id, owner_id) on public.employer_contracts to service_role;
create policy posting_owner_reads_inbox on public.role_applications for select to authenticated
  using (submitted_at is not null and exists (
    select 1 from public.employer_contracts c where c.id = listing_id and c.owner_id = (select auth.uid())
  ));

insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('application-cvs','application-cvs',false,3145728,array['application/pdf']);
-- Storage downloads go through an owner-authorized server endpoint.

-- Storage blobs must be removed via the Storage API. Cascading deletions enqueue
-- a durable removal even if the server handling the original request goes away.
create table public.application_cv_removals (
  application_id uuid primary key,
  remove_after timestamptz not null default now()
);
create index application_cv_removals_due on public.application_cv_removals(remove_after);
create function public.enqueue_cv_removal() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.application_cv_removals(application_id,remove_after)
    values (old.id, case when old.submitted_at is null then now() + interval '15 minutes' else now() end)
    on conflict do nothing;
  return old;
end $$;
create trigger enqueue_cv_removal after delete on public.role_applications
  for each row execute function public.enqueue_cv_removal();

-- Verification records and file cleanup are accessed exclusively by Nuxt.
create table public.application_email_codes (
  email text primary key, code_hash text not null, sent_at timestamptz not null, attempts int not null default 0
);
create table public.application_email_limits (
  source_hash text primary key, window_start timestamptz not null, sends int not null
);
create table public.application_guest_sessions (
  token_hash text primary key, email text not null, expires_at timestamptz not null
);
alter table public.application_email_codes enable row level security;
alter table public.application_email_limits enable row level security;
alter table public.application_guest_sessions enable row level security;
alter table public.application_cv_removals enable row level security;
revoke all on public.application_email_codes, public.application_email_limits, public.application_guest_sessions,
  public.application_cv_removals from public, anon, authenticated;
grant select, insert, update, delete on public.application_email_codes, public.application_email_limits,
  public.application_guest_sessions, public.application_cv_removals to service_role;

create function public.request_application_code(address text, digest text, source text) returns boolean
language plpgsql set search_path = '' as $$
begin
  insert into public.application_email_limits as l values(source,now(),1)
  on conflict (source_hash) do update set
    sends = case when l.window_start <= now()-interval '1 hour' then 1 else l.sends+1 end,
    window_start = case when l.window_start <= now()-interval '1 hour' then now() else l.window_start end
    where l.sends < 12 or l.window_start <= now()-interval '1 hour';
  if not found then return false; end if;
  insert into public.application_email_codes as c values(address,digest,now(),0)
    on conflict (email) do update set code_hash=excluded.code_hash,sent_at=now(),attempts=0
    where c.sent_at <= now()-interval '1 minute';
  return found;
end $$;
create function public.verify_application_code(address text, digest text, session_digest text) returns boolean
language plpgsql set search_path = '' as $$
declare stored_hash text;
begin
  update public.application_email_codes set attempts=attempts+1
    where email=address and sent_at > now()-interval '10 minutes' and attempts<5 returning code_hash into stored_hash;
  if not found or stored_hash <> digest then return false; end if;
  delete from public.application_email_codes where email=address;
  insert into public.application_guest_sessions values(session_digest,address,now()+interval '30 minutes');
  return true;
end $$;
revoke all on function public.request_application_code(text,text,text), public.verify_application_code(text,text,text)
  from public,anon,authenticated;
grant execute on function public.request_application_code(text,text,text), public.verify_application_code(text,text,text)
  to service_role;
