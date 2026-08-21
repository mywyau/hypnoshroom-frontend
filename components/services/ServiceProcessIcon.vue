<script setup lang="ts">
defineProps<{ icon: 'choose' | 'boundary' | 'commit' }>()
</script>

<template>
  <span class="flex size-11 items-center justify-center rounded-xl border border-moss/20 bg-paper text-moss shadow-sm" aria-hidden="true">
    <svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" focusable="false">
      <g v-if="icon === 'choose'">
        <rect x="4" y="4" width="6" height="6" rx="1.5" />
        <rect x="14" y="4" width="6" height="6" rx="1.5" />
        <rect x="4" y="14" width="6" height="6" rx="1.5" />
        <path d="m14.5 17 2 2 4-5" />
      </g>

      <g v-else-if="icon === 'boundary'">
        <path d="M8 4H5a1 1 0 0 0-1 1v3" />
        <path d="M16 4h3a1 1 0 0 1 1 1v3" />
        <path d="M20 16v3a1 1 0 0 1-1 1h-3" />
        <path d="M8 20H5a1 1 0 0 1-1-1v-3" />
        <rect x="8" y="8" width="8" height="8" rx="2" stroke-dasharray="2 2" />
      </g>

      <g v-else>
        <path d="M7 3.5h8l3 3V20H7Z" />
        <path d="M15 3.5V7h3" />
        <path d="m10 14 2 2 4-5" />
      </g>
    </svg>
  </span>
</template>
