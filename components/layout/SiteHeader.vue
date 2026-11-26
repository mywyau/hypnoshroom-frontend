<script setup lang="ts">
import { Menu, X } from '@lucide/vue'
import { isHiringPath } from '~/domain/employers/routes'

const showLaunchStatus = !import.meta.dev

const route = useRoute()
const menu = ref<HTMLDetailsElement | null>(null)
const toggle = ref<HTMLElement | null>(null)
const navigation = useSiteNavigation()

function closeMenu() {
  if (menu.value) menu.value.open = false
}

function closeWhenOutside(event: Event) {
  if (menu.value?.open && event.target instanceof Node && !menu.value.contains(event.target)) closeMenu()
}

function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape' && menu.value?.open) {
    closeMenu()
    toggle.value?.focus()
  }
}

onMounted(() => {
  document.addEventListener('pointerdown', closeWhenOutside)
  document.addEventListener('focusin', closeWhenOutside)
  document.addEventListener('keydown', handleEscape)
})
onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', closeWhenOutside)
  document.removeEventListener('focusin', closeWhenOutside)
  document.removeEventListener('keydown', handleEscape)
})
watch(() => route.fullPath, closeMenu)
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-line/80 bg-paper/95 backdrop-blur-md">
    <a href="#main-content" class="fixed left-4 top-3 z-[60] -translate-y-24 rounded bg-ink px-4 py-2 text-white focus:translate-y-0">Skip to content</a>
    <div
      class="page-shell relative grid items-center gap-x-2 px-3 max-[359px]:gap-x-1 sm:px-8 md:min-h-20 md:gap-x-3 lg:gap-x-6 lg:px-10"
      :class="navigation.more.length ? 'grid-cols-[1fr_auto_auto] md:grid-cols-[1fr_auto_auto_auto]' : 'grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_auto]'"
    >
      <NuxtLink to="/" class="w-fit py-3 font-display text-xl max-[359px]:text-base font-semibold tracking-tight transition hover:text-moss" aria-label="Hypnoshroom home">
        Hypnoshroom
      </NuxtLink>

      <nav aria-label="Primary navigation" class="col-span-full row-start-2 flex items-center justify-between gap-2 text-sm md:col-span-1 md:col-start-2 md:row-start-1 md:gap-4 lg:gap-7">
        <NuxtLink v-for="link in navigation.primary" :key="link.to" :to="link.to" class="flex min-h-11 flex-col items-start justify-center font-medium hover:text-moss" :class="(route.path === link.to || route.path.startsWith(link.to + '/')) ? 'text-moss' : 'text-ink/75'">
          {{ link.label }}
          <span v-if="showLaunchStatus && isHiringPath(link.to)" class="text-[10px] leading-tight text-moss">Coming soon</span>
        </NuxtLink>
      </nav>

      <AppButton v-if="navigation.action" :to="navigation.action.to" class="col-start-2 row-start-1 whitespace-nowrap max-sm:!px-3 max-sm:!text-xs max-sm:[&>span]:hidden md:col-start-3">{{ navigation.action.label }}</AppButton>

      <details v-if="navigation.more.length" ref="menu" class="group col-start-3 row-start-1 justify-self-end md:col-start-4">
        <summary ref="toggle" class="flex size-11 cursor-pointer list-none items-center justify-center rounded-full border border-ink/20 hover:border-moss focus-visible:outline-moss [&::-webkit-details-marker]:hidden">
          <Menu class="size-5 group-open:hidden" aria-hidden="true" />
          <X class="hidden size-5 group-open:block" aria-hidden="true" />
          <span class="sr-only">More navigation</span>
        </summary>
        <nav aria-label="More navigation" class="absolute right-5 top-full mt-1 max-h-[calc(100dvh-10rem)] w-56 overflow-y-auto rounded-xl border border-line bg-paper p-2 shadow-lg sm:right-8 lg:right-10">
          <NuxtLink v-for="link in navigation.more" :key="link.to" :to="link.to" class="flex min-h-11 items-center rounded-lg px-4 text-sm font-medium hover:bg-ink/5 focus-visible:outline-moss" :class="(route.path === link.to || route.path.startsWith(link.to + '/')) ? 'text-moss' : 'text-ink/75'" @click="closeMenu">{{ link.label }}</NuxtLink>
        </nav>
      </details>
    </div>
  </header>
</template>
