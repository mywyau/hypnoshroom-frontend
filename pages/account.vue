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
  <div class="page-shell py-10 sm:py-12">
    <div class="employer-workspace mx-auto max-w-2xl">
      <h1 class="mb-6 font-display text-4xl">Account settings</h1>
      <template v-if="enabled && user">
        <section aria-labelledby="profile-title" class="rounded-2xl border border-line bg-white/50 p-5 sm:p-7">
          <h2 id="profile-title">Profile</h2>
          <dl v-if="user.email" class="mb-5 text-sm">
            <dt class="font-semibold">Sign-in email</dt>
            <dd class="mt-1 break-all">{{ user.email }}</dd>
          </dl>
          <AccountProfileForm :key="user.id" :user="user" />
        </section>
        <section v-if="user.email" aria-labelledby="deletion-title" class="mt-6 rounded-2xl border border-line p-5 sm:p-7">
          <h2 id="deletion-title">Account deletion</h2>
          <DeleteAccountForm :key="user.id + '-delete'" :email="user.email" />
        </section>
      </template>
      <p v-else-if="enabled" role="status">Loading your account…</p>
      <p v-else>Account sign-in is unavailable in this environment.</p>
    </div>
  </div>
</template>
