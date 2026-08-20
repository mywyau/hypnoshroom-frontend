<script setup lang="ts">
import { generalServices } from '~/data/services'

const databaseServices = [
  {
    title: 'SQL databases',
    text: 'Help with relational data that has become slow, difficult to change or too tightly coupled to the application around it.',
    items: ['Schema and query design', 'Performance investigation', 'Data migrations', 'PostgreSQL, Oracle and MySQL'],
  },
  {
    title: 'NoSQL & key-value stores',
    text: 'Data modelling and integration support where document, key-value or cache-oriented storage is a better fit than another relational table.',
    items: ['Data modelling', 'Caching and session design', 'Redis', 'Choosing the right storage model'],
  },
]

usePageSeo({
  title: 'Services | Hypnoshroom Scala & JVM Consultancy',
  description: 'Backend engineering, system reviews, TypeScript, serverless delivery and modernisation support from Hypnoshroom.',
  path: '/services',
})
</script>

<template>
  <div>
    <PageHero eyebrow="Services" title="Backend engineering, without the narrow technology box." intro="Hypnoshroom works across backend systems, delivery tooling and modernisation—from TypeScript services and serverless applications to long-lived platforms that need careful change." />
    <div class="page-shell">
      <ServiceSection v-for="(service, index) in generalServices" :key="service.id" :service="service" :number="String(index + 1).padStart(2, '0')" :reverse="index % 2 === 1" />

      <section id="database-services" class="scroll-mt-28 border-t border-line py-16 sm:py-20">
        <SectionHeading eyebrow="Database services" title="The database is part of the backend, not an afterthought." intro="Whether the system uses SQL, NoSQL or both, the data model and application code need to make sense together." />
        <div class="mt-12 grid gap-6 md:grid-cols-2">
          <article v-for="service in databaseServices" :key="service.title" class="rounded-2xl border border-line bg-white/35 p-7 sm:p-9">
            <h2 class="font-display text-3xl">{{ service.title }}</h2>
            <p class="mt-4 leading-7 text-ink/60">{{ service.text }}</p>
            <ul class="mt-6 grid gap-3 text-sm text-ink/65 sm:grid-cols-2">
              <li v-for="item in service.items" :key="item" class="flex gap-2"><span aria-hidden="true" class="text-moss">—</span>{{ item }}</li>
            </ul>
          </article>
        </div>
        <div class="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <AppButton to="/contact">Discuss database work</AppButton>
          <p class="text-sm text-ink/50">Available through the general engineering rate or as part of a scoped review.</p>
        </div>
      </section>

      <section class="border-t border-line py-12 sm:flex sm:items-center sm:justify-between sm:gap-8">
        <div>
          <p class="eyebrow">Languages &amp; platforms</p>
          <h2 class="font-display text-3xl sm:text-4xl">Looking for a particular technology?</h2>
        </div>
        <AppButton to="/expertise" variant="secondary" class="mt-6 sm:mt-0">Explore expertise</AppButton>
      </section>
      <p class="border-t border-line py-8 text-sm text-ink/55"><strong class="text-ink">About the prices:</strong> They’re a useful starting point, not a quote. The final cost depends on the system and how much ground the work needs to cover.</p>
    </div>
    <ContactCta />
  </div>
</template>
