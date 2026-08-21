<script setup lang="ts">
defineProps<{ slug: string }>()
</script>

<template>
  <span class="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-moss/20 bg-paper text-moss shadow-sm" aria-hidden="true">
    <svg viewBox="0 0 24 24" class="size-6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" focusable="false">
      <g v-if="slug === 'engineering-delivery'">
        <path d="m8.5 8-4 4 4 4" />
        <path d="m15.5 8 4 4-4 4" />
        <path d="m14 5-4 14" />
      </g>

      <g v-else-if="slug === 'embedded-engineering-support'">
        <circle cx="9" cy="9" r="3" />
        <circle cx="16.5" cy="10" r="2.5" />
        <path d="M3.5 19c.5-3.2 2.4-5 5.5-5s5 1.8 5.5 5" />
        <path d="M14.5 15c2.9-.2 4.8 1.2 5.5 4" />
      </g>

      <g v-else-if="slug === 'technical-review'">
        <circle cx="10.5" cy="10.5" r="5.5" />
        <path d="m14.5 14.5 4.5 4.5" />
        <path d="m8.8 8.5-1.7 2 1.7 2" />
        <path d="m12.2 8.5 1.7 2-1.7 2" />
      </g>

      <g v-else>
        <path d="M19 8a7.5 7.5 0 0 0-12.5-2L4 8.5" />
        <path d="M4 4v4.5h4.5" />
        <path d="M5 16a7.5 7.5 0 0 0 12.5 2l2.5-2.5" />
        <path d="M20 20v-4.5h-4.5" />
      </g>
    </svg>
  </span>
</template>
