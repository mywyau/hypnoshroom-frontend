<script setup lang="ts">
const config = useRuntimeConfig().public
const enabled = Boolean(config.employerSupabaseUrl && config.employerSupabaseKey)
usePageSeo({ title: 'Your listings | Hypnoshroom', description: 'Manage your engineering job listings.', path: '/employers/listings', robots: 'noindex, nofollow' })
</script>

<template>
  <section class="page-shell py-10">
    <div class="employer-workspace mx-auto max-w-3xl [&_form]:mx-auto">
      <h1 class="mb-6 font-display text-3xl">Your listings</h1>
      <ClientOnly v-if="enabled">
        <AccountAccess audience="employer" v-slot="{ user }">
          <EmployerWorkspace :key="user.id" view="listings" />
        </AccountAccess>
        <template #fallback><p>Loading employer sign-in…</p></template>
      </ClientOnly>
      <p v-else>Account sign-in is unavailable in this environment.</p>
    </div>
  </section>
</template>
