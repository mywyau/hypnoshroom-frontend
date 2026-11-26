alter table public.employer_contracts
  drop constraint employer_contracts_employment_type_check,
  drop constraint employer_contracts_check1,
  add constraint employer_contracts_employment_type_check
    check (employment_type in ('contract', 'permanent', 'temporary')),
  add constraint listing_terms_match_type check (
    (employment_type = 'contract' and duration is not null and ir35 is not null
      and salary_gbp is null and salary_max_gbp is null)
    or (employment_type in ('permanent', 'temporary') and ir35 is null and day_rate_gbp is null
      and ((employment_type = 'temporary') = (duration is not null)))
  ),
  add column other_language text check (
    other_language = trim(other_language) and length(other_language) between 1 and 60
    and other_language ~ '[^[:space:]]' and other_language !~ '[[:cntrl:]]'
  ),
  -- Existing listings can be read and closed. New or edited open listings need complete terms.
  add constraint listing_discipline_required check (status = 'closed' or discipline is not null) not valid,
  add constraint listing_salary_required check (
    status = 'closed' or employment_type = 'contract'
    or (salary_gbp is not null and salary_max_gbp is not null)
  ) not valid;

grant insert (other_language), update (other_language) on public.employer_contracts to authenticated;

create or replace view public.open_employer_listings with (security_barrier = true) as
  select c.id, p.company_name, c.title, c.location, c.duration, c.day_rate_gbp,
         c.ir35, c.description, c.apply_url, c.closes_on, c.created_at,
         c.employment_type, c.fully_remote, c.discipline, c.languages, c.salary_gbp, c.salary_max_gbp,
         c.other_language
  from public.employer_contracts c join public.employer_profiles p using (owner_id)
  where c.status = 'published' and c.closes_on >= (now() at time zone 'Europe/London')::date;
