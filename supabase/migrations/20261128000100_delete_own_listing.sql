-- The existing employer_owns_contract RLS policy scopes DELETE to the signed-in owner.
grant delete on public.employer_contracts to authenticated;
