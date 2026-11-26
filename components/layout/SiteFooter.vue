<script setup lang="ts">
const groups = [
  {
    title: 'Jobs & contractor tools',
    id: 'footer-jobs',
    links: [
      { label: 'Find contracts', to: '/contracts' },
      { label: 'Permanent & temporary jobs', to: '/jobs' },
      { label: 'Contractor calculators', to: '/contractor-intelligence' },
      { label: 'For employers', to: '/employers' },
    ],
  },
  {
    title: 'Consultancy',
    id: 'footer-consultancy',
    links: [
      { label: 'Services', to: '/services' },
      { label: 'Expertise', to: '/expertise' },
      { label: 'Experience', to: '/work' },
      { label: 'Insights', to: '/insights' },
      { label: 'Discuss a project', to: '/contact' },
    ],
  },
]
</script>

<template>
  <footer class="border-t border-line bg-[#ece8de]">
    <div class="page-shell grid grid-cols-2 gap-x-5 gap-y-6 py-10 sm:gap-x-10 lg:grid-cols-[1.5fr_1fr_1fr] lg:py-12">
      <NuxtLink to="/" class="col-span-2 w-fit self-start font-display text-2xl font-semibold lg:col-span-1">Hypnoshroom</NuxtLink>

      <nav v-for="group in groups" :key="group.id" :aria-labelledby="group.id">
        <h2 :id="group.id" class="mb-2 font-display text-lg font-semibold">{{ group.title }}</h2>
        <ul class="text-sm text-ink/75">
          <li v-for="link in group.links" :key="link.to">
            <NuxtLink :to="link.to" class="inline-flex min-h-9 items-center py-1 hover:text-moss hover:underline">{{ link.label }}</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>

    <div class="page-shell flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-ink/10 py-4 text-xs text-ink/65">
      <p>© {{ new Date().getFullYear() }} Hypnoshroom. All rights reserved.</p>
      <div class="flex gap-5">
        <NuxtLink to="/about" class="inline-flex min-h-9 items-center hover:text-moss hover:underline">About</NuxtLink>
        <NuxtLink to="/privacy" class="inline-flex min-h-9 items-center hover:text-moss hover:underline">Privacy</NuxtLink>
      </div>
    </div>
  </footer>
</template>
