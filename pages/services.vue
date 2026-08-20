<script setup lang="ts">
import { services } from '~/data/services'

usePageSeo({
  title: 'Services | Hypnoshroom Software Engineering Consultancy',
  description: 'Engineering support, technical reviews and software modernisation from Hypnoshroom.',
  path: '/services',
})
</script>

<template>
  <div>
    <PageHero eyebrow="Services" title="Practical ways to move software forward." intro="Own a piece of delivery, add engineering capacity, understand what is going wrong or modernise what is already there. The engagement starts with the outcome and stays as simple as the work allows." />
    <div class="page-shell">
      <ServiceSection v-for="(service, index) in services" :key="service.id" :service="service" :number="String(index + 1).padStart(2, '0')" :reverse="index % 2 === 1" />

      <section class="border-t border-line py-12 sm:flex sm:items-center sm:justify-between sm:gap-8">
        <div>
          <p class="eyebrow">Languages &amp; platforms</p>
          <h2 class="font-display text-3xl sm:text-4xl">Looking for a particular technology?</h2>
        </div>
        <AppButton to="/expertise" variant="secondary" class="mt-6 sm:mt-0">Explore expertise</AppButton>
      </section>
      <p class="border-t border-line py-8 text-sm text-ink/55"><strong class="text-ink">About engagement scope:</strong> The shape of the work depends on the system, the outcome and how much ground needs to be covered.</p>
    </div>
    <ContactCta />
  </div>
</template>
