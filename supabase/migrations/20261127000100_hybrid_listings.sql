alter table public.employer_contracts
  add column hybrid boolean not null default false,
  add constraint listing_work_arrangement_check check (not (fully_remote and hybrid));

grant insert (hybrid), update (hybrid) on public.employer_contracts to authenticated;

create or replace view public.open_employer_listings with (security_barrier = true) as
  select c.id, coalesce(c.company_name, p.company_name) as company_name, c.title, c.location,
         c.duration, c.day_rate_gbp, c.ir35, c.description, c.apply_url, c.closes_on, c.created_at,
         c.employment_type, c.fully_remote, c.discipline, c.languages, c.salary_gbp,
         c.salary_max_gbp, c.other_language, c.hybrid
  from public.employer_contracts c join public.employer_profiles p using (owner_id)
  where c.status = 'published' and c.closes_on >= (now() at time zone 'Europe/London')::date;
