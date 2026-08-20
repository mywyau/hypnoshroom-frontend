<script setup lang="ts">
import { services } from '~/data/services'
</script>

<template>
  <section class="section-space">
    <div class="page-shell">
      <div class="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading eyebrow="Services" title="Some backend problems need a closer look." intro="You might need someone to untangle a Scala upgrade, work out why a service is so painful to change, or help ship the fix. Hypnoshroom can start wherever you are." />
        <AppButton to="/services" variant="text">View all services</AppButton>
      </div>
      <div class="mt-14 grid gap-x-5 sm:grid-cols-2 lg:grid-cols-4">
        <ServiceCard v-for="service in services" :key="service.id" :service="service" />
      </div>
      <p class="mt-8 text-xs text-ink/50">These are guide prices. A proper quote follows once the system and the work are understood.</p>
    </div>
  </section>
</template>
