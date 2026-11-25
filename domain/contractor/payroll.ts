/** All amounts are integer pence. This rule set covers employment income only. */
export const jurisdictions = ['England', 'Wales', 'Scotland', 'Northern Ireland'] as const
export type Jurisdiction = typeof jurisdictions[number]

export const sources = [
  { title: 'HMRC employer rates and thresholds for 2026/27', url: 'https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027' },
  { title: 'HMRC umbrella assignment rates and gross pay', url: 'https://www.gov.uk/guidance/working-through-an-umbrella-company' },
  { title: 'HMRC salary sacrifice and pension guidance', url: 'https://www.gov.uk/guidance/salary-sacrifice-and-the-effects-on-paye' },
  { title: 'HMRC deemed employer responsibilities', url: 'https://www.gov.uk/guidance/fee-payer-responsibilities-under-the-off-payroll-working-rules' },
  { title: 'UK Income Tax rates and Personal Allowance', url: 'https://www.gov.uk/income-tax-rates' },
  { title: 'Scottish Government rates and worked comparisons', url: 'https://www.gov.scot/publications/scottish-income-tax-technical-factsheet/' },
  { title: 'Welsh Government final budget decisions', url: 'https://www.gov.wales/cabinet-meeting-12-january-2026-html' },
  { title: 'Income Tax Act 2007, section 35 (allowance rounding)', url: 'https://www.legislation.gov.uk/ukpga/2007/3/section/35' },
  { title: 'HMRC employer guidance for PAYE and NIC rounding', url: 'https://www.gov.uk/government/publications/cwg2-further-guide-to-paye-and-national-insurance-contributions/2026-to-2027-employer-further-guide-to-paye-and-national-insurance-contributions' },
] as const

type TaxBand = readonly [upperLimitPence: number, percentage: number]
const mainBands: readonly TaxBand[] = [[3_770_000, 20], [12_514_000, 40], [Infinity, 45]]
const scottishBands: readonly TaxBand[] = [
  [396_700, 19], [1_695_600, 20], [3_109_200, 21],
  [6_243_000, 42], [12_514_000, 45], [Infinity, 48],
]

export const rules = {
  taxYear: '2026/27',
  effectiveFrom: '2026-04-06',
  effectiveTo: '2027-04-05',
  verifiedOn: '2026-11-25',
  sources,
  personalAllowance: 1_257_000,
  taperStart: 10_000_000,
  bands: { England: mainBands, Wales: mainBands, Scotland: scottishBands, 'Northern Ireland': mainBands },
  monthlyNI: {
    primary: 104_800, upper: 418_900, secondary: 41_700,
    employeeMainPercent: 8, employeeUpperPercent: 2, employerPercent: 15,
  },
  levyBasisPoints: 50,
} as const

function checkPay(pence: number) {
  // Keep all intermediate percentage products exactly representable.
  if (!Number.isSafeInteger(pence) || pence < 0 || pence > 1_000_000_000_000) {
    throw new RangeError('Pay must be a non-negative whole number of pence within the calculation range.')
  }
}

/** Estimate for the whole tax year, with post-sacrifice pay as the only adjusted net income. */
export function incomeTax(annualPayPence: number, jurisdiction: Jurisdiction): number {
  checkPay(annualPayPence)
  if (!jurisdictions.includes(jurisdiction)) throw new RangeError('Unsupported income tax jurisdiction.')
  return earnedIncomeTax(Math.max(0, annualPayPence - personalAllowance(annualPayPence)), jurisdiction)
}

export function personalAllowance(adjustedIncome: number) {
  checkPay(adjustedIncome)
  const reduction = Math.floor(Math.max(0, adjustedIncome - rules.taperStart) / 200) * 100
  return Math.max(0, rules.personalAllowance - reduction)
}

export function earnedIncomeTax(taxable: number, jurisdiction: Jurisdiction) {
  let lower = 0
  let taxHundredthsOfPenny = 0
  for (const [upper, percent] of rules.bands[jurisdiction]) {
    taxHundredthsOfPenny += (Math.min(taxable, upper) - lower) * percent
    if (taxable <= upper) break
    lower = upper
  }
  return Math.floor((taxHundredthsOfPenny + 50) / 100)
}

/** HMRC exact percentage method rounds an exact halfpenny down. */
export const roundNI = (hundredthsOfPenny: number) => Math.floor((hundredthsOfPenny + 49) / 100)

export function employeeNI(monthlyPence: number): number {
  checkPay(monthlyPence)
  const ni = rules.monthlyNI
  const mainBand = Math.max(0, Math.min(monthlyPence, ni.upper) - ni.primary)
  const upperBand = Math.max(0, monthlyPence - ni.upper)
  return roundNI(mainBand * ni.employeeMainPercent + upperBand * ni.employeeUpperPercent)
}

export function employerNI(monthlyPence: number): number {
  checkPay(monthlyPence)
  const ni = rules.monthlyNI
  return roundNI(Math.max(0, monthlyPence - ni.secondary) * ni.employerPercent)
}

/** Illustrative individual allocation where the umbrella passes through the full marginal levy. */
export function apprenticeshipLevy(monthlyPence: number): number {
  checkPay(monthlyPence)
  return Math.floor((monthlyPence * rules.levyBasisPoints + 5_000) / 10_000)
}
