create table public.employer_profiles (
  owner_id uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  company_name text not null check (length(trim(company_name)) between 1 and 140)
);

create table public.employer_contracts (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references public.employer_profiles(owner_id) on delete cascade,
  title text not null check (length(trim(title)) between 1 and 160),
  location text not null check (length(trim(location)) between 1 and 160),
  duration text not null check (length(trim(duration)) between 1 and 100),
  day_rate_gbp integer check (day_rate_gbp between 1 and 99999),
  ir35 text not null check (ir35 in ('Inside IR35', 'Outside IR35', 'Unspecified')),
  description text not null check (length(trim(description)) between 1 and 5000),
  apply_url text not null check (length(apply_url) <= 2048 and apply_url ~ '^https://[a-zA-Z0-9.-]+(:[0-9]+)?([/?#][^[:space:]]*)?$'),
  closes_on date not null,
  status text not null default 'draft' check (status in ('draft', 'published', 'closed')),
  created_at timestamptz not null default now()
);

create index employer_contracts_owner on public.employer_contracts(owner_id);
create index employer_contracts_public on public.employer_contracts(created_at desc, id) where status = 'published';

alter table public.employer_profiles enable row level security;
alter table public.employer_contracts enable row level security;

create policy employer_owns_profile on public.employer_profiles to authenticated
  using (owner_id = (select auth.uid()) and coalesce((select auth.jwt())->>'email', '') <> '')
  with check (owner_id = (select auth.uid()) and coalesce((select auth.jwt())->>'email', '') <> '');
create policy employer_owns_contract on public.employer_contracts to authenticated
  using (owner_id = (select auth.uid()) and coalesce((select auth.jwt())->>'email', '') <> '')
  with check (owner_id = (select auth.uid()) and coalesce((select auth.jwt())->>'email', '') <> '');

-- The view owner reads across employers. Only open briefs and public fields leave this view.
create view public.open_employer_contracts with (security_barrier = true) as
  select c.id, p.company_name, c.title, c.location, c.duration, c.day_rate_gbp,
         c.ir35, c.description, c.apply_url, c.closes_on, c.created_at
  from public.employer_contracts c join public.employer_profiles p using (owner_id)
  where c.status = 'published' and c.closes_on >= (now() at time zone 'Europe/London')::date;

revoke all on public.employer_profiles, public.employer_contracts, public.open_employer_contracts from public, anon, authenticated;
grant select, insert (company_name), update (company_name) on public.employer_profiles to authenticated;
grant select, insert (id, title, location, duration, day_rate_gbp, ir35, description, apply_url, closes_on, status),
  update (title, location, duration, day_rate_gbp, ir35, description, apply_url, closes_on, status)
  on public.employer_contracts to authenticated;
grant select on public.open_employer_contracts to anon, authenticated;
