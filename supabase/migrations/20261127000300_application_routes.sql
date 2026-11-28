alter table public.employer_contracts
  add column apply_email text check (
    length(apply_email) <= 254 and apply_email !~ '[[:cntrl:]]'
    and apply_email ~ '^[A-Za-z0-9.!#$%&''*+/=?^_`{|}~-]+@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?([.][A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$'
  ),
  -- Preserve old submissions; enforce the rule on new submissions and approvals.
  add constraint listing_application_route_required check (
    status not in ('pending', 'published') or apply_url is not null or apply_email is not null
  ) not valid;

grant insert (apply_email), update (apply_email) on public.employer_contracts to authenticated;

create or replace view public.open_employer_listings with (security_barrier = true) as
  select c.id, coalesce(c.company_name, p.company_name) as company_name, c.title, c.location,
         c.duration, c.day_rate_gbp, c.ir35, c.description, c.apply_url, c.closes_on, c.created_at,
         c.employment_type, c.fully_remote, c.discipline, c.languages, c.salary_gbp,
         c.salary_max_gbp, c.other_language, c.hybrid, c.apply_email
  from public.employer_contracts c join public.employer_profiles p using (owner_id)
  where c.status = 'published' and c.closes_on >= (now() at time zone 'Europe/London')::date;

create or replace view public.open_employer_contracts with (security_barrier = true) as
  select id, company_name, title, location, duration, day_rate_gbp, ir35, description,
         apply_url, closes_on, created_at, apply_email
  from public.open_employer_listings where employment_type = 'contract';
