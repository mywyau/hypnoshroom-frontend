export interface LanguageWorkPackage {
  type: string
  title: string
  duration: string
  intro: string
  goodFor: string[]
  work: string[]
  outputs: string[]
  boundary: string
}

export interface LanguageServicesPage {
  slug: string
  eyebrow: string
  title: string
  intro: string
  gradient: 'java' | 'typescript' | 'python'
  seoTitle: string
  seoDescription: string
  areas: Array<[string, string]>
  packagesIntro: string
  packages: LanguageWorkPackage[]
  focus: Array<{ title: string; description: string }>
  clientPrompt: string
  contactLabel: string
}

export const javaServicesPage: LanguageServicesPage = {
  slug: 'java',
  eyebrow: 'Java engineering',
  title: 'Need help with a Java system?',
  intro: 'Focused support for Java services that need to be understood, upgraded or changed without losing the behaviour that already matters.',
  gradient: 'java',
  seoTitle: 'Java Engineering Services | Hypnoshroom',
  seoDescription: 'Defined Java engineering packages for service reviews, JDK and Spring upgrades, and bounded backend delivery.',
  areas: [
    ['Language & runtime', 'Java · JDK · JVM'],
    ['Frameworks', 'Spring Boot · Jakarta APIs'],
    ['Build & delivery', 'Maven · Gradle · CI/CD'],
    ['Backend systems', 'REST APIs · messaging · PostgreSQL'],
  ],
  packagesIntro: 'Start with one service and one outcome. Reviews establish the evidence; upgrade and delivery packages handle a bounded change once the constraints are understood.',
  packages: [
    {
      type: 'Fixed-scope review',
      title: 'Java Service Review',
      duration: 'Minimum 1 month',
      intro: 'Find the technical constraints making one Java service risky or expensive to change.',
      goodFor: ['A service with recurring production or delivery friction', 'An unfamiliar codebase that needs an actionable technical map', 'Unclear test, dependency or data-access risk'],
      work: ['Run and inspect the build, tests and delivery setup', 'Review service boundaries, persistence and failure handling', 'Map JDK, framework and dependency constraints', 'Order findings by impact and effort'],
      outputs: ['Current-state technical map', 'Prioritised risks and improvements', 'Recommended first delivery milestone', 'Team walkthrough and written handover'],
      boundary: 'One primary service or repository and the delivery path directly associated with it. This is not an estate-wide audit.',
    },
    {
      type: 'Phased modernisation',
      title: 'JDK & Spring Upgrade',
      duration: 'Flexible — scoped by phase',
      intro: 'Move a Java service through one controlled runtime or framework upgrade phase.',
      goodFor: ['A JDK upgrade blocked by dependencies or build plugins', 'A Spring Boot migration with known compatibility work', 'A service approaching unsupported runtime versions'],
      work: ['Establish compatible target versions', 'Protect affected behaviour with useful tests', 'Separate runtime, framework and application changes', 'Verify build, deployment and production-facing behaviour'],
      outputs: ['Reviewable upgrade changes', 'Updated dependencies and build configuration', 'Tests around affected behaviour', 'Remaining risks and next-phase options'],
      boundary: 'One agreed upgrade phase. Its duration depends on the starting versions, dependency graph, test evidence and deployment constraints.',
    },
    {
      type: 'Defined delivery',
      title: 'Java Backend Delivery',
      duration: 'From 4 weeks',
      intro: 'Deliver one clearly specified backend capability inside an existing Java system.',
      goodFor: ['A new API or integration with agreed behaviour', 'A difficult persistence or messaging change', 'A bounded reliability improvement that needs ownership'],
      work: ['Implement the agreed capability in reviewable changes', 'Add unit and integration evidence at useful boundaries', 'Work within the existing architecture and delivery process', 'Document decisions and operational behaviour'],
      outputs: ['Working reviewed code', 'Automated tests', 'Deployment or configuration changes', 'Technical documentation and handover'],
      boundary: 'One engineering outcome. Product decisions, broad redesigns and unrelated backlog work remain outside the package.',
    },
  ],
  focus: [
    { title: 'Long-lived services', description: 'Work with the architecture and operational history already present instead of treating age as a reason to rewrite.' },
    { title: 'Safe JVM upgrades', description: 'Treat the JDK, framework, build plugins, dependencies, tests and deployment runtime as one compatibility problem.' },
    { title: 'Production behaviour', description: 'Keep transactions, failure handling, database access, observability and release confidence in scope alongside the code.' },
  ],
  clientPrompt: 'Share the service involved, its current JDK and framework versions, how it is built and deployed, and the outcome the team is struggling to reach.',
  contactLabel: 'Discuss a Java system',
}

export const typeScriptServicesPage: LanguageServicesPage = {
  slug: 'typescript',
  eyebrow: 'TypeScript engineering',
  title: 'Need help with a TypeScript system?',
  intro: 'Technical delivery for TypeScript backends and full-stack applications where APIs, data, tests and runtime behaviour need as much care as the interface.',
  gradient: 'typescript',
  seoTitle: 'TypeScript Engineering Services | Hypnoshroom',
  seoDescription: 'Defined TypeScript packages for backend reviews, API and full-stack delivery, and runtime modernisation.',
  areas: [
    ['Language & runtime', 'TypeScript · Node.js'],
    ['Applications', 'Nuxt · Vue · server APIs'],
    ['Testing', 'Vitest · Playwright · integration tests'],
    ['Delivery', 'Vercel · serverless · CI/CD'],
  ],
  packagesIntro: 'The package boundary is a backend, application or delivery outcome—not an open-ended promise to handle every part of a product.',
  packages: [
    {
      type: 'Fixed-scope review',
      title: 'TypeScript Backend Review',
      duration: 'Minimum 1 month',
      intro: 'Understand where a TypeScript service is losing safety as its codebase and responsibilities grow.',
      goodFor: ['Runtime failures escaping the type system', 'API and data boundaries that are difficult to change', 'A test suite that does not provide release confidence'],
      work: ['Inspect runtime validation, error handling and API contracts', 'Review module boundaries and dependency direction', 'Assess database access, tests and observability', 'Trace build and deployment assumptions'],
      outputs: ['Technical findings ordered by impact', 'Boundary and runtime-risk map', 'Recommended improvements', 'A scoped first delivery package'],
      boundary: 'One backend or full-stack application and its immediate delivery configuration. It is not a general product or UX review.',
    },
    {
      type: 'Defined delivery',
      title: 'API or Full-stack Delivery',
      duration: 'From 4 weeks',
      intro: 'Take one specified application capability through implementation, testing and release.',
      goodFor: ['A bounded user journey with known acceptance criteria', 'A new API or third-party integration', 'A server-rendered feature spanning UI, server and persistence'],
      work: ['Implement typed interfaces and runtime validation', 'Build the server, UI and data changes in reviewable slices', 'Add component, integration or end-to-end tests where useful', 'Prepare the change for the existing deployment platform'],
      outputs: ['Working reviewed feature code', 'Automated tests around critical behaviour', 'Configuration and deployment changes', 'Handover notes for the owning team'],
      boundary: 'One agreed capability. Product discovery, visual design and unrelated platform work require separate ownership or scope.',
    },
    {
      type: 'Phased modernisation',
      title: 'Runtime & Dependency Modernisation',
      duration: 'Flexible — scoped by phase',
      intro: 'Move one TypeScript application through a controlled Node.js, Nuxt or dependency upgrade.',
      goodFor: ['An unsupported Node.js runtime', 'A Nuxt or major dependency upgrade with migration risk', 'Build tooling that has become fragile or slow'],
      work: ['Map runtime, framework and package constraints', 'Protect important behaviour before version changes', 'Keep dependency and behaviour changes independently reviewable', 'Verify build, server rendering and deployment behaviour'],
      outputs: ['Updated runtime and dependencies', 'Resolved compatibility changes', 'Tests for affected behaviour', 'Documented residual risks'],
      boundary: 'One agreed modernisation phase. The scope depends on version distance, package compatibility and deployment constraints.',
    },
  ],
  focus: [
    { title: 'Types at runtime', description: 'Use TypeScript for developer feedback while validating untrusted HTTP, queue, environment and database inputs where static types stop.' },
    { title: 'Full-stack boundaries', description: 'Keep browser, server, API and persistence responsibilities explicit even when one framework makes them easy to place together.' },
    { title: 'Operable delivery', description: 'Account for serverless limits, logs, failure modes, deployment previews and production data rather than treating deployment as an afterthought.' },
  ],
  clientPrompt: 'Share the application, its Node.js and framework versions, deployment platform, important integrations and the user or engineering outcome that needs to move.',
  contactLabel: 'Discuss a TypeScript system',
}

export const pythonServicesPage: LanguageServicesPage = {
  slug: 'python',
  eyebrow: 'Python engineering',
  title: 'Need help with a Python system?',
  intro: 'Focused work on Python services, integrations and automation that need predictable environments, explicit boundaries and production-ready behaviour.',
  gradient: 'python',
  seoTitle: 'Python Engineering Services | Hypnoshroom',
  seoDescription: 'Defined Python packages for service reviews, integration and automation delivery, and production AI API integrations.',
  areas: [
    ['Language & runtime', 'Python · asyncio'],
    ['Services', 'APIs · workers · automation'],
    ['Integrations', 'Data · third-party APIs · AI APIs'],
    ['Quality', 'pytest · integration tests · observability'],
  ],
  packagesIntro: 'Python can make the first version quick. These packages focus on keeping the resulting service understandable, testable and safe to operate.',
  packages: [
    {
      type: 'Fixed-scope review',
      title: 'Python Service Review',
      duration: 'Minimum 1 month',
      intro: 'Identify the environment, boundary and operational risks inside one Python service.',
      goodFor: ['A service that behaves differently between environments', 'Background work or async code that fails unpredictably', 'A codebase whose dependencies and entry points are unclear'],
      work: ['Reproduce the environment and run the existing tests', 'Review application boundaries, typing and validation', 'Inspect concurrency, error handling and dependency management', 'Assess logging, deployment and operational behaviour'],
      outputs: ['Current-state service map', 'Prioritised risks and recommendations', 'Environment and dependency findings', 'A bounded first implementation step'],
      boundary: 'One service or automation repository and its immediate runtime setup. This is not a security certification or data-science review.',
    },
    {
      type: 'Defined delivery',
      title: 'Integration & Automation Delivery',
      duration: 'From 4 weeks',
      intro: 'Build one reliable Python integration, worker or automation workflow around a defined outcome.',
      goodFor: ['A third-party API integration', 'A repeatable data or operational workflow', 'A background process needing retries and useful failure handling'],
      work: ['Implement explicit inputs, outputs and failure behaviour', 'Add retries, idempotency or scheduling where required', 'Test external boundaries with realistic substitutes', 'Document operation and ownership'],
      outputs: ['Working integration or automation code', 'Automated tests', 'Runtime and deployment configuration', 'Operational documentation and handover'],
      boundary: 'One named workflow or integration. Unbounded data cleanup, manual operations and changes to third-party systems are excluded.',
    },
    {
      type: 'Defined integration',
      title: 'Production AI API Integration',
      duration: 'From 4 weeks',
      intro: 'Integrate an existing model API into a product workflow with controlled inputs, outputs, cost and failure handling.',
      goodFor: ['Adding summarisation, extraction or classification to a product', 'Replacing a prototype call with an operable integration', 'A workflow needing evaluation and fallback behaviour'],
      work: ['Define the model boundary and validated response shape', 'Implement timeouts, retries, rate and cost controls', 'Create representative evaluation cases', 'Add logging without exposing sensitive inputs'],
      outputs: ['Integrated product workflow', 'Evaluation fixtures and results', 'Operational safeguards', 'Documented limitations and ownership'],
      boundary: 'Integration of an existing model or API into one workflow. Model training, open-ended research and guarantees about probabilistic output are excluded.',
    },
  ],
  focus: [
    { title: 'Predictable environments', description: 'Pin dependencies, state the supported Python runtime and make local, CI and production execution reproducible.' },
    { title: 'Explicit service boundaries', description: 'Keep request handling, domain behaviour, persistence and background work separate enough to test and operate.' },
    { title: 'Responsible AI integration', description: 'Treat model calls as unreliable external dependencies with validation, evaluation, cost controls and honest limitations.' },
  ],
  clientPrompt: 'Share the service or workflow, supported Python version, dependency setup, deployment environment and the external systems or APIs involved.',
  contactLabel: 'Discuss a Python system',
}
