<script setup lang="ts">
import { Analytics } from '@vercel/analytics/vue'
import { PanelLeftClose, PanelLeftOpen } from '@lucide/vue'
import { isHiringPath } from '~/domain/employers/routes'

const showLaunchStatus = !import.meta.dev
const user = useAccountUser()
const sidebar = useSectionSidebar()
const sidebarCollapsed = useCookie<boolean>('sidebar-collapsed', { sameSite: 'lax', maxAge: 60 * 60 * 24 * 365 })
const sidebarToggleLabel = computed(() => sidebarCollapsed.value ? 'Expand sidebar' : 'Collapse sidebar')
const route = useRoute()
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
    <SiteHeader>
      <template #before-logo>
        <button v-if="sidebar" type="button" aria-controls="section-navigation" :aria-expanded="!sidebarCollapsed" :aria-label="sidebarToggleLabel"
          class="flex size-11 shrink-0 items-center justify-center rounded-lg text-ink/75 hover:bg-moss/10 hover:text-moss"
          :class="sidebarCollapsed ? 'ml-2.5' : 'ml-3.5'"
          @click="sidebarCollapsed = !sidebarCollapsed">
          <component :is="sidebarCollapsed ? PanelLeftOpen : PanelLeftClose" class="size-4" aria-hidden="true" />
        </button>
      </template>
    </SiteHeader>
    <div :class="sidebar && ['mx-auto max-w-screen-2xl lg:grid', sidebarCollapsed ? 'lg:grid-cols-[4rem_minmax(0,1fr)]' : 'lg:grid-cols-[13rem_minmax(0,1fr)]']">
      <aside v-if="sidebar" class="hidden border-r border-line lg:block">
        <div class="sticky top-20 py-4" :class="sidebarCollapsed ? 'px-2' : 'px-4'">
          <nav id="section-navigation" :aria-label="sidebar.label" class="grid gap-1">
            <NuxtLink v-for="link in sidebar.links" :key="link.to" :to="link.to"
              :title="sidebarCollapsed ? link.label : undefined"
              class="flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium text-ink/75 hover:bg-moss/10 hover:text-moss"
              :class="{ 'justify-center': sidebarCollapsed, 'bg-moss/10 !font-semibold !text-moss': shouldHighlightNavigationLink(route.path, link.to) }">
              <component :is="link.icon" class="size-4 shrink-0" aria-hidden="true" />
              <span :class="{ 'sr-only': sidebarCollapsed }">{{ link.label }}<span v-if="showLaunchStatus && isHiringPath(link.to)" class="block text-xs text-moss">Coming soon</span></span>
            </NuxtLink>
          </nav>
        </div>
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
