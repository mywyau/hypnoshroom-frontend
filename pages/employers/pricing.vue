<script setup lang="ts">
import { postingPlans } from '~/domain/employers/pricing'

const user = useAccountUser()
const currentPlanId = computed(() => {
  if (!user.value) return null
  const assignedPlan = user.value.app_metadata.posting_plan
  return postingPlans.find(plan => plan.id === assignedPlan)?.id ?? 'free'
})

usePageSeo({
  title: 'Employer and recruiter pricing preview | Hypnoshroom',
  description: 'Explore sample listing prices for UK engineering jobs.',
  path: '/employers/pricing',
  robots: 'noindex, follow',
})
</script>

<template>
  <div>
    <PageHero eyebrow="Employers &amp; recruiters" title="Pricing plans." gradient="forest" size="compact"
      intro="These are illustrative prices. Select a plan to try the posting form without signing in or making a payment." />
    <section aria-label="Sample posting plans" class="page-shell grid gap-5 py-10 md:grid-cols-3 lg:py-16">
      <article v-for="plan in postingPlans" :key="plan.id" class="flex flex-col items-start rounded-2xl border bg-white/50 p-6 sm:p-9"
        :class="plan.id === currentPlanId ? 'border-moss ring-1 ring-moss' : 'border-line'">
        <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h2 class="font-display text-3xl">{{ plan.name }}</h2>
          <span v-if="plan.id === currentPlanId" class="rounded-full bg-moss px-3 py-1 text-xs font-semibold text-white">Current plan</span>
        </div>
        <p class="mt-4 flex items-baseline gap-3"><RollingPrice :price="plan.price" /><span class="text-sm">{{ plan.allowance }}</span></p>
        <p class="mb-6 mt-4 max-w-md flex-1 leading-7 text-ink/75">{{ plan.description }}</p>
        <AppButton :to="'/employers/post-a-role?preview=1&plan=' + plan.id">Try {{ plan.name.toLowerCase() }}</AppButton>
      </article>
      <p class="text-sm leading-6 text-ink/75 md:col-span-3">All plans include a review of your organisation’s first listing. Additional paid listings follow the same review policy.</p>
    </section>
  </div>
</template>
