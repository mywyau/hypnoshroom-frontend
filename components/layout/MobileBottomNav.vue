<script setup lang="ts">
const navigation = useSiteNavigation()
const route = useRoute()
</script>

<template>
  <nav aria-label="Quick navigation" class="mobile-bottom-nav border-t border-line bg-paper pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(36,38,32,0.08)]">
    <div class="grid auto-cols-fr grid-flow-col">
      <NuxtLink
        v-for="link in navigation.quick"
        :key="link.to"
        :to="link.to"
        class="flex min-h-14 flex-col items-center justify-center gap-1 px-1 text-[11px] font-medium text-ink/65 hover:text-moss"
        :class="(route.path === link.to || route.path.startsWith(link.to + '/')) && 'text-moss'"
      >
        <component :is="link.icon" class="size-[1.15rem]" :stroke-width="1.7" aria-hidden="true" />
        <span>{{ 'short' in link ? link.short : link.label }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>
