<script setup lang="ts">
import { BookOpen, BriefcaseBusiness, House, Mail } from '@lucide/vue'

const route = useRoute()

const links = [
  { label: 'Home', to: '/', icon: House, isActive: () => route.path === '/' },
  { label: 'Services', to: '/services', icon: BriefcaseBusiness, isActive: () => route.path.startsWith('/services') },
  { label: 'Insights', to: '/insights', icon: BookOpen, isActive: () => route.path.startsWith('/insights') },
  { label: 'Contact', to: '/contact', icon: Mail, isActive: () => route.path.startsWith('/contact') },
]
</script>

<template>
  <nav aria-label="Quick navigation" class="fixed inset-x-0 bottom-0 z-[60] border-t border-line/90 bg-paper/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(36,38,32,0.08)] backdrop-blur-md lg:hidden">
    <div class="grid grid-cols-4">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        :aria-current="link.isActive() ? 'page' : undefined"
        class="flex min-h-14 flex-col items-center justify-center gap-1 px-2 text-[11px] font-medium text-ink/55 transition hover:text-moss"
        :class="link.isActive() && 'text-moss'"
      >
        <component :is="link.icon" class="size-[1.15rem]" :stroke-width="link.isActive() ? 2 : 1.7" aria-hidden="true" />
        <span>{{ link.label }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>
