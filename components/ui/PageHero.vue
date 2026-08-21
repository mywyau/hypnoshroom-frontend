<script setup lang="ts">
type PageHeroGradient = 'plum' | 'forest' | 'violet' | 'sage' | 'moss' | 'heather' | 'mulberry' | 'scala' | 'java' | 'typescript' | 'python'

withDefaults(defineProps<{
  eyebrow: string
  title: string
  intro: string
  gradient?: PageHeroGradient
}>(), { gradient: undefined })

const gradientClasses: Record<PageHeroGradient, string> = {
  plum: 'hero-gradient hero-gradient--plum',
  forest: 'hero-gradient hero-gradient--forest',
  violet: 'hero-gradient hero-gradient--violet',
  sage: 'hero-gradient hero-gradient--sage',
  moss: 'hero-gradient hero-gradient--moss',
  heather: 'hero-gradient hero-gradient--heather',
  mulberry: 'hero-gradient hero-gradient--mulberry',
  scala: 'hero-gradient hero-gradient--scala',
  java: 'hero-gradient hero-gradient--java',
  typescript: 'hero-gradient hero-gradient--typescript',
  python: 'hero-gradient hero-gradient--python',
}
</script>

<template>
  <section class="border-b border-line pt-16 sm:pt-20 lg:pt-24">
    <div class="page-shell pb-16 sm:pb-20 lg:pb-24">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h1 class="w-fit max-w-5xl font-display text-5xl leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-8xl" :class="gradient ? gradientClasses[gradient] : undefined">{{ title }}</h1>
      <p class="mt-7 max-w-2xl text-lg leading-8 text-ink/65 sm:text-xl">{{ intro }}</p>
    </div>
  </section>
</template>
