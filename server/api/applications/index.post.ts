import { Buffer } from 'node:buffer'

export default defineEventHandler(async event => {
  const db = applicationRequest(event)
  const identity = await applicationIdentity(event, db)
  const contentType = getHeader(event, 'content-type') ?? ''
  if (!contentType.startsWith('multipart/form-data;')) throw createError({ statusCode: 415, statusMessage: 'Use the application form.' })
  const chunks: Buffer[] = []
  let length = 0
  for await (const chunk of event.node.req) {
    const bytes = Buffer.from(chunk)
    length += bytes.length
    if (length > maxCvBytes + 32768) throw createError({ statusCode: 413, statusMessage: 'Choose a PDF up to 3 MB.' })
    chunks.push(bytes)
  }
  const form = await new Response(new Uint8Array(Buffer.concat(chunks)), { headers: { 'Content-Type': contentType } }).formData()
    .catch(() => { throw createError({ statusCode: 400, statusMessage: 'Invalid application form.' }) })
  const listingId = applicationId(form.get('listing'))
  const name = form.get('name')
  const note = form.get('message') ?? ''
  const recipient = form.get('recipient')
  const role = form.get('role')
  if (typeof name !== 'string' || !name.trim() || name.length > 140 || typeof note !== 'string' || note.length > 3000 ||
      typeof recipient !== 'string' || !recipient || recipient.length > 140 || typeof role !== 'string' || !role || role.length > 160) {
    throw createError({ statusCode: 400, statusMessage: 'Check the applicant and listing details.' })
  }
  const file = form.get('cv')
  if (!file || typeof file === 'string' || file.size > maxCvBytes || file.type !== 'application/pdf' || !file.name.toLowerCase().endsWith('.pdf')) {
    throw createError({ statusCode: 400, statusMessage: 'Choose a PDF CV up to 3 MB.' })
  }
  const pdf = Buffer.from(await file.arrayBuffer())
  if (!/^%PDF-\d\.\d/.test(pdf.subarray(0, 8).toString('ascii')) || !pdf.subarray(-1024).includes('%%EOF')) {
    throw createError({ statusCode: 400, statusMessage: 'The selected file is not a PDF.' })
  }
  const fields = 'id,role_title,recipient,submitted_at'
  const { data: reservation, error } = await db.from('role_applications').insert({
    listing_id: listingId, applicant_id: identity.id, email: identity.email, applicant_name: name.trim(),
    message: note.trim(), role_title: role, recipient,
  }).select('id').single()
  if (error) {
    if (error.code === '23505') throw createError({ statusCode: 409, statusMessage: 'An application for this role already exists. Check Your applications.' })
    if (error.code === 'P0001' || error.code === '23503') throw createError({ statusCode: 409, statusMessage: 'This role has changed or closed. Refresh the listing.' })
    throw createError({ statusCode: 503, statusMessage: 'Could not start the application. Please try again.' })
  }
  try {
    const { error: uploadError } = await db.storage.from(cvBucket).upload(reservation.id + '.pdf', pdf, { contentType: 'application/pdf', upsert: false })
    if (uploadError) throw uploadError
    const { data } = await db.from('role_applications').update({ submitted_at: new Date().toISOString() })
      .eq('id', reservation.id).select(fields).single().throwOnError()
    return data
  } catch {
    // An ambiguous commit must never discard a successfully submitted application.
    await db.from('role_applications').delete().eq('id', reservation.id).is('submitted_at', null)
    throw createError({ statusCode: 409, statusMessage: 'Could not confirm submission. Check Your applications before retrying.' })
  }
})
