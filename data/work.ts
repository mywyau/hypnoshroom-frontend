export interface WorkCaseStudy {
  slug: string
  area: 'scala' | 'product'
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
  website?: { label: string; url: string }
}

export const workCaseStudies: WorkCaseStudy[] = [
  {
    slug: 'tarotea',
    area: 'product',
    title: 'Tarotea',
    eyebrow: 'Language App',
    summary: 'A SaaS product for teaching Cantonese, built to help learn Cantonese using quizzes, typing exercises and audio recognition.',
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
    website: { label: 'Visit Tarotea', url: 'https://www.tarotea.co.uk' },
  },
  {
    slug: 'lonely-radish',
    area: 'product',
    title: 'Lonely Radish',
    eyebrow: 'Dating App',
    summary: 'An independent dating app used to explore product discovery, the responsibilities around a social product and remove algorithms from data apps.',
    seoTitle: 'Lonely Radish Product Experiment | Hypnoshroom',
    seoDescription: 'Lonely Radish is an independent dating-app product experiment exploring product discovery and full-stack engineering.',
    context: 'A dating app experiment; this page intentionally focuses on learnings rather than presenting it as a commercial client result.',
    role: 'Explored the product concept and implementation as an independent developer.',
    challenge: 'Social and dating products require deliberate decisions about the user journey, privacy, account behaviour and the boundaries of a small early-stage product.',
    contribution: [
      'Tested an early product concept and the journeys needed to make it understandable to users.',
      'Explored the engineering boundaries around accounts, data and application behaviour.',
      'Used the experiment to learn where product assumptions, safety considerations and implementation constraints meet.',
    ],
    perspective: 'The experiment was a useful reminder that a product is more than a working interface: its purpose, user expectations and responsible boundaries need attention from the first implementation.',
    technologies: ['TypeScript', 'Nuxt', 'Vue', 'Product discovery', 'Full-stack web development'],
    website: { label: 'Visit Lonely Radish', url: 'https://www.lonelyradish.com' },
  },
  {
    slug: 'hypnoshroom-website',
    area: 'product',
    title: 'Hypnoshroom',
    eyebrow: 'Consultancy Web App',
    summary: 'The Hypnoshroom website: an independently built consultancy site for explaining specialist services, publishing technical writing and starting project conversations.',
    seoTitle: 'Hypnoshroom Website Product Engineering | Hypnoshroom',
    seoDescription: 'The independently built Hypnoshroom consultancy website: a Nuxt product for service information, technical writing and project enquiries.',
    context: 'An independently built product and the website you are currently viewing.',
    role: 'Designed, built and maintain the website as an independent product, from the service proposition and content model to implementation and deployment.',
    challenge: 'A consultancy website needs to make a specialist offer understandable, show useful evidence of experience and provide a reliable path from a visitor question to a project conversation.',
    contribution: [
      'Built server-rendered pages for services, technical expertise, experience entries and articles.',
      'Designed an editorial model that supports technical writing, topic filtering, SEO metadata and structured data.',
      'Implemented a server-side enquiry route with validation, spam protection and email delivery configuration.',
      'Worked through responsive design, accessible navigation, deployment and production configuration.',
    ],
    perspective: 'Building the site is an ongoing product exercise: the message, content and conversion path should improve from real reader and client feedback rather than remain a static brochure.',
    technologies: ['TypeScript', 'Nuxt', 'Vue', 'Tailwind CSS', 'Vercel', 'Resend', 'Cloudflare Turnstile'],
    website: { label: 'View Hypnoshroom home', url: 'https://hypnoshroom.com' },
  },
]

export const getWorkCaseStudy = (slug: string) => workCaseStudies.find(caseStudy => caseStudy.slug === slug)
