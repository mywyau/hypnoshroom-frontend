<script setup lang="ts">
const config = useRuntimeConfig().public
const route = useRoute()
const hasAccounts = Boolean(config.employerSupabaseUrl && config.employerSupabaseKey)
const preview = computed(() => !hasAccounts || route.query.preview === '1')
usePageSeo({ title: 'Post a role | Hypnoshroom', description: 'Publish and manage your contract briefs.', path: '/employers/post-a-role', robots: 'noindex, follow' })
</script>

<template>
  <div>
    <section class="page-shell py-10">
      <h1 class="sr-only">Post a role</h1>
      <div class="employer-workspace mx-auto max-w-3xl [&_form]:mx-auto">
        <EmployerPostingPreview v-if="preview" />
        <ClientOnly v-else>
          <AccountAccess audience="employer" v-slot="{ user }">
            <EmployerWorkspace :key="user.id" />
          </AccountAccess>
          <template #fallback><p>Loading employer sign-in…</p></template>
        </ClientOnly>
        <NuxtLink v-if="hasAccounts" :to="preview ? '/login' : '/employers/post-a-role?preview=1'" class="link mt-6 inline-block">
          {{ preview ? 'Go to your account' : 'Preview the posting form' }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
