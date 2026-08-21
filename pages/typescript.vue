<script setup lang="ts">
import { typeScriptServicesPage } from '~/data/languageServices'

usePageSeo({
  title: typeScriptServicesPage.seoTitle,
  description: typeScriptServicesPage.seoDescription,
  path: `/${typeScriptServicesPage.slug}`,
})
</script>

<template>
  <LanguageServicesPage :page="typeScriptServicesPage" />
</template>
