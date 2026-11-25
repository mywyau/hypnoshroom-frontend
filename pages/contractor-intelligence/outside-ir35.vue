<script setup lang="ts">
import { ChevronDown } from '@lucide/vue'
import { companyDefaults, companyErrors, companyFields, limitedCompany, type CompanyField, type CompanyInputs } from '~/domain/contractor/limitedCompany'
import { defaults, fields, inputErrors, permanentEmployment } from '~/domain/contractor/comparison'
import { jurisdictions } from '~/domain/contractor/payroll'

usePageSeo({ title: 'Outside IR35 limited company calculator | Hypnoshroom', path: '/contractor-intelligence/outside-ir35',
  description: 'Estimate UK director salary, dividends, pension and retained company cash for an outside-IR35 contract. Compare your personal take-home with permanent employment.' })
const inputs = reactive<CompanyInputs>({ ...companyDefaults, jurisdiction: 'England' })
const keys = Object.keys(companyFields) as CompanyField[]
const errors = computed(() => companyErrors(inputs))
const result = computed(() => Object.keys(errors.value).length ? null : limitedCompany(inputs))
const employment = reactive({ salary: defaults.salary, sacrifice: defaults.sacrifice, employerPension: defaults.employerPension })
const employmentKeys = ['salary', 'sacrifice', 'employerPension'] as const
const employeeErrors = computed(() => inputErrors({ ...defaults, ...employment, jurisdiction: inputs.jurisdiction, levy: false }))
const employee = computed(() => Object.keys(employeeErrors.value).length ? null : permanentEmployment({ ...employment, jurisdiction: inputs.jurisdiction }))
const cashSeries = computed(() => result.value && employee.value ? [
  { label: 'Permanent employment', cash: employee.value.net, pension: employee.value.pensionTotal },
  { label: 'Outside IR35', cash: result.value.takeHome, pension: result.value.pension },
] : [])
const scale = computed(() => Math.max(1, ...cashSeries.value.map(item => item.cash)))
const currency = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' })
const fmt = (pence: number) => currency.format(pence / 100)
const ledgers = computed(() => {
  const r = result.value
  if (!r) return []
  return [
    { title: 'Company accounts', lines: [
      ['Turnover excluding VAT', r.turnover], ['Allowable operating expenses', r.expenses], ['Director salary', r.salary],
      ['Employer National Insurance', r.employerNI], ['Employer pension', r.pension], ['Trading profit / loss', r.profit],
      ['Corporation Tax after any marginal relief', r.companyTax], ['Distributable profit', r.distributable],
      ['Dividend paid', r.dividends], ['Retained after dividends', r.retained],
    ] },
    { title: 'Director’s personal income', lines: [
      ['Gross salary', r.salary], ['Dividend received', r.dividends], ['Salary income tax', r.salaryTax],
      ['Dividend tax', r.dividendTax], ['Employee National Insurance', r.employeeNI], ['Annual personal take-home', r.takeHome],
    ] },
  ] as { title: string; lines: [string, number][] }[]
})
</script>
<template>
  <div>
    <PageHero eyebrow="Contractor intelligence · 2026/27" title="Outside IR35: what can you take home?" gradient="forest"
      intro="Model an offer through your own limited company. Set your salary and dividend payout to see your personal income, pension funding and the cash available for future contracts." />
    <div class="page-shell py-10">
      <NuxtLink class="text-moss underline" to="/contractor-intelligence">Contractor intelligence</NuxtLink>
      <a href="#company-results" class="ml-4 text-moss underline lg:hidden">Jump to results</a>
      <div class="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(18rem,0.75fr)_minmax(0,1.6fr)]">
        <aside class="grid gap-4 rounded-xl border border-line bg-white/50 p-5">
          <h2 class="font-display text-3xl">Your company</h2>
          <p class="text-sm leading-6">Illustrative figures for one director and shareholder. Enter actual billed days after holidays, sickness and gaps.</p>
          <label for="nation" class="text-sm font-medium">Personal tax jurisdiction</label>
          <div class="relative">
            <select id="nation" v-model="inputs.jurisdiction" class="w-full appearance-none rounded-md border border-ink/30 bg-white py-2 pl-3 pr-10">
              <option v-for="region in jurisdictions" :key="region">{{ region }}</option>
            </select>
            <ChevronDown aria-hidden="true" class="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2" />
          </div>
          <ScenarioField v-for="key in keys" :key="key" v-model="inputs[key]" :name="key" :spec="companyFields[key]" :error="errors[key]" />
          <details class="border-t border-line pt-3">
            <summary class="cursor-pointer font-semibold">Permanent offer for comparison</summary>
            <div class="mt-4 grid gap-4"><ScenarioField v-for="key in employmentKeys" :key="key" v-model="employment[key]" :name="'permanent-' + key" :spec="fields[key]" :error="employeeErrors[key]" /></div>
          </details>
        </aside>
        <section id="company-results" tabindex="-1" class="min-w-0 scroll-mt-24" aria-label="Outside IR35 results">
          <p v-if="!result" role="status">Check the highlighted assumptions to see the results.</p>
          <template v-else>
            <div v-if="result.fundingGap" role="status" class="mb-4 rounded border border-clay p-4">
              Company costs exceed turnover by <strong>{{ fmt(result.fundingGap) }}</strong>. The salary and pension shown require additional funding. No dividend is available.
            </div>
            <div class="rounded-xl bg-moss p-6 text-white">
              <h2 class="text-base">Director’s annual take-home</h2>
              <p class="my-2 font-display text-4xl">{{ fmt(result.takeHome) }}</p>
              <p>{{ fmt(Math.round(result.takeHome / 12)) }} monthly average after personal tax and NI. Dividend payment dates can vary.</p>
            </div>
            <div class="my-5 grid gap-4 sm:grid-cols-2">
              <div class="rounded-xl border border-line p-5"><h3>Retained company cash</h3><strong class="text-xl">{{ fmt(result.retained) }}</strong></div>
              <div class="rounded-xl border border-line p-5"><h3>Employer pension funding</h3><strong class="text-xl">{{ fmt(result.pension) }}</strong></div>
            </div>
            <figure v-if="employee" class="my-6 rounded-xl border border-line bg-white/60 p-5">
              <figcaption class="font-display text-2xl">Annual spendable cash</figcaption>
              <div v-for="item in cashSeries" :key="item.label" class="mt-4">
                <p class="flex flex-wrap justify-between gap-2"><span>{{ item.label }}</span><strong>{{ fmt(item.cash) }}</strong></p>
                <div class="my-1 h-2 rounded bg-paper" aria-hidden="true"><div class="h-full rounded" :class="item.label === 'Outside IR35' ? 'bg-moss' : 'bg-plum'" :style="{ width: (100 * item.cash / scale) + '%' }" /></div>
                <p class="text-sm">{{ fmt(item.pension) }} separately into pension</p>
              </div>
            </figure>
            <section v-for="ledger in ledgers" :key="ledger.title" class="my-8">
              <h3 class="mb-2 font-display text-2xl">{{ ledger.title }}</h3>
              <dl><div v-for="[label, value] in ledger.lines" :key="label" class="flex justify-between gap-3 border-b border-line py-2 text-sm">
                <dt>{{ label }}</dt><dd class="text-right tabular-nums">{{ fmt(value) }}</dd>
              </div></dl>
            </section>
          </template>
          <p class="my-3 text-sm leading-6">Assumes an outside-IR35 engagement, a full-year UK trading company, a full-year director, and salary and dividends as your only personal income. Estimates are for information only. Actual outcomes depend on your arrangements. This tool cannot determine employment status or provide personalised tax, legal or financial advice.</p>
          <NuxtLink class="text-moss underline" to="/contractor-intelligence/methodology#limited-company">Read the limited company assumptions and official sources</NuxtLink>
        </section>
      </div>
    </div>
  </div>
</template>
