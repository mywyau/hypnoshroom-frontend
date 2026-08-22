export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  experimental: {
    // Avoid Nuxt's virtual #app-manifest import. This site does not use
    // client-side route rules, so the experimental manifest is unnecessary.
    appManifest: false,
  },
  modules: ['@nuxtjs/tailwindcss'],
  components: [{ path: '~/components', pathPrefix: false }],
  tailwindcss: { cssPath: '~/assets/css/main.css' },
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
