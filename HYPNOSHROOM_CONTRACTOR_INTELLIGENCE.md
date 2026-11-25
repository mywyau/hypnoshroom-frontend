# Hypnoshroom — Contractor Intelligence Platform

## Codex implementation brief

Act as a senior product engineer, UK contractor-domain researcher and pragmatic software architect. Extend the existing Hypnoshroom consultancy website into a credible, useful contractor intelligence platform. Work incrementally in the existing repository; do not replace the consultancy website or rewrite its stack unnecessarily.

## 1. Discovery and working agreement

Before editing, inspect AGENTS.md, README, package/build files, routes, components, styling, tests, deployment configuration and existing analytics. Identify the framework, rendering model and conventions. Check git status; preserve unrelated changes. Produce a short implementation plan with affected files, assumptions, dependencies and risks. Then implement Phase 1 in small, reviewable increments. Do not deploy, purchase services, create paid infrastructure, expose secrets or introduce external data collection without approval. Ask only about genuinely blocking decisions. Prefer existing dependencies and design patterns.

## 2. Product objectives

- Preserve Hypnoshroom's consultancy identity and client conversion paths.
- Help UK technology professionals evaluate contracting against permanent employment.
- Make financial assumptions explicit, editable and reproducible.
- Build an organic acquisition channel through useful, indexable tools.
- Establish foundations for later market intelligence without pretending that market data already exists.
- Keep the initial release free, anonymous and usable without registration.

Primary audience: UK software engineers and technology contractors, including people considering their first contract. Initial jurisdiction: UK; support relevant devolved income tax differences explicitly. Use GBP and UK terminology.

## 3. Information architecture

Adapt these suggested routes to the existing router and URL conventions:

- /contractor-intelligence — landing page, tool discovery and methodology links.
- /contractor-intelligence/inside-ir35 — umbrella/inside IR35 calculator.
- /contractor-intelligence/outside-ir35 — limited company scenario calculator.
- /contractor-intelligence/permanent-vs-contract — comparison and scenario analysis.
- /contractor-intelligence/day-rate — break-even day rate.
- /contractor-intelligence/runway — financial runway and reserve planning.
- /contractor-intelligence/methodology — assumptions, sources, limitations and update dates.

Add a clear navigation entry without overwhelming the consultancy homepage. Preserve existing URLs and SEO metadata. Do not publish empty placeholder pages for future features.

## 4. Phase 1 — financial decision tools

### Shared inputs and outputs

Support day rate, paid working days, contract duration, unpaid gaps, holidays, sickness, expenses, pension contributions, tax year, tax jurisdiction and relevant tax circumstances. Distinguish annualised income from actual income over a contract and from household cash flow. Prevent double-counting holidays and downtime. Offer sensible illustrative defaults, clearly labelled and editable. Show gross revenue, deductions, net cash, pension funding and effective monthly income. Separate employer and employee contributions and distinguish pension wealth from spendable cash.

### Inside IR35 / umbrella calculator

Distinguish assignment rate (umbrella income) from gross taxable PAYE salary. Account for umbrella margin, employer National Insurance, apprenticeship levy where applicable, employer pension and salary sacrifice arrangements. Apply employee income tax and NI using the appropriate tax year and pay-period assumptions. Explain holiday pay treatment and avoid double counting. Support relevant student loan and tax-code assumptions where verified; otherwise explicitly state exclusions. Do not treat all inside IR35 engagements as identical umbrella arrangements.

### Outside IR35 / limited company calculator

Model turnover excluding VAT, allowable business expenses, director salary, employer NI, employer pension, corporation tax, distributable profit, dividends, dividend tax and retained company cash. Model applicable corporation tax thresholds, marginal relief and associated-company assumptions. Distinguish company and personal finances. Include salary/dividend allocation as editable inputs, not an asserted optimal strategy. Clearly identify excluded complications such as prior retained profits, other income or accounting-period differences unless supported. Do not infer IR35 status from a day rate or job description.

### Permanent versus contract comparison

Compare annual cash, pension, paid leave, benefits, contract duration and expected unpaid gaps on a consistent time horizon. Include employer pension and optional benefits valuation. Model scenarios such as 0, 1, 2, 3 and 6 months without work, with editable assumptions. Show contract advantage/disadvantage, break-even paid days and monthly cash flow. Provide downside cases for early termination and delayed payments. Avoid presenting expected contract renewals as guaranteed income.

### Minimum day rate

Use the shared calculation engine to solve for the rate required to match permanent take-home or total compensation, with an optional risk premium. State the selected target and calculation horizon. Use a bounded numerical solver with tests and clear failure states. Do not imply a rate is achievable in the market.

### Financial runway

Inputs: accessible savings, essential monthly expenditure, debt repayments, one-off costs, expected income during gaps and reserve floor. Outputs: months until reserve floor, monthly cash trajectory and savings target for a chosen gap. Handle zero or negative net burn without dividing by zero. Do not count pensions or inaccessible assets as liquid cash.

## 5. Calculation correctness and research

Before implementing tax rules, verify the selected tax year against official HMRC/GOV.UK and relevant devolved-government sources. Record source URLs, effective dates, verification dates and assumptions in a versioned rule set. Never invent rates or silently use stale rules. If authoritative sources cannot be accessed, flag the blocker and do not label affected results as verified or production-ready. Do not extrapolate future tax years as enacted law.

Use pure calculation functions independent of UI and persistence. Use decimal arithmetic or integer minor units with explicit rounding rules. Handle personal allowance taper, applicable regional bands, NI thresholds/pay periods, pension relief methods, dividend allowances and tax stacking where in scope. Clearly document simplifications, particularly annualised PAYE estimates versus actual payroll. Separate verified rules from scenario assumptions. Never silently default unsupported jurisdictions or tax circumstances to England.

Provide a visible breakdown and methodology. Include a disclaimer: estimates for informational purposes, not personalised tax, legal or financial advice; actual outcomes depend on circumstances and arrangements. Do not claim HMRC approval.

## 6. UX and visual direction

Use the existing Hypnoshroom branding, typography and components. Aim for a professional financial research product rather than a generic SaaS template. Prioritise legibility, accessible contrast, responsive layouts and keyboard navigation. Show a compact summary followed by deduction breakdowns and scenario tables/charts. Use labelled inputs, inline validation, helpful empty states and explanatory tooltips. Avoid decorative charts and false precision. Results should update predictably. Keep personal financial inputs local by default; do not send them to analytics or third parties. No account requirement in Phase 1. If sharing scenarios later, make disclosure of financial inputs explicit and opt-in.

## 7. Engineering approach

Follow the repository's actual language/framework. Suggested logical modules (adapt names to conventions): tax rules, money primitives, permanent employment, umbrella, limited company, comparison, runway, scenario validation and presentation. Keep tax calculations in a reusable domain layer. Reuse UI components for currency inputs, assumptions, breakdowns and result summaries. Avoid introducing microservices, queues, a new database or authentication for stateless calculators. Preserve SSR/static rendering where appropriate. Avoid unnecessary client bundles. Use typed inputs and outputs and explicit validation at boundaries.

## 8. Testing and release gates

- Unit tests for tax bands, thresholds, taper, pension treatments, company profit and dividend stacking, rounding and zero/invalid inputs.
- Independently derived reference fixtures using documented official examples where available; do not generate expected values solely from the implementation under test.
- Scenario tests for partial-year contracts, downtime, high income, different tax jurisdictions, zero paid days and negative profits.
- Reconciliation tests: every deduction breakdown must reconcile to reported cash; company retained profit must not be counted as personal take-home.
- Break-even solver tests: returned rates satisfy the target within a documented tolerance.
- UI tests for input validation, navigation, accessibility and mobile layouts using existing test tooling.
- Run lint, type checking, tests and production build. Report commands and actual outcomes, including failures. Do not claim tests passed unless executed successfully.
- Preserve existing consultancy functionality. No production release until tax methodology is reviewed and blockers resolved.

Illustrative acceptance scenario (not a tax reference fixture): £63,000 permanent salary, 20% employee salary sacrifice, 7% employer pension, £630/day umbrella assignment rate, 220 paid days before additional gaps, £1,000 monthly essential expenditure and £30,000 accessible savings. Compare zero-gap and two-month-gap scenarios using explicit paid-day assumptions. Confirm the UI distinguishes cash and pension and that users can change every assumption. Do not hardcode expected tax results from this brief.

## 9. SEO and acquisition

Create useful original explanations for each tool, descriptive titles, canonical URLs, internal links, sitemap entries and appropriate metadata using existing conventions. Ensure key explanatory content is server-rendered/indexable where feasible. Avoid mass-generated thin pages, fabricated reviews and unsupported claims. Keep consultancy calls to action relevant and unobtrusive. Track aggregate tool usage only through an approved privacy-conscious analytics setup; never log salary, savings or tax inputs.

## 10. Phase 2 — market intelligence (design only initially)

Plan a separate data layer for contract postings and public procurement opportunities. Evaluate official APIs, licensed feeds, permitted sources and UK public procurement services. Review terms, licensing, attribution, retention, privacy and rate limits before ingestion. Do not bypass access controls, scrape prohibited sources or assume job-board redistribution rights.

Suggested data model: source, source listing ID, canonical vacancy ID, title, skills, seniority, region, remote policy, IR35 status, rate range, rate unit, currency, recruiter organisation, first/last seen, posted/expiry dates, provenance and confidence. Unknown values remain unknown. Preserve raw source observations only where permitted. Normalise skills and rates; deduplicate repeated listings and recruiter reposts with auditable rules. Track distinct vacancies separately from posting counts. Treat missing rates as missing, not zero. Avoid mixing permanent salaries and contract rates.

Potential dashboards: unique vacancy trends, rate median and quartiles, skill demand, IR35 distribution, remote/hybrid trends, regional demand and public sector awards. Display sample sizes, coverage, freshness, missingness and methodological changes. Suppress or flag small samples; never claim the observed sample represents the entire UK market. No fabricated live charts. Synthetic fixtures must be explicitly labelled and excluded from production metrics.

Only build ingestion after a separate source feasibility review and user approval. Start with one or two lawful sources, scheduled ingestion, idempotent updates, deduplication and monitoring. Choose storage and scheduling based on actual hosting and volume.

## 11. Phase 3 — optional commercial expansion

Consider saved scenarios, personalised watchlists, market alerts, historical data, downloadable reports and paid intelligence subscriptions only after demand is demonstrated. Keep core calculators free. Avoid premature authentication, billing and lead harvesting. Separate consultancy enquiries from product registration and consent. Do not implement recruiter personal profiling or publish personal contact data without a lawful basis and review.

## 12. Execution sequence and deliverables

1. Inspect repository and report architecture, risks and proposed file changes.
2. Establish calculation rules and methodology; verify authoritative sources.
3. Build shared domain engine and independent tests.
4. Implement landing page and permanent/inside IR35 comparison as the first vertical slice.
5. Add runway and break-even tools, then outside IR35 after its tax rules are verified.
6. Integrate navigation, responsive styling, SEO and accessibility.
7. Run regression checks and production build; fix issues within scope.
8. Document architecture, rule updates, known limitations and local development steps.
9. Produce a final summary of changes, tests, assumptions, unresolved issues and recommended next steps.

## Definition of done

A visitor can discover the contractor intelligence area, use the completed calculators without an account, understand their assumptions and compare realistic financial scenarios. Existing consultancy pages continue working. Calculation rules are traceable and tested. Unsupported cases are clearly disclosed. No unapproved services, data scraping, deployment or fabricated market intelligence are introduced.
