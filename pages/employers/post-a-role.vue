<script setup lang="ts">
const config = useRuntimeConfig().public
const route = useRoute()
const hasAccounts = Boolean(config.employerSupabaseUrl && config.employerSupabaseKey)
const preview = computed(() => !hasAccounts || route.query.preview === '1')
usePageSeo({ title: 'Post a role | Hypnoshroom', description: 'Publish and manage your contract briefs.', path: '/employers/post-a-role', robots: 'noindex, follow' })
</script>

<template>
  <div>
    <PageHero eyebrow="Engineering jobs" :title="preview ? 'Try posting a role.' : 'Post a role.'" :intro="preview ? 'Create a sample contract, permanent or temporary job and review it as an applicant would see it.' : 'Publish a UK contract, permanent or temporary role and direct applicants to your own site.'" gradient="forest" />
    <section class="page-shell py-10">
      <nav aria-label="Employer resources" class="flex flex-wrap gap-x-5 gap-y-2 text-moss underline">
        <NuxtLink to="/employers">Employer home</NuxtLink>
        <NuxtLink to="/employers/pricing">Employer &amp; recruiter pricing</NuxtLink>
      </nav>
      <div class="employer-workspace mt-6 max-w-3xl">
        <EmployerPostingPreview v-if="preview" />
        <ClientOnly v-else>
          <EmployerAccount />
          <template #fallback><p>Loading employer sign-in…</p></template>
        </ClientOnly>
        <NuxtLink v-if="hasAccounts" :to="preview ? '/employers/post-a-role' : '/employers/post-a-role?preview=1'" class="link mt-6 inline-block">
          {{ preview ? 'Go to employer account' : 'Try the posting preview without signing in' }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
