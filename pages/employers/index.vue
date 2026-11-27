<script setup lang="ts">
definePageMeta({
  middleware: (to) => {
    // Previously issued sign-in emails and bookmarked previews use the employer homepage.
    if (to.query.code || to.query.error || to.query.error_code || new URLSearchParams(to.hash.slice(1)).has('error')) {
      return navigateTo({ path: '/employers/post-a-role', query: { code: to.query.code, error: to.query.error, error_code: to.query.error_code }, hash: to.hash }, { replace: true })
    }
    if (to.query.preview === '1') {
      return navigateTo({ path: '/employers/post-a-role', query: { preview: '1', plan: to.query.plan } }, { replace: true })
    }
  },
})
const config = useRuntimeConfig().public
const hasAccounts = Boolean(config.employerSupabaseUrl && config.employerSupabaseKey)
usePageSeo({ title: 'For employers and recruiters | Hypnoshroom', description: 'Post UK engineering roles, manage listings and explore employer pricing.', path: '/employers' })
</script>

<template>
  <div>
    <PageHero eyebrow="Employers &amp; recruiters" title="Hire engineers." intro="Reach engineers looking for UK contracts, permanent jobs and fixed-term roles." gradient="forest" />
    <section class="page-shell py-10 sm:py-16" aria-label="Employer resources">
      <div class="grid gap-5 sm:grid-cols-2">
        <article class="rounded-2xl border border-line bg-white/40 p-6 sm:p-8">
          <h2 class="font-display text-3xl">Advertise a role</h2>
          <p class="mb-6 mt-3 text-ink/75">{{ hasAccounts ? 'Share the skills, pay and working arrangements candidates need to decide whether to apply.' : 'Try the posting form and see how your listing will look to candidates.' }}</p>
          <AppButton to="/employers/post-a-role">{{ hasAccounts ? 'Post a role' : 'Preview a job posting' }}</AppButton>
          <NuxtLink v-if="hasAccounts" to="/employers/post-a-role?view=listings" class="ml-3 inline-block text-moss underline">Manage listings</NuxtLink>
        </article>
        <article class="rounded-2xl border border-line bg-white/40 p-6 sm:p-8">
          <h2 class="font-display text-3xl">Pricing plans</h2>
          <p class="mb-6 mt-3 text-ink/75">Explore sample pricing for a single vacancy or several openings.</p>
          <AppButton to="/employers/pricing" variant="secondary">View pricing</AppButton>
        </article>
      </div>
      <!-- <nav aria-label="Browse the job boards" class="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-moss underline"> -->
        <!-- <NuxtLink to="/contracts">View contracts</NuxtLink> -->
        <!-- <NuxtLink to="/jobs">View permanent and temporary jobs</NuxtLink> -->
      <!-- </nav> -->
    </section>
  </div>
</template>
