<script setup lang="ts">
import { getArticle } from '~/data/articles'

const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug
const article = getArticle(slug || '')

if (!article) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

usePageSeo({
  title: `${article.title} | Hypnoshroom`,
  description: article.summary,
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
    description: article.summary,
    url: `https://hypnoshroom.com/insights/${article.slug}`,
    mainEntityOfPage: `https://hypnoshroom.com/insights/${article.slug}`,
    author: { '@id': 'https://hypnoshroom.com/#organization' },
    publisher: { '@id': 'https://hypnoshroom.com/#organization' },
    about: article.topic,
    inLanguage: 'en-GB',
  },
})
</script>

<template>
  <article>
    <header class="border-b border-line py-16 sm:py-24">
      <div class="page-shell max-w-4xl">
        <NuxtLink to="/insights" class="text-sm font-semibold text-moss">← All insights</NuxtLink>
        <div class="mt-10 flex items-center gap-3 text-xs text-ink/45"><span class="text-moss">{{ article.category }}</span><span aria-hidden="true">·</span><span>{{ article.readTime }}</span></div>
        <h1 class="mt-5 font-display text-5xl leading-[1.05] tracking-[-0.03em] sm:text-6xl lg:text-7xl">{{ article.title }}</h1>
        <p class="mt-7 max-w-2xl text-xl leading-8 text-ink/60">{{ article.summary }}</p>
      </div>
    </header>
    <div class="page-shell grid gap-12 py-16 lg:grid-cols-[1fr_16rem] lg:py-24">
      <div class="prose-article max-w-3xl">
        <section v-for="section in article.sections" :key="section.heading">
          <h2>{{ section.heading }}</h2>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
          <ul v-if="section.bullets">
            <li v-for="bullet in section.bullets" :key="bullet">{{ bullet }}</li>
          </ul>
          <ArticleCodeBlock v-if="section.code" :code="section.code" />
        </section>
      </div>
      <aside class="border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-moss">Dealing with something similar?</p>
        <p class="mt-4 text-sm leading-6 text-ink/60">Share a few details about the system and where the team is stuck.</p>
        <AppButton to="/contact" variant="text" class="mt-3">Discuss a project</AppButton>
      </aside>
    </div>
  </article>
</template>
