<script setup lang="ts">
const paths = [
  {
    audience: 'For job seekers',
    title: 'Find your next job.',
    description: import.meta.dev ? 'Browse UK engineering contracts, permanent and temporary roles, or compare a day rate with a salary offer.' : 'Our engineering job boards are coming soon. You can already compare a contract day rate with a salary offer.',
    action: { label: 'Find a job', to: '/find-a-job' },
  },
  {
    audience: 'For engineering teams',
    title: 'Engineering consultancy.',
    description: 'Get a technical review, bring an engineer into your team or scope a specific piece of software delivery.',
    action: { label: 'Explore consultancy', to: '/consultancy' },
  },
]
</script>

<template>
  <div class="page-shell py-8 sm:py-14 lg:py-20">
    <h1 class="sr-only">Hypnoshroom engineering jobs and consultancy</h1>
    <div class="grid gap-5 md:grid-cols-2 lg:gap-7">
      <section v-for="path in paths" :key="path.action.to" class="entry-card relative flex flex-col rounded-3xl border p-6 sm:p-9 lg:min-h-[26rem] lg:p-12">
        <p class="mb-5 text-xs font-semibold uppercase tracking-[0.16em]">{{ path.audience }}</p>
        <h2 class="font-display text-4xl leading-tight tracking-tight lg:text-5xl">{{ path.title }}</h2>
        <p class="mb-8 mt-4 max-w-md leading-7">{{ path.description }}</p>
        <div class="mt-auto">
          <NuxtLink :to="path.action.to" class="entry-action inline-flex min-h-12 items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold after:absolute after:inset-0 after:rounded-3xl">
            {{ path.action.label }} <span aria-hidden="true">→</span>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.entry-card {
  --lit-surface: #f3faef;
  --lit-border: #72987d;
  --glow: rgb(86 137 98 / 24%);
  @apply border-moss/20 bg-[#e7ede4] text-ink;
  transition: background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}
.entry-action { @apply bg-moss text-white; }
.entry-card:last-child {
  --lit-surface: #eadcf0;
  --lit-border: #9975a5;
  --glow: rgb(128 89 144 / 30%);
  @apply border-plum bg-plum text-white;
}
.entry-card:hover, .entry-card:focus-within {
  background-color: var(--lit-surface);
  border-color: var(--lit-border);
  box-shadow: 0 0 0 1px var(--lit-border), 0 6px 24px var(--glow);
}
.entry-card:last-child .entry-action { @apply bg-paper text-ink; }
.entry-card:last-child:is(:hover, :focus-within) { color: #382b40; }
.entry-card:last-child:is(:hover, :focus-within) .entry-action { @apply bg-plum text-white; }
.entry-action:hover { @apply underline underline-offset-4; }
</style>
