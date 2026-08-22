<script setup lang="ts">
import { ClipboardCheck, GitPullRequest, MessagesSquare, UsersRound } from '@lucide/vue'

const principles = [
  { icon: ClipboardCheck, title: 'Clear scope', text: 'A shared definition of done.' },
  { icon: GitPullRequest, title: 'Focused delivery', text: 'Reviewable code and visible quality.' },
  { icon: MessagesSquare, title: 'Direct communication', text: 'Without unnecessary meetings or noise.' },
  { icon: UsersRound, title: 'Built to fit', text: 'Work that respects your team, practices and culture.' },
]
</script>

<template>
  <section class="section-space">
    <div class="page-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
      <div>
        <p class="eyebrow">About</p>
        <p class="font-display text-5xl leading-tight text-moss sm:text-6xl">Outcomes first.</p>
      </div>
      <div>
        <h2 class="font-display text-3xl leading-tight sm:text-4xl">Hypnoshroom is an independent consultancy led by outcomes. We focus on delivery, engineering quality and a genuine passion for software.</h2>
        <div class="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2">
          <div v-for="principle in principles" :key="principle.title" class="flex gap-4 border-t border-line pt-5">
            <span class="flex size-10 shrink-0 items-center justify-center rounded-xl border border-moss/20 bg-paper text-moss shadow-sm" aria-hidden="true">
              <component :is="principle.icon" class="size-5" :stroke-width="1.7" />
            </span>
            <div>
              <h3 class="font-semibold text-ink">{{ principle.title }}</h3>
              <p class="mt-1 text-sm leading-6 text-ink/60">{{ principle.text }}</p>
            </div>
          </div>
        </div>
        <AppButton to="/about" variant="text" class="mt-7">More about Hypnoshroom</AppButton>
      </div>
    </div>
  </section>
</template>
