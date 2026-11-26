alter table public.employer_contracts
  drop constraint employer_contracts_ir35_check,
  add constraint employer_contracts_ir35_check check (
    ir35 in ('Inside IR35', 'Outside IR35', 'PAYE or umbrella only', 'Small private or voluntary client – intermediary decides')
    or (status = 'closed' and ir35 = 'Unspecified')
  ) not valid;
