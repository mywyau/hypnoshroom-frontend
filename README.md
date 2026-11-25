# Hypnoshroom frontend

The Nuxt 3 website for Hypnoshroom, an independent consultancy specialising in Scala engineering, modern software products and pragmatic software delivery.

The application includes server-rendered pages, technical articles, service and expertise content, Vercel Web Analytics and a server-side contact form delivered through Resend.

## Requirements

- Node.js 20 or newer
- npm
- A Resend account and verified sending domain to deliver contact-form enquiries
- A Cloudflare Turnstile widget for production spam protection
- A Vercel project for the intended production deployment

The website can be viewed locally without provider credentials. Contact-form submissions will not be delivered until Resend is configured.

## Get started

Install the dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Start the development server:

```bash
npm run dev
```

Nuxt will print the local URL, normally `http://localhost:3000`.

## Environment variables

Private variables are available only to the Nuxt server. Variables prefixed with `NUXT_PUBLIC_` are intentionally included in the browser bundle and must never contain secrets.

| Variable | Required in production | Purpose |
| --- | --- | --- |
| `NUXT_RESEND_API_KEY` | Yes | Private Resend API key used by the enquiry endpoint. |
| `NUXT_CONTACT_TO_EMAIL` | Yes | Private inbox that receives enquiries. It can be an existing personal or company inbox. |
| `NUXT_CONTACT_FROM_EMAIL` | Yes | Sender using a domain verified in Resend, for example `Hypnoshroom website <enquiries@mail.hypnoshroom.com>`. |
| `NUXT_PUBLIC_CONTACT_EMAIL` | No | Public direct-email fallback displayed on the contact form. Leave it blank until the address can receive mail. |
| `NUXT_PUBLIC_TURNSTILE_SITE_KEY` | Recommended | Public Cloudflare Turnstile widget key. |
| `NUXT_TURNSTILE_SECRET_KEY` | Recommended | Private key used to validate Turnstile responses on the server. |

Configure both Turnstile variables together. Supplying only the secret prevents submissions because the browser cannot display a challenge; supplying only the site key displays a challenge that the server does not verify.

## Configure the contact form

The form submits to `POST /api/enquiry`. The endpoint validates the request, checks a honeypot, applies an instance-local rate limit, verifies Turnstile when configured and sends a plain-text email through Resend.

### Resend

1. Add a sending domain in Resend. A subdomain such as `mail.hypnoshroom.com` keeps transactional email configuration separate from other email services.
2. Add the DNS records supplied by Resend at the authoritative DNS provider for the domain.
3. Wait for Resend to verify the domain.
4. Create an API key with sending permission.
5. Set the three private email variables in `.env` locally and in Vercel for deployed environments.

`NUXT_CONTACT_FROM_EMAIL` is the identity Resend sends from; it does not have to be a monitored mailbox. `NUXT_CONTACT_TO_EMAIL` is the real inbox that receives the enquiry. The visitor's address is set as `Reply-To`, so replying to the delivered message replies to the visitor.

### Cloudflare Turnstile

1. Create a Managed Turnstile widget.
2. Authorise `hypnoshroom.com` and any other production hostname, such as `www.hypnoshroom.com`.
3. Add the site key and secret key to the matching environment variables.

Turnstile supplies bot verification across serverless instances. The endpoint also permits five attempts per IP address in a 15-minute window within each running server instance; this is a small local safeguard, not distributed rate limiting.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Nuxt development server. |
| `npm run typecheck` | Run Vue and TypeScript checks. |
| `npm run build` | Create the production Nuxt and Nitro server build. |
| `npm run preview` | Preview a completed production build locally. |
| `npm run generate` | Create static output; this does not support the server-side enquiry endpoint. |

Before handing over or deploying a change, run:

```bash
npm run typecheck
npm run build
```

Run `npm test` for contractor calculation fixtures (Node 22.18 or later) and `npm run lint` for source linting. Oxlint is a development dependency.

## Project structure

```text
assets/css/             Global styles and Tailwind layers
components/             Shared UI and page-section components
composables/            Reusable Nuxt composables, including page SEO
content/insights/       Reserved for a future Markdown content migration
data/articles.ts        Technical article content and metadata
data/languageServices.ts
                        Language-specific service-page content
data/services.ts        Core service-package content
pages/                  File-based application routes
public/                 Static public assets
server/api/             Server-side API handlers
server/routes/          Server-rendered routes such as the sitemap
```

Article content currently lives in `data/articles.ts`. Add or edit articles there and keep each slug unique. Service and language-specific content is held separately in the corresponding files under `data/`.

## Analytics

Vercel Web Analytics is rendered from `app.vue` through `@vercel/analytics`. Production analytics are viewed in the Vercel project dashboard. The privacy notice describes the analytics and contact-form providers used by the site.

## Deploy to Vercel

The project uses the Vercel Nitro preset and is identified as a Nuxt project in `vercel.json`.

1. Import the repository into Vercel.
2. Set the project root to `hypnoshroom-frontend` if Vercel is connected to the parent repository.
3. Add the environment variables under **Project Settings → Environment Variables**.
4. Apply them to Production and any Preview environments that should support the contact form.
5. Deploy using the standard Nuxt build command, `npm run build`.
6. Redeploy after adding or changing environment variables.

Do not use the fully static output from `npm run generate` for production: static hosting cannot run `server/api/enquiry.post.ts`.

## Troubleshooting

### The website loads but the form does not send

- Confirm all three Resend variables exist in the deployed environment.
- Confirm the sending domain shows as verified in Resend.
- Check that `NUXT_CONTACT_FROM_EMAIL` uses that verified domain.
- Inspect the Resend email logs and the Vercel function logs for `/api/enquiry`.
- Redeploy if the environment variables were added after the last deployment.

### Verification fails

- Confirm the Turnstile site key and secret belong to the same widget.
- Confirm the current hostname is authorised in Cloudflare.
- Make sure both Turnstile variables are configured, or remove both for local development.
- Retry with a fresh challenge; Turnstile tokens expire and cannot be reused.

### The contact endpoint is missing after deployment

Confirm the deployment used `npm run build`, not `npm run generate`. A successful Vercel build should contain the Nitro server function for `/api/enquiry`.

## Contractor intelligence

The product brief is in [HYPNOSHROOM_CONTRACTOR_INTELLIGENCE.md](HYPNOSHROOM_CONTRACTOR_INTELLIGENCE.md). Start the existing dev server and visit `/contractor-intelligence`. The first increment delivers the landing page, the permanent versus umbrella comparison and a linked methodology. The outside-IR35 tool at `/contractor-intelligence/outside-ir35` adds a separate company ledger and annual comparison with employment. The comparison includes whole-day cash break-even, gap cases and a monthly household ledger.

### Implementation and maintenance

- Nuxt renders indexable explanations and the initial example. Vue handles edits locally. Inputs live only in component memory. No scenario API, persistence, URL parameters or analytics events are used.
- `domain/contractor/payroll.ts` owns the 2026/27 rates, effective dates, verification date and official sources. `domain/contractor/comparison.ts` validates scenarios, resolves monthly umbrella funding and calculates separate pension, cash and household ledgers. Input amounts are pounds. Internal and returned money amounts are integer pence.
- Permanent employer pension is additional to salary. Under the modelled umbrella agreement the same assignment budget funds margin, employer NI, employer pension, optional levy and gross wages. Extra days off reduce the already prorated schedule once. The monthly ledger assumes whole billed days distributed over whole active months; income tax is an annual estimate allocated proportionately.
- Add new tax years as separate rule sets with explicit selection and independent fixtures. Recheck HMRC and devolved-government sources, verify the effective dates and reconcile against published examples before enabling each year. Keep historical scenarios tied to their original year.
- Run `npm test`, `npm run lint`, `npm run typecheck` and `npm run build`. Check the SSR HTML, sitemap, desktop and mobile navigation, inline errors and keyboard controls when changing the UI. Full payroll software and adviser review remain outside the automated checks.

### Release and handoff checklist

1. Obtain independent methodology review before production release. Review tax allocation and rounding, pension and holiday-pay assumptions, and the explainer with an umbrella payroll specialist. Cover agreed hours/minimum wage and actual remittance timings with real provider illustrations before representing those cases.
2. Extend the comparison with a standalone inside-IR35 entry point if a dedicated umbrella workflow is needed. Add verified student-loan plans and other pension relief methods with fixtures. The current tool supports registered-pension salary sacrifice and additional employer contributions only.
3. Build the standalone runway tool with reserve floor, debt repayments, one-off expenses, gap income and zero-burn tests. Build the minimum-rate solver for cash and total-package targets with risk premium, bounded search and penny-level target tests. The comparison currently solves for whole days at a given rate.
4. Before release, obtain accountant review of `domain/contractor/limitedCompany.ts`, especially director NI, marginal relief, dividend stacking and allowance allocation. The calculator covers one full accounting year, a sole director/shareholder, current-year dividends and no opening reserves. Add short accounting periods or other income only with new sourced rules and fixtures.
5. Keep market intelligence in a separate future data layer. Before ingestion, review official procurement APIs and licensed vacancy feeds for redistribution, retention, attribution, privacy and rate limits, then obtain approval. Track source observations and provenance separately from deduplicated vacancies. Publish coverage, freshness, missingness and sample size with any eventual statistic.
