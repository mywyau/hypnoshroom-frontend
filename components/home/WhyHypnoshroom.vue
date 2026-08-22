<script setup lang="ts">
import { Eye, PackageCheck, Scale, UserRoundCheck } from '@lucide/vue'

const reasons = [
  { icon: UserRoundCheck, title: 'Ownership', text: 'Technical responsibility stays with the engineer doing the work, reducing hand-offs between scoping, decisions and delivery.' },
  { icon: Scale, title: 'Right-sized from the start', text: 'The engagement is shaped around the outcome. Extra roles, meetings and process create noise and are only if need be.' },
  { icon: Eye, title: 'Work stays visible', text: 'Decisions, code, tests and progress can be reviewed as the work develops.' },
  { icon: PackageCheck, title: 'Built to last', text: 'The aim is stronger software and a team able to own it. Not a system that depends on our permanent support.' },
]
</script>

<template>
  <section class="section-space">
    <div class="page-shell">
      <SectionHeading eyebrow="Why Hypnoshroom" title="Direct engineering with clear ownership." intro="Scoping, delivery and progress stay connected throughout the engagement. The work fits around the client’s existing team and adds only the process needed for the agreed outcome." />
      <div class="mt-14 grid overflow-hidden rounded-2xl border border-line sm:grid-cols-2 lg:grid-cols-4">
        <article v-for="reason in reasons" :key="reason.title" class="min-h-64 border-b border-line p-7 last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0">
          <span class="flex size-11 items-center justify-center rounded-xl border border-moss/20 bg-paper text-moss shadow-sm" aria-hidden="true">
            <component :is="reason.icon" class="size-5" :stroke-width="1.7" />
          </span>
          <h3 class="mt-10 font-display text-2xl">{{ reason.title }}</h3>
          <p class="mt-3 text-sm leading-6 text-ink/60">{{ reason.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
