<script setup lang="ts">
import type { LanguageServicesPage } from '~/data/languageServices'

defineProps<{ page: LanguageServicesPage }>()

const engagementSteps = [
  { icon: 'choose', title: 'Choose the engagement', text: 'Use a technical review when the problem is unclear, a testing review when the suite needs scrutiny, or embedded engineering when work is ready to deliver.' },
  { icon: 'boundary', title: 'Agree the boundary', text: 'Confirm the repository, access, review question and outputs, or the embedded responsibilities and first three-month increment.' },
  { icon: 'commit', title: 'Start with that commitment', text: 'Complete the review or current three-month increment, then make a separate decision about any follow-on work.' },
] as const
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
        <SectionHeading eyebrow="Ways to work together" :title="`Three clear ${page.language} engagements.`" :intro="page.packagesIntro" />
        <div class="mt-14">
          <article v-for="item in page.packages" :id="`package-${item.slug}`" :key="item.slug" class="scroll-mt-28 border-t border-line py-12 first:border-t-0 first:pt-0 lg:py-16">
            <div class="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
              <div>
                <div class="flex items-start justify-between gap-5">
                  <span class="text-xs font-semibold uppercase tracking-[0.16em] text-moss">{{ item.commercial }}</span>
                  <ServicePackageIcon :slug="item.slug" />
                </div>
                <h2 class="mt-5 font-display text-4xl leading-tight sm:text-5xl">{{ item.title }}</h2>
                <p class="mt-5 max-w-xl text-lg leading-8 text-ink/60">{{ item.intro }}</p>
                <div class="mt-5 flex flex-wrap gap-2">
                  <p class="inline-flex rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-ink/65">{{ item.price }}</p>
                  <p v-if="item.duration" class="inline-flex rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-ink/65">{{ item.duration }}</p>
                </div>
                <div class="mt-6 flex flex-wrap gap-3">
                  <AppButton :to="`/services/${item.slug}`" variant="secondary">View engagement details</AppButton>
                  <AppButton :to="`/contact?service=${item.slug}&language=${page.slug}`" variant="text">Discuss this engagement</AppButton>
                </div>
              </div>

              <div class="grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 class="text-xs font-semibold uppercase tracking-[0.16em] text-moss">Useful when</h3>
                  <ul class="mt-4 space-y-3 text-sm leading-6 text-ink/65">
                    <li v-for="point in item.goodFor" :key="point" class="border-t border-line pt-3">{{ point }}</li>
                  </ul>
                </div>
                <div>
                  <h3 class="text-xs font-semibold uppercase tracking-[0.16em] text-moss">Work included</h3>
                  <ul class="mt-4 space-y-3 text-sm leading-6 text-ink/65">
                    <li v-for="point in item.work" :key="point" class="border-t border-line pt-3">{{ point }}</li>
                  </ul>
                </div>
                <div class="rounded-2xl border border-line bg-white/35 p-6 sm:col-span-2 sm:p-8">
                  <h3 class="text-xs font-semibold uppercase tracking-[0.16em] text-moss">You receive</h3>
                  <ul class="mt-5 grid gap-x-8 gap-y-3 text-sm leading-6 text-ink/65 sm:grid-cols-2">
                    <li v-for="point in item.outputs" :key="point" class="border-t border-line pt-3">{{ point }}</li>
                  </ul>
                  <p class="mt-6 border-t border-line pt-5 text-sm leading-6 text-ink/55"><strong class="text-ink">Package boundary:</strong> {{ item.boundary }}</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section-space border-y border-line bg-[#ece8de]">
      <div class="page-shell">
        <SectionHeading eyebrow="Process" title="Choose the working model before work starts." intro="Review scope and embedded capacity are agreed differently. Each begins with explicit responsibilities, access and commercial terms." />
        <div class="mt-12 grid gap-8 md:grid-cols-3">
          <article v-for="step in engagementSteps" :key="step.icon" class="border-t border-ink/20 pt-5">
            <ServiceProcessIcon :icon="step.icon" />
            <h2 class="mt-8 font-display text-3xl">{{ step.title }}</h2>
            <p class="mt-4 text-sm leading-6 text-ink/60">{{ step.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section-space">
      <div class="page-shell grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
        <div>
          <p class="eyebrow">Client involvement</p>
          <h2 class="font-display text-4xl leading-tight sm:text-5xl">What access the work requires.</h2>
          <p class="mt-5 max-w-2xl text-lg leading-8 text-ink/60">The client provides repository access, build and deployment instructions, relevant logs or environments, and someone who can confirm required behaviour. A review owns the agreed investigation. Embedded engineering works through the client’s priorities and delivery process. Product decisions and acceptance remain with the client.</p>
        </div>
        <div class="rounded-2xl border border-line bg-white/35 p-7 sm:p-9">
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-moss">What to share</p>
          <p class="mt-4 leading-7 text-ink/60">{{ page.clientPrompt }}</p>
          <AppButton :to="`/contact?language=${page.slug}`" class="mt-7">{{ page.contactLabel }}</AppButton>
        </div>
      </div>
    </section>

    <ContactCta />
  </div>
</template>
