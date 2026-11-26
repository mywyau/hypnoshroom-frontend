-- Keep the cleanup atomic and let any dependency outside this list block it.
do $cleanup$
begin
  drop view if exists procurement.public_counts, procurement.public_process,
    procurement.public_runs restrict;

  drop table if exists procurement.release_extraction, procurement.quarantine,
    procurement.process, procurement.release, procurement.run, procurement.source restrict;
end
$cleanup$;
