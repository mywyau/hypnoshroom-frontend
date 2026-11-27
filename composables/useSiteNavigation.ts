import { BookOpen, BriefcaseBusiness, Building2, Calculator, Code, House, Info, List, ListChecks, Mail, Plus, Search, Tag, Users } from '@lucide/vue'

const home = { label: 'Home', to: '/', icon: House }
const contracts = { label: 'Find contracts', short: 'Contracts', to: '/contracts', icon: Search }
const jobs = { label: 'Permanent & temporary jobs', short: 'Jobs', to: '/jobs', icon: Users }
const calculators = { label: 'Contractor calculators', short: 'Calculators', to: '/contractor-intelligence', icon: Calculator }
const employers = { label: 'Employers', to: '/employers', icon: Building2 }
const employerHome = { ...employers, label: 'Employer home' }
const pricing = { label: 'Pricing plans', short: 'Pricing', to: '/employers/pricing', icon: Tag }
const postRole = { label: 'Post a role', to: '/employers/post-a-role', icon: Plus }
const yourListings = { label: 'Your listings', to: '/employers/listings', icon: List }
const employerWorkspace = [employerHome, yourListings, postRole, pricing]
const reviewListings = { label: 'Review listings', short: 'Review', to: '/admin/listings', icon: ListChecks }
const consultancy = { label: 'Consultancy', to: '/consultancy', icon: BriefcaseBusiness }
const consultancyHome = { ...consultancy, label: 'Consultancy home', short: 'Home', icon: House }
const services = { label: 'Services', to: '/services', icon: BriefcaseBusiness }
const expertise = { label: 'Expertise', to: '/expertise', icon: Code }
const work = { label: 'Experience', to: '/work', icon: Users }
const contact = { label: 'Discuss a project', short: 'Contact', to: '/contact', icon: Mail }
const about = { label: 'About', to: '/about', icon: Info }
const insights = { label: 'Insights', to: '/insights', icon: BookOpen }
const consultancyLinks = [consultancyHome, about, work, expertise, insights, services]
const findWork = { label: 'Find work', to: '/find-a-job', icon: Search }
const findJobHome = { ...findWork, label: 'Find a job home', short: 'Home', icon: House }
const jobSeekerLinks = [findJobHome, contracts, jobs]

const sections = {
  home: {
    primary: [consultancy, calculators, employers, findWork], action: null,
    quick: [home, findWork, employers, consultancy],
  },
  jobs: {
    primary: [contracts, jobs, calculators], action: import.meta.dev ? postRole : employers,
    quick: [contracts, jobs, calculators, import.meta.dev ? postRole : employers],
  },
}

export function shouldHighlightNavigationLink(path: string, to: string) {
  if (to === consultancyHome.to) return false
  const currentPath = path.replace(/\/$/, '') || '/'
  if (to === employerHome.to) return currentPath === to
  return currentPath === to || currentPath.startsWith(to + '/')
}

export function isConsultancyPath(path: string) {
  const root = path.split('/')[1]
  return ['consultancy', 'services', 'expertise', 'work', 'contact', 'insights', 'about', 'scala', 'java', 'typescript', 'python'].includes(root)
}

export function useSectionSidebar() {
  const user = useAccountUser()
  const route = useRoute()
  return computed(() => {
    if (isConsultancyPath(route.path)) return { label: 'Consultancy section', links: consultancyLinks, action: contact }
    if (['find-a-job', 'contracts', 'contracts-id', 'jobs', 'jobs-id'].includes(String(route.name))) {
      return { label: 'Find a job', links: jobSeekerLinks, action: null }
    }
    if (!import.meta.dev || !user.value) return null
    if (route.path.split('/')[1] !== 'employers' && route.name !== 'admin-listings') return null
    const links = user.value.app_metadata.listing_admin === true ? [...employerWorkspace, reviewListings] : employerWorkspace
    return { label: 'Employer workspace', links, action: null }
  })
}

export function useSiteNavigation() {
  const sidebar = useSectionSidebar()
  const route = useRoute()
  return computed(() => {
    if (sidebar.value) return { primary: [], action: sidebar.value.action, quick: sidebar.value.links }
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
    if (['jobs', 'contractor-intelligence'].includes(root)) return sections.jobs
    return sections.home
  })
}
