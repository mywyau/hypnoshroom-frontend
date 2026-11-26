<script setup lang="ts">
const paths = [
  {
    audience: 'For job seekers',
    title: 'Find your next job.',
    description: 'Browse UK engineering contracts and permanent roles, or compare a day rate with a salary offer.',
    action: { label: 'Browse contracts', to: '/contracts' },
    links: [
      { label: 'Full-time jobs', to: '/jobs' },
      { label: 'Contractor calculators', to: '/contractor-intelligence' },
    ],
  },
  {
    audience: 'For engineering teams',
    title: 'Engineering consultancy.',
    description: 'Get a technical review, bring an engineer into your team or scope a specific piece of software delivery.',
    action: { label: 'Explore consultancy', to: '/consultancy' },
    links: [{ label: 'Discuss a project', to: '/contact' }],
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
          <div class="mt-4 flex flex-wrap gap-x-5">
            <NuxtLink v-for="link in path.links" :key="link.to" :to="link.to" class="relative z-10 inline-flex min-h-11 items-center text-sm font-medium underline underline-offset-4">{{ link.label }}</NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.entry-card { @apply border-moss/20 bg-[#e7ede4] text-ink; }
.entry-action { @apply bg-moss text-white; }
.entry-card:last-child { @apply border-plum bg-plum text-white; }
.entry-card:last-child .entry-action { @apply bg-paper text-ink; }
.entry-action:hover { @apply underline underline-offset-4; }
</style>
