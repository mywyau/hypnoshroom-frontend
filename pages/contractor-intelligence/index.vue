<script setup lang="ts">
usePageSeo({ title: 'UK Contractor Intelligence | Hypnoshroom', path: '/contractor-intelligence',
  description: 'Compare permanent employment, an umbrella contract or an outside-IR35 limited company. Explore UK take-home pay, pension funding and the cash impact of gaps between assignments.' })
</script>
<template>
  <div>
    <PageHero eyebrow="Contractor intelligence" title="What would contracting mean for your income?" gradient="forest" size="compact"
      intro="Independent decision tools from Hypnoshroom for UK technology professionals weighing a permanent role against a contract offer." />
    <section class="page-shell grid gap-10 py-16 lg:grid-cols-2">
      <div class="rounded-2xl border border-line bg-white/60 p-6 sm:p-10">
        <p class="eyebrow">Employment comparison</p>
        <h2 class="font-display text-4xl">Salary or day rate?</h2>
        <p class="my-5 max-w-xl leading-7">Start with your offer and work backwards from the assignment rate to taxable pay. See what reaches your bank account, what goes into your pension and how a shorter contract changes the result.</p>
        <AppButton to="/contractor-intelligence/permanent-vs-contract">Compare my options</AppButton>
      </div>
      <div class="rounded-2xl border border-line bg-white/60 p-6 sm:p-10">
        <p class="eyebrow">Outside IR35</p>
        <h2 class="font-display text-4xl">Contracting through your company</h2>
        <p class="my-5 leading-7">See how much you can draw as salary and dividends, and what your company retains after Corporation Tax.</p>
        <AppButton to="/contractor-intelligence/outside-ir35">Model a limited company</AppButton>
      </div>
      <aside class="self-center lg:col-span-2">
        <h2 class="font-display text-3xl">Behind the figures</h2>
        <p class="my-4 leading-7">Read how the 2026/27 model treats UK tax bands, employer costs and unpaid time. All assumptions stay in your browser.</p>
        <NuxtLink class="text-moss underline" to="/contractor-intelligence/methodology">Read the methodology and sources</NuxtLink>
      </aside>
    </section>
  </div>
</template>
