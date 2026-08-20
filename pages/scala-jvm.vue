<script setup lang="ts">
const areas = [
  ['Languages', 'Scala · Java'],
  ['Frameworks', 'Play Framework · Spring Boot'],
  ['Builds & upgrades', 'sbt · Maven · JDK upgrades · dependency modernisation'],
  ['Backend systems', 'REST APIs · microservices · distributed systems · relational databases'],
]

const support = [
  {
    title: 'Engineering delivery',
    text: 'Take a defined Scala or Java service, API, integration or production problem through to delivery.',
    to: '/services#engineering-support',
  },
  {
    title: 'Embedded engineering',
    text: 'Add Scala or Java experience directly to an existing team for a defined period or delivery need.',
    to: '/services#embedded-engineering',
  },
  {
    title: 'Technical review',
    text: 'A close look at Scala 3 readiness, Play, sbt, JDK versions, dependencies, tests and architecture.',
    to: '/services#technical-review',
  },
  {
    title: 'Modernisation',
    text: 'Carry an upgrade or improvement through in controlled, reviewable stages without defaulting to a rewrite.',
    to: '/services#modernisation',
  },
]

usePageSeo({
  title: 'Scala & JVM Engineering | Hypnoshroom',
  description: 'Specialist Scala and JVM engineering, modernisation assessments, Play Framework upgrades and hands-on delivery.',
  path: '/scala-jvm',
})
</script>

<template>
  <div>
    <PageHero eyebrow="Scala & JVM" title="A specialist home for difficult JVM work." intro="Scala and Java systems can run for a long time—and collect a lot of history along the way. Hypnoshroom helps teams understand that history, make safer changes and move older services onto firmer ground." />

    <section class="border-b border-line bg-[#ece8de] py-12">
      <div class="page-shell grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="area in areas" :key="area[0]" class="border-t border-ink/15 pt-4">
          <h2 class="text-xs font-semibold uppercase tracking-[0.16em] text-moss">{{ area[0] }}</h2>
          <p class="mt-3 text-sm leading-6 text-ink/65">{{ area[1] }}</p>
        </div>
      </div>
    </section>

    <section class="section-space">
      <div class="page-shell">
        <SectionHeading eyebrow="Ways to work together" title="The same services, with JVM depth." intro="Scala and Java expertise can be applied to delivery, added team capacity, diagnosis or modernisation depending on what the system needs." />
        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <article v-for="item in support" :key="item.title" class="rounded-2xl border border-line bg-white/35 p-7 sm:p-9">
            <h2 class="font-display text-3xl">{{ item.title }}</h2>
            <p class="mt-4 leading-7 text-ink/60">{{ item.text }}</p>
            <AppButton :to="item.to" variant="text" class="mt-6">View service</AppButton>
          </article>
        </div>
      </div>
    </section>

    <section class="section-space border-t border-line">
      <div class="page-shell grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
        <div>
          <p class="eyebrow">Not only JVM</p>
          <h2 class="font-display text-4xl leading-tight sm:text-5xl">Working across a mixed technology estate?</h2>
          <p class="mt-5 max-w-2xl text-lg leading-8 text-ink/60">Backend problems rarely respect language boundaries. TypeScript, serverless and broader delivery support sit under the main Services section.</p>
        </div>
        <AppButton to="/services" variant="secondary" class="justify-self-start lg:justify-self-end">View all services</AppButton>
      </div>
    </section>

    <ContactCta />
  </div>
</template>
