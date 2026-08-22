<script setup lang="ts">
import { getService, services } from '~/data/services'

const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug
const service = getService(slug || '')

if (!service) {
  throw createError({ statusCode: 404, statusMessage: 'Service package not found' })
}

const relatedServices = services.filter(item => item.slug !== service.slug).slice(0, 3)
const fitTitle = service.slug === 'embedded-engineering-support'
  ? 'Experienced engineering support for an existing delivery team.'
  : service.slug === 'testing-suite-review'
    ? 'A focused assessment of how the test suite supports delivery.'
    : 'A focused review of one system or technical question.'

usePageSeo({
  title: `${service.title} Package | Hypnoshroom`,
  description: `${service.shortDescription} ${service.commercialDetail}`,
  path: `/services/${service.slug}`,
})
</script>

<template>
  <div>
    <header class="border-b border-line py-16 sm:py-20 lg:py-24">
      <div class="page-shell">
        <NuxtLink to="/services" class="text-sm font-semibold text-moss">← All service packages</NuxtLink>
        <div class="mt-10 grid gap-12 lg:grid-cols-[1fr_22rem] lg:items-end lg:gap-20">
          <div>
            <p class="eyebrow">{{ service.packageType }}</p>
            <h1 class="max-w-4xl font-display text-5xl leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl">{{ service.title }}</h1>
            <p class="mt-7 max-w-2xl text-xl leading-8 text-ink/60">{{ service.shortDescription }}</p>
          </div>
          <aside class="rounded-3xl border border-moss bg-white/40 p-7 shadow-soft">
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-moss">Pricing</p>
            <p class="mt-4 font-display text-4xl">{{ service.commercialModel }}</p>
            <p class="mt-3 text-sm leading-6 text-ink/60">{{ service.commercialDetail }}</p>
            <p class="mt-5 border-t border-line pt-5 text-sm font-semibold text-ink">{{ service.timeline }}</p>
            <AppButton :to="`/contact?service=${service.slug}`" class="mt-6 w-full">Enquire about this package</AppButton>
          </aside>
        </div>
      </div>
    </header>

    <section class="section-space">
      <div class="page-shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div>
          <p class="eyebrow">Package fit</p>
          <h2 class="font-display text-4xl leading-tight sm:text-5xl">{{ fitTitle }}</h2>
          <p class="mt-6 text-lg leading-8 text-ink/60">{{ service.whoFor }}</p>
        </div>
        <div class="grid gap-6 sm:grid-cols-2">
          <div class="rounded-2xl border border-line bg-white/35 p-7">
            <h3 class="text-xs font-semibold uppercase tracking-[0.16em] text-moss">This may fit when</h3>
            <ul class="mt-5 space-y-3 text-sm leading-6 text-ink/65">
              <li v-for="item in service.problems" :key="item" class="flex gap-3"><span aria-hidden="true" class="text-clay">—</span><span>{{ item }}</span></li>
            </ul>
          </div>
          <div class="rounded-2xl border border-line bg-white/35 p-7">
            <h3 class="text-xs font-semibold uppercase tracking-[0.16em] text-moss">Work included</h3>
            <ul class="mt-5 space-y-3 text-sm leading-6 text-ink/65">
              <li v-for="item in service.work" :key="item" class="flex gap-3"><span aria-hidden="true" class="text-clay">—</span><span>{{ item }}</span></li>
            </ul>
          </div>
          <div class="rounded-2xl border border-line bg-[#ece8de] p-7 sm:col-span-2">
            <h3 class="text-xs font-semibold uppercase tracking-[0.16em] text-moss">Package boundary</h3>
            <p class="mt-4 leading-7 text-ink/65">{{ service.boundary }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-space border-y border-line bg-[#ece8de]">
      <div class="page-shell">
        <SectionHeading eyebrow="Delivery" title="How it works." :intro="service.format" />
        <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <article v-for="(step, index) in service.steps" :key="step.title" class="border-t border-ink/20 pt-5">
            <span class="font-mono text-xs text-clay">{{ String(index + 1).padStart(2, '0') }}</span>
            <h2 class="mt-8 font-display text-3xl">{{ step.title }}</h2>
            <p class="mt-4 text-sm leading-6 text-ink/60">{{ step.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section-space">
      <div class="page-shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div>
          <p class="eyebrow">Outputs</p>
          <h2 class="font-display text-4xl leading-tight sm:text-5xl">What you will recieve.</h2>
        </div>
        <ul class="grid gap-5 sm:grid-cols-2">
          <li v-for="item in service.deliverables" :key="item" class="rounded-2xl border border-line bg-white/35 p-6 text-sm leading-6 text-ink/65"><span aria-hidden="true" class="mr-3 text-moss">✓</span>{{ item }}</li>
        </ul>
      </div>
    </section>

    <section class="border-t border-line py-16 sm:py-20">
      <div class="page-shell">
        <div class="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div><p class="eyebrow">Other packages</p><h2 class="font-display text-4xl">Compare another way to engage.</h2></div>
          <AppButton to="/services" variant="text">Compare all packages</AppButton>
        </div>
        <div class="mt-10 grid gap-6 md:grid-cols-3">
          <ServiceCard v-for="item in relatedServices" :key="item.id" :service="item" />
        </div>
      </div>
    </section>

    <ContactCta />
  </div>
</template>
