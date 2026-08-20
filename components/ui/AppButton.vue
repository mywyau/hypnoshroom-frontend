<script setup lang="ts">
withDefaults(defineProps<{
  to?: string
  variant?: 'primary' | 'secondary' | 'text'
}>(), { variant: 'primary' })
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition duration-200"
    :class="{
      'bg-ink text-white hover:-translate-y-0.5 hover:bg-moss': variant === 'primary',
      'border border-ink/20 bg-white/40 text-ink hover:border-moss hover:text-moss': variant === 'secondary',
      'px-0 text-moss underline decoration-moss/30 underline-offset-4 hover:decoration-moss': variant === 'text',
    }"
  >
    <slot />
    <span aria-hidden="true" class="ml-2">↗</span>
  </NuxtLink>
  <button
    v-else
    type="submit"
    class="inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-moss disabled:cursor-not-allowed disabled:opacity-60"
  >
    <slot />
    <span aria-hidden="true" class="ml-2">↗</span>
  </button>
</template>
