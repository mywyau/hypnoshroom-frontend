import { createHash, createHmac } from 'node:crypto'
import { createClient } from '@supabase/supabase-js'
import { createError, getHeader, setHeader, type H3Event } from 'h3'

export const cvBucket = 'application-cvs'
export const maxCvBytes = 3 * 1024 * 1024

export function applicationService(event?: H3Event) {
  const config = useRuntimeConfig(event)
  const key = config.applicationServiceKey
  if (!key || !config.public.employerSupabaseUrl || key.startsWith('sb_publishable_') || key === config.public.employerSupabaseKey) {
    const setting = config.public.employerSupabaseUrl
      ? 'Set NUXT_APPLICATION_SERVICE_KEY to the Supabase server secret in .env and restart Nuxt.'
      : 'Set NUXT_PUBLIC_EMPLOYER_SUPABASE_URL in .env and restart Nuxt.'
    throw createError({ statusCode: 503, statusMessage: import.meta.dev ? setting : 'Applications are temporarily unavailable.' })
  }
  return createClient(config.public.employerSupabaseUrl, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  })
}

export function applicationRequest(event: H3Event) {
  if (!import.meta.dev) throw createError({ statusCode: 404 })
  setHeader(event, 'Cache-Control', 'private, no-store')
  return applicationService(event)
}

export function applicationDigest(value: string) {
  return createHash('sha256').update(value).digest('hex')
}

export function secretDigest(event: H3Event, value: string) {
  return createHmac('sha256', useRuntimeConfig(event).applicationServiceKey).update(value).digest('hex')
}

export function applicationEmail(value: unknown) {
  if (typeof value !== 'string' || value.trim().length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
    throw createError({ statusCode: 400, statusMessage: 'Enter a valid email address.' })
  }
  return value.trim().toLowerCase()
}

export async function applicationIdentity(event: H3Event, db: ReturnType<typeof applicationService>) {
  const authorization = getHeader(event, 'authorization')
  if (authorization?.startsWith('Bearer ')) {
    const { data, error } = await db.auth.getUser(authorization.slice(7))
    if (!error && data.user?.email && data.user.email_confirmed_at) {
      return { id: data.user.id, email: data.user.email.toLowerCase() }
    }
  } else {
    const token = getHeader(event, 'x-application-session')
    if (token && /^[0-9a-f]{64}$/.test(token)) {
      const { data } = await db.from('application_guest_sessions').select('email')
        .eq('token_hash', applicationDigest(token)).gt('expires_at', new Date().toISOString()).maybeSingle().throwOnError()
      if (data) return { id: null, email: String(data.email) }
    }
  }
  throw createError({ statusCode: 401, statusMessage: 'Verify your email again to continue.' })
}

export function applicationId(value: unknown) {
  if (typeof value !== 'string' || !/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(value)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid application or listing.' })
  }
  return value
}
