<script setup lang="ts">
import { scalaServices } from '~/data/services'

const areas = [
  ['Languages', 'Scala · Java'],
  ['Frameworks', 'Play Framework · Spring Boot'],
  ['Builds & upgrades', 'sbt · Maven · JDK upgrades · dependency modernisation'],
  ['Backend systems', 'REST APIs · microservices · distributed systems · relational databases'],
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

    <div class="page-shell">
      <section class="border-t border-line py-12 sm:flex sm:items-center sm:justify-between sm:gap-10">
        <div class="max-w-2xl">
          <p class="eyebrow">Hands-on engineering</p>
          <h2 class="font-display text-3xl sm:text-4xl">Need Scala or Java delivery support?</h2>
          <p class="mt-4 leading-7 text-ink/60">Scala and JVM work is available through the general backend engineering service, using the same starting rate of £600/day.</p>
        </div>
        <AppButton to="/services#backend-engineering" variant="secondary" class="mt-6 shrink-0 sm:mt-0">View engineering support</AppButton>
      </section>
      <ServiceSection v-for="(service, index) in scalaServices" :key="service.id" :service="service" :number="String(index + 1).padStart(2, '0')" :reverse="index % 2 === 1" />
      <p class="border-t border-line py-8 text-sm text-ink/55"><strong class="text-ink">About the prices:</strong> They’re a useful starting point, not a quote. The final cost depends on the system and how much ground the work needs to cover.</p>
    </div>

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
