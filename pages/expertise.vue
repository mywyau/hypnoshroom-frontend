<script setup lang="ts">
const languages = [
  {
    name: 'Scala',
    label: 'Core specialism',
    description: 'Scala services, Play Framework applications, sbt builds and the careful work involved in moving long-lived systems forward.',
    details: ['Scala 2 & Scala 3', 'Functional Programming', 'Play Framework', 'sbt', 'Unit testing', 'Integration testing'],
    logo: '/languages/scala.svg',
    link: '/scala-jvm',
    topic: 'Scala',
  },
  {
    name: 'Java',
    label: 'Backend engineering',
    description: 'Java services that need to be built, upgraded or made easier to own—without turning routine maintenance into a rewrite.',
    details: ['Spring Boot', 'Maven', 'JDK upgrades', 'REST APIs', 'Unit testing', 'Integration testing'],
    logo: '/languages/java.svg',
    link: '/java',
    topic: 'Java',
  },
  {
    name: 'TypeScript',
    label: 'Modern applications',
    description: 'Server-side TypeScript, APIs and full-stack applications where backend decisions still deserve proper attention.',
    details: ['Node.js', 'Nuxt', 'Fullstack development', 'Playwright Automated testing', 'Unit testing', 'Integration testing'],
    logo: '/languages/typescript.svg',
    link: '/typescript',
    topic: 'TypeScript',
  },
  {
    name: 'Python',
    label: 'Services & automation',
    description: 'Python backend services, modern AI API integrations, integrations and automation work that needs to fit cleanly into a wider system.',
    details: ['APIs', 'Automation', 'AI', 'Unit testing', 'Integration testing'],
    logo: '/languages/python.svg',
    link: '/python',
    topic: 'Python',
  },
]

const platforms = [
  {
    name: 'Vercel & serverless',
    description: 'Nuxt deployments, serverless functions and architecture choices that account for runtime limits, cost and operational visibility.',
    topic: 'Serverless',
  },
  {
    name: 'Cloud & containers',
    description: 'AWS, Google Cloud, Docker and Kubernetes work around the services being built or modernised.',
  },
  {
    name: 'Delivery & observability',
    description: 'CI/CD, logs, metrics and deployment practices that make backend changes safer to ship and easier to understand in production.',
  },
]

const databases = [
  {
    name: 'SQL & relational',
    technologies: 'PostgreSQL',
    description: 'Schema design, query behaviour, migrations and the application code responsible for reading and writing relational data.',
  },
  {
    name: 'NoSQL & key-value',
    technologies: 'Redis · key-value stores · document data',
    description: 'Data modelling, caching and integration decisions for workloads that do not fit neatly into a relational model.',
  }
]

const testingAreas = [
  {
    name: 'Unit & component testing',
    tools: 'ScalaTest · JUnit · Mockito · frontend component tests',
    description: 'Fast tests that explain behaviour clearly and make ordinary changes safer to ship.',
  },
  {
    name: 'Integration & contract testing',
    tools: 'APIs · databases · queues · third-party boundaries',
    description: 'Tests around the joins where otherwise-correct components tend to disagree in production.',
  },
  {
    name: 'End-to-end confidence',
    tools: 'Cucumber · Selenium · Playwright',
    description: 'A small number of valuable journeys, backed by reliable test data and a delivery pipeline that makes failures useful.',
  },
]

usePageSeo({
  title: 'Technical Expertise | Hypnoshroom',
  description: 'Backend expertise across Scala, Java, TypeScript, Python, SQL, NoSQL, Vercel, serverless and cloud delivery.',
  path: '/expertise',
})
</script>

<template>
  <div>
    <PageHero eyebrow="Expertise" title="Different languages. Same concerns." intro="Languages matters, but so do the boundaries, data, tests, deployments and production behaviour around it. Hypnoshroom works across the stack without treating every technology as a separate kind of consultancy." gradient="forest" />

    <section class="section-space">
      <div class="page-shell">
        <SectionHeading eyebrow="Languages" title="Choose the right tool for the job." intro="The shape and difficulty of the work matter more than the syntax. Engagements are built around the outcome rather than the chosen language." />
        <div class="mt-14 grid gap-6 md:grid-cols-2">
          <article v-for="language in languages" :key="language.name" class="relative rounded-2xl border border-line bg-white/35 p-7 sm:p-9">
            <div class="absolute right-7 top-7 flex h-14 w-14 items-center justify-center rounded-xl border border-line bg-white/60 p-2.5 sm:right-9 sm:top-9" aria-hidden="true">
              <img :src="language.logo" alt="" width="40" height="40" class="h-full w-full object-contain">
            </div>
            <p class="pr-16 text-xs font-semibold uppercase tracking-[0.16em] text-moss">{{ language.label }}</p>
            <h2 class="mt-3 font-display text-4xl">{{ language.name }}</h2>
            <p class="mt-4 leading-7 text-ink/60">{{ language.description }}</p>
            <ul class="mt-6 flex flex-wrap gap-2">
              <li v-for="detail in language.details" :key="detail" class="rounded-full border border-line px-3 py-1.5 text-xs text-ink/65">{{ detail }}</li>
            </ul>
            <AppButton v-if="language.link" :to="language.link" variant="text" class="mt-6">Explore {{ language.name }} services</AppButton>
            <AppButton v-else :to="`/insights?topic=${encodeURIComponent(language.topic)}`" variant="text" class="mt-2">Read {{ language.name }} articles</AppButton>
          </article>
        </div>
      </div>
    </section>

    <section id="databases" class="section-space scroll-mt-28 border-t border-line">
      <div class="page-shell">
        <SectionHeading eyebrow="Databases" title="SQL, NoSQL and the code in between." intro="Good database work is rarely isolated from the application. Hypnoshroom looks at the model, the queries and the behaviour of the service using them." />
        <div class="mt-12 grid gap-6 lg:grid-cols-3">
          <article v-for="database in databases" :key="database.name" class="rounded-2xl border border-line bg-white/35 p-7">
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-moss">{{ database.technologies }}</p>
            <h2 class="mt-4 font-display text-3xl">{{ database.name }}</h2>
            <p class="mt-4 leading-7 text-ink/60">{{ database.description }}</p>
          </article>
        </div>
        <div class="mt-8 flex flex-wrap gap-x-8 gap-y-2">
          <AppButton to="/services/engineering-delivery" variant="text">View engineering delivery</AppButton>
          <AppButton to="/insights?topic=Databases" variant="text">Read database articles</AppButton>
        </div>
      </div>
    </section>

    <section id="testing" class="section-space scroll-mt-28 border-t border-line bg-[#eee9f0]">
      <div class="page-shell">
        <SectionHeading eyebrow="Testing &amp; quality" title="Confidence at every level." intro="A healthy test strategy is not a race for coverage. It should give quick feedback close to the code and stronger evidence at the boundaries that matter." />
        <div class="mt-12 grid gap-6 lg:grid-cols-3">
          <article v-for="area in testingAreas" :key="area.name" class="border-t border-plum/25 pt-6">
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-plum">{{ area.tools }}</p>
            <h2 class="mt-4 font-display text-3xl">{{ area.name }}</h2>
            <p class="mt-4 leading-7 text-ink/60">{{ area.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section-space border-y border-line bg-[#ece8de]">
      <div class="page-shell">
        <SectionHeading eyebrow="Platforms &amp; delivery" title="Where the code lives." intro="Backend work includes the path to production and what happens after a service gets there." />
        <div class="mt-12 grid gap-6 lg:grid-cols-3">
          <article v-for="platform in platforms" :key="platform.name" class="border-t border-ink/20 pt-6">
            <h2 class="font-display text-3xl">{{ platform.name }}</h2>
            <p class="mt-4 leading-7 text-ink/60">{{ platform.description }}</p>
            <AppButton v-if="platform.topic" :to="`/insights?topic=${platform.topic}`" variant="text" class="mt-4">Read related articles</AppButton>
          </article>
        </div>
      </div>
    </section>

    <section class="section-space">
      <div class="page-shell rounded-3xl border border-line bg-white/35 p-8 sm:p-12 lg:flex lg:items-end lg:justify-between lg:gap-12">
        <div class="max-w-2xl">
          <p class="eyebrow">Engineering support</p>
          <h2 class="font-display text-4xl sm:text-5xl">Engagements shaped around the work.</h2>
          <p class="mt-5 text-lg leading-8 text-ink/60">Hands-on engineering, assessments and delivery sprints can each be structured to suit the system, the team and the outcome being pursued.</p>
        </div>
        <AppButton to="/contact" class="mt-8 shrink-0 lg:mt-0">Discuss a project</AppButton>
      </div>
    </section>

    <ContactCta />
  </div>
</template>
