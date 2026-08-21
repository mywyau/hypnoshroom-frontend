<script setup lang="ts">
const principles = [
  {
    number: '01',
    title: 'Outcomes before activity',
    text: 'An engagement should change something that matters: a safer upgrade, a service that is easier to change, a release that no longer feels risky. Progress is measured by that result, not by meetings held or documents produced.',
  },
  {
    number: '02',
    title: 'Engineering first',
    text: 'Decisions should stand up technically. That means understanding the system before prescribing a solution, making trade-offs explicit and choosing the simplest approach that solves the real problem.',
  },
  {
    number: '03',
    title: 'Quality throughout',
    text: 'Quality is more than clean code. It includes useful tests, readable decisions, safe releases and a system the next engineer can understand without archaeology.',
  },
  {
    number: '04',
    title: 'Passion with purpose',
    text: 'Good work comes from caring about the details: asking one more question, following an awkward failure to its source and leaving things in better shape than they were found.',
  },
]

usePageSeo({
  title: 'About | Hypnoshroom',
  description: 'Hypnoshroom is an outcome-led software consultancy built around engineering quality, care and strong backend delivery.',
  path: '/about',
})
</script>

<template>
  <div>
    <PageHero eyebrow="About Hypnoshroom" title="Built around the outcome." intro="Hypnoshroom is an independent software consultancy led by engineering, quality and a genuine passion for doing the work well." gradient="sage" />
    <section class="section-space">
      <div class="page-shell grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-24">
        <div>
          <h2 class="font-display text-4xl leading-tight sm:text-5xl">Good software work should hold up after the engagement ends.</h2>
          <div class="mt-8 space-y-6 text-lg leading-8 text-ink/65">
            <p>Hypnoshroom starts with the outcome: what needs to be safer, faster, clearer or easier to change when the work is done. The engineering serves that result—not the other way around.</p>
            <p>That means careful, useful work without extra ceremony, an impressive deck for its own sake or a rewrite recommended before the existing system is understood.</p>
            <p>Each engagement starts with the system as it really is: its constraints, its history and the people responsible for it. The aim is software that works better today and is easier for the team to own tomorrow.</p>
            <p>The company is founder-led and small by design. Clients have direct access to the engineer responsible for the work, keeping decisions close to the code and important details out of hand-off documents.</p>
          </div>
          <AppButton to="/contact" class="mt-9">Discuss a project</AppButton>
        </div>
        <aside class="rounded-3xl border border-line bg-[#ece8de] p-7 sm:p-9">
          <div class="grid aspect-[4/3] place-items-center rounded-2xl border border-dashed border-ink/25 bg-paper text-center text-sm text-ink/45">
            <div>
              <svg viewBox="0 0 48 48" class="mx-auto mb-3 size-10" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="24" cy="17" r="8"/><path d="M8 42c2-10 8-15 16-15s14 5 16 15"/></svg>
              Founder profile image placeholder
            </div>
          </div>
          <p class="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-moss">Founder</p>
          <h2 class="mt-2 font-display text-3xl">Founder name</h2>
          <p class="mt-4 leading-7 text-ink/60">Founder introduction goes here. Add a few plain-spoken lines about the systems you’ve worked on, the problems you enjoy solving and how you like to work.</p>
          <div class="mt-6 flex gap-5 text-sm font-semibold">
            <a href="#" aria-label="Founder LinkedIn profile placeholder" class="text-moss underline decoration-moss/30 underline-offset-4">LinkedIn placeholder</a>
            <a href="#" aria-label="Founder GitHub profile placeholder" class="text-moss underline decoration-moss/30 underline-offset-4">GitHub placeholder</a>
          </div>
        </aside>
      </div>
    </section>

    <section class="section-space border-y border-line bg-[#ece8de]">
      <div class="page-shell">
        <SectionHeading eyebrow="What leads the work" title="Outcomes first. Engineering throughout." intro="Quality and passion matter most when they produce a result the client can see, use and continue building on." />
        <ol class="mt-14 grid overflow-hidden rounded-2xl border border-line bg-paper sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="principle in principles" :key="principle.number" class="border-b border-line p-7 last:border-b-0 sm:min-h-80 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:p-8 lg:last:border-r-0">
            <span class="font-mono text-xs text-clay">{{ principle.number }}</span>
            <h2 class="mt-14 font-display text-3xl">{{ principle.title }}</h2>
            <p class="mt-4 leading-7 text-ink/60">{{ principle.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="section-space">
      <div class="page-shell grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
        <p class="eyebrow">Areas of work</p>
        <div>
          <h2 class="font-display text-4xl leading-tight sm:text-5xl">Software, from interface to production.</h2>
          <p class="mt-6 text-lg leading-8 text-ink/65">The work spans Scala, Java, TypeScript and Python; SQL and NoSQL databases; serverless and cloud platforms; integrations, testing, delivery and observability. The common thread is software that needs sound engineering rather than another layer of process.</p>
          <div class="mt-8 flex flex-wrap gap-3">
            <AppButton to="/expertise" variant="secondary">Explore expertise</AppButton>
            <AppButton to="/services" variant="text">View services</AppButton>
          </div>
        </div>
      </div>
    </section>

    <ContactCta />
  </div>
</template>
