<script setup lang="ts">
import { services } from '~/data/services'

const packagePrinciples = [
  ['A clear purchase unit', 'Buy an answer, engineering capacity or a defined software outcome.'],
  ['Direct engineering delivery', 'Technical responsibility remains clear from initial scope through to handover.'],
  ['A defined endpoint', 'Every package ends with tangible outputs, documented decisions and a clean handover.'],
]

usePageSeo({
  title: 'Technical Review & Engineering Services | Hypnoshroom',
  description: 'Choose a scoped technical review, embedded engineering support or defined outcome delivery across Scala, Java, TypeScript and Python.',
  path: '/services',
})
</script>

<template>
  <div>
    <PageHero eyebrow="Service packages" title="What we offer." intro="Buy an evidence-backed answer, experienced engineering capacity or a clearly defined software outcome. Each engagement has an explicit boundary, working format and endpoint." gradient="plum" />

    <section class="border-b border-line bg-[#ece8de] py-10">
      <div class="page-shell grid gap-6 md:grid-cols-3">
        <div v-for="principle in packagePrinciples" :key="principle[0]" class="border-t border-ink/15 pt-4">
          <h2 class="text-sm font-semibold text-ink">{{ principle[0] }}</h2>
          <p class="mt-2 text-sm leading-6 text-ink/55">{{ principle[1] }}</p>
        </div>
      </div>
    </section>

    <section class="section-space">
      <div class="page-shell">
        <div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Packages" title="Our services." intro="Investigate a difficult system, add engineering capacity to an established team or commission a bounded piece of software delivery." />
          <p class="max-w-sm text-sm leading-6 text-ink/50">Not sure where to start? The fixed-scope Technical Review is designed to turn an unclear system problem into an informed next decision.</p>
        </div>

        <div class="mt-14 grid items-start gap-6 lg:grid-cols-3">
          <details
            v-for="service in services"
            :key="service.id"
            class="group relative rounded-3xl border bg-white/35"
            :class="service.featured ? 'border-moss shadow-soft' : 'border-line'"
          >
            <summary class="cursor-pointer list-none rounded-3xl p-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-moss [&::-webkit-details-marker]:hidden sm:p-9 lg:flex lg:h-[41rem] lg:flex-col">
              <span v-if="service.featured" class="absolute right-6 top-0 -translate-y-1/2 rounded-full bg-moss px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">Best place to start</span>
              <div class="flex items-start justify-between gap-5 lg:min-h-36">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-[0.16em] text-moss">{{ service.packageType }}</p>
                  <h2 class="mt-3 font-display text-4xl leading-tight">{{ service.title }}</h2>
                </div>
                <ServicePackageIcon :slug="service.slug" />
              </div>

              <p class="mt-5 max-w-xl leading-7 text-ink/60 lg:min-h-[5.25rem]">{{ service.shortDescription }}</p>

              <div class="mt-8 border-t border-line pb-8 pt-6 lg:flex lg:min-h-48 lg:flex-col">
                <p class="font-display text-3xl">{{ service.commercialModel }}</p>
                <p class="mt-2 text-sm leading-6 text-ink/55">{{ service.commercialDetail }}</p>
                <div class="mt-7 lg:mt-auto lg:pt-4">
                  <p class="inline-flex rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-ink/65">{{ service.timeline }}</p>
                </div>
              </div>

              <div class="mt-6 flex items-center justify-between gap-4 border-t border-line pt-8 text-sm font-semibold text-moss lg:mt-auto">
                <span class="group-open:hidden">Show package details</span>
                <span class="hidden group-open:inline">Hide package details</span>
                <span aria-hidden="true" class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-moss/30 transition-transform duration-200 group-open:rotate-45">
                  <svg viewBox="0 0 16 16" class="h-4 w-4" fill="none">
                    <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                  </svg>
                </span>
              </div>
            </summary>

            <div class="border-t border-line px-7 pb-7 pt-7 sm:px-9 sm:pb-9 lg:flex lg:h-[21rem] lg:flex-col">
              <div class="rounded-2xl bg-[#ece8de] p-5 lg:min-h-40">
                <p class="text-xs font-semibold uppercase tracking-[0.14em] text-ink/50">A good fit for</p>
                <p class="mt-2 text-sm leading-6 text-ink/65">{{ service.whoFor }}</p>
              </div>

              <div class="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-auto">
                <AppButton :to="`/services/${service.slug}`" :variant="service.featured ? 'primary' : 'secondary'" class="sm:flex-1">View package</AppButton>
                <AppButton :to="`/contact?service=${service.slug}`" variant="text" class="sm:flex-1">Enquire</AppButton>
              </div>
            </div>
          </details>
        </div>
      </div>
    </section>

    <ContactCta />
  </div>
</template>
