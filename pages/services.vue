<script setup lang="ts">
import { services } from '~/data/services'

usePageSeo({
  title: 'Services | Hypnoshroom Scala & JVM Consultancy',
  description: 'Help with Scala and Java delivery, awkward upgrades, backend health checks and modernisation work.',
  path: '/services',
})
</script>

<template>
  <div>
    <PageHero eyebrow="Services" title="Help with the backend work that won’t stay simple." intro="A stubborn Scala upgrade. An ageing Java service. A codebase nobody feels comfortable changing. Hypnoshroom helps work out what it needs—and gets on with it." />
    <div class="page-shell">
      <ServiceSection v-for="(service, index) in services" :key="service.id" :service="service" :reverse="index % 2 === 1" />
      <p class="border-t border-line py-8 text-sm text-ink/55"><strong class="text-ink">About the prices:</strong> They’re a useful starting point, not a quote. The final cost depends on the system and how much ground the work needs to cover.</p>
    </div>
    <ContactCta />
  </div>
</template>
