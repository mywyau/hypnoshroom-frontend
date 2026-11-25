import assert from 'node:assert/strict'
import test from 'node:test'
import { apprenticeshipLevy, employeeNI, employerNI, incomeTax, jurisdictions } from '../domain/contractor/payroll.ts'

test('whole-year allowance, basic band and additional band', () => {
  for (const nation of ['England', 'Wales', 'Northern Ireland']) {
    assert.equal(incomeTax(1_257_000, nation), 0)
    assert.equal(incomeTax(5_027_000, nation), 754_000)
    assert.equal(incomeTax(5_027_100, nation), 754_040)
    // £37,700 at 20% + £87,440 at 40% + £4,860 at 45%.
    assert.equal(incomeTax(13_000_000, nation), 4_470_300)
  }
})

test('allowance loses one whole pound per complete £2 over £100,000', () => {
  assert.equal(incomeTax(10_000_000, 'England'), 2_743_200)
  assert.equal(incomeTax(10_000_100, 'England'), 2_743_240)
  assert.equal(incomeTax(10_000_200, 'England'), 2_743_320)
  assert.equal(incomeTax(12_514_000, 'England'), 4_251_600)
})

test('Scottish Government factsheet table 2 differential in rounded pounds', () => {
  for (const [salary, difference] of [[15_000, 24], [31_136, 24], [50_000, -1496], [100_000, -3300], [130_000, -5331], [800_000, -25_431]]) {
    const delta = incomeTax(salary * 100, 'England') - incomeTax(salary * 100, 'Scotland')
    assert.equal(Math.round(delta / 100), difference)
  }
})

test('monthly category A contributions and rounding at exact halfpennies', () => {
  assert.equal(employeeNI(104_800), 0)
  assert.equal(employeeNI(418_900), 25_128)
  assert.equal(employeeNI(500_000), 26_750)
  assert.equal(employerNI(41_700), 0)
  assert.equal(employerNI(41_710), 1)
  assert.equal(employerNI(41_711), 2)
  assert.equal(employerNI(500_000), 68_745)
  assert.equal(apprenticeshipLevy(500_000), 2500)
})

test('invalid money or geography cannot silently produce a result', () => {
  for (const invalid of [-1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER]) {
    for (const fn of [employeeNI, employerNI, apprenticeshipLevy]) assert.throws(() => fn(invalid), RangeError)
    assert.throws(() => incomeTax(invalid, 'Scotland'), RangeError)
  }
  for (const nation of jurisdictions) assert.equal(incomeTax(0, nation), 0)
  assert.throws(() => incomeTax(0, 'unknown'), RangeError)
})
