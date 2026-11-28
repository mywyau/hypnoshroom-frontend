export default defineNitroPlugin(nitro => {
  if (!import.meta.dev || !useRuntimeConfig().applicationServiceKey) return
  let running = false
  const timer = setInterval(async () => {
    if (running) return
    running = true
    try { await cleanupApplications() }
    catch { console.error('Application cleanup failed; queued files will be retried.') }
    finally { running = false }
  }, 60_000)
  timer.unref()
  nitro.hooks.hook('close', () => clearInterval(timer))
})
