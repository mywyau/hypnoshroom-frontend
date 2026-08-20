<script setup lang="ts">
import { articles } from '~/data/articles'
</script>

<template>
  <section class="section-space border-t border-line">
    <div class="page-shell">
      <div class="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading eyebrow="Insights" title="Notes from the backend." intro="Straightforward writing about Scala, Java, upgrades and keeping old systems workable." />
        <AppButton to="/insights" variant="text">Browse all insights</AppButton>
      </div>
      <div class="mt-14 grid gap-x-10 lg:grid-cols-3">
        <ArticleCard v-for="article in articles.slice(0, 3)" :key="article.slug" :article="article" />
      </div>
    </div>
  </section>
</template>
