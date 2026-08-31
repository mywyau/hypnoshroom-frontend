export interface WorkCaseStudy {
  slug: string
  title: string
  eyebrow: string
  summary: string
  seoTitle: string
  seoDescription: string
  context: string
  role: string
  challenge: string
  contribution: string[]
  perspective: string
  technologies: string[]
}

export const workCaseStudies: WorkCaseStudy[] = [
  {
    slug: 'covid-job-retention-scheme',
    title: 'COVID-19 Job Retention Scheme',
    eyebrow: 'Selected professional experience',
    summary: 'Contributed to Scala engineering work in the HMRC domain during delivery of the COVID-19 Job Retention Scheme.',
    seoTitle: 'COVID-19 Job Retention Scheme Experience | Hypnoshroom',
    seoDescription: 'Selected professional Scala engineering experience in the HMRC domain during delivery of the COVID-19 Job Retention Scheme.',
    context: 'This page describes individual professional experience, not a Hypnoshroom client engagement or an official HMRC account.',
    role: 'Contributed as part of an established engineering team working in a time-critical public-service context.',
    challenge: 'The work sat in a domain where changes needed careful delivery, clear collaboration and respect for existing service behaviour.',
    contribution: [
      'Worked with Scala services and the delivery practices around established applications.',
      'Contributed to changes through the team’s existing review, testing and release process.',
      'Worked within the constraints of a large public-sector service and its surrounding integrations.',
    ],
    perspective: 'It reinforced the value of small, reviewable changes and evidence-led testing when software supports a consequential public service.',
    technologies: ['Scala', 'Play Framework', 'REST APIs', 'Automated testing', 'CI/CD'],
  },
  {
    slug: 'hmrc-customs-duty-services',
    title: 'Customs duty services',
    eyebrow: 'Selected professional experience',
    summary: 'Contributed to live-service engineering work in Edinburgh relating to customs duty for tobacco and alcohol.',
    seoTitle: 'Customs Duty Services Experience | Hypnoshroom',
    seoDescription: 'Selected professional experience contributing to Scala engineering work on live customs duty services in the HMRC domain.',
    context: 'This page describes individual professional experience, not a Hypnoshroom client engagement or an official HMRC account.',
    role: 'Worked within a live-service environment as part of a wider team responsible for maintaining and evolving existing systems.',
    challenge: 'Regulated services have long-lived behaviour, operational constraints and integrations that need to remain understandable as the code changes.',
    contribution: [
      'Contributed to the maintenance and evolution of live Scala services.',
      'Worked through established engineering workflows for review, testing and delivery.',
      'Investigated and changed behaviour with attention to service reliability and existing system boundaries.',
    ],
    perspective: 'The experience shapes a practical approach to mature systems: understand the current behaviour first, then make the smallest useful change that can be verified.',
    technologies: ['Scala', 'Play Framework', 'MongoDB', 'REST APIs', 'Monitoring and logging'],
  },
  {
    slug: 'mtd-income-tax-view-and-change',
    title: 'Making Tax Digital for Income Tax: View and Change',
    eyebrow: 'Selected professional experience',
    summary: 'Contributed to Scala engineering work in the HMRC domain on Making Tax Digital for Income Tax: View and Change.',
    seoTitle: 'MTD Income Tax View and Change Experience | Hypnoshroom',
    seoDescription: 'Selected professional Scala engineering experience on Making Tax Digital for Income Tax: View and Change in the HMRC domain.',
    context: 'This page describes individual professional experience, not a Hypnoshroom client engagement or an official HMRC account.',
    role: 'Contributed within an established team and delivery process for a complex public-service product.',
    challenge: 'A service in an established tax domain needs changes that fit its existing application boundaries, data flows and delivery practices.',
    contribution: [
      'Worked on Scala application code in an established public-sector domain.',
      'Used the team’s existing review and test practices to support safe changes.',
      'Collaborated around the constraints and dependencies of a long-lived service.',
    ],
    perspective: 'It strengthened the view that dependable delivery comes from pairing domain understanding with code, test and operational evidence—not from treating an existing system as a blank slate.',
    technologies: ['Scala', 'Play Framework', 'JSON and APIs', 'MongoDB', 'Automated testing'],
  },
  {
    slug: 'tarotea',
    title: 'Tarotea',
    eyebrow: 'Independent product',
    summary: 'A SaaS product experiment for teaching Cantonese, built as an opportunity to work through product and engineering decisions end to end.',
    seoTitle: 'Tarotea Cantonese Learning SaaS | Hypnoshroom',
    seoDescription: 'Tarotea is an independently built Cantonese language-learning SaaS product and a record of product engineering experience.',
    context: 'An independently built product; this is a draft account of the product and the engineering decisions behind it.',
    role: 'Designed and built the product as an independent developer, spanning product decisions, implementation and deployment.',
    challenge: 'Language learning needs an experience that makes repeated practice approachable while keeping the product, data model and operational footprint manageable.',
    contribution: [
      'Explored the product journey for learning and practising Cantonese.',
      'Built a full-stack web application and worked through account, data and deployment concerns.',
      'Used the product as a practical environment for testing product assumptions and engineering choices.',
    ],
    perspective: 'Tarotea is valuable evidence of the work behind a small SaaS product: balancing the user journey, the data model, authentication and deployment rather than treating them as separate concerns.',
    technologies: ['TypeScript', 'Nuxt', 'Vue', 'Supabase', 'PostgreSQL', 'Vercel'],
  },
  {
    slug: 'lonely-radish',
    title: 'Lonely Radish',
    eyebrow: 'Product experiment',
    summary: 'An independent dating-app experiment used to explore product discovery, user journeys and the responsibilities around a social product.',
    seoTitle: 'Lonely Radish Product Experiment | Hypnoshroom',
    seoDescription: 'Lonely Radish is an independent dating-app product experiment exploring product discovery and full-stack engineering.',
    context: 'An independent product experiment; this page intentionally focuses on learnings rather than presenting it as a commercial client result.',
    role: 'Explored the product concept and implementation as an independent developer.',
    challenge: 'Social and dating products require deliberate decisions about the user journey, privacy, account behaviour and the boundaries of a small early-stage product.',
    contribution: [
      'Tested an early product concept and the journeys needed to make it understandable to users.',
      'Explored the engineering boundaries around accounts, data and application behaviour.',
      'Used the experiment to learn where product assumptions, safety considerations and implementation constraints meet.',
    ],
    perspective: 'The experiment was a useful reminder that a product is more than a working interface: its purpose, user expectations and responsible boundaries need attention from the first implementation.',
    technologies: ['TypeScript', 'Nuxt', 'Vue', 'Product discovery', 'Full-stack web development'],
  },
]

export const getWorkCaseStudy = (slug: string) => workCaseStudies.find(caseStudy => caseStudy.slug === slug)
