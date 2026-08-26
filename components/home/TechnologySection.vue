<script setup lang="ts">
const groups = [
  { title: 'Specialist Scala engineering', items: ['Scala 2 & 3', 'Play Framework', 'Cats', 'Cats Effect', 'sbt', 'MongoDB'] },
  { title: 'Modern product development', items: ['TypeScript', 'Nuxt 3', 'Vue', 'Auth0', 'Supabase', 'PostgreSQL', 'Vercel'] },
  { title: 'Backend engineering', items: ['Java', 'Spring Boot', 'REST APIs', 'Maven', 'database integration'] },
  { title: 'Testing & production', items: ['Unit and integration testing', 'CI/CD', 'Docker', 'Jenkins', 'logging and observability'] },
]
</script>

<template>
  <section class="section-space border-y border-line bg-[#ece8de]">
    <div class="page-shell grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
      <SectionHeading eyebrow="Technology" title="Depth where it matters." intro="Scala systems, modern products and the engineering practices that keep both reliable." />
      <div class="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        <div v-for="group in groups" :key="group.title" class="border-t border-ink/15 pt-4">
          <h3 class="text-xs font-semibold uppercase tracking-[0.16em] text-moss">{{ group.title }}</h3>
          <p class="mt-3 text-sm leading-7 text-ink/65">{{ group.items.join(' · ') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
