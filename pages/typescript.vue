<script setup lang="ts">
import { typeScriptServicesPage } from '~/data/languageServices'

usePageSeo({
  title: typeScriptServicesPage.seoTitle,
  description: typeScriptServicesPage.seoDescription,
  path: `/${typeScriptServicesPage.slug}`,
  breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'TypeScript engineering', path: '/typescript' }],
  schema: {
    '@context': 'https://schema.org', '@type': 'Service', name: 'TypeScript engineering',
    description: typeScriptServicesPage.seoDescription, url: 'https://hypnoshroom.com/typescript',
    areaServed: { '@type': 'Country', name: 'United Kingdom' }, provider: { '@id': 'https://hypnoshroom.com/#organization' },
  },
})
</script>

<template>
  <LanguageServicesPage :page="typeScriptServicesPage" />
</template>
