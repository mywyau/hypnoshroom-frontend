import { BriefcaseBusiness, Calculator, Code, House, Mail, Plus, Search, Users } from '@lucide/vue'

const home = { label: 'Home', to: '/', icon: House }
const contracts = { label: 'Find contracts', short: 'Contracts', to: '/contracts', icon: Search }
const jobs = { label: 'Permanent & temporary jobs', short: 'Jobs', to: '/jobs', icon: Users }
const calculators = { label: 'Contractor calculators', short: 'Calculators', to: '/contractor-intelligence', icon: Calculator }
const employers = { label: 'Post a role', to: '/employers/post-a-role', icon: Plus }
const consultancy = { label: 'Consultancy', to: '/consultancy', icon: BriefcaseBusiness }
const services = { label: 'Services', to: '/services', icon: BriefcaseBusiness }
const expertise = { label: 'Expertise', to: '/expertise', icon: Code }
const work = { label: 'Experience', to: '/work', icon: Users }
const contact = { label: 'Discuss a project', short: 'Contact', to: '/contact', icon: Mail }
const about = { label: 'About', to: '/about' }
const insights = { label: 'Insights', to: '/insights' }
const findWork = { ...contracts, label: 'Find work', short: 'Find work' }

const sections = {
  home: {
    primary: [findWork, consultancy], action: null, more: [employers, about, contact],
    quick: [home, findWork, consultancy],
  },
  jobs: {
    primary: [contracts, jobs, calculators], action: employers, more: [],
    quick: [contracts, jobs, calculators, employers],
  },
  consultancy: {
    primary: [services, expertise, work], action: contact, more: [insights, about],
    quick: [services, expertise, work, contact],
  },
}

export function useSiteNavigation() {
  const route = useRoute()
  return computed(() => {
    const root = route.path.split('/')[1]
    if (['contracts', 'jobs', 'employers', 'contractor-intelligence'].includes(root)) return sections.jobs
    if (['consultancy', 'services', 'expertise', 'work', 'contact', 'insights', 'about', 'scala', 'java', 'typescript', 'python'].includes(root)) return sections.consultancy
    return sections.home
  })
}
