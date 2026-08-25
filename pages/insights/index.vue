<script setup lang="ts">
import { articles } from '~/data/articles'

const route = useRoute()
const topicGroups = [
  { label: 'Languages', topics: ['Scala', 'Java', 'TypeScript', 'Python'] },
  { label: 'Technical topics', topics: ['AI', 'Databases', 'Testing', 'Architecture', 'Serverless', 'Platform & DevOps'] },
  { label: 'Practice & industry', topics: ['Engineering', 'Software Delivery', 'Misc'] },
]
const primaryTopics = topicGroups.flatMap(group => group.topics)
const articleTopics = articles.flatMap(article => [article.topic, ...(article.topics ?? [])])
const additionalTopics = [...new Set(articleTopics)]
  .filter(topic => !primaryTopics.includes(topic))
const topics = ['All', ...primaryTopics, ...additionalTopics]
const displayedGroups = computed(() => additionalTopics.length > 0
  ? [...topicGroups, { label: 'More', topics: additionalTopics }]
  : topicGroups)
const selectedTopic = computed(() => {
  const topic = Array.isArray(route.query.topic) ? route.query.topic[0] : route.query.topic
  return topic && topics.includes(topic) ? topic : 'All'
})
const filteredArticles = computed(() => selectedTopic.value === 'All'
  ? articles
  : articles.filter(article => article.topic === selectedTopic.value || article.topics?.includes(selectedTopic.value)))
const pageSize = 9
const requestedPage = computed(() => {
  const value = Array.isArray(route.query.page) ? route.query.page[0] : route.query.page
  const parsed = Number.parseInt(value || '1', 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
})
const totalPages = computed(() => Math.max(1, Math.ceil(filteredArticles.value.length / pageSize)))
const currentPage = computed(() => Math.min(requestedPage.value, totalPages.value))
const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredArticles.value.slice(start, start + pageSize)
})
const firstArticleNumber = computed(() => filteredArticles.value.length === 0
  ? 0
  : (currentPage.value - 1) * pageSize + 1)
const lastArticleNumber = computed(() => Math.min(currentPage.value * pageSize, filteredArticles.value.length))
const paginationPages = computed(() => [...new Set([
  1,
  currentPage.value - 1,
  currentPage.value,
  currentPage.value + 1,
  totalPages.value,
])]
  .filter(page => page >= 1 && page <= totalPages.value)
  .sort((a, b) => a - b))
const paginationTarget = (page: number) => ({
  path: '/insights',
  query: {
    ...(selectedTopic.value === 'All' ? {} : { topic: selectedTopic.value }),
    ...(page === 1 ? {} : { page: page.toString() }),
  },
})

usePageSeo({
  title: 'Software Engineering Articles | Hypnoshroom',
  description: 'Technical articles about Scala, Java, TypeScript, Python, testing, APIs, JVM upgrades and maintaining production software.',
  path: '/insights',
})
</script>

<template>
  <div>
    <PageHero eyebrow="Insights" title="Knowledge and insights." intro="Technical articles on languages, databases, serverless platforms and the awkward realities of keeping systems moving." gradient="violet" />
    <section class="section-space">
      <div class="page-shell">
        <nav aria-label="Filter insights by topic" class="border-b border-line pb-8">
          <NuxtLink
            to="/insights"
            :aria-current="selectedTopic === 'All' ? 'page' : undefined"
            class="inline-flex rounded-full border px-4 py-2 text-sm font-medium transition"
            :class="selectedTopic === 'All' ? 'border-ink bg-ink text-white' : 'border-line text-ink/65 hover:border-moss hover:text-moss'"
          >
            All articles
          </NuxtLink>
          <div class="mt-6 grid gap-5">
            <div v-for="group in displayedGroups" :key="group.label" class="grid gap-2 sm:grid-cols-[8.5rem_1fr] sm:items-start">
              <p class="pt-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">{{ group.label }}</p>
              <div class="flex flex-wrap gap-2">
                <NuxtLink
                  v-for="topic in group.topics"
                  :key="topic"
                  :to="{ path: '/insights', query: { topic } }"
                  :aria-current="selectedTopic === topic ? 'page' : undefined"
                  class="rounded-full border px-4 py-2 text-sm transition"
                  :class="selectedTopic === topic ? 'border-ink bg-ink text-white' : 'border-line text-ink/65 hover:border-moss hover:text-moss'"
                >
                  {{ topic }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </nav>
        <p v-if="filteredArticles.length" class="mt-8 text-sm text-ink/50">
          Showing {{ firstArticleNumber }}–{{ lastArticleNumber }} of {{ filteredArticles.length }}
          {{ selectedTopic === 'All' ? 'articles' : `${selectedTopic} articles` }}
        </p>
        <div class="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          <ArticleCard v-for="article in paginatedArticles" :key="article.slug" :article="article" />
          <div v-if="filteredArticles.length === 0" class="border-t border-line py-10 sm:col-span-2 lg:col-span-3">
            <p class="font-display text-2xl text-ink">No {{ selectedTopic }} articles yet.</p>
            <p class="mt-3 max-w-xl leading-7 text-ink/60">New technical articles will appear here when they are published.</p>
          </div>
        </div>
        <nav v-if="totalPages > 1" aria-label="Article pages" class="mt-12 flex flex-wrap items-center justify-center gap-2 border-t border-line pt-8">
          <NuxtLink
            v-if="currentPage > 1"
            :to="paginationTarget(currentPage - 1)"
            rel="prev"
            class="mr-2 inline-flex min-h-10 items-center rounded-full border border-line px-4 text-sm font-medium text-ink/65 transition hover:border-moss hover:text-moss"
          >
            ← Previous
          </NuxtLink>
          <template v-for="(page, index) in paginationPages" :key="page">
            <span v-if="index > 0 && page - paginationPages[index - 1] > 1" class="px-1 text-ink/35" aria-hidden="true">…</span>
            <NuxtLink
              :to="paginationTarget(page)"
              :aria-label="`Page ${page}`"
              :aria-current="currentPage === page ? 'page' : undefined"
              class="inline-grid size-10 place-items-center rounded-full border text-sm font-medium transition"
              :class="currentPage === page ? 'border-ink bg-ink text-white' : 'border-line text-ink/65 hover:border-moss hover:text-moss'"
            >
              {{ page }}
            </NuxtLink>
          </template>
          <NuxtLink
            v-if="currentPage < totalPages"
            :to="paginationTarget(currentPage + 1)"
            rel="next"
            class="ml-2 inline-flex min-h-10 items-center rounded-full border border-line px-4 text-sm font-medium text-ink/65 transition hover:border-moss hover:text-moss"
          >
            Next →
          </NuxtLink>
        </nav>
      </div>
    </section>
    <ContactCta />
  </div>
</template>
