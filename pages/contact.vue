<script setup lang="ts">
usePageSeo({
  title: 'Contact | Hypnoshroom',
  description: 'Discuss a full-stack, backend, testing or modernisation project with Hypnoshroom.',
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
            <div><dt class="font-semibold text-ink">Useful starting points</dt><dd class="mt-1 leading-6 text-ink/55">A Scala or Play service needs attention, an upgrade feels risky or a focused backend or product problem needs moving forward.</dd></div>
            <div><dt class="font-semibold text-ink">The first conversation</dt><dd class="mt-1 leading-6 text-ink/55">We’ll talk through the system, what you have tried and what useful progress would look like. If it is not a good fit, we’ll say so.</dd></div>
            <div><dt class="font-semibold text-ink">Delivery and communication</dt><dd class="mt-1 leading-6 text-ink/55">The engineer responsible for the work stays involved in the technical decisions and progress updates. There is no hand-off to an account team.</dd></div>
          </dl>
        </div>
        <EnquiryForm />
      </div>
    </section>
  </div>
</template>
