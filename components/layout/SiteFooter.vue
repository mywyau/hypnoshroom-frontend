<template>
  <footer class="border-t border-line bg-[#ece8de]">
    <div class="page-shell grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
      <div>
        <NuxtLink to="/" class="font-display text-2xl font-semibold">Hypnoshroom</NuxtLink>
        <p class="mt-3 max-w-sm text-sm leading-6 text-ink/60">Specialist Scala engineering, modern software products and pragmatic delivery.</p>
      </div>
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">Navigate</p>
        <nav aria-label="Footer navigation" class="mt-4 grid grid-cols-2 gap-3 text-sm">
          <NuxtLink to="/services" class="hover:text-moss">Services</NuxtLink>
          <NuxtLink to="/expertise" class="hover:text-moss">Expertise</NuxtLink>
          <NuxtLink to="/insights" class="hover:text-moss">Insights</NuxtLink>
          <NuxtLink to="/about" class="hover:text-moss">About</NuxtLink>
          <NuxtLink to="/contact" class="hover:text-moss">Contact</NuxtLink>
          <NuxtLink to="/privacy" class="hover:text-moss">Privacy</NuxtLink>
        </nav>
      </div>
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">Start a conversation</p>
        <AppButton to="/contact" variant="text">Discuss a project</AppButton>
      </div>
    </div>
    <div class="page-shell border-t border-ink/10 py-6 text-xs text-ink/50">© {{ new Date().getFullYear() }} Hypnoshroom. All rights reserved.</div>
  </footer>
</template>
