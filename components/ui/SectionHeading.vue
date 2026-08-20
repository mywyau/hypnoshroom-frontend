<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow?: string
  title: string
  intro?: string
  align?: 'left' | 'center'
}>(), { align: 'left' })
</script>

<template>
  <header :class="['max-w-3xl', align === 'center' && 'mx-auto text-center']">
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <h2 class="font-display text-4xl leading-tight tracking-[-0.02em] sm:text-5xl lg:text-6xl">{{ title }}</h2>
    <p v-if="intro" class="mt-6 max-w-2xl text-lg leading-8 text-ink/65" :class="align === 'center' && 'mx-auto'">{{ intro }}</p>
  </header>
</template>
