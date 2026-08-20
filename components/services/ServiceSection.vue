<script setup lang="ts">
import type { Service } from '~/data/services'
defineProps<{ service: Service; reverse?: boolean; number?: string }>()
</script>

<template>
  <section :id="service.id" class="scroll-mt-28 border-t border-line py-16 sm:py-20">
    <div class="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20" :class="reverse && 'lg:grid-cols-[1.2fr_0.8fr]'">
      <div :class="reverse && 'lg:order-2'">
        <span class="font-mono text-xs text-moss">{{ number || service.number }}</span>
        <h2 class="mt-5 font-display text-4xl leading-tight sm:text-5xl">{{ service.title }}</h2>
        <p class="mt-6 text-lg leading-8 text-ink/65">{{ service.shortDescription }}</p>
        <p class="mt-7 inline-flex rounded-full bg-moss px-4 py-2 text-sm font-semibold text-white">{{ service.price }}</p>
        <p class="mt-6 text-sm leading-6 text-ink/55"><strong class="text-ink">Engagement format:</strong> {{ service.format }}</p>
        <AppButton to="/contact" class="mt-8">Discuss an engagement</AppButton>
      </div>
      <div class="grid gap-8 sm:grid-cols-2" :class="reverse && 'lg:order-1'">
        <div class="sm:col-span-2 rounded-2xl border border-line bg-white/35 p-6">
          <h3 class="text-xs font-semibold uppercase tracking-[0.18em] text-moss">This might fit if…</h3>
          <p class="mt-3 leading-7 text-ink/65">{{ service.whoFor }}</p>
        </div>
        <div>
          <h3 class="font-display text-2xl">What may be happening</h3>
          <ul class="mt-4 space-y-3 text-sm leading-6 text-ink/65">
            <li v-for="item in service.problems" :key="item" class="flex gap-3"><span aria-hidden="true" class="text-clay">—</span>{{ item }}</li>
          </ul>
        </div>
        <div>
          <h3 class="font-display text-2xl">How Hypnoshroom can help</h3>
          <ul class="mt-4 space-y-3 text-sm leading-6 text-ink/65">
            <li v-for="item in service.work" :key="item" class="flex gap-3"><span aria-hidden="true" class="text-clay">—</span>{{ item }}</li>
          </ul>
        </div>
        <div class="sm:col-span-2 border-t border-line pt-6">
          <h3 class="font-display text-2xl">What you’ll get</h3>
          <ul class="mt-4 grid gap-3 text-sm leading-6 text-ink/65 sm:grid-cols-2">
            <li v-for="item in service.deliverables" :key="item" class="flex gap-3"><span aria-hidden="true" class="text-moss">✓</span>{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
