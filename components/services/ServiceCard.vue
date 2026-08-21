<script setup lang="ts">
import type { Service } from '~/data/services'
defineProps<{ service: Service }>()
</script>

<template>
  <article class="group flex h-full flex-col border-t border-line py-7 transition duration-300 hover:border-moss sm:p-7 sm:hover:-translate-y-1 sm:hover:rounded-2xl sm:hover:border sm:hover:bg-white/45 sm:hover:shadow-soft">
    <span class="font-mono text-xs text-moss">{{ service.number }}</span>
    <h3 class="mt-10 font-display text-3xl leading-tight">{{ service.title }}</h3>
    <p class="mt-4 flex-1 leading-7 text-ink/60">{{ service.shortDescription }}</p>
    <NuxtLink :to="`/services/${service.slug}`" class="mt-8 inline-flex items-center text-sm font-semibold text-moss">
      View package <span aria-hidden="true" class="ml-2 transition group-hover:translate-x-1">→</span>
    </NuxtLink>
  </article>
</template>
