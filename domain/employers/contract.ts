export const advertisedIr35Options = [
  'Inside IR35', 'Outside IR35', 'PAYE or umbrella only', 'Small private or voluntary client – intermediary decides',
] as const
// Existing listings can still be found by their original advertised status.
export const ir35Options = [...advertisedIr35Options, 'Unspecified'] as const
export const disciplines = ['Backend', 'Web development', 'Data engineering', 'AI / ML', 'Hardware / embedded', 'Platform / DevOps', 'Other engineering']
export const languages = ['Scala', 'Java', 'Python', 'SQL', 'TypeScript', 'JavaScript', 'Go', 'Rust', 'C', 'C++', 'C#', 'Kotlin', 'VHDL', 'Verilog']
export const languageChoices = [...languages, 'Other']
export const employmentLabels = {
  contract: 'Contract',
  permanent: 'Permanent, full-time',
  temporary: 'Temporary, fixed-term',
} as const
export type EmploymentType = keyof typeof employmentLabels
export type BoardType = 'contract' | 'jobs'

export function boardPath(type: EmploymentType | BoardType) {
  return type === 'contract' ? '/contracts' : '/jobs'
}

export type ListingStatus = 'draft' | 'pending' | 'published' | 'closed'

export interface ContractBrief {
  employment_type: EmploymentType
  fully_remote: boolean
  discipline: string | null
  languages: string[]
  other_language: string | null
  salary_gbp: number | null
  salary_max_gbp: number | null
  title: string
  location: string
  duration: string | null
  day_rate_gbp: number | null
  ir35: typeof ir35Options[number] | null
  description: string
  apply_url: string | null
  closes_on: string
}

export interface EmployerContract extends ContractBrief {
  id: string
  status: ListingStatus
  company_name: string | null
}

export interface StoredEmployerContract extends EmployerContract {
  revision: string
}

export interface PublicContract extends ContractBrief {
  id: string
  company_name: string
}

export function londonDate(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(date)
}

export function advertisedPay(listing: ContractBrief) {
  const pounds = (value: number) => '£' + value.toLocaleString('en-GB')
  if (listing.employment_type === 'contract') return listing.day_rate_gbp ? pounds(listing.day_rate_gbp) + '/day' : 'Day rate unspecified'
  if (!listing.salary_gbp) return 'Salary undisclosed'
  const range = listing.salary_max_gbp && listing.salary_max_gbp !== listing.salary_gbp ? '–' + pounds(listing.salary_max_gbp) : ''
  return pounds(listing.salary_gbp) + range + '/year'
}

export function workLocation(listing: ContractBrief) {
  if (!listing.fully_remote) return listing.location
  return /^(fully remote|100% remote|remote)$/i.test(listing.location.trim()) ? 'Fully remote' : 'Fully remote · ' + listing.location
}
