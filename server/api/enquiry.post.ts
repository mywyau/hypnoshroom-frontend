import {
  createError,
  defineEventHandler,
  getHeader,
  getRequestIP,
  readBody,
  setHeader,
} from 'h3'

interface EnquiryBody {
  name?: unknown
  company?: unknown
  email?: unknown
  project?: unknown
  engagementType?: unknown
  website?: unknown
  turnstileToken?: unknown
}

interface TurnstileResponse {
  success?: boolean
}

const limits = {
  name: 100,
  company: 150,
  email: 254,
  project: 2000,
  engagementType: 100,
  turnstileToken: 2048,
} as const

const rateLimitWindowMs = 15 * 60 * 1000
const rateLimitMaximum = 5
const rateLimits = new Map<string, { count: number; resetAt: number }>()

const requiredText = (value: unknown, field: string, maximum: number) => {
  if (typeof value !== 'string') {
    throw createError({ statusCode: 400, statusMessage: `${field} is required.` })
  }

  const trimmed = value.trim()
  if (!trimmed || trimmed.length > maximum) {
    throw createError({ statusCode: 400, statusMessage: `${field} is invalid.` })
  }
  return trimmed
}

const optionalText = (value: unknown, maximum: number) => {
  if (value === undefined || value === null || value === '') return ''
  if (typeof value !== 'string' || value.trim().length > maximum) {
    throw createError({ statusCode: 400, statusMessage: 'One of the submitted fields is invalid.' })
  }
  return value.trim()
}

const checkRateLimit = (key: string, now: number) => {
  if (rateLimits.size > 500) {
    for (const [entryKey, entry] of rateLimits) {
      if (entry.resetAt <= now) rateLimits.delete(entryKey)
    }
  }

  const existing = rateLimits.get(key)
  if (!existing || existing.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + rateLimitWindowMs })
    return null
  }

  existing.count += 1
  return existing.count > rateLimitMaximum
    ? Math.max(1, Math.ceil((existing.resetAt - now) / 1000))
    : null
}

export default defineEventHandler(async (event) => {
  const contentLength = Number(getHeader(event, 'content-length') || 0)
  if (contentLength > 12_000) {
    throw createError({ statusCode: 413, statusMessage: 'The enquiry is too large.' })
  }

  const now = Date.now()
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const retryAfter = checkRateLimit(ip, now)
  if (retryAfter) {
    setHeader(event, 'retry-after', retryAfter)
    throw createError({ statusCode: 429, statusMessage: 'Too many enquiries. Please wait before trying again.' })
  }

  const body = await readBody<EnquiryBody>(event)
  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'The enquiry could not be read.' })
  }

  // A filled honeypot is treated as accepted without sending an email, so an
  // automated sender receives no useful signal that it has been detected.
  const honeypot = optionalText(body.website, 200)
  if (honeypot) return { ok: true }

  const name = requiredText(body.name, 'Name', limits.name)
  const company = optionalText(body.company, limits.company)
  const email = requiredText(body.email, 'Email', limits.email).toLowerCase()
  const project = requiredText(body.project, 'Project details', limits.project)
  const engagementType = requiredText(body.engagementType, 'Engagement type', limits.engagementType)

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Enter a valid email address.' })
  }

  const config = useRuntimeConfig(event)
  if (config.turnstileSecretKey) {
    const turnstileToken = requiredText(body.turnstileToken, 'Verification', limits.turnstileToken)
    let verification: TurnstileResponse

    try {
      verification = await $fetch<TurnstileResponse>('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: {
          secret: config.turnstileSecretKey,
          response: turnstileToken,
          remoteip: ip === 'unknown' ? undefined : ip,
        },
      })
    } catch {
      throw createError({ statusCode: 503, statusMessage: 'Verification is temporarily unavailable. Please try again.' })
    }

    if (!verification.success) {
      throw createError({ statusCode: 400, statusMessage: 'Verification expired or failed. Please try again.' })
    }
  }

  if (!config.resendApiKey || !config.contactToEmail || !config.contactFromEmail) {
    console.error('Contact form email delivery is not configured.')
    throw createError({ statusCode: 503, statusMessage: 'The contact form is temporarily unavailable. Please try again later.' })
  }

  const subjectName = name.replace(/[\r\n]+/g, ' ').slice(0, 80)
  const subjectCompany = company ? ` — ${company.replace(/[\r\n]+/g, ' ').slice(0, 80)}` : ''
  const message = [
    'New enquiry from hypnoshroom.com',
    '',
    `Name: ${name}`,
    `Company: ${company || 'Not provided'}`,
    `Email: ${email}`,
    `Engagement: ${engagementType}`,
    '',
    'Project details:',
    project,
  ].join('\n')

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${config.resendApiKey}`,
      'content-type': 'application/json',
      'idempotency-key': crypto.randomUUID(),
    },
    body: JSON.stringify({
      from: config.contactFromEmail,
      to: [config.contactToEmail],
      reply_to: email,
      subject: `Website enquiry from ${subjectName}${subjectCompany}`,
      text: message,
    }),
  })

  if (!response.ok) {
    console.error(`Resend rejected a contact form email with status ${response.status}.`)
    throw createError({ statusCode: 502, statusMessage: 'Your enquiry could not be sent. Please try again later.' })
  }

  return { ok: true }
})
