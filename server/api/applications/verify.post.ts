import { randomBytes } from 'node:crypto'

export default defineEventHandler(async event => {
  const db = applicationRequest(event)
  const body = await readBody(event)
  const email = applicationEmail(body?.email)
  if (typeof body?.code !== 'string' || !/^\d{6}$/.test(body.code)) throw createError({ statusCode: 400, statusMessage: 'Enter the six-digit code.' })
  const token = randomBytes(32).toString('hex')
  const { data } = await db.rpc('verify_application_code', {
    address: email, digest: secretDigest(event, email + ':' + body.code), session_digest: applicationDigest(token),
  }).throwOnError()
  if (!data) throw createError({ statusCode: 400, statusMessage: 'Invalid or expired code. Request a new code if needed.' })
  return { token, email }
})
