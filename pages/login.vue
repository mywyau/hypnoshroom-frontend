<script setup lang="ts">
const config = useRuntimeConfig().public
const enabled = Boolean(config.employerSupabaseUrl && config.employerSupabaseKey)
usePageSeo({ title: 'Sign in | Hypnoshroom', description: 'Sign in to Hypnoshroom or create an account.', path: '/login', robots: 'noindex, follow' })
</script>

<template>
  <div class="page-shell py-12 sm:py-20">
    <section class="employer-workspace mx-auto max-w-md rounded-2xl border border-line bg-white/50 p-6 sm:p-8" aria-label="Hypnoshroom account">
      <ClientOnly v-if="enabled">
        <AccountAccess audience="general" v-slot="{ user }">
          <div class="flex flex-wrap gap-4">
            <NuxtLink v-if="user.app_metadata.listing_admin === true" to="/admin/listings" class="link">Review listings</NuxtLink>
            <NuxtLink to="/find-a-job" class="link">Find a job</NuxtLink>
            <NuxtLink to="/employers/listings" class="link">Manage listings</NuxtLink>
          </div>
        </AccountAccess>
        <template #fallback><p>Loading sign-in…</p></template>
      </ClientOnly>
      <template v-else>
        <h1 class="font-display text-3xl">Sign in</h1>
        <p class="mt-4">Account sign-in is unavailable in this environment.</p>
      </template>
    </section>
  </div>
</template>
