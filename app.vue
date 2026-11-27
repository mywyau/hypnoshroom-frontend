<script setup lang="ts">
import { Analytics } from '@vercel/analytics/vue'

const user = useAccountUser()
const workspaceLinks = useEmployerWorkspaceLinks()
const config = useRuntimeConfig().public
let unsubscribe: (() => void) | undefined
onMounted(() => {
  if (!import.meta.dev || !config.employerSupabaseUrl || !config.employerSupabaseKey) return
  const { data: { subscription } } = useAccountClient().auth.onAuthStateChange((_event, session) => {
    user.value = session?.user ?? null
  })
  unsubscribe = () => subscription.unsubscribe()
})
onBeforeUnmount(() => unsubscribe?.())

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': 'https://hypnoshroom.com/#website',
          url: 'https://hypnoshroom.com/',
          name: 'Hypnoshroom',
          inLanguage: 'en-GB',
        },
        {
          '@type': 'Organization',
          '@id': 'https://hypnoshroom.com/#organization',
          name: 'Hypnoshroom',
          url: 'https://hypnoshroom.com/',
          description: 'Independent software consultancy specialising in Scala engineering, modern software products and pragmatic delivery.',
          knowsAbout: ['Scala', 'Java', 'TypeScript', 'Python', 'Software testing', 'Backend engineering', 'Software product development'],
        },
      ],
    }),
  }],
})
</script>

<template>
  <div class="pb-[calc(3.5rem+env(safe-area-inset-bottom))] lg:pb-0">
    <NuxtRouteAnnouncer />
    <a href="#main-content" class="fixed left-4 top-3 z-[60] -translate-y-24 rounded bg-ink px-4 py-2 text-white focus:translate-y-0">Skip to content</a>
    <SiteHeader />
    <div :class="{ 'mx-auto max-w-screen-2xl lg:grid lg:grid-cols-[13rem_minmax(0,1fr)]': workspaceLinks.length }">
      <aside v-if="workspaceLinks.length" class="hidden border-r border-line lg:block">
        <nav aria-label="Employer workspace" class="sticky top-20 grid gap-1 p-4">
          <NuxtLink v-for="link in workspaceLinks" :key="link.to" :to="link.to"
            class="flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium text-ink/75 hover:bg-moss/10 hover:text-moss"
            exact-active-class="bg-moss/10 !font-semibold !text-moss">
            <component :is="link.icon" class="size-4 shrink-0" aria-hidden="true" />
            {{ link.label }}
          </NuxtLink>
        </nav>
      </aside>
      <main id="main-content" class="min-w-0">
        <NuxtPage />
      </main>
    </div>
    <SiteFooter />
    <MobileBottomNav />
    <Analytics />
  </div>
</template>
