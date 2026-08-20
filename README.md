# Hypnoshroom frontend

Production-ready Nuxt 3 website for Hypnoshroom, an independent Scala and JVM software consultancy.

## Development

```bash
npm install
npm run dev
```

Use `npm run typecheck` for TypeScript validation and `npm run build` for a production build. The Nuxt output is compatible with Vercel.

## Content and integrations

- Insight content is defined in `data/articles.ts`; `content/insights` is reserved for a future Nuxt Content migration.
- The enquiry UI is isolated in `components/contact/EnquiryForm.vue`. Its placeholder submit handler documents where to connect Resend, Formspree or a server endpoint.
- Founder profile placeholders in `pages/about.vue` should be replaced before launch.
