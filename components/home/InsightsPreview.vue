<script setup lang="ts">
import { articles } from '~/data/articles'

const featuredArticles = [
  'typescript-backends-get-complicated',
  'scala-2-to-scala-3',
  'slow-api-database-problem',
].map(slug => articles.find(article => article.slug === slug)).filter(article => article !== undefined)
</script>

<template>
  <section class="section-space border-t border-line">
    <div class="page-shell">
      <div class="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading eyebrow="Insights" title="Knowledge and insights." intro="Our thoughts on languages, databases, architecture, delivery and the trade-offs behind working software." />
        <AppButton to="/insights" variant="text">Browse all insights</AppButton>
      </div>
      <div class="mt-14 grid gap-x-10 lg:grid-cols-3">
        <ArticleCard v-for="article in featuredArticles" :key="article.slug" :article="article" />
      </div>
    </div>
  </section>
</template>
