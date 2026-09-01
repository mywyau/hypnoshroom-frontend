<script setup lang="ts">
import { getWorkCaseStudy } from '~/data/work'

const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug
const caseStudy = getWorkCaseStudy(slug || '')

if (!caseStudy) {
  throw createError({ statusCode: 404, statusMessage: 'Experience entry not found' })
}

usePageSeo({
  title: caseStudy.seoTitle,
  description: caseStudy.seoDescription,
  path: `/work/${caseStudy.slug}`,
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Experience', path: '/work' },
    { name: caseStudy.title, path: `/work/${caseStudy.slug}` },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: caseStudy.title,
    description: caseStudy.summary,
    url: `https://hypnoshroom.com/work/${caseStudy.slug}`,
    ...(caseStudy.website ? { sameAs: caseStudy.website.url } : {}),
    author: { '@id': 'https://hypnoshroom.com/#organization' },
    inLanguage: 'en-GB',
  },
})
</script>

<template>
  <article>
    <header class="border-b border-line py-16 sm:py-20 lg:py-24">
      <div class="page-shell max-w-4xl">
        <NuxtLink to="/work" class="text-sm font-semibold text-moss">← All experience</NuxtLink>
        <p class="mt-10 eyebrow">{{ caseStudy.eyebrow }}</p>
        <h1 class="hero-gradient hero-gradient--heather max-w-4xl font-display text-5xl leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl">{{ caseStudy.title }}</h1>
        <p class="mt-7 max-w-3xl text-xl leading-8 text-ink/65">{{ caseStudy.summary }}</p>
        <a v-if="caseStudy.website" :href="caseStudy.website.url" target="_blank" rel="noopener noreferrer" class="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-moss">
          {{ caseStudy.website.label }} <span aria-hidden="true" class="ml-2">↗</span>
        </a>
      </div>
    </header>

    <section class="border-b border-line bg-[#ece8de] py-10 sm:py-14">
      <div class="page-shell max-w-4xl">
        <p class="text-sm leading-7 text-ink/65">{{ caseStudy.context }}</p>
      </div>
    </section>

    <div class="page-shell grid gap-12 py-16 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:py-24">
      <aside>
        <p class="eyebrow">Technology and focus</p>
        <ul class="mt-5 flex flex-wrap gap-2">
          <li v-for="technology in caseStudy.technologies" :key="technology" class="rounded-full border border-line px-3 py-1.5 text-sm text-ink/65">{{ technology }}</li>
        </ul>
      </aside>

      <div class="space-y-14">
        <section>
          <p class="eyebrow">Role</p>
          <p class="mt-5 text-xl leading-8 text-ink/70">{{ caseStudy.role }}</p>
        </section>
        <section>
          <p class="eyebrow">Engineering context</p>
          <p class="mt-5 text-xl leading-8 text-ink/70">{{ caseStudy.challenge }}</p>
        </section>
        <section>
          <p class="eyebrow">Contribution</p>
          <ul class="mt-6 grid gap-4 sm:grid-cols-2">
            <li v-for="item in caseStudy.contribution" :key="item" class="border-t border-line pt-4 leading-7 text-ink/65">{{ item }}</li>
          </ul>
        </section>
        <section class="rounded-3xl border border-moss/20 bg-[#edf0e6] p-7 sm:p-9">
          <p class="eyebrow">What this experience brings</p>
          <p class="mt-5 text-lg leading-8 text-ink/70">{{ caseStudy.perspective }}</p>
        </section>
      </div>
    </div>

    <ContactCta />
  </article>
</template>
