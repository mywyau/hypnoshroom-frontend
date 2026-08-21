<script setup lang="ts">
import { javaServicesPage } from '~/data/languageServices'

usePageSeo({
  title: javaServicesPage.seoTitle,
  description: javaServicesPage.seoDescription,
  path: `/${javaServicesPage.slug}`,
})
</script>

<template>
  <LanguageServicesPage :page="javaServicesPage" />
</template>
