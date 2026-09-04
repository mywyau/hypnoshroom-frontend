<script setup lang="ts">
import { Analytics } from '@vercel/analytics/vue'

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': 'https://hypnoshroom.com/#website',
          url: 'https://hypnoshroom.com/',
          name: 'Hypnoshroom',
          inLanguage: 'en-GB',
        },
        {
          '@type': 'Organization',
          '@id': 'https://hypnoshroom.com/#organization',
          name: 'Hypnoshroom',
          url: 'https://hypnoshroom.com/',
          description: 'Independent software consultancy specialising in Scala engineering, modern software products and pragmatic delivery.',
          knowsAbout: ['Scala', 'Java', 'TypeScript', 'Python', 'Software testing', 'Backend engineering', 'Software product development'],
        },
      ],
    }),
  }],
})
</script>

<template>
  <div class="pb-[calc(3.5rem+env(safe-area-inset-bottom))] lg:pb-0">
    <NuxtRouteAnnouncer />
    <SiteHeader />
    <main id="main-content">
      <NuxtPage />
    </main>
    <SiteFooter />
    <MobileBottomNav />
    <Analytics />
  </div>
</template>
