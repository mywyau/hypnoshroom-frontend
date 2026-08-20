<script setup lang="ts">
import type { Article } from '~/data/articles'
defineProps<{ article: Article }>()
</script>

<template>
  <article class="group border-t border-line py-7">
    <div class="flex items-center gap-3 text-xs text-ink/45"><span class="text-moss">{{ article.category }}</span><span aria-hidden="true">·</span><span>{{ article.readTime }}</span></div>
    <h2 class="mt-4 font-display text-3xl leading-tight"><NuxtLink :to="`/insights/${article.slug}`" class="transition group-hover:text-moss">{{ article.title }}</NuxtLink></h2>
    <p class="mt-4 leading-7 text-ink/60">{{ article.summary }}</p>
    <NuxtLink :to="`/insights/${article.slug}`" class="mt-6 inline-flex text-sm font-semibold text-moss">Read article <span aria-hidden="true" class="ml-2 transition group-hover:translate-x-1">→</span></NuxtLink>
  </article>
</template>
