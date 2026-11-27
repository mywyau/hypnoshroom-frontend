# Hypnoshroom frontend

Hypnoshroom is a Nuxt 3 application for UK engineering consultancy, contractor income calculators and employer-posted engineering roles. The homepage gives visitors separate paths to the consultancy and job search.

| Area | Entry point | Availability |
| --- | --- | --- |
| Consultancy, case studies, insights and enquiries | `/consultancy` | Development and production |
| Permanent versus contract and outside-IR35 calculators | `/contractor-intelligence` | Development and production |
| Job search landing page | `/find-a-job` | Development and production |
| Contract, permanent and temporary boards | `/contracts`, `/jobs` | Development with Supabase |
| Employer workspace and listing review | `/employers`, `/admin/listings` | Development with Supabase |
| Sign-in and account settings | `/login`, `/account` | Development with Supabase |

Production builds show a coming-soon page for the boards, employer workspace, sign-in, account settings and review queue. The listing APIs return HTTP 404 in production. The [job-board roadmap](HYPNOSHROOM_ROADMAP%281%29.md) describes the pilot.

## Requirements

- Node.js 20 or newer for the app. Use Node.js 22.18 or newer to run the test suite.
- npm
- A Supabase project for sign-in, saved listings and review
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
| `NUXT_PUBLIC_EMPLOYER_SUPABASE_URL` | No | Project URL for accounts and listings in development. |
| `NUXT_PUBLIC_EMPLOYER_SUPABASE_KEY` | No | Publishable key for the same Supabase project. |
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
| `npm test` | Run calculator fixtures and in-memory PostgreSQL tests for listing ownership, review and account deletion. |
| `npm run lint` | Check application and test source with Oxlint. |
| `npm run db:migrate -- --dry-run` | Preview pending migrations for the linked Supabase project. |
| `npm run db:migrate` | Apply pending migrations to that project. |
| `npm run db:migrate:status` | Compare local and applied migration versions. |
| `npm run typecheck` | Run Vue and TypeScript checks. |
| `npm run build` | Create the production Nuxt and Nitro server build. |
| `npm run preview` | Preview a completed production build locally. |
| `npm run generate` | Create static output; this does not support the server-side enquiry endpoint. |

Before handing over or deploying a change, run:

```bash
npm run typecheck
npm run build
```

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
domain/contractor/      Income comparison, payroll and limited-company calculations
domain/employers/       Listing types, advertised terms and pricing previews
supabase/migrations/    Versioned database schema, access policies and functions
tests/                  Calculator fixtures and database regression tests
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
5. Keep market intelligence in a separate future data layer. Before ingestion, review permitted vacancy feeds for redistribution, retention, attribution, privacy and rate limits, then obtain approval. Track source observations and provenance separately from deduplicated vacancies. Publish coverage, freshness, missingness and sample size with any eventual statistic.

## Job boards and employer accounts

**Finding a role.** Visitors can browse without signing in. Both boards support shareable searches by keyword, location, engineering discipline, language and work arrangement. Selecting several language icons matches any selected language. Selecting both Fully remote and Hybrid includes either arrangement. The contract board also filters by advertised IR35 status, and the jobs board by permanent or temporary employment. A listing with an application URL links to the employer’s site.

**Posting a role.** Sign in at `/employers/post-a-role` and enter the hiring company in step one. Saving the first draft or submitting it for review sets the default company for later listings. Recruiters can change the company on each listing. Each role requires an engineering discipline. Permanent and temporary roles require a GBP salary range, and temporary roles require a duration. Contract listings show an advertised GBP day rate or explicitly mark it as unspecified.

**Review and publication.** Employers manage drafts and submissions at `/employers/listings`. Submitting a new role or resubmitting a published edit sends it to `/admin/listings`. A listing administrator can approve and publish it or return it to the employer’s drafts. Closing a listing removes it from public browsing immediately. Listings also leave the board after their closing date in London.

### Account settings and deletion

Job seekers and employers sign in at `/login`. Older `/jobs/account` links redirect to sign-in and preserve email confirmation parameters. At `/account`, users can save or clear their optional preferred name and company. The signed-in header uses the preferred name. The posting form manages the company displayed on each listing separately.

To delete an account, open `/account`, select **Delete account**, enter the account email and choose **Permanently delete account**. Supabase deletes the sign-in account, its profile details, its employer profile if present, and **every listing owned by that account** in one transaction. This includes drafts, pending submissions, published, closed and expired listings, including roles posted for clients. Other users keep their listings even when they use the same company name. After deletion, the app signs out the current browser.

The [account deletion migration](supabase/migrations/20261127000200_delete_own_account.sql) defines the database function. It takes the owner ID from the signed-in session and checks the confirmation email. The review functions also check that the reviewer’s account still exists.

### Try the posting preview

Open `/employers/post-a-role?preview=1` to enter a company or agency name, create a contract, permanent or temporary role, review it and simulate submission for first-listing review. The preview keeps inputs in page memory and clears on refresh. The posting page opens the preview automatically when the public Supabase settings are absent. At `/employers/pricing`, each sample plan leads into the same preview. The proposed free tier covers one role per verified organisation in a rolling 30-day period. The first listing from each new organisation is proposed for review across all plans. Plan selection, prices and posting are simulated here. Live organisation verification, publication quotas and billing are separate work.

### Connect a Supabase environment

1. Use a Supabase project with the Data API enabled for the public schema. Apply the versioned migrations using the workflow below.
2. Set `NUXT_PUBLIC_EMPLOYER_SUPABASE_URL` to the project URL and `NUXT_PUBLIC_EMPLOYER_SUPABASE_KEY` to its **publishable** key in the Nuxt environment. A service-role or secret key must never go into public configuration.
3. Enable the email provider, new-user signups and email confirmation. Use the confirmation URL in the signup, magic-link and password recovery email templates. In Supabase Auth redirect settings, allow the exact URLs for `/employers`, `/login` and `/jobs/reset-password` on each enabled origin (for example `http://localhost:3000`). Open each email link in the browser that requested it. Set the Site URL for the environment and configure an SMTP sender for account emails.
4. Restart Nuxt. Request a link at `/employers/post-a-role` and open it in the same browser. Enter a company on the listing, save a draft, then submit it for review. Approve it from a listing administrator account, open the listing in a signed-out window, then close it and refresh the public page. Drafts, closed briefs and sign-in emails stay out of the public view.

Listing administrators open **Review listings** from their account or visit `/admin/listings` in development. To designate a reviewer, use the Supabase SQL Editor as a project administrator and replace the UUID below with that reviewer's Authentication user ID. The reviewer should sign out and back in for the new claim to take effect. Remove the `listing_admin` key to revoke the claim for subsequently issued tokens.

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"listing_admin":true}'::jsonb
where id = '<reviewer-user-uuid>'::uuid;
```

The local database regression test uses in-memory PostgreSQL and simulated Supabase identities. Run it with `node --test tests/employer-board.test.mjs`.

### Database migrations

Run the pinned Supabase CLI from the frontend repository. Link the checkout to the intended project once. Replace `YOUR_PROJECT_REF` with the project reference from the Supabase dashboard.

```sh
npm run supabase -- login
npm run supabase -- link YOUR_PROJECT_REF
npm run db:migrate:status
```

The Local and Remote columns compare the files in `supabase/migrations/` with the linked database's recorded versions. Each successful push records its timestamp in `supabase_migrations.schema_migrations`. Commit the SQL files to Git and use a new migration for later changes.

**Adopting a database previously updated in the SQL Editor.** Check the SQL Editor history and the actual schema, including policies and grants, for each file reported as local-only. If you verified the complete old migration already ran successfully, record its matching version once with `npm run supabase -- migration repair VERSION --status applied --remote`. Repair updates history without executing the SQL. Leave pending versions for the push. Investigate partially applied changes or unfamiliar remote-only history before proceeding.

| Previous SQL file | CLI version |
|---|---|
| `001-board.sql` | `20261125000100` |
| `002-engineering-jobs.sql` | `20261126000100` |

Preview the pending migrations, apply them, and confirm that the local and remote versions match.

```sh
npm run db:migrate -- --dry-run
npm run db:migrate
npm run db:migrate:status
```

For the next schema change, create a timestamped file with `npm run supabase -- migration new describe_the_change`, edit its SQL, and use the same preview and push commands. A second push skips versions already recorded. For a non-interactive deployment, supply Supabase credentials from your CI secret store and pass `--yes` to the reviewed hosted push.
