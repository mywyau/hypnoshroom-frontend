<script setup lang="ts">
import { pythonServicesPage } from '~/data/languageServices'

usePageSeo({
  title: pythonServicesPage.seoTitle,
  description: pythonServicesPage.seoDescription,
  path: `/${pythonServicesPage.slug}`,
  breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Python engineering', path: '/python' }],
  schema: {
    '@context': 'https://schema.org', '@type': 'Service', name: 'Python engineering',
    description: pythonServicesPage.seoDescription, url: 'https://hypnoshroom.com/python',
    areaServed: { '@type': 'Country', name: 'United Kingdom' }, provider: { '@id': 'https://hypnoshroom.com/#organization' },
  },
})
</script>

<template>
  <LanguageServicesPage :page="pythonServicesPage" />
</template>
