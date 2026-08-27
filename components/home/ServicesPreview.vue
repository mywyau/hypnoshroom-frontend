<script setup lang="ts">
import { services } from '~/data/services'
</script>

<template>
  <section class="section-space">
    <div class="page-shell">
      <div class="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading eyebrow="Services" title="Build. Understand. Improve." intro="Review a difficult system, add experienced engineering capacity or deliver a clearly defined software outcome." />
        <AppButton to="/services" variant="text">View all services</AppButton>
      </div>
      <div class="mt-14 grid gap-x-5 sm:grid-cols-2 lg:grid-cols-3">
        <ServiceCard v-for="service in services" :key="service.id" :service="service" />
      </div>
    </div>
  </section>
</template>
