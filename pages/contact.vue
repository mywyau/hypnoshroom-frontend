<script setup lang="ts">
usePageSeo({
  title: 'Contact Hypnoshroom | Discuss an Engineering Problem',
  description: 'Discuss a technical review, Scala service, software product or embedded engineering requirement with Hypnoshroom.',
  path: '/contact',
})
</script>

<template>
  <div>
    <PageHero eyebrow="Contact" title="Need someone to talk to?" intro="Give us a rough outline. What does the product or system do, where is the team stuck, and what needs to change?" />
    <section class="section-space">
      <div class="page-shell grid gap-14 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
        <div>
          <h2 class="font-display text-3xl">Tell us your problems.</h2>
          <p class="mt-5 leading-7 text-ink/60">Tell us what is frustrating the team right now. It might be an awkward Scala upgrade, a service nobody feels safe changing or a product problem that needs an experienced pair of hands. A few honest details are enough to start.</p>
          <dl class="mt-9 space-y-6 border-t border-line pt-7 text-sm">
            <div><dt class="font-semibold text-ink">Tell us what's on your mind?</dt></div>
            <div><dt class="font-semibold text-ink">Start with what you know</dt></div>
            <div><dt class="font-semibold text-ink">Direct from start to finish</dt></div>
          </dl>
        </div>
        <EnquiryForm />
      </div>
    </section>
  </div>
</template>
