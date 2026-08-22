<script setup lang="ts">
const languages = [
  {
    name: 'Scala',
    label: 'Core specialism',
    description: 'Scala services, Play Framework applications, sbt builds and the careful work involved in moving long-lived systems forward.',
    details: ['Scala 2 & Scala 3', 'Functional Programming', 'Play Framework', 'sbt', 'Unit testing', 'Integration testing'],
    logo: '/languages/scala.svg',
    link: '/scala',
    topic: 'Scala',
  },
  {
    name: 'Java',
    label: 'Backend engineering',
    description: 'Java powers long-lived business platforms, APIs and backend services where stability, JVM performance and strong tooling matter. We help teams keep those systems reliable and easier to change.',
    details: ['Spring Boot', 'Maven', 'JDK upgrades', 'REST APIs', 'Unit testing', 'Integration testing'],
    logo: '/languages/java.svg',
    link: '/java',
    topic: 'Java',
  },
  {
    name: 'TypeScript',
    label: 'Frontend and Modern applications',
    description: 'SSR, Client side rendering, APIs and full-stack applications. TypeScript is a great choice for modern frontends and Saas.',
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
    name: 'Containers & cloud environments',
    description: 'Docker delivery and production support for applications operating in AWS-backed environments.',
  },
  {
    name: 'Delivery & observability',
    description: 'CI/CD, logs, metrics and deployment practices that make backend changes safer to ship and easier to understand in production.',
  },
]

const databases = [
  {
    name: 'Relational data',
    technologies: 'PostgreSQL',
    description: 'Schemas, normalisation, indexes, queries and migrations—alongside the persistence code responsible for keeping relational constraints clear.',
  },
  {
    name: 'Document data',
    technologies: 'MongoDB',
    description: 'Document shapes, indexes and query patterns designed around how the service reads, changes and owns its data.',
  },
  {
    name: 'Persistence boundaries',
    technologies: 'Repositories · integration tests',
    description: 'Clear interfaces, validation, failure handling and tests at the point where application behaviour meets stored data.',
  },
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
    name: 'End-to-end testing',
    tools: 'Cucumber · Selenium · Playwright',
    description: 'A small number of valuable journeys, backed by reliable test data and a delivery pipeline that makes failures useful.',
  },
]

usePageSeo({
  title: 'Software Engineering Expertise | Hypnoshroom',
  description: 'Explore Hypnoshroom’s expertise in Scala, Java, TypeScript, Python, APIs, databases, automated testing and pragmatic production delivery.',
  path: '/expertise',
})
</script>

<template>
  <div>
    <PageHero eyebrow="Expertise" title="Our Expertise." intro="Language matters, but so do boundaries, data, tests, deployments and production behaviour. See where Hypnoshroom can help across the stack." gradient="forest" />

    <section class="section-space">
      <div class="page-shell">
        <SectionHeading eyebrow="Languages" title="What we can help with." intro="The language sets the context. The real work is making the system safer to change, easier to operate and clearer for the team to own." />
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
        <SectionHeading eyebrow="Databases" title="Data models that fit the application." intro="Database design and application design belong together. Schemas, documents, queries, indexes and persistence code are considered as one working boundary." />
        <div class="mt-12 grid gap-6 lg:grid-cols-3">
          <article v-for="database in databases" :key="database.name" class="rounded-2xl border border-line bg-white/35 p-7">
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-moss">{{ database.technologies }}</p>
            <h2 class="mt-4 font-display text-3xl">{{ database.name }}</h2>
            <p class="mt-4 leading-7 text-ink/60">{{ database.description }}</p>
          </article>
        </div>
        <div class="mt-8 flex flex-wrap gap-x-8 gap-y-2">
          <AppButton to="/services/embedded-engineering-support" variant="text">View embedded engineering</AppButton>
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
