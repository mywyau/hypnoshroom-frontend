<script setup lang="ts">
const reasons = [
  { number: '01', title: 'Direct ownership', text: 'The person who understands the problem is also responsible for the work. Nothing important is lost between sales, account management and delivery.' },
  { number: '02', title: 'Right-sized from the start', text: 'The engagement is shaped around the outcome. Extra roles, meetings and process are not added unless the work genuinely needs them.' },
  { number: '03', title: 'Work stays visible', text: 'Decisions, code, tests and progress can be reviewed as the work develops. There is no polished reveal at the end of a quiet month.' },
  { number: '04', title: 'Built to hand back', text: 'The aim is stronger software and a team able to own it—not a system that depends on permanent consultancy support.' },
]
</script>

<template>
  <section class="section-space">
    <div class="page-shell">
      <SectionHeading eyebrow="Why Hypnoshroom" title="The useful parts of consultancy. Less of the machinery." intro="Large programmes sometimes need large suppliers. Focused engineering work often benefits from a shorter path between the problem, the decision and the code." />
      <div class="mt-14 grid overflow-hidden rounded-2xl border border-line sm:grid-cols-2 lg:grid-cols-4">
        <article v-for="reason in reasons" :key="reason.number" class="min-h-64 border-b border-line p-7 last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0">
          <span class="font-mono text-xs text-clay">{{ reason.number }}</span>
          <h3 class="mt-16 font-display text-2xl">{{ reason.title }}</h3>
          <p class="mt-3 text-sm leading-6 text-ink/60">{{ reason.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
