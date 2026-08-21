<script setup lang="ts">
const practices = [
  {
    title: 'Fast feedback',
    text: 'Unit and component tests should make everyday changes safer without turning the build into a waiting exercise.',
  },
  {
    title: 'Real boundaries',
    text: 'Integration and contract tests protect the places where services, databases, queues and third-party systems meet.',
  },
  {
    title: 'Production confidence',
    text: 'Reliable delivery also needs useful CI checks, observable behaviour and a release path the team trusts.',
  },
]
</script>

<template>
  <section class="section-space border-b border-line">
    <div class="page-shell grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <div>
        <p class="eyebrow">Testing &amp; quality</p>
        <h2 class="font-display text-4xl leading-tight sm:text-5xl">Testing throughout.</h2>
        <p class="mt-6 text-lg leading-8 text-ink/65">Hypnoshroom treats testing as part of engineering: a way to understand existing behaviour, make changes with confidence and keep software maintainable after delivery.</p>
        <AppButton to="/expertise#testing" variant="text" class="mt-6">Explore testing expertise</AppButton>
      </div>
      <div class="grid gap-5 sm:grid-cols-3">
        <article v-for="(practice, index) in practices" :key="practice.title" class="rounded-2xl border border-line bg-white/35 p-6">
          <span class="font-mono text-xs text-clay">0{{ index + 1 }}</span>
          <h3 class="mt-10 font-display text-2xl">{{ practice.title }}</h3>
          <p class="mt-3 text-sm leading-6 text-ink/60">{{ practice.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
