<script setup lang="ts">
import { articles } from '~/data/articles'

usePageSeo({
  title: 'Insights | Hypnoshroom',
  description: 'Notes about Scala, Java, JVM upgrades, technical debt and keeping backend systems workable.',
  path: '/insights',
})
</script>

<template>
  <div>
    <PageHero eyebrow="Insights" title="Notes from the backend." intro="Scala, Java, upgrades, technical debt and the awkward realities of keeping long-lived systems moving." />
    <section class="section-space">
      <div class="page-shell grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        <ArticleCard v-for="article in articles" :key="article.slug" :article="article" />
      </div>
    </section>
    <ContactCta />
  </div>
</template>
