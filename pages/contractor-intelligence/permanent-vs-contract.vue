<script setup lang="ts">
import { breakEvenDays, compare, defaults, fields, inputErrors, type Field, type Scenario } from '~/domain/contractor/comparison'
import { jurisdictions, rules } from '~/domain/contractor/payroll'

usePageSeo({ title: 'Permanent salary vs inside IR35 umbrella calculator | Hypnoshroom',
  path: '/contractor-intelligence/permanent-vs-contract',
  description: 'Compare a UK salary and an umbrella day rate over the 2026/27 tax year, including pension, unpaid gaps, employer costs and monthly cash flow.' })
const scenario = reactive<Scenario>({ ...defaults, jurisdiction: 'England', levy: true })
const errors = computed(() => inputErrors(scenario))
const groups: { title: string; help: string; keys: Field[] }[] = [
  { title: 'Permanent offer', help: 'Pension percentages apply to the full salary before sacrifice. Your scheme may use qualifying earnings. Paid leave is included in salary.', keys: ['salary', 'sacrifice', 'employerPension', 'benefits', 'paidLeave'] },
  { title: 'Contract offer and time off', help: 'Use the umbrella assignment rate excluding VAT. Allow for usual holidays in your annual paid days. Enter only extra days off below.', keys: ['rate', 'days', 'duration', 'gap', 'holiday', 'sick'] },
  { title: 'Umbrella terms', help: 'Check the margin and pension basis against your umbrella illustration. Expenses here are paid out of take-home.', keys: ['margin', 'umbrellaPension', 'umbrellaSacrifice', 'expenses'] },
  { title: 'Household cash', help: 'A delay shifts cash receipts only. Savings and essential spending affect the monthly balance.', keys: ['delay', 'savings', 'spending'] },
]
const money = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' })
const fmt = (pence: number) => money.format(pence / 100)
function evaluate(s: Scenario) {
  try { return { value: compare(s), issue: '' } }
  catch (error) { return { value: null, issue: error instanceof Error ? error.message : 'Check your assumptions.' } }
}
const evaluation = computed(() => evaluate(scenario))
const result = computed(() => evaluation.value.value)
const needed = computed(() => result.value ? breakEvenDays(scenario) : null)
const variants = computed(() => {
  const cases = [0, 1, 2, 3, 6].filter(gap => gap <= scenario.duration).map(gap => ({
    label: gap + (gap === 1 ? ' month' : ' months') + ' unpaid', value: evaluate({ ...scenario, gap }).value,
  }))
  const duration = Math.max(0, scenario.duration - 1)
  cases.push({ label: 'Ends one month early', value: evaluate({ ...scenario, duration, gap: Math.min(scenario.gap, duration) }).value })
  return cases
})
const breakdown = computed(() => {
  if (!result.value) return []
  const { permanent: p, umbrella: u } = result.value
  return [
    ['Salary / assignment income', p.funding, u.funding],
    ['Umbrella margin', null, u.margin], ['Employer NI funded by assignment', null, u.employerNI],
    ['Apprenticeship levy allocation', null, u.levy], ['Rounding balance', null, u.rounding],
    ['Additional employer pension', p.pension, u.pension], ['Salary sacrificed to pension', p.sacrifice, u.sacrifice],
    ['Gross taxable pay', p.taxable, u.taxable], ['Income tax', p.tax, u.tax], ['Employee NI', p.ni, u.ni],
    ['Unreimbursed work costs', null, u.expenses], ['Spendable cash after work costs', p.net, u.net],
    ['Total pension funding', p.pensionTotal, u.pensionTotal], ['Separate benefits valuation', Math.round(scenario.benefits * 100), null],
  ] as [string, number | null, number | null][]
})
const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']
</script>
<template>
  <div>
    <PageHero eyebrow="Contractor intelligence" title="Permanent or contract?" gradient="forest"
      intro="Compare a permanent salary with an inside IR35 offer paid through an umbrella. Follow the money from assignment income to spendable cash over one UK tax year." />
    <div class="page-shell py-10">
      <NuxtLink to="/contractor-intelligence" class="text-sm text-moss underline">Contractor intelligence</NuxtLink>
      <a href="#comparison-results" class="ml-4 text-sm text-moss underline lg:hidden">Jump to results</a>
      <div class="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(18rem,0.75fr)_minmax(0,1.6fr)]">
        <aside class="rounded-xl border border-line bg-white/50 p-5">
          <h2 class="font-display text-3xl">Your assumptions</h2>
          <p class="my-3 text-sm leading-6">Illustrative starting figures. Edit any field to update the results locally.</p>
          <p class="text-sm font-semibold">Tax year {{ rules.taxYear }} · Monthly payroll</p>
          <label for="jurisdiction" class="mt-5 block text-sm font-medium">Income tax jurisdiction</label>
          <select id="jurisdiction" v-model="scenario.jurisdiction" class="my-2 w-full rounded-md border border-ink/30 bg-white p-2">
            <option v-for="region in jurisdictions" :key="region">{{ region }}</option>
          </select>
          <details v-for="group in groups" :key="group.title" class="mt-3 border-t border-line pt-3">
            <summary class="cursor-pointer py-2 font-semibold">{{ group.title }}</summary>
            <p class="my-3 text-sm leading-6">{{ group.help }}</p>
            <div class="grid gap-4 pb-4">
              <ScenarioField v-for="key in group.keys" :key="key" v-model="scenario[key]" :name="key" :spec="fields[key]" :error="errors[key]" />
              <label v-if="group.title === 'Umbrella terms'" class="flex items-center gap-3">
                <input v-model="scenario.levy" type="checkbox"> Apply full 0.5% levy allocation
              </label>
            </div>
          </details>
        </aside>
        <section id="comparison-results" tabindex="-1" class="results min-w-0 scroll-mt-24" aria-label="Employment comparison results">
          <p v-if="!result" role="status" class="rounded-xl border border-line bg-white p-6">{{ evaluation.issue }}</p>
          <template v-else>
            <div class="rounded-xl bg-moss p-6 text-white sm:p-8">
              <p class="text-sm">Spendable cash over the tax year</p>
              <h2 aria-live="polite" aria-atomic="true" class="my-2 font-display text-4xl">{{ fmt(Math.abs(result.difference)) }} {{ result.difference >= 0 ? 'more' : 'less' }} with the contract</h2>
              <p>{{ result.days }} billed days over {{ scenario.duration - scenario.gap }} active months. Permanent pay covers all 12 months.</p>
            </div>
            <div class="mt-5 grid gap-4 sm:grid-cols-2">
              <div v-for="[label, item] in [['Permanent', result.permanent], ['Umbrella', result.umbrella]] as const" :key="label" class="rounded-lg border border-line bg-white/60 p-5">
                <h3 class="font-display text-2xl">{{ label }}</h3>
                <p class="mt-3"><strong>{{ fmt(item.net) }}</strong> cash</p>
                <p>{{ fmt(item.pensionTotal) }} into pension</p>
                <p>{{ fmt(Math.round(item.net / 12)) }} cash per month on average</p>
              </div>
            </div>
            <CashComparisonChart :flow="result.flow" :months="months" />
            <h3>What the offer buys</h3>
            <p>The permanent offer includes {{ scenario.paidLeave }} paid leave days. The umbrella model includes holiday pay in earnings and bills only days worked. Including pensions and your benefits valuation, the contract package is worth {{ fmt(Math.abs(result.packageDifference)) }} {{ result.packageDifference >= 0 ? 'more' : 'less' }}.</p>
            <p class="mt-2"><strong>Cash break-even:</strong> {{ needed === null ? 'Beyond the paid days available in this schedule.' : needed + ' billed days to match permanent spendable cash on this schedule.' }}</p>
            <details class="mt-7"><summary>Income and deductions</summary>
              <p class="my-3">At the full-year paid-day budget, assignment income would be {{ fmt(Math.round(scenario.rate * 100) * scenario.days) }}. The table uses the selected contract term and downtime.</p>
              <div class="scroll"><table><caption>Totals for the selected tax year (£)</caption><thead><tr><th>Item</th><th>Permanent</th><th>Umbrella</th></tr></thead>
                <tbody><tr v-for="[name, p, u] in breakdown" :key="name"><th scope="row">{{ name }}</th><td>{{ p === null ? '—' : fmt(p) }}</td><td>{{ u === null ? '—' : fmt(u) }}</td></tr></tbody>
              </table></div>
            </details>
            <details><summary>Time without work</summary>
              <div class="scroll"><table><caption>Alternative schedules at the same day rate</caption><thead><tr><th>Case</th><th>Billed days</th><th>Contract cash</th><th>Gain / loss vs salary</th></tr></thead>
                <tbody><tr v-for="v in variants" :key="v.label"><th scope="row">{{ v.label }}</th><template v-if="v.value"><td>{{ v.value.days }}</td><td>{{ fmt(v.value.umbrella.net) }}</td><td>{{ fmt(v.value.difference) }}</td></template><td v-else colspan="3">Income below umbrella margin</td></tr></tbody>
              </table></div>
            </details>
            <details><summary>Monthly cash flow and delayed payments</summary>
              <p class="my-3">Contract receipts lag modelled payroll by {{ scenario.delay }} months. Change the delay in Household cash to test a late payment. {{ fmt(result.unpaidAtYearEnd) }} remains to be received after March.</p>
              <div class="scroll"><table><caption>Cash received and closing liquid balance</caption><thead><tr><th>Month</th><th>Salary receipts</th><th>Contract receipts</th><th>Work costs</th><th>Contract balance after spending</th></tr></thead>
                <tbody><tr v-for="(m, i) in result.flow" :key="i"><th scope="row">{{ months[i] }}</th><td>{{ fmt(m.permanent) }}</td><td>{{ fmt(m.received) }}</td><td>{{ fmt(m.expenses) }}</td><td>{{ fmt(m.balance) }}</td></tr></tbody>
              </table></div>
            </details>
          </template>
          <p class="mt-6 text-sm leading-6">Estimates for informational purposes only. Actual outcomes depend on your arrangements. Assumes standard allowance, employment income only and category A NI. Excludes student loans and individual tax codes. This is not personalised tax, legal or financial advice.</p>
          <p class="my-3"><NuxtLink class="text-moss underline" to="/contractor-intelligence/outside-ir35">Considering an outside-IR35 offer? Model your limited company</NuxtLink></p>
          <NuxtLink class="text-moss underline" to="/contractor-intelligence/methodology">Calculation methodology, exclusions and official sources</NuxtLink>
        </section>
      </div>
    </div>
  </div>
</template>
<style scoped>
.results > h3 { @apply mb-2 mt-7 font-display text-3xl; }
.results details { @apply mt-5 border-t border-line pt-3; }
.results summary { @apply cursor-pointer py-2 font-display text-2xl; }
.scroll { @apply max-w-full overflow-x-auto; }
table { @apply w-full border-collapse text-sm tabular-nums; }
caption { @apply py-3 text-left font-medium; }
th, td { @apply border-b border-line px-2 py-3 text-right; }
th:first-child { @apply pl-0 text-left; }
tbody th { @apply font-normal; }
</style>
