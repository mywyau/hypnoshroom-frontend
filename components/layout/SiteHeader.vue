<script setup lang="ts">
import { isHiringPath } from '~/domain/employers/routes'

const showLaunchStatus = !import.meta.dev

const route = useRoute()
const navigation = useSiteNavigation()
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-line/80 bg-paper/95 backdrop-blur-md">
    <a href="#main-content" class="fixed left-4 top-3 z-[60] -translate-y-24 rounded bg-ink px-4 py-2 text-white focus:translate-y-0">Skip to content</a>
    <div class="page-shell grid grid-cols-[1fr_auto] items-center gap-x-2 px-3 max-[359px]:gap-x-1 sm:px-8 md:min-h-20 md:grid-cols-[1fr_auto_auto] md:gap-x-3 lg:gap-x-6 lg:px-10">
      <NuxtLink to="/" class="w-fit py-3 font-display text-xl max-[359px]:text-base font-semibold tracking-tight transition hover:text-moss" aria-label="Hypnoshroom home">
        Hypnoshroom
      </NuxtLink>

      <nav aria-label="Primary navigation" class="col-span-full row-start-2 flex flex-wrap items-center justify-between gap-2 text-sm md:col-span-1 md:col-start-2 md:row-start-1 md:gap-4 lg:gap-7">
        <NuxtLink v-for="link in navigation.primary" :key="link.to" :to="link.to" class="flex min-h-11 flex-col items-start justify-center font-medium hover:text-moss" :class="(route.path === link.to || route.path.startsWith(link.to + '/')) ? 'text-moss' : 'text-ink/75'">
          {{ link.label }}
          <span v-if="showLaunchStatus && isHiringPath(link.to)" class="text-[10px] leading-tight text-moss">Coming soon</span>
        </NuxtLink>
      </nav>

      <AppButton v-if="navigation.action" :to="navigation.action.to" class="col-start-2 row-start-1 whitespace-nowrap max-sm:!px-3 max-sm:!text-xs max-sm:[&>span]:hidden md:col-start-3">{{ navigation.action.label }}</AppButton>
    </div>
  </header>
</template>
