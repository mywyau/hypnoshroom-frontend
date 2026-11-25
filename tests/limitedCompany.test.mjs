import test from 'node:test'
import assert from 'node:assert/strict'
import { companyDefaults, limitedCompany, corporationTax, personalTaxes } from '../domain/contractor/limitedCompany.ts'

const base = { ...companyDefaults, jurisdiction: 'England' }

test('Corporation Tax thresholds, relief and related companies', () => {
  assert.equal(corporationTax(-100, 0), 0)
  assert.equal(corporationTax(5_000_000, 0), 950_000)
  // £100k x 25% less £150k x 3/200.
  assert.equal(corporationTax(10_000_000, 0), 2_275_000)
  assert.equal(corporationTax(25_000_000, 0), 6_250_000)
  assert.equal(corporationTax(5_000_000, 1), 1_137_500)
})

test('HMRC 2026/27 worked example: £29,570 wages and £3,000 dividends', () => {
  const tax = personalTaxes(2_957_000, 300_000, 'England')
  assert.equal(tax.salaryTax, 340_000)
  assert.equal(tax.dividendTax, 26_875)
})

test('allowances, dividend stacking and taper apply to combined income', () => {
  assert.equal(personalTaxes(0, 1_307_000, 'England').totalTax, 0)
  // Allocate £270 of PA to dividends so salary fills the basic band.
  // Remaining dividends: £500 at nil and £230 at 35.75%.
  assert.deepEqual(personalTaxes(5_000_000, 100_000, 'England'), { salaryTax: 754000, dividendTax: 8223, totalTax: 762223 })
  // No personal allowance. £500 at nil, £37,200 basic, £87,440 higher, £4,860 additional.
  assert.equal(personalTaxes(0, 13_000_000, 'Scotland').dividendTax,
    37200 * 10.75 + 87440 * 35.75 + 4860 * 39.35)
  assert.ok(personalTaxes(6_000_000, 100_000, 'Scotland').salaryTax > personalTaxes(6_000_000, 100_000, 'Wales').salaryTax)
})

test('director annual NI and personal/company ledgers reconcile independently', () => {
  const r = limitedCompany({ ...base, directorSalary: 60000 })
  assert.equal(r.employerNI, 825_000)
  assert.equal(r.employeeNI, 321_060)
  assert.equal(r.turnover, r.expenses + r.salary + r.employerNI + r.pension + r.companyTax + r.retained + r.dividends)
  assert.equal(r.takeHome, r.salary + r.dividends - r.employeeNI - r.salaryTax - r.dividendTax)
  const retained = limitedCompany({ ...base, dividendShare: 0 })
  assert.equal(retained.dividends, 0)
  assert.equal(retained.retained, retained.distributable)
  assert.ok(retained.takeHome <= retained.salary)
})

test('short engagement and unfunded salaries never generate dividends from a loss', () => {
  const short = limitedCompany({ ...base, paidDays: 36 })
  assert.equal(short.turnover, 1_800_000)
  assert.ok(short.fundingGap > 0)
  const zero = limitedCompany({ ...base, paidDays: 0 })
  for (const key of ['turnover', 'dividends', 'distributable', 'companyTax', 'retained']) assert.equal(zero[key], 0)
  assert.equal(zero.fundingGap, -zero.profit)
  for (const change of [{ paidDays: NaN }, { associated: 0.5 }, { dividendShare: 101 }, { jurisdiction: 'UK' }]) {
    assert.throws(() => limitedCompany({ ...base, ...change }), RangeError)
  }
})
