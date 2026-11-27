<script setup lang="ts">
import { isHiringPath } from '~/domain/employers/routes'

const showLaunchStatus = !import.meta.dev

const route = useRoute()
const navigation = useSiteNavigation()
const accountPath = computed(() => {
  if (!import.meta.dev) return
  if (isConsultancyPath(route.path)) return '/login'
  if (route.path.split('/')[1] === 'contractor-intelligence') return '/login'
  if (route.path === '/' || route.name === 'find-a-job') return '/login'
  if (!isHiringPath(route.path)) return
  if (['login', 'jobs-account', 'jobs-reset-password', 'employers-post-a-role'].includes(String(route.name))) return
  return '/login'
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-line/80 bg-paper/95 backdrop-blur-md">
    <div class="page-shell grid grid-cols-[1fr_auto] items-center gap-x-2 px-3 max-[359px]:gap-x-1 sm:px-8 md:min-h-20 md:grid-cols-[1fr_auto_auto] md:gap-x-3 lg:gap-x-6 lg:px-10">
      <NuxtLink to="/" class="w-fit py-3 font-display text-xl max-[359px]:text-base font-semibold tracking-tight transition hover:text-moss" aria-label="Hypnoshroom home">
        Hypnoshroom
      </NuxtLink>

      <nav v-if="navigation.primary.length" aria-label="Primary navigation" class="col-span-full row-start-2 flex flex-wrap items-center justify-between gap-2 text-sm md:col-span-1 md:col-start-2 md:row-start-1 md:gap-4 lg:gap-7">
        <NuxtLink v-for="link in navigation.primary" :key="link.to" :to="link.to" class="flex min-h-11 flex-col items-start justify-center font-medium hover:text-moss" :class="(route.path === link.to || route.path.startsWith(link.to + '/')) ? 'text-moss' : 'text-ink/75'">
          {{ link.label }}
          <span v-if="showLaunchStatus && isHiringPath(link.to)" class="text-[10px] leading-tight text-moss">Coming soon</span>
        </NuxtLink>
      </nav>

      <HeaderAccountLink v-if="!showLaunchStatus || navigation.action" :to="accountPath">
        <AppButton v-if="navigation.action" :to="navigation.action.to" class="whitespace-nowrap max-sm:!px-3 max-sm:!text-xs max-sm:[&>span]:hidden">{{ navigation.action.label }}</AppButton>
      </HeaderAccountLink>
    </div>
  </header>
</template>
