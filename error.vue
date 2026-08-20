<script setup lang="ts">
defineProps<{ error: { statusCode?: number; statusMessage?: string } }>()
</script>

<template>
  <div class="grid min-h-screen place-items-center bg-paper px-5 text-center text-ink">
    <div>
      <p class="eyebrow">{{ error.statusCode || 404 }}</p>
      <h1 class="font-display text-5xl">This path has gone underground.</h1>
      <p class="mt-5 text-ink/60">{{ error.statusMessage || 'The page could not be found.' }}</p>
      <AppButton to="/" class="mt-8">Return home</AppButton>
    </div>
  </div>
</template>
