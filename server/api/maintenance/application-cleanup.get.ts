export default defineEventHandler(async event => {
  setHeader(event,'Cache-Control','no-store')
  const secret = process.env.CRON_SECRET
  if (!secret || getHeader(event,'authorization') !== 'Bearer ' + secret) throw createError({ statusCode: 404 })
  return { removed: await cleanupApplications() }
})
