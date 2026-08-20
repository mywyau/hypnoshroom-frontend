export interface Service {
  id: string
  route: '/services'
  number: string
  title: string
  shortDescription: string
  whoFor: string
  problems: string[]
  work: string[]
  deliverables: string[]
  format: string
}

export const services: Service[] = [
  {
    id: 'engineering-support',
    route: '/services',
    number: '01',
    title: 'Engineering Delivery',
    shortDescription: 'Take a defined piece of software work from problem to production.',
    whoFor: 'Teams with a clear engineering outcome that needs focused ownership and hands-on delivery.',
    problems: ['A critical service is holding up delivery', 'The code is risky to change', 'An integration or database issue is difficult to trace', 'A defined piece of work needs experienced ownership'],
    work: ['Build full-stack applications, backend services and APIs', 'Add useful automated, component and integration tests', 'Improve interfaces, service boundaries, integrations and database code', 'Work across Scala, Java, TypeScript, Python and serverless runtimes', 'Diagnose reliability and production problems'],
    deliverables: ['Working, reviewed code', 'Tests around the changed behaviour', 'Useful technical documentation', 'A clear handover to the team'],
    format: 'A scoped piece of work delivered in collaboration with the existing team, with progress kept visible and close to the agreed outcome.',
  },
  {
    id: 'embedded-engineering',
    route: '/services',
    number: '02',
    title: 'Embedded Engineering Support',
    shortDescription: 'Add experienced engineering capacity directly to an existing delivery team.',
    whoFor: 'Teams with a temporary capacity gap, a specialist piece of work or a backlog that needs another experienced engineer to move.',
    problems: ['Hiring cannot happen quickly enough', 'A delivery milestone needs more engineering capacity', 'The team has a short-term gap in a particular technology', 'Senior engineers are stretched across too many priorities'],
    work: ['Join the existing backlog and delivery rhythm', 'Build features, services and integrations', 'Write and improve automated tests', 'Review code and contribute to technical decisions', 'Share knowledge with permanent team members'],
    deliverables: ['Production-ready, reviewed code', 'Tests and documentation around the work', 'Visible progress through the team’s existing workflow', 'A clean handover when the engagement ends'],
    format: 'Currently delivered directly by the founder as a time-bound addition to an existing team, with responsibilities and availability agreed up front.',
  },
  {
    id: 'technical-review',
    route: '/services',
    number: '03',
    title: 'Technical Review',
    shortDescription: 'A clear view of what is happening, what matters and what to do next.',
    whoFor: 'Teams facing an upgrade, recurring delivery friction or a system that feels fragile without a clear explanation of why.',
    problems: ['The risk of an upgrade is unclear', 'Small changes take too long', 'Tests or observability do not provide confidence', 'Technical debt has no useful order or ownership'],
    work: ['Review code, architecture, APIs and data access', 'Assess test coverage, test quality, delivery and observability', 'Investigate language or framework upgrade readiness', 'Separate urgent risks from improvements that can wait'],
    deliverables: ['A concise account of the current system', 'Findings in a useful order', 'Recommended next steps', 'A technical walkthrough with the team'],
    format: 'A bounded review of the codebase and relevant delivery setup, shaped around the questions that need answering.',
  },
  {
    id: 'modernisation',
    route: '/services',
    number: '04',
    title: 'Modernisation',
    shortDescription: 'Move an existing system onto firmer ground without defaulting to a rewrite.',
    whoFor: 'Teams ready to act on an upgrade, reliability or maintainability problem and looking for the work to be carried through.',
    problems: ['An upgrade keeps returning to the backlog', 'Old dependencies are narrowing the team’s options', 'Weak tests make meaningful change feel risky', 'A long-lived system needs a safer path forward'],
    work: ['Upgrade languages, frameworks and dependencies', 'Protect existing behaviour before changing it', 'Improve unit, integration and contract tests', 'Refactor in controlled steps', 'Strengthen CI/CD, serverless delivery, containers and production reliability'],
    deliverables: ['The agreed improvement, implemented and tested', 'Reviewable changes throughout delivery', 'Updated build or deployment configuration', 'A clear account of what changed and what remains'],
    format: 'Delivered in visible, controlled stages around a defined outcome, with no big reveal at the end.',
  },
]
