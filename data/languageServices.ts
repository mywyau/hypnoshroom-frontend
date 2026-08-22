export interface LanguageWorkPackage {
  slug: 'technical-review' | 'testing-suite-review' | 'embedded-engineering-support'
  commercial: string
  title: string
  price: string
  duration?: string
  intro: string
  goodFor: string[]
  work: string[]
  outputs: string[]
  boundary: string
}

export interface LanguageServicesPage {
  slug: string
  language: string
  eyebrow: string
  title: string
  intro: string
  gradient: 'java' | 'typescript' | 'python'
  seoTitle: string
  seoDescription: string
  areas: Array<[string, string]>
  packagesIntro: string
  packages: LanguageWorkPackage[]
  clientPrompt: string
  contactLabel: string
}

const reviewBoundary = 'The standard package covers one primary repository or deployable service and one technical question. It does not include implementation, an estate-wide audit, an exhaustive security assessment or a guaranteed delivery estimate. Broader reviews are scoped and quoted separately.'
const testingBoundary = 'The standard package covers the unit and integration test suites for one primary repository or service. It assesses the existing approach and recommends changes; it does not include writing, rewriting or repairing production code or tests.'
const embeddedBoundary = 'The working pattern and responsibilities are agreed for each three-month increment, with a maximum total engagement of 12 months. The client owns product priorities, domain decisions and acceptance. This is not unlimited availability, team management or permanent on-call support.'

const testingPackage = (language: string, details: { examples: string; tools: string }): LanguageWorkPackage => ({
  slug: 'testing-suite-review',
  commercial: 'Fixed scope · fixed fee',
  title: `${language} Testing Suite Review`,
  price: 'From £3,500',
  intro: `Review the unit and integration testing approach around one ${language} service and identify where the suite helps, misleads or slows the team down.`,
  goodFor: ['Tests pass but releases still feel risky', 'The suite is slow, brittle or expensive to maintain', 'Unit and integration responsibilities are unclear', 'Mocks, fixtures or test setup obscure the behaviour being protected'],
  work: [`Review representative ${details.examples}`, `Assess test boundaries, naming, structure and use of ${details.tools}`, 'Look for brittle assertions, excessive mocking, hidden coupling and missing integration evidence', 'Review feedback speed, repeatability and how failures are diagnosed'],
  outputs: ['Written assessment of the current testing approach', 'Examples of testing smells found in the suite', 'Prioritised recommendations by risk and value', 'Suggested unit and integration testing boundaries', 'Technical walkthrough with the team'],
  boundary: testingBoundary,
})

export const javaServicesPage: LanguageServicesPage = {
  slug: 'java',
  language: 'Java',
  eyebrow: 'Java & JVM',
  title: 'Need help with a Java system?',
  intro: 'Technical review, testing assessment and embedded engineering for Java services, Spring Boot applications, Maven builds, REST APIs and database-backed systems.',
  gradient: 'java',
  seoTitle: 'Java & JVM Engineering | Hypnoshroom',
  seoDescription: 'Java technical reviews, testing suite assessments and embedded engineering for Java services, Spring Boot applications, Maven builds, APIs and databases.',
  areas: [
    ['Language & runtime', 'Java · JVM · JDK · records · collections'],
    ['Spring & APIs', 'Spring Boot · REST APIs · JSON · validation'],
    ['Application design', 'SOLID · interfaces · abstractions · dependency injection'],
    ['Data & persistence', 'SQL · PostgreSQL · MongoDB · repository patterns'],
    ['Builds & dependencies', 'Maven · dependency maintenance · build configuration'],
    ['Testing & quality', 'JUnit · Mockito · unit · integration · acceptance tests'],
    ['Refactoring & code health', 'Service boundaries · code cleanup · maintainability'],
    ['Production engineering', 'Live issue diagnosis · logging · monitoring · CI/CD · Docker'],
  ],
  packagesIntro: 'Use a Technical Review when a system question needs evidence, a Testing Suite Review when confidence in the tests is the problem, or Embedded Java Engineering when the team has work ready to deliver.',
  packages: [
    {
      slug: 'technical-review', commercial: 'Fixed scope · fixed fee', title: 'Java Technical Review & Discovery', price: 'From £3,500',
      intro: 'Investigate one Java service or technical question and provide evidence the team can use to decide what to do next.',
      goodFor: ['A Java or Spring Boot service is difficult to change', 'A JDK, framework or dependency decision needs technical evidence', 'The build, tests or production behaviour do not provide enough confidence', 'A recurring problem has no agreed cause or priority'],
      work: ['Run the service and establish the available build and test baseline', 'Inspect the code, APIs, persistence and dependencies relevant to the question', 'Review relevant testing, delivery and production evidence', 'Discuss missing domain or operational context with the client team'],
      outputs: ['Concise written review of the current system', 'Ranked findings supported by code or runtime evidence', 'Recommended next steps and realistic options', 'Technical walkthrough with the team'], boundary: reviewBoundary,
    },
    testingPackage('Java', { examples: 'JUnit unit and integration tests', tools: 'JUnit, Mockito, fixtures and test doubles' }),
    {
      slug: 'embedded-engineering-support', commercial: 'Day-rate engagement', title: 'Embedded Java Engineering', price: 'From £500 per day', duration: '3-month increments · up to 12 months',
      intro: 'Add experienced Java engineering capacity to an established team with a backlog, product context and delivery process already in place.',
      goodFor: ['A team needs additional Java or Spring Boot capacity', 'Features, maintenance or production issues need hands-on engineering', 'Planned JDK, framework or dependency changes need implementing', 'Testing, APIs or database work needs focused attention'],
      work: ['Join the team’s existing backlog, reviews and delivery rhythm', 'Implement and maintain Java services, Spring Boot applications and REST APIs', 'Improve service boundaries, persistence and automated tests', 'Investigate build, dependency and production problems', 'Document decisions and share system knowledge as the work develops'],
      outputs: ['Production-ready, reviewed engineering changes', 'Tests and documentation around completed work', 'Visible progress through the client’s existing workflow', 'A clean transfer of unfinished or completed work at the end'], boundary: embeddedBoundary,
    },
  ],
  clientPrompt: 'Describe the service, current Java and JDK versions, framework and Maven setup, and whether the team needs a system question investigated, its testing approach reviewed or additional capacity for known work.',
  contactLabel: 'Discuss a Java service',
}

export const typeScriptServicesPage: LanguageServicesPage = {
  slug: 'typescript', language: 'TypeScript', eyebrow: 'TypeScript engineering', title: 'Need help with a TypeScript system?',
  intro: 'Technical review, testing assessment and embedded engineering for TypeScript applications, Nuxt and Vue products, APIs and serverless delivery.', gradient: 'typescript',
  seoTitle: 'TypeScript Engineering | Hypnoshroom', seoDescription: 'TypeScript technical reviews, testing suite assessments and embedded engineering for Nuxt, Vue, APIs and serverless applications.',
  areas: [
    ['Language & runtime', 'TypeScript · JavaScript · Node.js · npm'], ['Applications', 'Nuxt 3 · Vue · responsive web applications'],
    ['APIs & boundaries', 'REST APIs · JSON · runtime validation · integrations'], ['Authentication', 'Auth0 · account flows · application permissions'],
    ['Data & persistence', 'Supabase · PostgreSQL · schema and query design'], ['Product engineering', 'Frontend/backend integration · product-oriented delivery'],
    ['Deployment', 'Vercel · server-side rendering · managed infrastructure'], ['Production engineering', 'Configuration · logging · debugging · CI/CD'],
  ],
  packagesIntro: 'Use a Technical Review when an application question needs evidence, a Testing Suite Review when confidence in the tests is the problem, or Embedded TypeScript Engineering when the team has work ready to deliver.',
  packages: [
    {
      slug: 'technical-review', commercial: 'Fixed scope · fixed fee', title: 'TypeScript Technical Review & Discovery', price: 'From £3,500',
      intro: 'Investigate one TypeScript application or technical question and provide evidence the team can use to decide what to do next.',
      goodFor: ['An application is difficult to change safely', 'API, authentication or data boundaries are difficult to trace', 'The tests or deployment path do not provide enough confidence', 'A recurring runtime problem has no agreed cause or priority'],
      work: ['Run the application and establish the available build and test baseline', 'Inspect the types, runtime boundaries, APIs, persistence and dependencies relevant to the question', 'Review relevant testing, deployment and production evidence', 'Discuss missing product or operational context with the client team'],
      outputs: ['Concise written review of the current application', 'Ranked findings supported by code or runtime evidence', 'Recommended next steps and realistic options', 'Technical walkthrough with the team'], boundary: reviewBoundary,
    },
    testingPackage('TypeScript', { examples: 'unit, component and integration tests', tools: 'test doubles, fixtures and browser or server test tooling' }),
    {
      slug: 'embedded-engineering-support', commercial: 'Day-rate engagement', title: 'Embedded TypeScript Engineering', price: 'From £500 per day', duration: '3-month increments · up to 12 months',
      intro: 'Add experienced TypeScript engineering capacity to an established team with a backlog, product context and delivery process already in place.',
      goodFor: ['A team needs additional TypeScript, Nuxt or Vue capacity', 'Product features or integrations need hands-on engineering', 'Authentication, API or database work needs focused attention', 'Build, deployment or production problems need resolving'],
      work: ['Join the team’s existing backlog, reviews and delivery rhythm', 'Implement full-stack features, REST APIs and external integrations', 'Improve runtime validation, application boundaries and automated tests', 'Work with Auth0, Supabase, PostgreSQL and Vercel where relevant', 'Document decisions and share system knowledge as the work develops'],
      outputs: ['Production-ready, reviewed engineering changes', 'Tests and documentation around completed work', 'Visible progress through the client’s existing workflow', 'A clean transfer of unfinished or completed work at the end'], boundary: embeddedBoundary,
    },
  ],
  clientPrompt: 'Describe the application, current Node and framework versions, deployment platform and important integrations, and whether the team needs a system question investigated, its testing approach reviewed or additional capacity for known work.',
  contactLabel: 'Discuss a TypeScript application',
}

export const pythonServicesPage: LanguageServicesPage = {
  slug: 'python', language: 'Python', eyebrow: 'Python engineering', title: 'Need help with a Python system?',
  intro: 'Technical review, testing assessment and embedded engineering for Python services, integrations and automation that need predictable environments and production-ready behaviour.', gradient: 'python',
  seoTitle: 'Python Engineering | Hypnoshroom', seoDescription: 'Python technical reviews, testing suite assessments and embedded engineering for services, integrations and production delivery.',
  areas: [
    ['Language & runtime', 'Python · asyncio · dependency management'], ['Services & APIs', 'REST APIs · JSON · validation · error handling'],
    ['Integrations', 'Third-party APIs · automation · external services'], ['Application design', 'Explicit boundaries · typing · maintainable modules'],
    ['Data & persistence', 'SQL · PostgreSQL · schema and query design'], ['Testing & quality', 'pytest · unit · integration · acceptance tests'],
    ['Refactoring & code health', 'Dependency cleanup · safer boundaries · maintainability'], ['Production engineering', 'Live issue diagnosis · logging · monitoring · CI/CD · Docker'],
  ],
  packagesIntro: 'Use a Technical Review when a service question needs evidence, a Testing Suite Review when confidence in the tests is the problem, or Embedded Python Engineering when the team has work ready to deliver.',
  packages: [
    {
      slug: 'technical-review', commercial: 'Fixed scope · fixed fee', title: 'Python Technical Review & Discovery', price: 'From £3,500',
      intro: 'Investigate one Python service or technical question and provide evidence the team can use to decide what to do next.',
      goodFor: ['A service behaves differently between environments', 'Application boundaries, dependencies or entry points are difficult to trace', 'The tests or production behaviour do not provide enough confidence', 'A recurring problem has no agreed cause or priority'],
      work: ['Reproduce the environment and establish the available test baseline', 'Inspect application boundaries, typing, validation and dependencies relevant to the question', 'Review relevant testing, deployment and production evidence', 'Discuss missing domain or operational context with the client team'],
      outputs: ['Concise written review of the current system', 'Ranked findings supported by code or runtime evidence', 'Recommended next steps and realistic options', 'Technical walkthrough with the team'], boundary: reviewBoundary,
    },
    testingPackage('Python', { examples: 'unit and integration tests', tools: 'pytest, fixtures, mocks and test doubles' }),
    {
      slug: 'embedded-engineering-support', commercial: 'Day-rate engagement', title: 'Embedded Python Engineering', price: 'From £500 per day', duration: '3-month increments · up to 12 months',
      intro: 'Add Python engineering capacity to an established team with a backlog, product context and delivery process already in place.',
      goodFor: ['A team needs additional Python service capacity', 'Integrations or automation need hands-on engineering', 'Testing, APIs or database work needs focused attention', 'Environment, dependency or production issues need resolving'],
      work: ['Join the team’s existing backlog, reviews and delivery rhythm', 'Implement and maintain Python services, APIs and integrations', 'Improve application boundaries, validation and automated tests', 'Investigate environment, dependency and production problems', 'Document decisions and share system knowledge as the work develops'],
      outputs: ['Production-ready, reviewed engineering changes', 'Tests and documentation around completed work', 'Visible progress through the client’s existing workflow', 'A clean transfer of unfinished or completed work at the end'], boundary: embeddedBoundary,
    },
  ],
  clientPrompt: 'Describe the service, current Python version, dependency setup and deployment environment, and whether the team needs a system question investigated, its testing approach reviewed or additional capacity for known work.',
  contactLabel: 'Discuss a Python service',
}
