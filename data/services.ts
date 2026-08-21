export interface Service {
  id: string
  slug: string
  number: string
  title: string
  shortDescription: string
  packageType: string
  commercialModel: string
  commercialDetail: string
  timeline: string
  whoFor: string
  problems: string[]
  work: string[]
  deliverables: string[]
  format: string
  boundary: string
  steps: Array<{ title: string; description: string }>
  featured?: boolean
}

export const services: Service[] = [
  {
    id: 'engineering-support',
    slug: 'engineering-delivery',
    number: '01',
    title: 'Engineering Delivery',
    shortDescription: 'Take a defined piece of software work from problem to production.',
    packageType: 'Defined milestone',
    commercialModel: 'Milestone-based',
    commercialDetail: 'One agreed engineering outcome delivered over at least one month, quoted after a short scoping step.',
    timeline: 'Minimum 1 month',
    whoFor: 'Teams with a clear engineering outcome that needs focused ownership and hands-on delivery.',
    problems: ['A critical service is holding up delivery', 'The code is risky to change', 'An integration or database issue is difficult to trace', 'A defined piece of work needs experienced ownership'],
    work: ['Build full-stack applications, backend services and APIs', 'Add useful automated, component and integration tests', 'Improve interfaces, service boundaries, integrations and database code', 'Work across Scala, Java, TypeScript, Python and serverless runtimes', 'Diagnose reliability and production problems'],
    deliverables: ['Working, reviewed code', 'Tests around the changed behaviour', 'Useful technical documentation', 'A clear handover to the team'],
    format: 'A scoped piece of work delivered in collaboration with the existing team, with progress kept visible and close to the agreed outcome.',
    boundary: 'One defined technical outcome at a time. Product prioritisation and acceptance remain with the client’s product or domain owner.',
    steps: [
      { title: 'Define the milestone', description: 'Agree the technical outcome, relevant behaviour, available environments and definition of done.' },
      { title: 'Establish the baseline', description: 'Reproduce the system, confirm existing tests and identify assumptions that could affect delivery.' },
      { title: 'Deliver visibly', description: 'Implement the work in reviewable changes, keeping unrelated refactoring outside the milestone.' },
      { title: 'Verify and hand over', description: 'Run the agreed checks, document the change and return ownership cleanly to the team.' },
    ],
  },
  {
    id: 'embedded-engineering',
    slug: 'embedded-engineering-support',
    number: '02',
    title: 'Embedded Engineering Support',
    shortDescription: 'Add experienced engineering capacity directly to an existing delivery team.',
    packageType: 'Reserved capacity',
    commercialModel: 'Weekly allocation',
    commercialDetail: 'A defined number of founder-led engineering days reserved each week for at least one month.',
    timeline: 'Minimum 1 month',
    whoFor: 'Teams with a temporary capacity gap, a specialist piece of work or a backlog that needs another experienced engineer to move.',
    problems: ['Hiring cannot happen quickly enough', 'A delivery milestone needs more engineering capacity', 'The team has a short-term gap in a particular technology', 'Senior engineers are stretched across too many priorities'],
    work: ['Join the existing backlog and delivery rhythm', 'Build features, services and integrations', 'Write and improve automated tests', 'Review code and contribute to technical decisions', 'Share knowledge with permanent team members'],
    deliverables: ['Production-ready, reviewed code', 'Tests and documentation around the work', 'Visible progress through the team’s existing workflow', 'A clean handover when the engagement ends'],
    format: 'Currently delivered directly by the founder as a time-bound addition to an existing team, with responsibilities and availability agreed up front.',
    boundary: 'Capacity, responsibilities and working days are agreed in advance. This is not unlimited availability, team management or an on-call service.',
    steps: [
      { title: 'Agree the role', description: 'Define the backlog area, expected decisions, weekly allocation and people responsible for product context.' },
      { title: 'Join the workflow', description: 'Work through the team’s existing repository, review, testing and delivery practices.' },
      { title: 'Deliver and share', description: 'Complete agreed engineering work while documenting decisions and sharing system knowledge.' },
      { title: 'Exit cleanly', description: 'Close or transfer active work and leave permanent team members able to own what changed.' },
    ],
  },
  {
    id: 'technical-review',
    slug: 'technical-review',
    number: '03',
    title: 'Technical Review',
    shortDescription: 'A clear view of what is happening, what matters and what to do next.',
    packageType: 'Fixed-scope package',
    commercialModel: 'Fixed fee',
    commercialDetail: 'One bounded technical question investigated over at least one month, priced before the review begins.',
    timeline: 'Minimum 1 month',
    whoFor: 'Teams facing an upgrade, recurring delivery friction or a system that feels fragile without a clear explanation of why.',
    problems: ['The risk of an upgrade is unclear', 'Small changes take too long', 'Tests or observability do not provide confidence', 'Technical debt has no useful order or ownership'],
    work: ['Review code, architecture, APIs and data access', 'Assess test coverage, test quality, delivery and observability', 'Investigate language or framework upgrade readiness', 'Separate urgent risks from improvements that can wait'],
    deliverables: ['A concise account of the current system', 'Findings in a useful order', 'Recommended next steps', 'A technical walkthrough with the team'],
    format: 'A bounded review of the codebase and relevant delivery setup, shaped around the questions that need answering.',
    boundary: 'One primary repository, service or technical question. This is a prioritised assessment, not an exhaustive audit or implementation engagement.',
    featured: true,
    steps: [
      { title: 'Frame the question', description: 'Agree what decision the review needs to support, what is included and which evidence is available.' },
      { title: 'Inspect the system', description: 'Run the build and review the code, tests, dependencies and delivery setup relevant to that question.' },
      { title: 'Order the findings', description: 'Separate immediate blockers, material risks, useful improvements and work that can safely wait.' },
      { title: 'Walk through the result', description: 'Discuss the evidence, recommended sequence and a realistic first implementation milestone.' },
    ],
  },
  {
    id: 'modernisation',
    slug: 'modernisation',
    number: '04',
    title: 'Modernisation',
    shortDescription: 'Move an existing system onto firmer ground.',
    packageType: 'Phased package',
    commercialModel: 'Stage-by-stage',
    commercialDetail: 'Each modernisation phase is scoped and priced separately around the system, risk and outcome.',
    timeline: 'Flexible — scoped by phase',
    whoFor: 'Teams ready to act on an upgrade, reliability or maintainability problem and looking for the work to be carried through.',
    problems: ['An upgrade keeps returning to the backlog', 'Old dependencies are narrowing the team’s options', 'Weak tests make meaningful change feel risky', 'A long-lived system needs a safer path forward'],
    work: ['Upgrade languages, frameworks and dependencies', 'Protect existing behaviour before changing it', 'Improve unit, integration and contract tests', 'Refactor in controlled steps', 'Strengthen CI/CD, serverless delivery, containers and production reliability'],
    deliverables: ['The agreed improvement, implemented and tested', 'Reviewable changes throughout delivery', 'Updated build or deployment configuration', 'A clear account of what changed and what remains'],
    format: 'Delivered in visible, controlled stages around a defined outcome.',
    boundary: 'The package starts with an understood constraint and covers one agreed modernisation stage. A whole-system rewrite or open-ended transformation is not implied.',
    steps: [
      { title: 'Technical Review & Discovery', description: 'Use existing discovery or a technical review to identify the safest useful modernisation stage.' },
      { title: 'Protect behaviour', description: 'Add, strengthen and stabilise a service before changing application behaviour. Reducing risk and ensuring smoother delivery' },
      { title: 'Implement in small increments', description: 'Small iterables provide safe changes, reduce risk and help catch issues early.' },
      { title: 'Observe, Review and Decision', description: 'Verify the result before agreeing whether another cycle or stage is worthwhile.' },
    ],
  },
]

export const getService = (slug: string) => services.find(service => service.slug === slug)
