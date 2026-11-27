<script setup lang="ts">
const config = useRuntimeConfig().public
const enabled = Boolean(config.employerSupabaseUrl && config.employerSupabaseKey)
usePageSeo({ title: 'Listing approvals | Hypnoshroom', description: 'Review employer listings.', path: '/admin/listings', robots: 'noindex, nofollow' })
</script>

<template>
  <section class="page-shell employer-workspace py-12">
    <h1 class="mb-6 font-display text-4xl">Listing approvals</h1>
    <ClientOnly v-if="enabled">
      <AccountAccess audience="general" v-slot="{ user }">
        <ListingReviewQueue v-if="user.app_metadata.listing_admin === true" :key="user.id" />
        <p v-else>Listing administrator access is required.</p>
      </AccountAccess>
      <template #fallback><p>Loading sign-in…</p></template>
    </ClientOnly>
    <p v-else>Account sign-in is unavailable in this environment.</p>
  </section>
</template>
