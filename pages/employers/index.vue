<script setup lang="ts">
const config = useRuntimeConfig().public
usePageSeo({ title: 'Employer account | Hypnoshroom', description: 'Publish and manage your contract briefs.', path: '/employers', robots: 'noindex, follow' })
</script>

<template>
  <div>
    <PageHero eyebrow="Engineering jobs" title="Employer account." intro="Publish a UK contract or permanent role and direct applicants to your own site." gradient="forest" />
    <section class="page-shell py-10">
      <NuxtLink to="/contracts" class="text-moss underline">View contracts</NuxtLink>
      <NuxtLink to="/jobs" class="ml-4 text-moss underline">View full-time jobs</NuxtLink>
      <div class="employer-workspace mt-6 max-w-3xl">
        <ClientOnly v-if="config.employerSupabaseUrl && config.employerSupabaseKey">
          <EmployerAccount />
          <template #fallback><p>Loading employer sign-in…</p></template>
        </ClientOnly>
        <p v-else>Employer registration is currently unavailable.</p>
      </div>
    </section>
  </div>
</template>

<style>
.employer-workspace form { @apply grid gap-4; }
.employer-workspace label { @apply block text-sm font-semibold; }
.employer-workspace input:not([type="checkbox"]), .employer-workspace select, .employer-workspace textarea {
  @apply mt-1 block w-full rounded-lg border border-ink/25 bg-white/60 px-3 py-2 text-base font-normal;
}
.employer-workspace input[type="checkbox"] { @apply size-4 align-middle accent-moss; }
.employer-workspace fieldset:disabled { @apply opacity-60; }
.employer-workspace h2 { @apply mb-4 font-display text-3xl; }
.employer-workspace .action { @apply rounded-full bg-ink px-5 py-2 font-semibold text-white disabled:opacity-60; }
.employer-workspace .link { @apply text-moss underline disabled:opacity-60; }
</style>
