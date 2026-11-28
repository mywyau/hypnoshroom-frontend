export default defineEventHandler(async event => {
  const db = applicationRequest(event)
  const identity = await applicationIdentity(event, db)
  const id = applicationId(getRouterParam(event,'id'))
  const { data } = await db.from('role_applications').select('email,applicant_id').eq('id',id).maybeSingle().throwOnError()
  if (!data || (data.applicant_id ? data.applicant_id !== identity.id : data.email !== identity.email)) {
    throw createError({ statusCode: 404, statusMessage: 'Application unavailable.' })
  }
  await db.from('role_applications').delete().eq('id',id).throwOnError()
  return { withdrawn: true }
})
