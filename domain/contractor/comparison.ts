import { apprenticeshipLevy, employeeNI, employerNI, incomeTax, jurisdictions, type Jurisdiction } from './payroll.ts'

// User-facing amounts are pounds. All ledger entries and returned amounts are pence.
export const defaults = {
  salary: 60000, sacrifice: 5, employerPension: 3, benefits: 0, paidLeave: 28,
  rate: 500, days: 220, duration: 12, gap: 0, holiday: 0, sick: 0,
  margin: 100, umbrellaPension: 3, umbrellaSacrifice: 5, expenses: 0,
  delay: 0, savings: 10000, spending: 1500,
}
export type Field = keyof typeof defaults
export type Scenario = typeof defaults & { jurisdiction: Jurisdiction; levy: boolean }

type InputSpec = [label: string, max: number, step: number]
export const fields: Record<Field, InputSpec> = {
  salary: ['Annual salary (£)', 10000000, 0.01],
  sacrifice: ['Salary sacrificed to pension (%)', 100, 0.01],
  employerPension: ['Employer pension (% of original salary)', 100, 0.01],
  benefits: ['Annual personal value of benefits (£)', 1000000, 0.01],
  paidLeave: ['Paid leave in salary package (days)', 365, 1],
  rate: ['Umbrella assignment rate (£/day)', 10000, 0.01],
  days: ['Annual paid-day budget after usual leave', 365, 1],
  duration: ['Agreed contract length (months)', 12, 1],
  gap: ['Unpaid months within agreed term', 12, 1],
  holiday: ['Extra holiday during active term (days)', 365, 1],
  sick: ['Extra sickness during active term (days)', 365, 1],
  margin: ['Umbrella margin per paid month (£)', 10000, 0.01],
  umbrellaPension: ['Umbrella employer pension (% of reference pay)', 100, 0.01],
  umbrellaSacrifice: ['Umbrella salary sacrificed to pension (%)', 100, 0.01],
  expenses: ['Unreimbursed costs per billed day (£)', 10000, 0.01],
  delay: ['Delay to cash receipt (months)', 12, 1],
  savings: ['Opening accessible savings (£)', 10000000, 0.01],
  spending: ['Monthly essential spending (£)', 1000000, 0.01],
}
export function inputErrors(s: Scenario) {
  const errors: Partial<Record<Field | 'jurisdiction' | 'levy', string>> = {}
  for (const key of Object.keys(fields) as Field[]) {
    const [, max, step] = fields[key]
    const v = s[key]
    if (!Number.isFinite(v) || v < 0 || v > max || Math.abs(v / step - Math.round(v / step)) > 0.000001) {
      errors[key] = 'Enter ' + (step === 1 ? 'a whole number' : 'an amount with up to two decimal places') + ' from 0 to ' + max + '.'
    }
  }
  if (s.gap > s.duration) errors.gap = 'Gap cannot exceed the agreed term.'
  if (!jurisdictions.includes(s.jurisdiction)) errors.jurisdiction = 'Choose a supported tax jurisdiction.'
  if (typeof s.levy !== 'boolean') errors.levy = 'Select whether the levy applies.'
  return errors
}
const pence = (pounds: number) => Math.round(pounds * 100)
const portion = (amount: number, percent: number) => Math.round(amount * Math.round(percent * 100) / 10000)
const sum = (values: number[]) => values.reduce((a, b) => a + b, 0)
// Cumulative apportionment conserves the exact annual total.
const share = (total: number, periods: number, i: number) =>
  Math.round(total * (i + 1) / periods) - Math.round(total * i / periods)

function emptyMonth() {
  return { funding: 0, taxable: 0, sacrifice: 0, pension: 0, margin: 0, employerNI: 0,
    levy: 0, rounding: 0, expenses: 0, ni: 0 }
}
type Month = ReturnType<typeof emptyMonth>

function umbrellaMonth(s: Scenario, days: number): Month {
  const m = emptyMonth()
  if (!days) return m
  m.funding = pence(s.rate) * days
  m.margin = pence(s.margin)
  const available = m.funding - m.margin
  if (available < 0) throw new RangeError('Assignment income cannot cover the umbrella margin in a paid month.')
  function costs(reference: number) {
    const sacrifice = portion(reference, s.umbrellaSacrifice)
    const taxable = reference - sacrifice
    const pension = portion(reference, s.umbrellaPension)
    const erNI = employerNI(taxable)
    const levy = s.levy ? apprenticeshipLevy(taxable) : 0
    return { taxable, sacrifice, pension, employerNI: erNI, levy, total: reference + pension + erNI + levy }
  }
  // Largest whole penny of reference salary the assignment can fund.
  let low = 0, high = available
  while (low < high) {
    const mid = Math.ceil((high + low) / 2)
    if (costs(mid).total <= available) low = mid
    else high = mid - 1
  }
  const { total, ...pay } = costs(low)
  return { ...m, ...pay, rounding: available - total, ni: employeeNI(pay.taxable), expenses: pence(s.expenses) * days }
}

function settle(months: Month[], jurisdiction: Jurisdiction) {
  const totals = emptyMonth()
  for (const m of months) for (const key of Object.keys(totals) as (keyof Month)[]) totals[key] += m[key]
  const tax = incomeTax(totals.taxable, jurisdiction)
  let cumulative = 0, allocated = 0
  const wages = months.map(m => {
    cumulative += m.taxable
    const due = totals.taxable ? Number((BigInt(tax) * BigInt(cumulative) + BigInt(Math.floor(totals.taxable / 2))) / BigInt(totals.taxable)) : 0
    const received = m.taxable - m.ni - (due - allocated)
    allocated = due
    return received
  })
  return { ...totals, tax, wages, net: sum(wages) - totals.expenses, pensionTotal: totals.pension + totals.sacrifice }
}
export function permanentEmployment(s: Pick<Scenario, 'salary' | 'sacrifice' | 'employerPension' | 'jurisdiction'>) {
  const permMonths = Array.from({ length: 12 }, (_, i) => {
    const m = emptyMonth()
    m.funding = share(pence(s.salary), 12, i)
    m.sacrifice = portion(m.funding, s.sacrifice)
    m.pension = portion(m.funding, s.employerPension)
    m.taxable = m.funding - m.sacrifice
    m.ni = employeeNI(m.taxable)
    return m
  })
  return settle(permMonths, s.jurisdiction)
}

export function compare(s: Scenario, overrideDays?: number) {
  const errors = Object.values(inputErrors(s))
  if (errors.length) throw new RangeError(errors[0])
  const active = s.duration - s.gap
  const capacity = Math.max(0, Math.floor(s.days * active / 12) - s.holiday - s.sick)
  const days = overrideDays ?? capacity
  if (!Number.isInteger(days) || days < 0 || days > capacity) throw new RangeError('Paid days exceed the selected schedule.')
  const umbrellaMonths = Array.from({ length: 12 }, (_, i) => umbrellaMonth(s, i < active ? share(days, active, i) : 0))
  const permanent = permanentEmployment(s)
  const umbrella = settle(umbrellaMonths, s.jurisdiction)
  let balance = pence(s.savings)
  const flow = umbrellaMonths.map((m, i) => {
    const received = umbrella.wages[i - s.delay] ?? 0
    balance += received - m.expenses - pence(s.spending)
    return { received, expenses: m.expenses, balance, permanent: permanent.wages[i] }
  })
  const difference = umbrella.net - permanent.net
  return { days, permanent, umbrella, difference, flow,
    packageDifference: difference + umbrella.pensionTotal - permanent.pensionTotal - pence(s.benefits),
    unpaidAtYearEnd: sum(umbrella.wages) - sum(flow.map(m => m.received)) }
}

export function breakEvenDays(s: Scenario) {
  const full = compare(s)
  // Whole-day search handles discrete month-to-month margin and NI changes.
  for (let days = 0; days <= full.days; days++) {
    try {
      if (compare(s, days).difference >= 0) return days
    } catch (error) {
      if (!(error instanceof RangeError)) throw error
      // Low-volume months can be too small to fund the fixed umbrella fee.
    }
  }
  return null
}
