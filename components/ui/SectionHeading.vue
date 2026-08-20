<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow?: string
  title: string
  intro?: string
  align?: 'left' | 'center'
  theme?: 'light' | 'dark'
}>(), { align: 'left', theme: 'light' })
</script>

<template>
  <header :class="['max-w-3xl', align === 'center' && 'mx-auto text-center']">
    <p v-if="eyebrow" class="eyebrow" :class="theme === 'dark' && '!text-[#bdd2c5]'">{{ eyebrow }}</p>
    <h2 class="font-display text-4xl leading-tight tracking-[-0.02em] sm:text-5xl lg:text-6xl">{{ title }}</h2>
    <p v-if="intro" class="mt-6 max-w-2xl text-lg leading-8" :class="[align === 'center' && 'mx-auto', theme === 'dark' ? 'text-paper/70' : 'text-ink/65']">{{ intro }}</p>
  </header>
</template>
