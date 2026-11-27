<script setup lang="ts">
type PageHeroGradient = 'plum' | 'forest' | 'violet' | 'sage' | 'moss' | 'heather' | 'mulberry' | 'scala' | 'java' | 'typescript' | 'python'

withDefaults(defineProps<{
  eyebrow: string
  title: string
  intro: string
  gradient?: PageHeroGradient
  narrowMobile?: boolean
  size?: 'compact-title' | 'compact'
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
  <section class="border-b border-line" :class="size === 'compact' ? 'pt-6 sm:pt-8' : 'pt-16 sm:pt-20 lg:pt-24'">
    <div class="page-shell" :class="[size === 'compact' ? 'pb-6 sm:pb-8' : 'pb-16 sm:pb-20 lg:pb-24', narrowMobile && 'page-shell--mobile-narrow']">
      <p class="eyebrow" :class="{ 'mb-2': size === 'compact' }">{{ eyebrow }}</p>
      <h1 class="w-fit max-w-5xl font-display leading-[1.02] tracking-[-0.035em]"
        :class="[size ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-5xl sm:text-6xl lg:text-8xl', gradient && gradientClasses[gradient]]">{{ title }}</h1>
      <p class="max-w-2xl text-ink/65" :class="size === 'compact' ? 'mt-3 text-base leading-6' : 'mt-7 text-lg leading-8 sm:text-xl'">{{ intro }}</p>
    </div>
  </section>
</template>
