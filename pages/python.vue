<script setup lang="ts">
import { pythonServicesPage } from '~/data/languageServices'

usePageSeo({
  title: pythonServicesPage.seoTitle,
  description: pythonServicesPage.seoDescription,
  path: `/${pythonServicesPage.slug}`,
})
</script>

<template>
  <LanguageServicesPage :page="pythonServicesPage" />
</template>
