<script setup lang="ts">
import { articles } from '~/data/articles'

const route = useRoute()
const topics = ['All', ...new Set(articles.map(article => article.topic))]
const selectedTopic = computed(() => {
  const topic = Array.isArray(route.query.topic) ? route.query.topic[0] : route.query.topic
  return topic && topics.includes(topic) ? topic : 'All'
})
const filteredArticles = computed(() => selectedTopic.value === 'All'
  ? articles
  : articles.filter(article => article.topic === selectedTopic.value))

usePageSeo({
  title: 'Insights | Hypnoshroom',
  description: 'Notes about Scala, Java, JVM upgrades, technical debt and keeping backend systems workable.',
  path: '/insights',
})
</script>

<template>
  <div>
    <PageHero eyebrow="Insights" title="Knowledge and insights." intro="Technical articles on languages, databases, serverless platforms and the awkward realities of keeping backend systems moving." />
    <section class="section-space">
      <div class="page-shell">
        <nav aria-label="Filter insights by topic" class="flex flex-wrap gap-2 border-b border-line pb-8">
          <NuxtLink
            v-for="topic in topics"
            :key="topic"
            :to="topic === 'All' ? '/insights' : { path: '/insights', query: { topic } }"
            class="rounded-full border px-4 py-2 text-sm transition"
            :class="selectedTopic === topic ? 'border-ink bg-ink text-white' : 'border-line text-ink/65 hover:border-moss hover:text-moss'"
          >
            {{ topic }}
          </NuxtLink>
        </nav>
        <div class="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          <ArticleCard v-for="article in filteredArticles" :key="article.slug" :article="article" />
        </div>
      </div>
    </section>
    <ContactCta />
  </div>
</template>
