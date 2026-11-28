import test from 'node:test'
import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { readdir, readFile } from 'node:fs/promises'
import { PGlite } from '@electric-sql/pglite'

test('on-site applications honour verification, listing availability, ownership and deletion', async () => {
  const db = new PGlite()
  const poster = randomUUID()
  const seeker = randomUUID()
  const job = randomUUID()
  try {
    await db.exec(`
      create role anon; create role authenticated; create role service_role bypassrls;
      create schema auth; create table auth.users(id uuid primary key, email text);
      create function auth.uid() returns uuid language sql stable as
        $$ select current_setting('request.jwt.claim.sub')::uuid $$;
      create function auth.jwt() returns jsonb language sql stable as
        $$ select '{"email":"sample@example.test"}'::jsonb $$;
      grant usage on schema auth to authenticated;
      create schema storage;
      create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);
    `)
    const migrations = new URL('../supabase/migrations/', import.meta.url)
    for (const file of (await readdir(migrations)).filter(f => f.endsWith('.sql')).sort()) {
      await db.exec(await readFile(new URL(file, migrations), 'utf8'))
    }
    await db.query('insert into auth.users values ($1,$2),($3,$4)', [poster,'poster@example.test',seeker,'seeker@example.test'])
    await db.query("insert into employer_profiles(owner_id,company_name) values ($1,'Studio')", [poster])
    await db.query(`insert into employer_contracts(id,owner_id,employment_type,title,location,description,
      closes_on,salary_gbp,salary_max_gbp,discipline,status,apply_onsite)
      values ($1,$2,'permanent','Engineer','UK','Build software',current_date+2,60000,70000,'Backend','published',true)`, [job,poster])
    const save = (id, email, account = null) => db.query(`insert into role_applications
      (id,listing_id,applicant_id,email,applicant_name,role_title,recipient) values ($1,$2,$3,$4,'Candidate','Engineer','Studio')`, [id,job,account,email])
    const asUser = async id => db.exec("reset role; set role authenticated; set request.jwt.claim.sub = '" + id + "'")
    const inbox = async () => (await db.query('select id from role_applications')).rows.map(r => r.id)
    const app = randomUUID()
    await save(app,'seeker@example.test',seeker)
    await asUser(poster)
    assert.deepEqual(await inbox(), [])
    await db.exec('reset role')
    await db.query('update role_applications set submitted_at=now() where id=$1',[app])
    await assert.rejects(save(randomUUID(),'seeker@example.test'), /duplicate key/)
    await asUser(seeker)
    assert.deepEqual(await inbox(), [])
    await assert.rejects(db.query('delete from role_applications'), /permission denied/)
    await assert.rejects(db.query('select * from application_guest_sessions'), /permission denied/)
    await asUser(poster)
    assert.deepEqual(await inbox(), [app])
    await db.exec('reset role; set role anon')
    await assert.rejects(inbox(), /permission denied/)
    assert.deepEqual((await db.query('select apply_onsite from open_employer_listings')).rows, [{apply_onsite:true}])
    await db.exec('reset role')
    const pending = randomUUID()
    await save(pending,'guest@example.test')
    await db.query("update employer_contracts set status='closed' where id=$1",[job])
    await assert.rejects(save(randomUUID(),'new@example.test'), /Listing changed or closed/)
    await assert.rejects(db.query('update role_applications set submitted_at=now() where id=$1',[pending]), /Listing changed or closed/)
    await asUser(poster)
    assert.deepEqual(await inbox(), [app])
    await db.exec('reset role')
    await db.query('delete from auth.users where id=$1',[seeker])
    await db.query('delete from auth.users where id=$1',[poster])
    assert.deepEqual(await inbox(), [])
    assert.deepEqual(new Set((await db.query('select application_id from application_cv_removals')).rows.map(r=>r.application_id)),new Set([app,pending]))
    const [bucket] = (await db.query('select * from storage.buckets')).rows
    assert.equal(bucket.public,false)
    assert.deepEqual(bucket.allowed_mime_types,['application/pdf'])

    const request = () => db.query("select request_application_code('guest@example.test','digest','source') as ok")
    const verify = hash => db.query("select verify_application_code('guest@example.test',$1,'session') as ok",[hash])
    await db.exec('set role anon')
    await assert.rejects(request(), /permission denied/)
    await assert.rejects(verify('digest'), /permission denied/)
    await db.exec('reset role; set role service_role')
    assert.equal((await request()).rows[0].ok,true)
    assert.equal((await request()).rows[0].ok,false)
    for (let attempt=0; attempt<5; attempt++) assert.equal((await verify('wrong')).rows[0].ok,false)
    assert.equal((await verify('digest')).rows[0].ok,false)
    await db.exec("update application_email_codes set sent_at=now()-interval '2 minutes'")
    assert.equal((await request()).rows[0].ok,true)
    assert.equal((await verify('digest')).rows[0].ok,true)
    assert.equal((await verify('digest')).rows[0].ok,false)
    assert.deepEqual((await db.query('select email from application_guest_sessions where expires_at>now()')).rows,[{email:'guest@example.test'}])
  } finally {
    await db.close()
  }
})
