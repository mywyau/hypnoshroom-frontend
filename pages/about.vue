<script setup lang="ts">
const principles = [
  {
    number: '01',
    title: 'Reproduce before diagnosing',
    text: 'Run the build, exercise the relevant tests and inspect the available runtime evidence before deciding what is wrong. A credible recommendation starts with behaviour that can be observed.',
  },
  {
    number: '02',
    title: 'Trace the real boundary',
    text: 'Follow behaviour through validation, application logic, APIs and persistence. Difficult failures often sit where two otherwise-correct parts of the system meet.',
  },
  {
    number: '03',
    title: 'Separate the changes',
    text: 'Keep behaviour changes, refactoring and dependency upgrades distinct where possible. Smaller changes are easier to review, explain, test and reverse.',
  },
  {
    number: '04',
    title: 'Verify beyond compilation',
    text: 'A successful build is only one signal. Relevant unit, integration and acceptance checks should support the release path and the behaviour seen in production.',
  },
]

usePageSeo({
  title: 'About Hypnoshroom | Independent Software Consultancy',
  description: 'A small, specialist software consultancy offering direct engineering expertise, bounded engagements and work designed for client teams to own.',
  path: '/about',
})
</script>

<template>
  <div>
    <PageHero eyebrow="About Hypnoshroom" title="Built around outcomes." intro="An independent software consultancy focused on specialist engineering, clear outcomes and work that lasts." gradient="sage" />
    <section class="section-space">
      <div class="page-shell grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-24">
        <div>
          <p class="eyebrow">Why work with an independent consultancy</p>
          <h2 class="font-display text-4xl leading-tight sm:text-5xl">Experienced engineering, without the layers.</h2>
          <p class="mt-7 text-lg leading-8 text-ink/65">Hypnoshroom combines specialist technical experience with the focus and accountability of an independent consultancy.</p>
          <dl class="mt-9 divide-y divide-line border-y border-line">
            <div class="py-5">
              <dt class="font-semibold text-ink">Independent judgment</dt>
              <dd class="mt-2 leading-7 text-ink/60">Recommendations are shaped by the evidence and the outcome—not by a platform, delivery team or larger programme to sell.</dd>
            </div>
            <div class="py-5">
              <dt class="font-semibold text-ink">Experience applied directly</dt>
              <dd class="mt-2 leading-7 text-ink/60">Hands-on experience across long-lived backend systems, modern software products, testing and production support goes directly into the work.</dd>
            </div>
            <div class="py-5">
              <dt class="font-semibold text-ink">Direct collaboration</dt>
              <dd class="mt-2 leading-7 text-ink/60">Work with the engineer responsible for the technical decisions, code and progress updates from the first conversation onwards.</dd>
            </div>
            <div class="py-5">
              <dt class="font-semibold text-ink">Built for your team to own</dt>
              <dd class="mt-2 leading-7 text-ink/60">Findings, decisions and technical context stay visible throughout the work. The aim is stronger software and a team that can move forward without permanent consultancy support.</dd>
            </div>
          </dl>
          <p class="mt-7 leading-7 text-ink/60">A good fit for teams that need an experienced engineer to understand a difficult system, test an assumption or contribute directly to delivery.</p>
          <AppButton to="/contact" class="mt-9">Discuss your system</AppButton>
        </div>
        <aside class="rounded-3xl border border-line bg-[#ece8de] p-7 sm:p-9">
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-moss">Engineering expertise</p>
          <h2 class="mt-3 font-display text-3xl leading-tight">Different technologies. The same concern for quality.</h2>
          <p class="mt-5 leading-7 text-ink/60">Explore hands-on expertise across backend systems, modern web products, testing and production delivery.</p>
          <dl class="mt-8 space-y-6 border-t border-ink/15 pt-7 text-sm">
            <div>
              <dt class="font-semibold text-ink">Backend systems</dt>
              <dd class="mt-1 leading-6 text-ink/55">Scala, Java and Python services; APIs, databases and distributed backend applications.</dd>
            </div>
            <div>
              <dt class="font-semibold text-ink">Modern product development</dt>
              <dd class="mt-1 leading-6 text-ink/55">TypeScript, Nuxt 3, Vue, Auth0, Supabase and PostgreSQL.</dd>
            </div>
            <div>
              <dt class="font-semibold text-ink">Quality and production</dt>
              <dd class="mt-1 leading-6 text-ink/55">Pragmatic testing, CI/CD, Docker, observability, debugging and production support.</dd>
            </div>
          </dl>
          <AppButton to="/expertise" variant="text" class="mt-8">Explore expertise</AppButton>
        </aside>
      </div>
    </section>

    <section class="section-space border-y border-line bg-[#ece8de]">
      <div class="page-shell">
        <SectionHeading eyebrow="Technical approach" title="How careful engineering shows up in the work." intro="The method is practical: establish the evidence, follow the system across its boundaries, keep changes understandable and verify the result in context." />
        <ol class="mt-14 grid overflow-hidden rounded-2xl border border-line bg-paper sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="principle in principles" :key="principle.number" class="border-b border-line p-7 last:border-b-0 sm:min-h-80 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:p-8 lg:last:border-r-0">
            <span class="font-mono text-xs text-clay">{{ principle.number }}</span>
            <h2 class="mt-14 font-display text-3xl">{{ principle.title }}</h2>
            <p class="mt-4 leading-7 text-ink/60">{{ principle.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <ContactCta />
  </div>
</template>
