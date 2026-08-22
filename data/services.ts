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
  // {
  //   id: 'engineering-support',
  //   slug: 'engineering-delivery',
  //   number: '01',
  //   title: 'Engineering Delivery',
  //   shortDescription: 'Take a defined piece of software work from problem to production.',
  //   packageType: 'Defined milestone',
  //   commercialModel: 'Milestone-based',
  //   commercialDetail: 'One agreed engineering outcome, quoted after a short scoping step.',
  //   timeline: 'Scoped by milestone',
  //   whoFor: 'Teams with a clear engineering outcome that needs focused ownership and hands-on delivery.',
  //   problems: ['A critical service is holding up delivery', 'The code is risky to change', 'An integration or database issue is difficult to trace', 'A defined piece of work needs experienced ownership'],
  //   work: ['Build full-stack applications, backend services and APIs', 'Add useful automated, component and integration tests', 'Improve interfaces, service boundaries, integrations and database code', 'Work across Scala, Java, TypeScript, Python and serverless runtimes', 'Diagnose reliability and production problems'],
  //   deliverables: ['Working, reviewed code', 'Tests around the changed behaviour', 'Useful technical documentation', 'A clear handover to the team'],
  //   format: 'A scoped piece of work delivered in collaboration with the existing team, with progress kept visible and close to the agreed outcome.',
  //   boundary: 'One defined technical outcome at a time. Product prioritisation and acceptance remain with the client’s product or domain owner.',
  //   steps: [
  //     { title: 'Define the milestone', description: 'Agree the technical outcome, relevant behaviour, available environments and definition of done.' },
  //     { title: 'Establish the baseline', description: 'Reproduce the system, confirm existing tests and identify assumptions that could affect delivery.' },
  //     { title: 'Deliver visibly', description: 'Implement the work in reviewable changes, keeping unrelated refactoring outside the milestone.' },
  //     { title: 'Verify and hand over', description: 'Run the agreed checks, document the change and return ownership cleanly to the team.' },
  //   ],
  // },
  {
    id: 'technical-review',
    slug: 'technical-review',
    number: '02',
    title: 'Technical Review & Discovery',
    shortDescription: 'An independent review of one system or technical question, with evidence, prioritised findings and practical recommendations.',
    packageType: 'Fixed-scope package',
    commercialModel: 'From £3,500 fixed fee',
    commercialDetail: 'The repository or service, primary technical question, access, evidence and outputs are agreed before the review starts.',
    timeline: 'Scope and fee agreed up front',
    whoFor: 'Teams facing an upgrade, recurring delivery friction or a system that feels fragile without a clear explanation of why.',
    problems: ['The risk of an upgrade is unclear', 'Small changes take too long', 'Tests or observability do not provide confidence', 'Technical debt has no useful order or ownership'],
    work: ['Establish the available build and test baseline', 'Review the code, architecture, APIs, data access and dependencies relevant to the question', 'Assess relevant testing, delivery and production evidence', 'Separate immediate risks from improvements that can wait'],
    deliverables: ['A concise written review of the current system', 'Prioritised findings supported by evidence', 'Practical recommendations and next steps', 'A technical walkthrough with the team'],
    format: 'A bounded review of one primary repository or service, shaped around one technical question and the decision it needs to support.',
    boundary: 'The standard package covers one primary repository or service and one technical question. It does not include implementation, an estate-wide audit, an exhaustive security assessment or a guaranteed delivery estimate. Broader reviews are scoped and quoted separately.',
    featured: true,
    steps: [
      { title: 'Frame the question', description: 'Agree what decision the review needs to support, what is included and which evidence is available.' },
      { title: 'Inspect the system', description: 'Run the build and review the code, tests, dependencies and delivery setup relevant to that question.' },
      { title: 'Order the findings', description: 'Separate immediate blockers, material risks, useful improvements and work that can safely wait.' },
      { title: 'Walk through the result', description: 'Discuss the evidence, recommended sequence and a realistic first implementation milestone.' },
    ],
  },
  {
    id: 'testing-suite-review',
    slug: 'testing-suite-review',
    number: '03',
    title: 'Testing Suite Review',
    shortDescription: 'An independent assessment of how well one unit and integration test suite supports safe, maintainable delivery.',
    packageType: 'Fixed-scope package',
    commercialModel: 'From £3,500 fixed fee',
    commercialDetail: 'The repository or service, relevant test suites, access and outputs are agreed before the review starts.',
    timeline: 'Scope and fee agreed up front',
    whoFor: 'Teams whose tests pass but still leave releases risky, slow or difficult to diagnose—and teams unsure whether their testing effort is protecting the right behaviour.',
    problems: ['Tests pass but releases still feel risky', 'The suite is slow, brittle or expensive to maintain', 'Unit and integration test responsibilities are unclear', 'Mocks, fixtures or setup obscure the behaviour being protected'],
    work: ['Review representative unit and integration tests', 'Assess testing methodology, boundaries, naming, structure and feedback speed', 'Identify brittle assertions, excessive mocking, hidden coupling and missing integration evidence', 'Review repeatability and how failures are diagnosed'],
    deliverables: ['A written assessment of the current testing approach', 'Examples of testing smells found in the suite', 'Prioritised recommendations by risk and value', 'Suggested unit and integration testing boundaries', 'A technical walkthrough with the team'],
    format: 'A review of how the existing suite supports engineering decisions: what it proves, where it creates false confidence and which changes would improve its value.',
    boundary: 'The standard package covers the unit and integration test suites for one primary repository or service. It assesses the existing approach and recommends changes; it does not include writing, rewriting or repairing production code or tests.',
    steps: [
      { title: 'Agree the evidence', description: 'Confirm the repository, relevant suites, known pain points, delivery workflow and the questions the review needs to answer.' },
      { title: 'Inspect the suites', description: 'Run representative tests and examine structure, boundaries, doubles, fixtures, assertions, speed and failure output.' },
      { title: 'Assess the methodology', description: 'Identify where the testing strategy protects useful behaviour, creates maintenance cost or leaves important boundaries exposed.' },
      { title: 'Walk through the result', description: 'Discuss the evidence, prioritised recommendations and a practical sequence for improving the suite.' },
    ],
  },
  {
    id: 'embedded-engineering',
    slug: 'embedded-engineering-support',
    number: '02',
    title: 'Embedded Engineering Support',
    shortDescription: 'Add experienced engineering capacity directly to an existing delivery team.',
    packageType: 'Embedded engagement',
    commercialModel: 'Indicative £500/day',
    commercialDetail: 'Engineering support is agreed in renewable three-month increments, up to a maximum engagement of 12 months. The final day rate and working pattern are confirmed before the engagement starts.',
    timeline: '3-month increments · up to 12 months',
    whoFor: 'Teams with a temporary capacity gap, a specialist piece of work or a backlog that needs another experienced engineer to move.',
    problems: ['Hiring cannot happen quickly enough', 'A delivery milestone needs more engineering capacity', 'The team has a short-term gap in a particular technology', 'Senior engineers are stretched across too many priorities'],
    work: ['Join the existing backlog and delivery rhythm', 'Build features, services and integrations', 'Write and improve automated tests', 'Review code and contribute to technical decisions', 'Share knowledge with permanent team members'],
    deliverables: ['Production-ready, reviewed code', 'Tests and documentation around the work', 'Visible progress through the team’s existing workflow', 'A clean handover when the engagement ends'],
    format: 'Delivered as a time-bound addition to an existing team. Responsibilities, working pattern and availability are agreed for each three-month increment.',
    boundary: 'The working pattern and responsibilities are agreed in advance. Each extension is a separate three-month commitment and the total engagement is capped at 12 months. This is not unlimited availability, team management or an on-call service.',
    steps: [
      { title: 'Agree the role', description: 'Define the backlog area, expected decisions, weekly allocation and people responsible for product context.' },
      { title: 'Join the workflow', description: 'Work through the team’s existing repository, review, testing and delivery practices.' },
      { title: 'Deliver and share', description: 'Complete agreed engineering work while documenting decisions and sharing system knowledge.' },
      { title: 'Review or conclude', description: 'Before the increment ends, agree another three months or close and transfer active work cleanly. Total engagement length is capped at 12 months.' },
    ],
  },
  // {
  //   id: 'modernisation',
  //   slug: 'modernisation',
  //   number: '04',
  //   title: 'Modernisation',
  //   shortDescription: 'We look into modern tools and trends within the tech industry. Move an existing system onto firmer ground.',
  //   packageType: 'Phased package',
  //   commercialModel: 'Stage-by-stage',
  //   commercialDetail: 'Each modernisation phase is scoped and priced separately around the system, risk and outcome.',
  //   timeline: 'Flexible — scoped by phase',
  //   whoFor: 'Teams ready to act on an upgrade, reliability or maintainability problem and looking for the work to be carried through.',
  //   problems: ['An upgrade keeps returning to the backlog', 'Old dependencies are narrowing the team’s options', 'Weak tests make meaningful change feel risky', 'A long-lived system needs a safer path forward'],
  //   work: ['Upgrade languages, frameworks and dependencies', 'Protect existing behaviour before changing it', 'Improve unit, integration and contract tests', 'Refactor in controlled steps', 'Strengthen CI/CD, serverless delivery, containers and production reliability'],
  //   deliverables: ['The agreed improvement, implemented and tested', 'Reviewable changes throughout delivery', 'Updated build or deployment configuration', 'A clear account of what changed and what remains'],
  //   format: 'Delivered in visible, controlled stages around a defined outcome.',
  //   boundary: 'The package starts with an understood constraint and covers one agreed modernisation stage. A whole-system rewrite or open-ended transformation is not implied.',
  //   steps: [
  //     { title: 'Technical Review & Discovery', description: 'Use existing discovery or a technical review to identify the safest useful modernisation stage.' },
  //     { title: 'Protect behaviour', description: 'Add, strengthen and stabilise a service before changing application behaviour. Reducing risk and ensuring smoother delivery' },
  //     { title: 'Implement in small increments', description: 'Small iterables provide safe changes, reduce risk and help catch issues early.' },
  //     { title: 'Observe, Review and Decision', description: 'Verify the result before agreeing whether another cycle or stage is worthwhile.' },
  //   ],
  // },
]

export const getService = (slug: string) => services.find(service => service.slug === slug)
