<script setup lang="ts">
usePageSeo({
  title: 'Contact | Hypnoshroom',
  description: 'Discuss a Scala, Java, JVM engineering or backend modernisation project with Hypnoshroom.',
  path: '/contact',
})
</script>

<template>
  <div>
    <PageHero eyebrow="Contact" title="What’s happening in the backend?" intro="A rough outline is enough. What does the system do, where is the team stuck, and what needs to change?" />
    <section class="section-space">
      <div class="page-shell grid gap-14 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
        <div>
          <h2 class="font-display text-3xl">No polished brief needed.</h2>
          <p class="mt-5 leading-7 text-ink/60">Share what’s known so far—even if that’s simply “this service needs upgrading and the risk isn’t clear yet.” The gaps can be worked through in the first conversation.</p>
          <dl class="mt-9 space-y-6 border-t border-line pt-7 text-sm">
            <div><dt class="font-semibold text-ink">Usually a good fit</dt><dd class="mt-1 leading-6 text-ink/55">Scala, Java, JVM backend engineering and modernisation work.</dd></div>
            <div><dt class="font-semibold text-ink">Ways to work together</dt><dd class="mt-1 leading-6 text-ink/55">A short review, a contained delivery sprint, or longer hands-on support.</dd></div>
            <div><dt class="font-semibold text-ink">Working style</dt><dd class="mt-1 leading-6 text-ink/55">Direct, hands-on and low on ceremony.</dd></div>
          </dl>
        </div>
        <EnquiryForm />
      </div>
    </section>
  </div>
</template>
