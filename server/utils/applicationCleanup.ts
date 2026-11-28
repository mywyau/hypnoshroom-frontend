export async function cleanupApplications() {
  const db = applicationService()
  const ago = (minutes: number) => new Date(Date.now() - minutes * 60_000).toISOString()
  await Promise.all([
    db.from('role_applications').delete().is('submitted_at', null).lt('created_at', ago(30)).throwOnError(),
    db.from('application_email_codes').delete().lt('sent_at', ago(10)).throwOnError(),
    db.from('application_email_limits').delete().lt('window_start', ago(60)).throwOnError(),
    db.from('application_guest_sessions').delete().lt('expires_at', ago(0)).throwOnError(),
  ])

  let removed = 0
  const deadline = Date.now() + 20_000
  do {
    const { data } = await db.from('application_cv_removals').select('application_id')
      .lte('remove_after', ago(0)).order('remove_after').limit(100).throwOnError()
    if (!data.length) break
    const ids = data.map(row => String(row.application_id))
    const { error } = await db.storage.from(cvBucket).remove(ids.map(id => id + '.pdf'))
    if (error) throw error
    await db.from('application_cv_removals').delete().in('application_id', ids).throwOnError()
    removed += ids.length
  } while (Date.now() < deadline)
  return removed
}
