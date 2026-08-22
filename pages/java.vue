<script setup lang="ts">
import { javaServicesPage } from '~/data/languageServices'

usePageSeo({
  title: javaServicesPage.seoTitle,
  description: javaServicesPage.seoDescription,
  path: `/${javaServicesPage.slug}`,
  breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Java engineering', path: '/java' }],
  schema: {
    '@context': 'https://schema.org', '@type': 'Service', name: 'Java and JVM engineering',
    description: javaServicesPage.seoDescription, url: 'https://hypnoshroom.com/java',
    areaServed: { '@type': 'Country', name: 'United Kingdom' }, provider: { '@id': 'https://hypnoshroom.com/#organization' },
  },
})
</script>

<template>
  <LanguageServicesPage :page="javaServicesPage" />
</template>
