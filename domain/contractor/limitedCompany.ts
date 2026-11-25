import { earnedIncomeTax, jurisdictions, personalAllowance, roundNI, rules, type Jurisdiction } from './payroll.ts'

export const companyRules = {
  year: '2026/27', verifiedOn: '2026-11-25',
  accountingFrom: '2026-04-01', accountingTo: '2027-03-31',
  lower: 5_000_000, upper: 25_000_000, smallPercent: 19, mainPercent: 25,
  reliefNumerator: 3, reliefDenominator: 200,
  directorNI: { primary: 1_257_000, upper: 5_027_000, secondary: 500_000 },
  dividendAllowance: 50_000, dividendRatesBps: [1075, 3575, 3935],
  sources: [
    ['Corporation Tax rates and standard fraction', 'https://www.gov.uk/government/publications/rates-and-allowances-corporation-tax/rates-and-allowances-corporation-tax'],
    ['Marginal Relief and associated companies', 'https://www.gov.uk/guidance/corporation-tax-marginal-relief'],
    ['National Insurance for directors', 'https://www.gov.uk/employee-directors'],
    ['Single-director companies and Employment Allowance', 'https://www.gov.uk/government/publications/employment-allowance-more-detailed-guidance/single-director-companies-and-employment-allowance-further-employer-guidance'],
    ['Dividend tax rates and worked example', 'https://www.gov.uk/tax-on-dividends'],
    ['Adjusted net income', 'https://www.gov.uk/guidance/adjusted-net-income'],
    ['Personal allowance allocation', 'https://www.legislation.gov.uk/ukpga/2007/3/section/25'],
    ['Taking money out of a company', 'https://www.gov.uk/running-a-limited-company/taking-money-out-of-a-limited-company'],
    ['Employer pension contributions', 'https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim46035'],
  ],
} as const

export const companyDefaults = {
  dayRate: 500, paidDays: 220, businessExpenses: 4000, directorSalary: 18000,
  employerPension: 3000, dividendShare: 75, associated: 0,
}
export type CompanyField = keyof typeof companyDefaults
export type CompanyInputs = typeof companyDefaults & { jurisdiction: Jurisdiction }
export const companyFields: Record<CompanyField, [string, number, number]> = {
  dayRate: ['Day rate excluding VAT (£)', 10000, 0.01],
  paidDays: ['Days billed in the year', 365, 1],
  businessExpenses: ['Other allowable business expenses (£)', 10000000, 0.01],
  directorSalary: ['Gross annual director salary (£)', 10000000, 0.01],
  employerPension: ['Company pension contribution (£)', 1000000, 0.01],
  dividendShare: ['Post-tax profit paid as dividends (%)', 100, 0.01],
  associated: ['Other associated companies', 100, 1],
}
export function companyErrors(s: CompanyInputs) {
  const errors: Partial<Record<CompanyField | 'jurisdiction', string>> = {}
  for (const key of Object.keys(companyFields) as CompanyField[]) {
    const [, max, step] = companyFields[key]
    const n = s[key]
    if (!Number.isFinite(n) || n < 0 || n > max || Math.abs(n / step - Math.round(n / step)) > 0.000001) {
      errors[key] = 'Enter ' + (step === 1 ? 'a whole number' : 'an amount with up to two decimal places') + ' from 0 to ' + max + '.'
    }
  }
  if (!jurisdictions.includes(s.jurisdiction)) errors.jurisdiction = 'Choose your UK income tax jurisdiction.'
  return errors
}

// With no distributions received, augmented profits equal taxable trading profit.
export function corporationTax(profit: number, associated: number) {
  const r = companyRules
  const companies = associated + 1
  if (profit <= 0) return 0
  if (profit * companies <= r.lower) return Math.round(profit * r.smallPercent / 100)
  if (profit * companies >= r.upper) return Math.round(profit * r.mainPercent / 100)
  const relief = (r.upper - profit * companies) * r.reliefNumerator / (companies * r.reliefDenominator)
  return Math.round(profit * r.mainPercent / 100 - relief)
}

export function personalTaxes(salary: number, dividends: number, nation: Jurisdiction) {
  const allowance = personalAllowance(salary + dividends)
  const total = Math.max(0, salary + dividends - allowance)
  const low = Math.max(0, salary - allowance)
  const high = Math.min(salary, total)
  const nilBand = companyRules.dividendAllowance
  // Liability is piecewise linear. Check each band transition to allocate the
  // Personal Allowance beneficially between earned income and dividends.
  const candidates = [low, high, total - nilBand, ...rules.bands[nation].map(([end]) => end),
    ...rules.bands.England.map(([end]) => end - nilBand)]
  function at(taxableSalary: number) {
    const salaryTax = earnedIncomeTax(taxableSalary, nation)
    let lower = taxableSalary + nilBand
    let taxUnits = 0
    for (const [i, [upper]] of rules.bands.England.entries()) {
      taxUnits += Math.max(0, Math.min(total, upper) - lower) * companyRules.dividendRatesBps[i]
      lower = Math.max(lower, upper)
    }
    const dividendTax = Math.round(taxUnits / 10000)
    return { salaryTax, dividendTax, totalTax: salaryTax + dividendTax }
  }
  let best = at(low)
  for (const value of candidates) {
    if (value < low || value > high) continue
    const choice = at(value)
    if (choice.totalTax < best.totalTax) best = choice
  }
  return best
}

export function limitedCompany(s: CompanyInputs) {
  const errors = Object.values(companyErrors(s))
  if (errors.length) throw new RangeError(errors[0])
  const pence = (pounds: number) => Math.round(pounds * 100)
  const turnover = pence(s.dayRate) * s.paidDays
  const salary = pence(s.directorSalary)
  const pension = pence(s.employerPension)
  const expenses = pence(s.businessExpenses)
  const { primary, upper, secondary } = companyRules.directorNI
  const rates = rules.monthlyNI
  const employerNI = roundNI(Math.max(0, salary - secondary) * rates.employerPercent)
  const employeeNI = roundNI(Math.max(0, Math.min(salary, upper) - primary) * rates.employeeMainPercent
    + Math.max(0, salary - upper) * rates.employeeUpperPercent)
  const profit = turnover - expenses - salary - employerNI - pension
  const companyTax = corporationTax(profit, s.associated)
  const distributable = Math.max(0, profit - companyTax)
  const dividends = Math.round(distributable * Math.round(s.dividendShare * 100) / 10000)
  const retained = distributable - dividends
  const fundingGap = Math.max(0, -profit)
  const { salaryTax, dividendTax } = personalTaxes(salary, dividends, s.jurisdiction)
  const takeHome = salary + dividends - salaryTax - dividendTax - employeeNI
  return { turnover, expenses, salary, employerNI, pension, profit, companyTax, distributable, dividends,
    retained, fundingGap, salaryTax, dividendTax, employeeNI, takeHome }
}
