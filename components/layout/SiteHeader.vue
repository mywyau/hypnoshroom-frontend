<script setup lang="ts">
const route = useRoute()
const isOpen = ref(false)
const links = [
  { label: 'Services', to: '/services' },
  { label: 'Expertise', to: '/expertise' },
  { label: 'Insights', to: '/insights' },
  { label: 'About', to: '/about' },
]

watch(() => route.path, () => { isOpen.value = false })
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

      <button type="button" class="grid size-11 place-items-center rounded-full border border-line lg:hidden" :aria-expanded="isOpen" aria-controls="mobile-navigation" aria-label="Toggle navigation" @click="isOpen = !isOpen">
        <svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <path v-if="!isOpen" d="M4 7h16M4 12h16M4 17h16"/>
          <path v-else d="m6 6 12 12M18 6 6 18"/>
        </svg>
      </button>
    </div>

    <nav v-if="isOpen" id="mobile-navigation" aria-label="Mobile navigation" class="border-t border-line bg-paper px-5 pb-6 pt-3 lg:hidden">
      <div class="page-shell flex flex-col px-0">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="border-b border-line py-4 text-lg">{{ link.label }}</NuxtLink>
        <AppButton to="/contact" class="mt-5 self-start">Discuss a project</AppButton>
      </div>
    </nav>
  </header>
</template>
