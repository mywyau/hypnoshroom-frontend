<script setup lang="ts">
import { BookOpen, BriefcaseBusiness, ChevronLeft, ChevronRight, House, Mail, PackageCheck, UserRoundCheck, Workflow } from '@lucide/vue'

const route = useRoute()
const visibleStart = ref(0)
const visibleCount = 4

const links = [
  { label: 'Home', to: '/', icon: House, isActive: () => route.path === '/' },
  { label: 'Services', to: '/services', icon: BriefcaseBusiness, isActive: () => route.path.startsWith('/services') },
  { label: 'Insights', to: '/insights', icon: BookOpen, isActive: () => route.path.startsWith('/insights') },
  { label: 'Contact', to: '/contact', icon: Mail, isActive: () => route.path.startsWith('/contact') },
  { label: 'Expertise', to: '/expertise', icon: Workflow, isActive: () => route.path.startsWith('/expertise') },
  { label: 'Work', to: '/work', icon: PackageCheck, isActive: () => route.path.startsWith('/work') },
  { label: 'About', to: '/about', icon: UserRoundCheck, isActive: () => route.path.startsWith('/about') },
]

const visibleLinks = computed(() => links.slice(visibleStart.value, visibleStart.value + visibleCount))
const canShowPrevious = computed(() => visibleStart.value > 0)
const canShowNext = computed(() => visibleStart.value + visibleCount < links.length)

const showPrevious = () => {
  visibleStart.value = Math.max(0, visibleStart.value - 1)
}

const showNext = () => {
  visibleStart.value = Math.min(links.length - visibleCount, visibleStart.value + 1)
}

watch(() => route.path, () => {
  visibleStart.value = 0
})
</script>

<template>
  <nav aria-label="Quick navigation" class="mobile-bottom-nav border-t border-line bg-paper pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(36,38,32,0.08)]">
    <div class="grid grid-cols-[2.75rem_repeat(4,minmax(0,1fr))_2.75rem]">
      <button
        type="button"
        class="grid min-h-14 place-items-center text-ink/55 transition hover:text-moss disabled:cursor-default disabled:opacity-25"
        :disabled="!canShowPrevious"
        aria-label="Show previous navigation options"
        @click="showPrevious"
      >
        <ChevronLeft class="size-4" :stroke-width="1.8" aria-hidden="true" />
      </button>
      <NuxtLink
        v-for="link in visibleLinks"
        :key="link.to"
        :to="link.to"
        :aria-current="link.isActive() ? 'page' : undefined"
        class="flex min-h-14 flex-col items-center justify-center gap-1 px-1 text-[11px] font-medium text-ink/55 transition hover:text-moss"
        :class="link.isActive() && 'text-moss'"
      >
        <component :is="link.icon" class="size-[1.15rem]" :stroke-width="link.isActive() ? 2 : 1.7" aria-hidden="true" />
        <span>{{ link.label }}</span>
      </NuxtLink>
      <button
        type="button"
        class="grid min-h-14 place-items-center text-ink/55 transition hover:text-moss disabled:cursor-default disabled:opacity-25"
        :disabled="!canShowNext"
        aria-label="Show more navigation options"
        @click="showNext"
      >
        <ChevronRight class="size-4" :stroke-width="1.8" aria-hidden="true" />
      </button>
    </div>
  </nav>
</template>
