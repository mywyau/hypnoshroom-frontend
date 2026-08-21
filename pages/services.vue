<script setup lang="ts">
import { services } from '~/data/services'

const packagePrinciples = [
  ['A clear purchase unit', 'Know whether you are buying a review, a milestone, reserved capacity or one modernisation stage.'],
  ['Founder-led delivery', 'No sub contracted juniors.'],
  ['A defined endpoint', 'Every package ends with tangible outputs, documented decisions and a clean handover.'],
]

usePageSeo({
  title: 'Service Packages | Hypnoshroom',
  description: 'Choose a defined engineering delivery, embedded support, technical review or modernisation package from Hypnoshroom.',
  path: '/services',
})
</script>

<template>
  <div>
    <PageHero eyebrow="Service packages" title="What we offer." intro="Four bounded engagement packages with an explicit purchase unit, working format and endpoint. Start with the package that matches what is known today not a vague promise to transform everything." />

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
          <SectionHeading eyebrow="Packages" title="Pick the shape of commitment." intro="Engineering Delivery, Embedded Support and Technical Review have a minimum one-month commitment. Modernisation remains flexible because its duration depends on the scope and risk of each phase." />
          <p class="max-w-sm text-sm leading-6 text-ink/50">Not sure where to start? The fixed-scope Technical Review is designed to turn an unclear system problem into an informed next decision.</p>
        </div>

        <div class="mt-14 grid items-start gap-6 lg:grid-cols-2">
          <details
            v-for="service in services"
            :key="service.id"
            class="group relative rounded-3xl border bg-white/35"
            :class="service.featured ? 'border-moss shadow-soft' : 'border-line'"
          >
            <summary class="cursor-pointer list-none rounded-3xl p-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-moss [&::-webkit-details-marker]:hidden sm:p-9 lg:flex lg:min-h-[35rem] lg:flex-col">
              <span v-if="service.featured" class="absolute right-6 top-0 -translate-y-1/2 rounded-full bg-moss px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">Best place to start</span>
              <div class="flex items-start justify-between gap-5">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-[0.16em] text-moss">{{ service.packageType }}</p>
                  <h2 class="mt-3 font-display text-4xl leading-tight">{{ service.title }}</h2>
                </div>
                <span class="shrink-0 font-mono text-xs text-clay">{{ service.number }}</span>
              </div>

              <p class="mt-5 max-w-xl leading-7 text-ink/60">{{ service.shortDescription }}</p>

              <div class="mt-8 border-y border-line py-6">
                <p class="font-display text-3xl">{{ service.commercialModel }}</p>
                <p class="mt-2 text-sm leading-6 text-ink/55">{{ service.commercialDetail }}</p>
                <p class="mt-4 inline-flex rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-ink/65">{{ service.timeline }}</p>
              </div>

              <div class="mt-6 flex items-center justify-between gap-4 text-sm font-semibold text-moss lg:mt-auto lg:pt-6">
                <span class="group-open:hidden">Show package details</span>
                <span class="hidden group-open:inline">Hide package details</span>
                <span aria-hidden="true" class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-moss/30 transition-transform duration-200 group-open:rotate-45">
                  <svg viewBox="0 0 16 16" class="h-4 w-4" fill="none">
                    <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                  </svg>
                </span>
              </div>
            </summary>

            <div class="border-t border-line px-7 pb-7 pt-7 sm:px-9 sm:pb-9">
              <div>
                <h3 class="text-xs font-semibold uppercase tracking-[0.16em] text-moss">This package includes</h3>
                <ul class="mt-4 grid gap-3 text-sm leading-6 text-ink/65 sm:grid-cols-2">
                  <li v-for="item in service.deliverables" :key="item" class="flex gap-3"><span aria-hidden="true" class="text-moss">✓</span><span>{{ item }}</span></li>
                </ul>
              </div>

              <div class="mt-8 rounded-2xl bg-[#ece8de] p-5">
                <p class="text-xs font-semibold uppercase tracking-[0.14em] text-ink/50">A good fit for</p>
                <p class="mt-2 text-sm leading-6 text-ink/65">{{ service.whoFor }}</p>
              </div>

              <div class="mt-7 flex flex-col gap-3 sm:flex-row">
                <AppButton :to="`/services/${service.slug}`" :variant="service.featured ? 'primary' : 'secondary'" class="sm:flex-1">View package</AppButton>
                <AppButton :to="`/contact?service=${service.slug}`" variant="text" class="sm:flex-1">Enquire</AppButton>
              </div>
            </div>
          </details>
        </div>
      </div>
    </section>

    <section class="section-space border-y border-line bg-[#ece8de]">
      <div class="page-shell">
        <SectionHeading eyebrow="Buying process" title="A small commitment before a larger one." intro="The package structure prevents an unclear conversation from quietly becoming an open-ended software project." />
        <div class="mt-12 grid gap-8 md:grid-cols-3">
          <article class="border-t border-ink/20 pt-5"><span class="font-mono text-xs text-clay">01</span><h2 class="mt-8 font-display text-3xl">Choose a starting package</h2><p class="mt-4 text-sm leading-6 text-ink/60">Select the closest fit. A short qualification call confirms whether the package is appropriate.</p></article>
          <article class="border-t border-ink/20 pt-5"><span class="font-mono text-xs text-clay">02</span><h2 class="mt-8 font-display text-3xl">Confirm the boundary</h2><p class="mt-4 text-sm leading-6 text-ink/60">Agree the repository, technical question, access, client responsibilities, outputs and commercial terms.</p></article>
          <article class="border-t border-ink/20 pt-5"><span class="font-mono text-xs text-clay">03</span><h2 class="mt-8 font-display text-3xl">Buy only that commitment</h2><p class="mt-4 text-sm leading-6 text-ink/60">Complete the package, review its evidence and make a separate decision about any follow-on work.</p></article>
        </div>
      </div>
    </section>

    <!-- <section class="section-space">
      <div class="page-shell rounded-3xl border border-line bg-white/35 p-8 sm:p-12 lg:flex lg:items-end lg:justify-between lg:gap-12">
        <div class="max-w-2xl">
          <p class="eyebrow">Scala &amp; JVM</p>
          <h2 class="font-display text-4xl sm:text-5xl">Looking for a Scala-specific package?</h2>
          <p class="mt-5 text-lg leading-8 text-ink/60">System assessment, upgrade feasibility and scoped modernisation are available as specialist Scala/JVM work packages.</p>
        </div>
        <AppButton to="/scala-jvm" variant="secondary" class="mt-8 shrink-0 lg:mt-0">Explore Scala packages</AppButton>
      </div>
    </section> -->

    <ContactCta />
  </div>
</template>
