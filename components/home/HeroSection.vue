<template>
  <section class="relative overflow-hidden border-b border-line">
    <div class="page-shell flex min-h-[calc(100svh-5rem)] items-center py-16 lg:py-20">
      <div class="relative z-10 max-w-5xl">
        <p class="eyebrow">Full-stack, backend &amp; modernisation</p>
        <h1 class="hero-gradient max-w-4xl font-display text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl xl:text-[5.4rem]">Better, transparent and quality software.</h1>
        <p class="mt-7 max-w-2xl text-lg leading-8 text-ink/65 sm:text-xl">Hypnoshroom is an outcome-led software engineering consultancy for teams building, testing and improving products—or modernising systems that have become difficult to change.</p>
        <div class="mt-9 flex flex-wrap gap-3">
          <AppButton to="/contact">Discuss a project</AppButton>
          <AppButton to="/services" variant="secondary">Explore services</AppButton>
        </div>
      </div>
    </div>
    <div class="page-shell absolute bottom-5 left-1/2 hidden -translate-x-1/2 justify-between text-[10px] uppercase tracking-[0.2em] text-ink/35 lg:flex">
      <span>Founder-led consultancy</span><span>Full-stack · backend · cloud</span>
    </div>
  </section>
</template>
