<script setup lang="ts">
import { companyRules } from '~/domain/contractor/limitedCompany'
import { rules } from '~/domain/contractor/payroll'
usePageSeo({ title: 'Contractor calculator methodology and UK tax sources | Hypnoshroom', path: '/contractor-intelligence/methodology',
  description: 'The tax year, official sources, pension treatment, monthly payroll assumptions and limitations behind the Hypnoshroom employment comparison.' })
</script>
<template>
  <div>
    <PageHero eyebrow="Contractor intelligence" title="Calculation methodology" gradient="forest" intro="How to reproduce the employment comparison and decide whether it fits your offer." />
    <article class="page-shell py-12">
      <div class="method max-w-3xl">
        <h2>Tax year and scope</h2>
        <p>Rules apply from 6 April 2026 to 5 April 2027. Source verification date: {{ rules.verifiedOn }}. Choose the nation where you are a taxpayer. Scotland has separate earned-income bands. England, Wales and Northern Ireland share the same rates this year.</p>
        <p>Each alternative is your only employment income for the whole year, with the standard Personal Allowance, tapered above £100,000. We estimate annual income tax to the nearest penny. Category A National Insurance uses monthly thresholds and HMRC’s exact-percentage rounding. We allocate annual tax across paid months in proportion to taxable pay. Actual PAYE withholding and refund dates can differ.</p>
        <h2>From assignment rate to payslip</h2>
        <p>Use the umbrella assignment rate excluding VAT from your key information document. Multiply by days billed, deduct the margin for each paid month, then find the highest whole-penny reference salary the remaining funds can support. This includes employer National Insurance, the selected employer pension and the optional 0.5% levy allocation on post-sacrifice pay. A rounding balance accounts for any spare pennies.</p>
        <p>Holiday pay is assumed to be fully paid within the modelled payroll and included in gross earnings. Accrued holiday released on a different schedule will change cash timing. A direct PAYE rate or a deemed direct payment through your own company requires a different calculation. This tool does not determine employment status.</p>
        <h2>Pensions and benefits</h2>
        <p>Both pension percentages use the full reference salary. Salary sacrifice reduces taxable and NI-able pay. The sacrificed amount and any additional employer contribution are shown separately and together as pension funding. Permanent pension contributions are additional to the quoted salary. Benefits are your optional personal valuation, counted only in the package comparison.</p>
        <p>The model assumes an agreed, lawful salary sacrifice arrangement. It does not check minimum wage, pension annual allowances, tax relief limits, auto-enrolment eligibility, qualifying earnings or scheme rules. Check these against your hours and pension agreement. Net-pay and relief-at-source schemes, student loans, taxable benefits, other income, special tax codes and non-standard NI categories are outside this model.</p>
        <h2>Days, gaps and household cash</h2>
        <p>Start with a full-year paid-day budget after usual leave, bank holidays and sickness. Multiply by active months divided by twelve, round down to whole days, then subtract only additional leave and sickness, with a floor of zero. A shorter contract ends within the tax year. No renewal is assumed. Gaps and remaining idle months fall after active months. Whole paid days are spread as evenly as possible across active months.</p>
        <p>The cash ledger starts in April. Monthly receipts allocate the annual tax estimate proportionally. A delay shifts receipts for household budgeting only, leaving payroll tax timing fixed. Work costs fall when incurred and receive no tax relief. Receivables outstanding after March are shown separately. Household spending and liquid savings affect the balance, while pensions and benefits stay outside it.</p>
        <h2 id="limited-company" class="scroll-mt-24">Outside IR35 and limited company accounts</h2>
        <p>Model one UK trading company, one shareholder and one category A director in office throughout the tax year. Company figures cover 1 April 2026 to 31 March 2027. The salary and dividends entered are assumed paid in the 2026/27 personal tax year. Only enter days actually billed for a shorter engagement. The accounting period remains twelve months.</p>
        <p>Turnover excludes VAT. The model deducts allowable operating costs, gross salary, annual employer NI and an employer pension payment assumed fully deductible in the period. Employment Allowance is unavailable in this single-employee scenario. With no exempt distributions received, augmented profits equal taxable profits. Divide both Corporation Tax thresholds by the number of companies including this one. Between those limits, deduct 3/200 of the difference between the adjusted upper limit and profit from tax at the main rate.</p>
        <p>Dividends are a chosen percentage of current post-tax profit. A loss produces zero distributable profit and a funding requirement. Retained cash assumes all invoices are collected, all bills and taxes settled, and zero opening reserves. Actual dividend declarations also require sufficient distributable reserves at the payment date. The calculation excludes prior losses, investment income, capital allowances, accounting adjustments and director loans.</p>
        <p>Salary and dividends both count towards the Personal Allowance taper. Salary uses your regional bands. Dividends sit above taxable salary and use UK bands in every nation. The £500 dividend allowance occupies band capacity at a zero rate. We allocate the Personal Allowance between income types to minimise estimated tax. Director NI uses annual thresholds. The tool excludes other income, student loans, pension allowance charges, personal reliefs and in-year payroll or dividend timing. Amounts are rounded to the nearest penny, with HMRC halfpenny-down NI rounding.</p>
        <p><NuxtLink to="/contractor-intelligence/outside-ir35">Open the outside-IR35 calculator</NuxtLink></p>
        <h2>Official sources</h2>
        <ul class="list-disc space-y-2 pl-5">
          <li v-for="[title, url] in companyRules.sources" :key="url"><a :href="url">{{ title }}</a></li>
          <li v-for="source in rules.sources" :key="source.url"><a :href="source.url">{{ source.title }}</a></li>
        </ul>
        <p>Estimates are for informational purposes only. They are not personalised tax, legal or financial advice. Actual outcomes depend on your circumstances and arrangements.</p>
        <NuxtLink to="/contractor-intelligence/permanent-vs-contract">Open the employment comparison</NuxtLink>
      </div>
    </article>
  </div>
</template>
<style scoped>
.method h2 { @apply mb-3 mt-8 font-display text-3xl; }
.method p { @apply mb-4 leading-7; }
.method a { @apply text-moss underline; }
</style>
