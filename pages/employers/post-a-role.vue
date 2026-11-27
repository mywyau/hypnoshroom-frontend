<script setup lang="ts">
definePageMeta({
  middleware: to => {
    if (to.query.view === 'listings' && to.query.preview !== '1') {
      const query = { ...to.query }
      delete query.view
      return navigateTo({ path: '/employers/listings', query, hash: to.hash }, { replace: true })
    }
  },
})
const config = useRuntimeConfig().public
const route = useRoute()
const hasAccounts = Boolean(config.employerSupabaseUrl && config.employerSupabaseKey)
const editId = computed(() => typeof route.query.edit === 'string' ? route.query.edit : undefined)
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
            <EmployerWorkspace :key="user.id + (editId ?? '')" view="post" :edit-id="editId" />
          </AccountAccess>
          <template #fallback><p>Loading employer sign-in…</p></template>
        </ClientOnly>
        <!-- <NuxtLink v-if="hasAccounts" :to="preview ? '/employers/post-a-role' : '/employers/post-a-role?preview=1'" class="link mt-6 inline-block">
          {{ preview ? 'Go to employer account' : 'Try the posting preview without signing in' }}
        </NuxtLink> -->
      </div>
    </section>
  </div>
</template>
