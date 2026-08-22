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
    <PageHero eyebrow="About Hypnoshroom" title="Built around outcomes." intro="Hypnoshroom is an independent software consultancy who focus on engineering quality and passion for great work." gradient="sage" />
    <section class="section-space">
      <div class="page-shell grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-24">
        <div>
          <h2 class="font-display text-4xl leading-tight sm:text-5xl">Good software work should hold up after the engagement ends.</h2>
          <div class="mt-8 space-y-6 text-lg leading-8 text-ink/65">
            <p>Hypnoshroom starts with the outcome: what needs to be safer, faster, clearer or easier to change when the work is done. The engineering serves that result—not the other way around.</p>
            <p>That means careful, useful work without extra ceremony, an impressive deck for its own sake or a rewrite recommended before the existing system is understood.</p>
            <p>Each engagement starts with the system as it really is: its constraints, its history and the people responsible for it. The aim is software that works better today and is easier for the team to own tomorrow.</p>
            <p>Hypnoshroom uses a focused delivery model. Clients work directly with the engineer responsible for the work, keeping decisions close to the code and important details out of hand-off documents.</p>
          </div>
          <AppButton to="/contact" class="mt-9">Discuss a project</AppButton>
        </div>
        <aside class="rounded-3xl border border-line bg-[#ece8de] p-7 sm:p-9">
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-moss">Technical focus</p>
          <h2 class="mt-3 font-display text-3xl leading-tight">Scala systems and modern software products.</h2>
          <p class="mt-5 leading-7 text-ink/60">The work combines specialist Scala engineering with hands-on product development and the testing, delivery and production support needed to keep software maintainable.</p>
          <dl class="mt-8 space-y-6 border-t border-ink/15 pt-7 text-sm">
            <div>
              <dt class="font-semibold text-ink">Scala engineering</dt>
              <dd class="mt-1 leading-6 text-ink/55">Scala 2.13, Play Framework, functional programming, sbt, APIs and MongoDB.</dd>
            </div>
            <div>
              <dt class="font-semibold text-ink">Product development</dt>
              <dd class="mt-1 leading-6 text-ink/55">TypeScript, Nuxt 3, Vue, Auth0, Supabase and PostgreSQL.</dd>
            </div>
            <div>
              <dt class="font-semibold text-ink">Software delivery</dt>
              <dd class="mt-1 leading-6 text-ink/55">Pragmatic testing, CI/CD, Docker, observability and production support.</dd>
            </div>
          </dl>
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
