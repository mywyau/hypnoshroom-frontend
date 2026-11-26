<script setup lang="ts">
definePageMeta({
  middleware: to => navigateTo({ path: '/login', query: to.query, hash: to.hash }, { replace: true }),
})
</script>

<template>
  <div />
</template>
