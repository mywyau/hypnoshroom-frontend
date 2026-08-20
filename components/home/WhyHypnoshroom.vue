<script setup lang="ts">
const reasons = [
  { number: '01', title: 'Small by design', text: 'Every engagement is handled directly by the founder, from the first call through to delivery.' },
  { number: '02', title: 'JVM specialist', text: 'Scala and Java aren’t a sideline here. They’re the point.' },
  { number: '03', title: 'Hands-on delivery', text: 'The work does not stop at a report. Findings can be followed through into code and production.' },
  { number: '04', title: 'Flexible engagements', text: 'Work can take the shape of a short review, a contained sprint or longer engineering support.' },
]
</script>

<template>
  <section class="section-space">
    <div class="page-shell">
      <SectionHeading eyebrow="Why Hypnoshroom" title="Specialist attention, without layers." />
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
