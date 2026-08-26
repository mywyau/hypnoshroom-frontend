# Hypnoshroom frontend

Production-ready Nuxt 3 website for Hypnoshroom, an independent Scala and JVM software consultancy.

## Development

```bash
npm install
npm run dev
```

Use `npm run typecheck` for TypeScript validation and `npm run build` for a production build. The Nuxt output is compatible with Vercel. Use the server build for deployment: the enquiry endpoint cannot run from the fully static output created by `npm run generate`.

Copy `.env.example` to `.env` for local configuration. In Vercel, add the same values as project environment variables:

- `NUXT_RESEND_API_KEY`: a Resend API key.
- `NUXT_CONTACT_TO_EMAIL`: the private inbox that receives enquiries. This can be an existing personal inbox and is never exposed to the browser.
- `NUXT_CONTACT_FROM_EMAIL`: a sender on a domain verified by Resend, such as `Hypnoshroom website <enquiries@mail.hypnoshroom.com>`.
- `NUXT_PUBLIC_CONTACT_EMAIL`: an optional direct-email fallback shown to visitors. Leave it blank until the address can receive mail.
- `NUXT_PUBLIC_TURNSTILE_SITE_KEY` and `NUXT_TURNSTILE_SECRET_KEY`: the matching Cloudflare Turnstile keys. They are optional for local development but should be configured together in production.

The API permits five submissions per IP address in a 15-minute window within each running server instance. Turnstile provides the distributed anti-abuse check used across serverless instances. Platform-level rate limiting can be added in Vercel if stricter distributed limits become necessary.

## Content and integrations

- Insight content is defined in `data/articles.ts`; `content/insights` is reserved for a future Nuxt Content migration.
- The enquiry UI is isolated in `components/contact/EnquiryForm.vue`; its server handler is `server/api/enquiry.post.ts`.
