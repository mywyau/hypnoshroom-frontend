<script setup lang="ts">
import type { LanguageServicesPage } from '~/data/languageServices'

defineProps<{ page: LanguageServicesPage }>()
</script>

<template>
  <div>
    <PageHero :eyebrow="page.eyebrow" :title="page.title" :intro="page.intro" :gradient="page.gradient" />

    <section class="border-b border-line bg-[#ece8de] py-12">
      <div class="page-shell grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="area in page.areas" :key="area[0]" class="border-t border-ink/15 pt-4">
          <h2 class="text-xs font-semibold uppercase tracking-[0.16em] text-moss">{{ area[0] }}</h2>
          <p class="mt-3 text-sm leading-6 text-ink/65">{{ area[1] }}</p>
        </div>
      </div>
    </section>

    <section class="section-space">
      <div class="page-shell">
        <SectionHeading eyebrow="Work packages" title="Choose one bounded technical outcome." :intro="page.packagesIntro" />

        <div class="mt-14 grid items-start gap-6 lg:grid-cols-3">
          <details v-for="item in page.packages" :key="item.title" class="group rounded-3xl border border-line bg-white/35">
            <summary class="flex min-h-[22rem] cursor-pointer list-none flex-col rounded-3xl p-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-moss [&::-webkit-details-marker]:hidden sm:p-8">
              <p class="text-xs font-semibold uppercase tracking-[0.16em] text-moss">{{ item.type }}</p>
              <h2 class="mt-4 font-display text-3xl leading-tight">{{ item.title }}</h2>
              <p class="mt-5 leading-7 text-ink/60">{{ item.intro }}</p>
              <p class="mt-6 inline-flex self-start rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-ink/65">{{ item.duration }}</p>
              <div class="mt-auto flex items-center justify-between gap-4 pt-7 text-sm font-semibold text-moss">
                <span class="group-open:hidden">Show package details</span>
                <span class="hidden group-open:inline">Hide package details</span>
                <span aria-hidden="true" class="flex size-9 shrink-0 items-center justify-center rounded-full border border-moss/30 transition-transform duration-200 group-open:rotate-45">
                  <svg viewBox="0 0 16 16" class="size-4" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
                </span>
              </div>
            </summary>

            <div class="space-y-7 border-t border-line px-7 pb-8 pt-7 sm:px-8">
              <div>
                <h3 class="text-xs font-semibold uppercase tracking-[0.14em] text-moss">Useful when</h3>
                <ul class="mt-4 space-y-3 text-sm leading-6 text-ink/65">
                  <li v-for="point in item.goodFor" :key="point" class="flex gap-3"><span aria-hidden="true" class="text-clay">—</span><span>{{ point }}</span></li>
                </ul>
              </div>
              <div>
                <h3 class="text-xs font-semibold uppercase tracking-[0.14em] text-moss">Work included</h3>
                <ul class="mt-4 space-y-3 text-sm leading-6 text-ink/65">
                  <li v-for="point in item.work" :key="point" class="flex gap-3"><span aria-hidden="true" class="text-clay">—</span><span>{{ point }}</span></li>
                </ul>
              </div>
              <div class="rounded-2xl bg-[#ece8de] p-5">
                <h3 class="text-xs font-semibold uppercase tracking-[0.14em] text-moss">You receive</h3>
                <ul class="mt-4 space-y-2 text-sm leading-6 text-ink/65">
                  <li v-for="point in item.outputs" :key="point" class="flex gap-3"><span aria-hidden="true" class="text-moss">✓</span><span>{{ point }}</span></li>
                </ul>
              </div>
              <p class="border-t border-line pt-5 text-sm leading-6 text-ink/55"><strong class="text-ink">Package boundary:</strong> {{ item.boundary }}</p>
              <AppButton to="/contact" variant="text">Discuss this package</AppButton>
            </div>
          </details>
        </div>
      </div>
    </section>

    <section class="section-space border-y border-line bg-[#ece8de]">
      <div class="page-shell">
        <SectionHeading eyebrow="Technical focus" title="The language is only part of the system." intro="The package accounts for the runtime, delivery path and production boundaries around the code—not syntax in isolation." />
        <div class="mt-12 grid gap-8 md:grid-cols-3">
          <article v-for="item in page.focus" :key="item.title" class="border-t border-ink/20 pt-6">
            <h2 class="font-display text-3xl">{{ item.title }}</h2>
            <p class="mt-4 leading-7 text-ink/60">{{ item.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section-space">
      <div class="page-shell grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
        <div>
          <p class="eyebrow">Start with one system</p>
          <h2 class="font-display text-4xl leading-tight sm:text-5xl">Enough context to define a responsible first step.</h2>
          <p class="mt-5 max-w-2xl text-lg leading-8 text-ink/60">{{ page.clientPrompt }}</p>
        </div>
        <div class="rounded-2xl border border-line bg-white/35 p-7 sm:p-9">
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-moss">No polished brief needed</p>
          <p class="mt-4 leading-7 text-ink/60">A repository, a problem and the decision or outcome you need are enough to start a useful conversation.</p>
          <AppButton to="/contact" class="mt-7">{{ page.contactLabel }}</AppButton>
        </div>
      </div>
    </section>

    <ContactCta />
  </div>
</template>
