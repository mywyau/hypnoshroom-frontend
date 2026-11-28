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
    await db.exec('reset role')
    await db.exec(await readFile(new URL('../supabase/migrations/20261126000200_listing_quality_and_temporary_jobs.sql', import.meta.url), 'utf8'))
    await db.exec(await readFile(new URL('../supabase/migrations/20261126000300_advertised_ir35.sql', import.meta.url), 'utf8'))
    await db.exec(await readFile(new URL('../supabase/migrations/20261126000400_optional_application_url.sql', import.meta.url), 'utf8'))
    await db.exec('set role authenticated')
    // A legacy listing with missing terms can be closed, but reopening it requires a discipline.
    await db.exec("update employer_contracts set status = 'closed' where employment_type = 'contract'")
    await assert.rejects(db.exec("update employer_contracts set status = 'published', ir35 = 'Outside IR35' where employment_type = 'contract'"), /listing_discipline_required/)
    await db.exec("update employer_contracts set discipline = 'Backend' where employment_type = 'contract'")
    await assert.rejects(db.exec("update employer_contracts set status = 'published' where employment_type = 'contract'"), /employer_contracts_ir35_check/)
    for (const basis of ['Inside IR35', 'Outside IR35', 'PAYE or umbrella only', 'Small private or voluntary client – intermediary decides']) {
      await db.query("update employer_contracts set status = 'draft', ir35 = $1 where employment_type = 'contract'", [basis])
    }
    for (const values of ['salary_max_gbp = null', 'salary_gbp = null, salary_max_gbp = null', 'salary_gbp = null']) {
      await assert.rejects(db.exec("update employer_contracts set " + values + " where employment_type = 'permanent'"), /check constraint/)
    }
    const temporary = "update employer_contracts set employment_type = 'temporary'"
    await assert.rejects(db.exec(temporary + " where employment_type = 'permanent'"), /listing_terms_match_type/)
    await db.exec(temporary + ", duration = '6 months', salary_max_gbp = salary_gbp, other_language = 'Elixir' where employment_type = 'permanent'")
    const fixedTerm = (await db.query("select * from open_employer_listings where employment_type = 'temporary'")).rows[0]
    assert.equal(fixedTerm.duration, '6 months')
    assert.equal(fixedTerm.salary_max_gbp, fixedTerm.salary_gbp)
    assert.equal(fixedTerm.other_language, 'Elixir')
    await assert.rejects(db.exec("update employer_contracts set other_language = '  ' where employment_type = 'temporary'"), /check constraint/)
    await db.exec("update employer_contracts set employment_type = 'permanent', duration = null, salary_max_gbp = 90000 where employment_type = 'temporary'")
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
    await db.exec("update employer_contracts set apply_url = null where employment_type = 'contract'")
    assert.equal((await db.query('select apply_url from open_employer_contracts')).rows[0].apply_url, null)
    await db.exec("update employer_contracts set closes_on = current_date - 2")
    assert.equal((await db.query('select * from open_employer_contracts')).rows.length, 0)
    await db.exec("update employer_contracts set closes_on = current_date + 3, status = 'closed'")
    assert.equal((await db.query('select * from open_employer_contracts')).rows.length, 0)
    await db.exec("update employer_contracts set status = 'published' where employment_type = 'permanent'")
    await db.exec('reset role')
    await db.exec(await readFile(new URL('../supabase/migrations/20261126000600_listing_company_and_review.sql', import.meta.url), 'utf8'))
    await db.exec(await readFile(new URL('../supabase/migrations/20261127000100_hybrid_listings.sql', import.meta.url), 'utf8'))
    await db.exec(`create or replace function auth.jwt() returns jsonb language sql stable as
      $$ select current_setting('request.jwt.claims')::jsonb $$;
      set role authenticated;
      set request.jwt.claims = '{"email":"demo@example.test","user_metadata":{"listing_admin":true}}';`)
    assert.equal((await db.query('select company_name from open_employer_listings')).rows[0].company_name, 'Example Studio')
    await assert.rejects(db.exec("update employer_contracts set company_name = 'Unreviewed' where status = 'published'"), /row-level security/)
    await assert.rejects(db.exec('select * from pending_listing_reviews()'), /administrator access/)
    await db.exec(`update employer_contracts set status = 'pending', company_name = 'Client A' where id = '${job}'`)
    const revision = async () => (await db.query('select revision from employer_contracts where id = $1', [job])).rows[0].revision
    const first = await revision()
    const decide = (token, approve) => db.query('select review_listing($1,$2,$3) as changed', [job, token, approve])
    await assert.rejects(decide(first, true), /administrator access/)
    await assert.rejects(db.exec(`update employer_contracts set status = 'published' where id = '${job}'`), /row-level security/)
    await assert.rejects(db.query('update employer_contracts set hybrid = true, fully_remote = true where id = $1', [job]), /listing_work_arrangement_check/)
    await db.exec(`update employer_contracts set company_name = 'Client B', hybrid = true, fully_remote = false where id = '${job}'`)
    const current = await revision()
    await db.exec(`set request.jwt.claim.sub = '${bob}'; set request.jwt.claims = '{"email":"admin@example.test","app_metadata":{"listing_admin":true}}'`)
    assert.equal((await db.query('select * from pending_listing_reviews()')).rows[0].company_name, 'Client B')
    assert.equal((await decide(first, true)).rows[0].changed, false)
    assert.equal((await decide(current, true)).rows[0].changed, true)
    assert.equal((await decide(current, true)).rows[0].changed, false)
    assert.equal((await db.query('select count(*)::int as count from pending_listing_reviews()')).rows[0].count, 0)
    await db.exec('reset role; set role anon')
    assert.deepEqual((await db.query('select id from open_employer_listings where hybrid')).rows, [{ id: job }])
    assert.equal((await db.query('select company_name from open_employer_contracts')).rows[0].company_name, 'Client B')
    await assert.rejects(db.exec('select * from pending_listing_reviews()'), /permission denied/)
    await db.exec(`reset role; set role authenticated; set request.jwt.claim.sub = '${alice}';
      update employer_contracts set status = 'pending', company_name = 'Client C', closes_on = current_date - 1 where id = '${job}'`)
    assert.equal((await db.query('select * from open_employer_contracts')).rows.length, 0)
    assert.equal((await decide(await revision(), true)).rows[0].changed, false)
    assert.equal((await decide(await revision(), false)).rows[0].changed, true)
    assert.equal((await db.query('select status from employer_contracts where id = $1', [job])).rows[0].status, 'draft')
    await db.exec('reset role; alter table auth.users add column email text')
    await db.query('update auth.users set email = case when id = $1 then $2 else $3 end', [alice, 'alice@example.test', 'bob@example.test'])
    await db.exec(await readFile(new URL('../supabase/migrations/20261127000200_delete_own_account.sql', import.meta.url), 'utf8'))
    // A pending listing created before the application route requirement can still be returned to draft.
    await db.query("update employer_contracts set status = 'pending', closes_on = current_date + 1 where id = $1", [job])
    await db.exec(await readFile(new URL('../supabase/migrations/20261127000300_application_routes.sql', import.meta.url), 'utf8'))
    await db.exec(`set role authenticated; set request.jwt.claim.sub = '${bob}'`)
    const pendingRevision = async () => (await db.query('select revision from pending_listing_reviews() where id = $1', [job])).rows[0].revision
    const beforeRoute = await pendingRevision()
    await assert.rejects(decide(beforeRoute, true), /listing_application_route_required/)
    assert.equal((await decide(beforeRoute, false)).rows[0].changed, true)
    await db.exec(`set request.jwt.claim.sub = '${alice}'`)
    await assert.rejects(db.query("update employer_contracts set status = 'pending' where id = $1", [job]), /listing_application_route_required/)
    await assert.rejects(db.query("update employer_contracts set apply_email = 'two@example.com,other@example.com' where id = $1", [job]), /check constraint/)
    await db.query("update employer_contracts set apply_url = 'https://example.test/jobs', status = 'pending' where id = $1", [job])
    await db.query("update employer_contracts set apply_url = null, apply_email = 'jobs+backend@example.test' where id = $1", [job])
    await db.exec(`set request.jwt.claim.sub = '${bob}'`)
    assert.equal((await decide(await pendingRevision(), true)).rows[0].changed, true)
    await db.exec('set role anon')
    assert.deepEqual((await db.query('select apply_url, apply_email from open_employer_listings where id = $1', [job])).rows,
      [{ apply_url: null, apply_email: 'jobs+backend@example.test' }])
    const remove = email => db.query('select public.delete_own_account($1)', [email])
    await db.exec('set role anon')
    await assert.rejects(remove('alice@example.test'), /permission denied/)
    await db.exec(`set role authenticated; set request.jwt.claim.sub = '${alice}'`)
    await assert.rejects(remove('bob@example.test'), /email does not match/)
    await remove(' ALICE@example.test ')
    await remove('alice@example.test')
    await assert.rejects(db.query('select * from pending_listing_reviews()'), /administrator access/)
    await assert.rejects(decide(current, true), /administrator access/)
    await db.exec('reset role')
    assert.deepEqual((await db.query('select id from auth.users')).rows, [{ id: bob }])
    assert.equal((await db.query('select id from employer_contracts where owner_id = $1', [alice])).rows.length, 0)
    assert.equal((await db.query('select owner_id from employer_profiles where owner_id = $1', [alice])).rows.length, 0)
  } finally {
    await db.close()
  }
})
