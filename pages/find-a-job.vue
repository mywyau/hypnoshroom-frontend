<script setup lang="ts">
const boardsComingSoon = !import.meta.dev
const config = useRuntimeConfig().public
const showAccount = import.meta.dev && Boolean(config.employerSupabaseUrl && config.employerSupabaseKey)
const boards = [
  {
    title: 'Contract roles',
    description: 'Find engineering contracts by discipline, language and IR35 status. Check the advertised day rate and contract length.',
    to: '/contracts',
  },
  {
    title: 'Permanent and temporary jobs',
    description: 'Find permanent and fixed-term engineering roles by location and remote working options. Compare the advertised salary ranges.',
    to: '/jobs',
  },
]

usePageSeo({
  title: 'Find an engineering job | Hypnoshroom',
  description: 'Explore UK engineering contracts, permanent jobs and fixed-term roles. Compare a contract day rate with a salary offer.',
  path: '/find-a-job',
})
</script>

<template>
  <div>
    <PageHero eyebrow="For job seekers" title="Find your next job." intro="Choose the kind of engineering work you’re looking for in the UK." gradient="forest" size="compact-title" />
    <div class="page-shell py-10 sm:py-16">
      <nav aria-label="Engineering job boards" class="grid gap-5 md:grid-cols-2">
        <NuxtLink v-for="board in boards" :key="board.to" :to="board.to" class="group rounded-2xl border border-moss/25 bg-white/40 p-6 transition hover:border-moss sm:p-8">
          <h2 class="font-display text-3xl group-hover:underline">{{ board.title }}</h2>
          <p v-if="boardsComingSoon" class="mt-2 text-sm font-semibold text-moss">Coming soon</p>
          <p class="mt-4 max-w-lg leading-7 text-ink/75">{{ board.description }}</p>
        </NuxtLink>
      </nav>
      <section class="mt-10 border-t border-line pt-8">
        <h2 class="font-display text-2xl">Comparing offers?</h2>
        <p class="mt-2 leading-7 text-ink/75">See how a contract day rate compares with a permanent salary.</p>
        <NuxtLink to="/contractor-intelligence" class="mt-2 inline-flex min-h-11 items-center font-semibold text-moss underline underline-offset-4">Explore contractor calculators</NuxtLink>
      </section>
    </div>
  </div>
</template>
