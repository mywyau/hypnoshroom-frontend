import { fileURLToPath } from 'node:url'
import { isHiringPath } from './domain/employers/routes'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  experimental: {
    // Avoid Nuxt's virtual #app-manifest import. This site does not use
    // client-side route rules, so the experimental manifest is unnecessary.
    appManifest: false,
  },
  modules: [
    '@nuxtjs/tailwindcss',
    (_options, nuxt) => {
      if (nuxt.options.dev) return
      const placeholder = fileURLToPath(new URL('./components/boards/HiringComingSoon.vue', import.meta.url))
      nuxt.hook('pages:extend', pages => {
        for (const page of pages) {
          if (['/account', '/login', '/admin/listings'].includes(page.path) || (isHiringPath(page.path) && page.path !== '/jobs/account')) page.file = placeholder
        }
      })
    },
  ],
  components: [{ path: '~/components', pathPrefix: false }],
  tailwindcss: { cssPath: '~/assets/css/main.css' },
  runtimeConfig: {
    resendApiKey: '',
    contactToEmail: '',
    contactFromEmail: '',
    turnstileSecretKey: '',
    public: {
      employerSupabaseUrl: '',
      employerSupabaseKey: '',
      contactEmail: '',
      turnstileSiteKey: '',
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en-GB' },
      meta: [
        { name: 'theme-color', content: '#f5f2ea' },
        { name: 'color-scheme', content: 'light' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
  routeRules: {
    '/sitemap.xml': { prerender: true },
  },
  nitro: { preset: 'vercel' },
  typescript: { strict: true, typeCheck: true },
})
