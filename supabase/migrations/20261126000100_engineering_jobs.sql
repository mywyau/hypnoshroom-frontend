alter table public.employer_contracts
  add column employment_type text not null default 'contract' check (employment_type in ('contract', 'permanent')),
  add column fully_remote boolean not null default false,
  add column discipline text check (discipline in ('Backend', 'Web development', 'Data engineering', 'AI / ML', 'Hardware / embedded', 'Platform / DevOps', 'Other engineering')),
  add column languages text[] not null default '{}' check (
    languages <@ array['Scala','Java','Python','SQL','TypeScript','JavaScript','Go','Rust','C','C++','C#','Kotlin','VHDL','Verilog']::text[]
    and cardinality(languages) <= 14 and array_position(languages, null) is null
  ),
  add column salary_gbp integer check (salary_gbp between 1 and 9999999),
  add column salary_max_gbp integer,
  alter column duration drop not null,
  alter column ir35 drop not null;

alter table public.employer_contracts
  add check (salary_max_gbp is null or (salary_gbp is not null and salary_max_gbp between salary_gbp and 9999999)),
  add check ((employment_type = 'contract' and duration is not null and ir35 is not null and salary_gbp is null and salary_max_gbp is null)
          or (employment_type = 'permanent' and duration is null and ir35 is null and day_rate_gbp is null));

update public.employer_contracts set fully_remote = true
  where lower(trim(location)) in ('remote','fully remote','100% remote');

create view public.open_employer_listings with (security_barrier = true) as
  select c.id, p.company_name, c.title, c.location, c.duration, c.day_rate_gbp,
         c.ir35, c.description, c.apply_url, c.closes_on, c.created_at,
         c.employment_type, c.fully_remote, c.discipline, c.languages, c.salary_gbp, c.salary_max_gbp
  from public.employer_contracts c join public.employer_profiles p using (owner_id)
  where c.status = 'published' and c.closes_on >= (now() at time zone 'Europe/London')::date;

create or replace view public.open_employer_contracts with (security_barrier = true) as
  select id, company_name, title, location, duration, day_rate_gbp, ir35, description, apply_url, closes_on, created_at
  from public.open_employer_listings where employment_type = 'contract';

revoke all on public.open_employer_listings from public, anon, authenticated;
grant select on public.open_employer_listings to anon, authenticated;
grant insert (employment_type, fully_remote, discipline, languages, salary_gbp, salary_max_gbp),
      update (employment_type, fully_remote, discipline, languages, salary_gbp, salary_max_gbp)
  on public.employer_contracts to authenticated;
