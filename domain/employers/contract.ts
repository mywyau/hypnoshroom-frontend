export const ir35Options = ['Inside IR35', 'Outside IR35', 'Unspecified'] as const
export const disciplines = ['Backend', 'Web development', 'Data engineering', 'AI / ML', 'Hardware / embedded', 'Platform / DevOps', 'Other engineering']
export const languages = ['Scala', 'Java', 'Python', 'SQL', 'TypeScript', 'JavaScript', 'Go', 'Rust', 'C', 'C++', 'C#', 'Kotlin', 'VHDL', 'Verilog']
export type EmploymentType = 'contract' | 'permanent'

export function boardPath(type: EmploymentType) {
  return type === 'contract' ? '/contracts' : '/jobs'
}

export type ListingStatus = 'draft' | 'published' | 'closed'

export interface ContractBrief {
  employment_type: EmploymentType
  fully_remote: boolean
  discipline: string | null
  languages: string[]
  salary_gbp: number | null
  salary_max_gbp: number | null
  title: string
  location: string
  duration: string | null
  day_rate_gbp: number | null
  ir35: typeof ir35Options[number] | null
  description: string
  apply_url: string
  closes_on: string
}

export interface EmployerContract extends ContractBrief {
  id: string
  status: ListingStatus
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
  if (listing.employment_type === 'contract') return listing.day_rate_gbp ? pounds(listing.day_rate_gbp) + '/day' : 'Rate undisclosed'
  if (!listing.salary_gbp) return 'Salary undisclosed'
  const range = listing.salary_max_gbp ? '–' + pounds(listing.salary_max_gbp) : ''
  return pounds(listing.salary_gbp) + range + '/year'
}

export function workLocation(listing: ContractBrief) {
  if (!listing.fully_remote) return listing.location
  return /^(fully remote|100% remote|remote)$/i.test(listing.location.trim()) ? 'Fully remote' : 'Fully remote · ' + listing.location
}
