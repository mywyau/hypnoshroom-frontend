<script setup lang="ts">
import { articles } from '~/data/articles'

const featuredArticles = useState('home-featured-articles', () => {
  const shuffled = [...articles]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]]
  }

  return shuffled.slice(0, 3)
})
</script>

<template>
  <section class="section-space border-t border-line">
    <div class="page-shell">
      <div class="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading eyebrow="Insights" title="Knowledge and insights." intro="Some of our thoughts on technology, languages, databases, delivery and the trade-offs we specialize in." />
        <AppButton to="/insights" variant="text">Browse all insights</AppButton>
      </div>
      <div class="mt-14 grid gap-x-10 lg:grid-cols-3">
        <ArticleCard v-for="article in featuredArticles" :key="article.slug" :article="article" />
      </div>
    </div>
  </section>
</template>
