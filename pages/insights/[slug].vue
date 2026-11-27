<script setup lang="ts">
import { getArticle } from '~/data/articles'
import { formatArticleDate } from '~/utils/formatArticleDate'

const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug
const article = getArticle(slug || '')

if (!article) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

usePageSeo({
  title: `${article.seoTitle || article.title} | Hypnoshroom`,
  description: article.seoDescription || article.summary,
  path: `/insights/${article.slug}`,
  type: 'article',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/insights' },
    { name: article.title, path: `/insights/${article.slug}` },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.seoDescription || article.summary,
    url: `https://hypnoshroom.com/insights/${article.slug}`,
    mainEntityOfPage: `https://hypnoshroom.com/insights/${article.slug}`,
    author: { '@id': 'https://hypnoshroom.com/#organization' },
    publisher: { '@id': 'https://hypnoshroom.com/#organization' },
    datePublished: article.publishedAt,
    articleSection: article.category,
    keywords: [article.topic, ...(article.topics || [])].join(', '),
    about: [article.topic, ...(article.topics || [])].map(name => ({
      '@type': 'Thing',
      name,
    })),
    inLanguage: 'en-GB',
  },
})
</script>

<template>
  <article>
    <header class="border-b border-line py-12 sm:py-24">
      <div class="article-page-shell max-w-4xl">
        <NuxtLink to="/insights" class="text-sm font-semibold text-moss">← All insights</NuxtLink>
        <div class="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink/45"><span class="text-moss">{{ article.category }}</span><span aria-hidden="true">·</span><time :datetime="article.publishedAt">Published {{ formatArticleDate(article.publishedAt) }}</time><span aria-hidden="true">·</span><span>{{ article.readTime }}</span></div>
        <div class="article-reading-measure">
          <h1 class="mt-5 font-display text-4xl leading-[1.05] tracking-[-0.03em] sm:text-6xl lg:text-7xl">{{ article.title }}</h1>
          <p class="mt-6 max-w-2xl text-lg leading-7 text-ink/60 sm:mt-7 sm:text-xl sm:leading-8">{{ article.summary }}</p>
        </div>
      </div>
    </header>
    <div class="article-page-shell py-12 sm:py-16 lg:py-24">
      <div class="prose-article article-reading-measure max-w-3xl">
        <section v-for="section in article.sections" :key="section.heading">
          <h2>{{ section.heading }}</h2>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
          <ArticleCategoryTheoryDiagram v-if="section.diagram === 'category-composition'" />
          <ul v-if="section.bullets">
            <li v-for="bullet in section.bullets" :key="bullet">{{ bullet }}</li>
          </ul>
          <ul v-if="section.links" class="article-references">
            <li v-for="link in section.links" :key="link.href">
              <a :href="link.href" target="_blank" rel="noopener noreferrer">{{ link.label }} <span aria-hidden="true">↗</span></a>
            </li>
          </ul>
          <ArticleCodeBlock v-if="section.code" :code="section.code" />
        </section>
      </div>
    </div>
  </article>
</template>
