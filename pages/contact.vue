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
          <h2 class="font-display text-3xl">No polished brief needed.</h2>
          <p class="mt-5 leading-7 text-ink/60">Share what’s known so far—even if that’s simply “this service needs upgrading and the risk isn’t clear yet.” The gaps can be worked through in the first conversation.</p>
          <dl class="mt-9 space-y-6 border-t border-line pt-7 text-sm">
            <div><dt class="font-semibold text-ink">Usually a good fit</dt><dd class="mt-1 leading-6 text-ink/55">Full-stack and backend engineering, testing, technical reviews and modernisation.</dd></div>
            <div><dt class="font-semibold text-ink">Ways to work together</dt><dd class="mt-1 leading-6 text-ink/55">Scoped engineering, embedded team support, a technical review or modernisation.</dd></div>
            <div><dt class="font-semibold text-ink">Working style</dt><dd class="mt-1 leading-6 text-ink/55">Direct, hands-on and low on ceremony.</dd></div>
          </dl>
        </div>
        <EnquiryForm />
      </div>
    </section>
  </div>
</template>
