<script setup lang="ts">
usePageSeo({
  title: 'About | Hypnoshroom',
  description: 'Hypnoshroom is a founder-led independent consultancy specialising in Scala, Java and JVM backend systems.',
  path: '/about',
})
</script>

<template>
  <div>
    <PageHero eyebrow="About Hypnoshroom" title="Small by design." intro="Hypnoshroom is a founder-led consultancy for organisations with Scala, Java and JVM backend work to get done." />
    <section class="section-space">
      <div class="page-shell grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-24">
        <div>
          <h2 class="font-display text-4xl leading-tight sm:text-5xl">You’ll always know who’s doing the work.</h2>
          <div class="mt-8 space-y-6 text-lg leading-8 text-ink/65">
            <p>Hypnoshroom is an independent, founder-led software consultancy. Clients work directly with the founder—the same person who reads the code, joins the stand-up and delivers the changes.</p>
            <p>That continuity keeps things simple. There’s no gap between understanding the problem and solving it, and no account-management layer for important details to get lost in.</p>
            <p>Hypnoshroom stays close to a particular kind of work: Scala and Java engineering, JVM upgrades, backend architecture, integrations, and the messy delivery problems around long-lived systems.</p>
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
    <WhyHypnoshroom />
    <ContactCta />
  </div>
</template>
