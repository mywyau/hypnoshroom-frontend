<script setup lang="ts">
const stages = [
  { number: '01', title: 'Understand', text: 'First a proper conversation about the system, where it hurts and what a useful outcome would look like.' },
  { number: '02', title: 'Investigate', text: 'The work then moves into the code, architecture, tests, dependencies and delivery setup—where the real constraints tend to hide.' },
  { number: '03', title: 'Deliver', text: 'From there, Hypnoshroom implements and tests the agreed changes or gives the team a clear, ordered plan it can use.' },
]
</script>

<template>
  <section class="section-space border-y border-line bg-ink text-paper">
    <div class="page-shell">
      <SectionHeading eyebrow="How it works" title="No theatre. Just a clear way forward." intro="Untangle the problem. Make the next move obvious." theme="dark" />
      <div class="relative mt-16">
        <div class="absolute left-[16%] right-[16%] top-4 hidden border-t border-dashed border-paper/25 lg:block" aria-hidden="true" />
        <ol class="relative grid gap-10 lg:grid-cols-3 lg:gap-16">
          <li v-for="stage in stages" :key="stage.number" class="relative">
            <span class="relative z-10 inline-grid size-8 place-items-center rounded-full border border-paper/30 bg-ink font-mono text-xs text-[#a9c3b4]">{{ stage.number }}</span>
            <h3 class="mt-8 font-display text-3xl">{{ stage.title }}</h3>
            <p class="mt-4 max-w-sm leading-7 text-paper/60">{{ stage.text }}</p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
