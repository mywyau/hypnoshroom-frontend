<script setup lang="ts">
const config = useRuntimeConfig().public
const enabled = Boolean(config.employerSupabaseUrl && config.employerSupabaseKey)
const user = useAccountUser()
usePageSeo({ title: 'Your account | Hypnoshroom', description: 'Manage your Hypnoshroom account.', path: '/account', robots: 'noindex, nofollow' })

if (import.meta.client && enabled) {
  watch(user, current => {
    if (current === null) navigateTo('/login', { replace: true })
  }, { immediate: true })
}
</script>

<template>
  <div class="page-shell py-12 sm:py-20">
    <section class="employer-workspace mx-auto max-w-md rounded-2xl border border-line bg-white/50 p-6 sm:p-8">
      <h1 class="mb-4 font-display text-3xl">Your account</h1>
      <template v-if="enabled && user">
        <p class="mb-4 break-all text-sm">{{ user.email }}</p>
        <NuxtLink to="/applications" class="link mb-4 inline-block">Your applications</NuxtLink>
        <AccountProfileForm :key="user.id" :user="user" />
        <!-- <NuxtLink v-if="user.app_metadata.listing_admin === true" to="/admin/listings" class="link">Review listings</NuxtLink> -->
        <DeleteAccountForm v-if="user.email" :key="user.id + '-delete'" :email="user.email" />
      </template>
      <p v-else-if="enabled" role="status">Loading your account…</p>
      <p v-else>Account sign-in is unavailable in this environment.</p>
    </section>
  </div>
</template>
