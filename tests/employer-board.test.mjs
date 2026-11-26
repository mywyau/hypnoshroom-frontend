import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { PGlite } from '@electric-sql/pglite'

test('employer accounts manage their own briefs and the public board exposes only open contracts', async () => {
  const db = new PGlite()
  const alice = '00000000-0000-4000-8000-000000000001'
  const bob = '00000000-0000-4000-8000-000000000002'
  const job = '00000000-0000-4000-8000-000000000003'
  try {
    await db.exec(`
      create role authenticated; create role anon;
      create schema auth;
      create table auth.users(id uuid primary key);
      insert into auth.users values ('${alice}'), ('${bob}');
      create function auth.uid() returns uuid language sql stable as
        $$ select current_setting('request.jwt.claim.sub')::uuid $$;
      create function auth.jwt() returns jsonb language sql stable as
        $$ select '{"email":"demo@example.test"}'::jsonb $$;
      grant usage on schema auth to authenticated;
    `)
    await db.exec(await readFile(new URL('../supabase/migrations/20261125000100_employer_board.sql', import.meta.url), 'utf8'))
    await db.exec(`set role authenticated; set request.jwt.claim.sub = '${alice}';
      insert into employer_profiles(company_name) values ('Example Studio');
      insert into employer_contracts(id,title,location,duration,ir35,description,apply_url,closes_on)
      values ('${job}','Developer','Remote','Six months','Unspecified','Build software','https://example.test/apply',current_date + 5);`)
    // Upgrade with an existing contract and with Supabase's authenticated role grants in place.
    await db.exec('reset role')
    await db.exec(await readFile(new URL('../supabase/migrations/20261126000100_engineering_jobs.sql', import.meta.url), 'utf8'))
    await db.exec('set role authenticated')
    const legacy = (await db.query('select * from employer_contracts')).rows[0]
    assert.equal(legacy.employment_type, 'contract')
    assert.equal(legacy.fully_remote, true)
    assert.deepEqual(legacy.languages, [])
    await db.exec(`insert into employer_contracts(employment_type,title,location,description,apply_url,closes_on,
      salary_gbp,salary_max_gbp,discipline,languages,fully_remote,status)
      values ('permanent','Data engineer','UK','Build pipelines','https://example.test/jobs',current_date + 3,
      70000,90000,'Data engineering',array['Python','SQL'],true,'published')`)
    const filtered = await db.query(`select * from open_employer_listings where employment_type = 'permanent'
      and fully_remote and discipline = 'Data engineering' and languages @> array['Python']`)
    assert.equal(filtered.rows.length, 1)
    assert.equal(filtered.rows[0].salary_max_gbp, 90000)
    assert.equal(filtered.rows[0].ir35, null)
    await assert.rejects(db.query("update employer_contracts set day_rate_gbp = 550 where employment_type = 'permanent'"), /check constraint/)
    await assert.rejects(db.query("update employer_contracts set salary_max_gbp = 65000 where employment_type = 'permanent'"), /check constraint/)
    await db.exec("update employer_contracts set fully_remote = false where employment_type = 'permanent'")
    assert.equal((await db.query("select id from open_employer_listings where fully_remote")).rows.length, 0)
    assert.equal((await db.query('select * from open_employer_contracts')).rows.length, 0)
    await db.exec("update employer_contracts set status = 'published' where employment_type = 'contract'")
    await db.exec(`set request.jwt.claim.sub = '${bob}'`)
    assert.equal((await db.query('select * from employer_profiles')).rows.length, 0)
    assert.equal((await db.query('select * from employer_contracts')).rows.length, 0)
    assert.equal((await db.query("update employer_contracts set status = 'closed' returning id")).rows.length, 0)
    await db.exec('reset role; set role anon')
    const [listing] = (await db.query('select * from open_employer_contracts')).rows
    const publicRoles = (await db.query('select * from open_employer_listings')).rows
    assert.equal(publicRoles.length, 2)
    assert.ok(publicRoles.every(role => role.owner_id === undefined))
    assert.equal(listing.company_name, 'Example Studio')
    assert.equal(listing.owner_id, undefined)
    await assert.rejects(db.query('select * from employer_contracts'), /permission denied/)
    await assert.rejects(db.query("update open_employer_contracts set title = 'Other'"), /permission denied|cannot update/)
    await db.exec(`reset role; set role authenticated; set request.jwt.claim.sub = '${alice}'`)
    await assert.rejects(db.query("update employer_contracts set apply_url = 'http://example.test'"), /check constraint/)
    await db.exec("update employer_contracts set closes_on = current_date - 2")
    assert.equal((await db.query('select * from open_employer_contracts')).rows.length, 0)
    await db.exec("update employer_contracts set closes_on = current_date + 3, status = 'closed'")
    assert.equal((await db.query('select * from open_employer_contracts')).rows.length, 0)
  } finally {
    await db.close()
  }
})
