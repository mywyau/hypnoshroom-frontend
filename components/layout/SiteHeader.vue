<script setup lang="ts">
const route = useRoute()
const links = [
  { label: 'Services', to: '/services' },
  { label: 'Expertise', to: '/expertise' },
  { label: 'Experience', to: '/work' },
  { label: 'Contractor tools', to: '/contractor-intelligence' },
  { label: 'Insights', to: '/insights' },
  { label: 'About', to: '/about' },
]
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-line/80 bg-paper/95 backdrop-blur-md">
    <a href="#main-content" class="fixed left-4 top-3 z-[60] -translate-y-24 rounded bg-ink px-4 py-2 text-white focus:translate-y-0">Skip to content</a>
    <div class="page-shell flex h-20 items-center justify-between">
      <NuxtLink to="/" class="font-display text-xl font-semibold tracking-tight transition hover:text-moss" aria-label="Hypnoshroom home">
        Hypnoshroom
      </NuxtLink>

      <nav aria-label="Primary navigation" class="hidden items-center gap-7 lg:flex">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="text-sm font-medium text-ink/65 transition hover:text-ink" :class="route.path.startsWith(link.to) && 'text-moss'">{{ link.label }}</NuxtLink>
        <AppButton to="/contact">Discuss a project</AppButton>
      </nav>

    </div>
  </header>
</template>
