<script setup lang="ts">
const config = useRuntimeConfig().public
const enabled = Boolean(config.employerSupabaseUrl && config.employerSupabaseKey)
usePageSeo({ title: 'Reset password | Hypnoshroom', description: 'Choose a new password for your Hypnoshroom account.', path: '/jobs/reset-password', robots: 'noindex, follow' })
</script>

<template>
  <div>
    <PageHero eyebrow="Your account" title="Reset your password." intro="Use the reset link from your email to choose a new password." gradient="forest" />
    <section class="page-shell py-10">
      <div class="employer-workspace max-w-md">
        <ClientOnly v-if="enabled">
          <PasswordRecovery />
          <template #fallback><p>Checking your reset link…</p></template>
        </ClientOnly>
        <p v-else>Account sign-in is unavailable in this environment.</p>
      </div>
      <nav class="mt-6 flex flex-wrap gap-5 text-moss underline" aria-label="Return to account">
        <NuxtLink to="/login">Your account</NuxtLink>
      </nav>
    </section>
  </div>
</template>
