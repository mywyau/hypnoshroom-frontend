import { BriefcaseBusiness, Building2, Calculator, Code, House, Mail, Plus, Search, Users } from '@lucide/vue'

const home = { label: 'Home', to: '/', icon: House }
const contracts = { label: 'Find contracts', short: 'Contracts', to: '/contracts', icon: Search }
const jobs = { label: 'Permanent & temporary jobs', short: 'Jobs', to: '/jobs', icon: Users }
const calculators = { label: 'Contractor calculators', short: 'Calculators', to: '/contractor-intelligence', icon: Calculator }
const employers = { label: 'Employers', to: '/employers', icon: Building2 }
const postRole = { label: 'Post a role', to: '/employers/post-a-role', icon: Plus }
const consultancy = { label: 'Consultancy', to: '/consultancy', icon: BriefcaseBusiness }
const services = { label: 'Services', to: '/services', icon: BriefcaseBusiness }
const expertise = { label: 'Expertise', to: '/expertise', icon: Code }
const work = { label: 'Experience', to: '/work', icon: Users }
const contact = { label: 'Discuss a project', short: 'Contact', to: '/contact', icon: Mail }
const about = { label: 'About', to: '/about' }
const insights = { label: 'Insights', to: '/insights' }
const findWork = { label: 'Find work', to: '/find-a-job', icon: Search }
const boardLinks = [contracts, jobs]

const sections = {
  contractBoard: {
    primary: boardLinks, action: import.meta.dev ? null : employers,
    quick: import.meta.dev ? boardLinks : [...boardLinks, employers],
  },
  home: {
    primary: [consultancy, calculators, employers, findWork], action: null,
    quick: [home, findWork, employers, consultancy],
  },
  jobs: {
    primary: [contracts, jobs, calculators], action: import.meta.dev ? postRole : employers,
    quick: [contracts, jobs, calculators, import.meta.dev ? postRole : employers],
  },
  consultancy: {
    primary: [about, work, expertise, insights, services], action: contact,
    quick: [services, expertise, work, contact],
  },
}

export function useSiteNavigation() {
  const route = useRoute()
  return computed(() => {
    if (route.name === 'employers') {
      return { primary: [], action: import.meta.dev ? { ...postRole, label: 'Post a job' } : null, quick: sections.jobs.quick }
    }
    if (route.name === 'contractor-intelligence') return { primary: [], action: null, quick: sections.jobs.quick }
    if (route.name === 'contracts') return sections.contractBoard
    if (route.name === 'jobs') return { ...sections.jobs, primary: boardLinks }
    if (route.name === 'find-a-job') {
      return {
        primary: boardLinks,
        action: import.meta.dev ? null : employers,
        quick: import.meta.dev ? sections.jobs.primary : sections.jobs.quick,
      }
    }
    const root = route.path.split('/')[1]
    if (['find-a-job', 'contracts', 'jobs', 'employers', 'contractor-intelligence'].includes(root)) return sections.jobs
    if (['consultancy', 'services', 'expertise', 'work', 'contact', 'insights', 'about', 'scala', 'java', 'typescript', 'python'].includes(root)) return sections.consultancy
    return sections.home
  })
}
