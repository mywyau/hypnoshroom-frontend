<template>
  <section class="relative overflow-hidden border-b border-line">
    <div class="page-shell grid min-h-[calc(100svh-5rem)] items-center gap-10 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:py-20">
      <div class="relative z-10">
        <p class="eyebrow">Specialist Scala &amp; JVM engineering</p>
        <h1 class="hero-gradient max-w-4xl font-display text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl xl:text-[5.4rem]">Better backend systems, without the consultancy overhead.</h1>
        <p class="mt-7 max-w-2xl text-lg leading-8 text-ink/65 sm:text-xl">Got a Scala or Java system that’s hard to change, overdue an upgrade, or simply needs another experienced pair of hands? That’s the work Hypnoshroom is here for.</p>
        <div class="mt-9 flex flex-wrap gap-3">
          <AppButton to="/contact">Discuss a project</AppButton>
          <AppButton to="/services" variant="secondary">Explore services</AppButton>
        </div>
      </div>
      <div class="relative mx-auto w-full max-w-xl lg:max-w-none">
        <div class="absolute inset-12 rounded-full bg-moss/5 blur-3xl" />
        <NetworkGraphic class="relative" />
      </div>
    </div>
    <div class="page-shell absolute bottom-5 left-1/2 hidden -translate-x-1/2 justify-between text-[10px] uppercase tracking-[0.2em] text-ink/35 lg:flex">
      <span>Founder-led consultancy</span><span>Independent · specialist</span>
    </div>
  </section>
</template>
