import { BriefcaseBusiness, Building2, Calculator, Code, House, List, ListChecks, Mail, Plus, Search, Tag, Users } from '@lucide/vue'

const home = { label: 'Home', to: '/', icon: House }
const contracts = { label: 'Find contracts', short: 'Contracts', to: '/contracts', icon: Search }
const jobs = { label: 'Permanent & temporary jobs', short: 'Jobs', to: '/jobs', icon: Users }
const calculators = { label: 'Contractor calculators', short: 'Calculators', to: '/contractor-intelligence', icon: Calculator }
const employers = { label: 'Employers', to: '/employers', icon: Building2 }
const employerHome = { ...employers, label: 'Employer home' }
const pricing = { label: 'Pricing plans', short: 'Pricing', to: '/employers/pricing', icon: Tag }
const postRole = { label: 'Post a role', to: '/employers/post-a-role', icon: Plus }
const yourListings = { label: 'Your listings', to: '/employers/listings', icon: List }
const employerWorkspace = [yourListings, postRole, pricing]
const reviewListings = { label: 'Review listings', short: 'Review', to: '/admin/listings', icon: ListChecks }
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

export function isConsultancyPath(path: string) {
  const root = path.split('/')[1]
  return ['consultancy', 'services', 'expertise', 'work', 'contact', 'insights', 'about', 'scala', 'java', 'typescript', 'python'].includes(root)
}

export function useEmployerWorkspaceLinks() {
  const user = useAccountUser()
  const route = useRoute()
  return computed(() => {
    if (!import.meta.dev || !user.value) return []
    if (route.path.split('/')[1] !== 'employers' && route.name !== 'admin-listings') return []
    return user.value.app_metadata.listing_admin === true ? [...employerWorkspace, reviewListings] : employerWorkspace
  })
}

export function useSiteNavigation() {
  const workspaceLinks = useEmployerWorkspaceLinks()
  const route = useRoute()
  return computed(() => {
    if (workspaceLinks.value.length) return { primary: [], action: null, quick: workspaceLinks.value }
    const root = route.path.split('/')[1]
    if (root === 'employers') {
      return {
        primary: route.name === 'employers' ? [] : route.name === 'employers-pricing' ? [employerHome] : [employerHome, pricing],
        action: null,
        quick: import.meta.dev ? [employerHome, pricing, postRole] : [employerHome, pricing],
      }
    }
    if (route.name === 'contractor-intelligence') return { primary: [], action: null, quick: sections.jobs.quick }
    if (route.name === 'contractor-intelligence-outside-ir35' || route.name === 'contractor-intelligence-permanent-vs-contract') {
      return { primary: [calculators], action: null, quick: sections.jobs.quick }
    }
    if (route.name === 'contracts') return sections.contractBoard
    if (route.name === 'jobs') return { ...sections.contractBoard, quick: sections.jobs.quick }
    if (route.name === 'find-a-job') {
      return {
        primary: boardLinks,
        action: import.meta.dev ? null : employers,
        quick: import.meta.dev ? sections.jobs.primary : sections.jobs.quick,
      }
    }
    if (['find-a-job', 'contracts', 'jobs', 'contractor-intelligence'].includes(root)) return sections.jobs
    if (isConsultancyPath(route.path)) return sections.consultancy
    return sections.home
  })
}
