<script setup lang="ts">
defineProps<{ eyebrow: string; title: string; intro: string }>()
</script>

<template>
  <section class="border-b border-line pt-16 sm:pt-20 lg:pt-24">
    <div class="page-shell pb-16 sm:pb-20 lg:pb-24">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h1 class="max-w-5xl font-display text-5xl leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-8xl">{{ title }}</h1>
      <p class="mt-7 max-w-2xl text-lg leading-8 text-ink/65 sm:text-xl">{{ intro }}</p>
    </div>
  </section>
</template>
