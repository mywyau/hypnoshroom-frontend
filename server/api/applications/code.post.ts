import { randomInt } from 'node:crypto'

export default defineEventHandler(async event => {
  const db = applicationRequest(event)
  const config = useRuntimeConfig(event)
  if (!config.resendApiKey || !config.contactFromEmail) {
    throw createError({ statusCode: 503, statusMessage: 'Verification emails are not configured.' })
  }
  const body = await readBody(event)
  const email = applicationEmail(body?.email)
  const code = randomInt(100000, 1000000).toString()
  // Use the platform-supplied address on Vercel and the socket address locally.
  const ip = process.env.VERCEL ? getHeader(event, 'x-vercel-forwarded-for')?.split(',')[0] : getRequestIP(event)
  const { data } = await db.rpc('request_application_code', {
    address: email, digest: secretDigest(event, email + ':' + code), source: secretDigest(event, 'ip:' + (ip || 'unknown')),
  }).throwOnError()
  if (!data) throw createError({ statusCode: 429, statusMessage: 'Please wait before requesting another code.' })
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: 'Bearer ' + config.resendApiKey, 'content-type': 'application/json' },
    body: JSON.stringify({ from: config.contactFromEmail, to: [email], subject: 'Your Hypnoshroom application code',
      text: 'Your code is ' + code + '. Enter it on Hypnoshroom within 10 minutes to apply or manage your applications.' }),
  })
  if (!response.ok) throw createError({ statusCode: 502, statusMessage: 'Could not deliver the verification email.' })
  return { sent: true }
})
