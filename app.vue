<script setup lang="ts">
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
  <div>
    <NuxtRouteAnnouncer />
    <SiteHeader />
    <main id="main-content">
      <NuxtPage />
    </main>
    <SiteFooter />
  </div>
</template>
