<script setup lang="ts">
usePageSeo({
  title: 'Contact Hypnoshroom | Discuss an Engineering Problem',
  description: 'Discuss a technical review, testing assessment, Scala service, software product or embedded engineering requirement with Hypnoshroom.',
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
            <div><dt class="font-semibold text-ink">A good reason to talk</dt><dd class="mt-1 leading-6 text-ink/55">A risky change, hard-to-own service or product problem that needs experienced attention.</dd></div>
            <div><dt class="font-semibold text-ink">Start with what you know</dt><dd class="mt-1 leading-6 text-ink/55">We’ll clarify the problem, the constraints and a useful next step. If it is not a good fit, we’ll say so.</dd></div>
            <div><dt class="font-semibold text-ink">Direct from start to finish</dt><dd class="mt-1 leading-6 text-ink/55">The engineer doing the work handles the technical decisions and updates. No account-team hand-off.</dd></div>
          </dl>
        </div>
        <EnquiryForm />
      </div>
    </section>
  </div>
</template>
