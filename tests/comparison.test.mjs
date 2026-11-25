import assert from 'node:assert/strict'
import test from 'node:test'
import { breakEvenDays, compare, defaults } from '../domain/contractor/comparison.ts'

// Keep the brief's acceptance fixture independent of the visitor-facing example.
const sample = { ...defaults, salary: 63000, sacrifice: 20, employerPension: 7, rate: 630,
  savings: 30000, spending: 1000, umbrellaPension: 0, umbrellaSacrifice: 0, jurisdiction: 'England', levy: true }

test('visitor example funds the permanent pension from salary sacrifice and employer contributions', () => {
  const { permanent } = compare({ ...defaults, jurisdiction: 'England', levy: true })
  assert.equal(permanent.funding, 6_000_000)
  assert.equal(permanent.sacrifice, 300_000)
  assert.equal(permanent.pension, 180_000)
  assert.equal(permanent.net, 4_361_800)
})

test('illustrative salary fixture and explicit whole-day gap convention', () => {
  const { permanent: p, umbrella: u, days } = compare(sample)
  assert.equal(days, 220)
  assert.equal(u.funding, 13_860_000)
  assert.equal(p.sacrifice, 1_260_000)
  assert.equal(p.pension, 441_000)
  assert.equal(p.taxable, 5_040_000)
  // £37,700 at 20% and £130 at 40%. Monthly NI on £4,200 is £251.50.
  assert.equal(p.tax, 759_200)
  assert.equal(p.ni, 301_800)
  assert.equal(p.net, 3_979_000)
  const gap = compare({ ...sample, gap: 2 })
  assert.equal(gap.days, 183)
  assert.equal(gap.umbrella.funding, 11_529_000)
})

test('each funding ledger reconciles at penny precision in all four jurisdictions', () => {
  for (const jurisdiction of ['England', 'Scotland', 'Wales', 'Northern Ireland']) {
    const s = { ...sample, jurisdiction, duration: 7, gap: 1, holiday: 2, sick: 3,
      delay: 8, umbrellaPension: 3.5, umbrellaSacrifice: 8, expenses: 18.25 }
    const { umbrella: u, permanent: p, flow, unpaidAtYearEnd, days } = compare(s)
    assert.equal(days, 105)
    assert.equal(u.funding, u.net + u.expenses + u.tax + u.ni + u.margin + u.levy + u.employerNI + u.pensionTotal + u.rounding)
    assert.equal(p.funding, p.net + p.tax + p.ni + p.sacrifice)
    assert.equal(u.net, flow.reduce((n, m) => n + m.received - m.expenses, unpaidAtYearEnd))
    assert.equal(flow.at(-1).balance, (s.savings - 12 * s.spending) * 100 + u.net - unpaidAtYearEnd)
    assert.equal(flow[0].received, 0)
  }
})
test('no paid work means zero costs or receipts and the full year of household spending', () => {
  const { umbrella, flow } = compare({ ...sample, gap: 12 })
  for (const [key, value] of Object.entries(umbrella)) if (key !== 'wages') assert.equal(value, 0)
  assert.equal(flow.at(-1).balance, 1_800_000)
})
test('break-even uses the first attainable whole day and reports unreachable targets', () => {
  const days = breakEvenDays(sample)
  assert.ok(days > 0 && days <= 220)
  assert.ok(compare(sample, days).difference >= 0)
  assert.ok(compare(sample, days - 1).difference < 0)
  assert.equal(breakEvenDays({ ...sample, gap: 12 }), null)
  assert.equal(breakEvenDays({ ...sample, salary: 0 }), 0)
})
test('invalid schedules, fractional days, unsupported regions and unfunded margins fail explicitly', () => {
  for (const change of [{ duration: 4, gap: 5 }, { days: 2.5 }, { salary: NaN }, { rate: -1 },
    { rate: 0, margin: 100 }, { jurisdiction: 'UK' }, { sacrifice: 101 }]) {
    assert.throws(() => compare({ ...sample, ...change }), RangeError)
  }
})
