export default defineEventHandler(async event => {
  const db = applicationRequest(event)
  const identity = await applicationIdentity(event, db)
  const fields = 'id,role_title,recipient,submitted_at'
  const guest = db.from('role_applications').select(fields).is('applicant_id', null).eq('email', identity.email).not('submitted_at','is',null)
  const signed = identity.id ? db.from('role_applications').select(fields).eq('applicant_id', identity.id).not('submitted_at','is',null) : null
  const [guestRows, signedRows] = await Promise.all([guest.throwOnError(), signed?.throwOnError()])
  return [...guestRows.data, ...(signedRows?.data ?? [])].sort((a,b) => b.submitted_at.localeCompare(a.submitted_at))
})
