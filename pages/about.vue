<script setup lang="ts">
import { FlaskConical, Handshake, Heart, MessagesSquare, Share2, Sprout, Wrench } from '@lucide/vue'

const culturePrinciples = [
  {
    icon: Heart,
    iconClass: 'text-[#b4493f]',
    title: 'People before pressure',
    text: 'Good work should not depend on routine late nights or permanent urgency. Workloads, deadlines and expectations should leave room for people to do their job well and still have a life outside it.',
  },
  {
    icon: MessagesSquare,
    iconClass: 'text-plum',
    title: 'Open, honest communication',
    text: 'Engineering suffers when a culture rewards agreement and polished status over the truth. People should be able to raise risks, uncertainty, mistakes and disagreement early without blame. Feedback should be direct, specific and respectful—because hiding a problem to keep a meeting comfortable only makes it more expensive later.',
  },
  {
    icon: Handshake,
    iconClass: 'text-[#42677c]',
    title: 'Trust over supervision',
    text: 'Give people the context and autonomy to make good decisions. Support should be easy to reach, but nobody should have to perform busyness or sit through unnecessary process to demonstrate their value.',
  },
  {
    icon: Sprout,
    iconClass: 'text-moss',
    title: 'Room to grow',
    text: 'Learning is part of the work, not something squeezed into spare time. Knowledge should be shared generously, and people should have space to develop without being punished for not already knowing everything.',
  },
]

const learningPrinciples = [
  {
    icon: Wrench,
    title: 'Make it tangible',
    text: 'Turn an idea into something that can run, be used or be inspected. Even a small implementation reveals constraints that remain invisible in an abstract discussion.',
  },
  {
    icon: FlaskConical,
    title: 'Experiment safely',
    text: 'Try unfamiliar approaches at a scale where getting something wrong is useful rather than costly. The purpose is to test an assumption, not prove that the first idea was correct.',
  },
  {
    icon: Share2,
    title: 'Reflect and share',
    text: 'Learning becomes more valuable when the result is explained. Record what worked, what did not and what should change next so knowledge does not remain with one person.',
  },
]

usePageSeo({
  title: 'About Hypnoshroom | Independent Software Consultancy',
  description: 'A small, specialist software consultancy offering direct engineering expertise, bounded engagements and work designed for client teams to own.',
  path: '/about',
})
</script>

<template>
  <div>
    <PageHero eyebrow="About Hypnoshroom" title="Built around outcomes." intro="An independent software consultancy focused on specialist engineering, clear outcomes and work that lasts." gradient="sage" />
    <section class="section-space">
      <div class="page-shell grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-24">
        <div>
          <p class="eyebrow">Why work with an independent consultancy</p>
          <h2 class="font-display text-4xl leading-tight sm:text-5xl">Experienced engineering, without the layers.</h2>
          <p class="mt-7 text-lg leading-8 text-ink/65">Hypnoshroom combines specialist technical experience with the focus and accountability of an independent consultancy.</p>
          <dl class="mt-9 divide-y divide-line border-y border-line">
            <div class="py-5">
              <dt class="font-semibold text-ink">Independent judgment</dt>
              <dd class="mt-2 leading-7 text-ink/60">Recommendations are shaped by the evidence and the outcome—not by a platform, delivery team or larger programme to sell.</dd>
            </div>
            <div class="py-5">
              <dt class="font-semibold text-ink">Experience applied directly</dt>
              <dd class="mt-2 leading-7 text-ink/60">Hands-on experience across long-lived backend systems, modern software products, testing and production support goes directly into the work.</dd>
            </div>
            <div class="py-5">
              <dt class="font-semibold text-ink">Direct collaboration</dt>
              <dd class="mt-2 leading-7 text-ink/60">Work directly with the engineer responsible for the technical decisions, code and progress updates from the first conversation onwards. Cutting out layers of comms, noise and miscommunication.</dd>
            </div>
            <div class="py-5">
              <dt class="font-semibold text-ink">Built for your team to own</dt>
              <dd class="mt-2 leading-7 text-ink/60">Findings, decisions and technical context stay visible throughout the work. The aim is stronger software and a team that can move forward without permanent consultancy support.</dd>
            </div>
          </dl>
          <p class="mt-7 leading-7 text-ink/60">A good fit for teams that need an experienced engineer to understand a difficult system, test an assumption or contribute directly to delivery.</p>
          <AppButton to="/contact" class="mt-9">Discuss your system</AppButton>
        </div>
        <aside class="rounded-3xl border border-line bg-[#ece8de] p-7 sm:p-9">
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-moss">Engineering expertise</p>
          <h2 class="mt-3 font-display text-3xl leading-tight">Different technologies. The same concern for quality.</h2>
          <p class="mt-5 leading-7 text-ink/60">Explore hands-on expertise across backend systems, modern web products, testing and production delivery.</p>
          <dl class="mt-8 space-y-6 border-t border-ink/15 pt-7 text-sm">
            <div>
              <dt class="font-semibold text-ink">Backend systems</dt>
              <dd class="mt-1 leading-6 text-ink/55">Scala, Java and Python services; APIs, databases and distributed backend applications.</dd>
            </div>
            <div>
              <dt class="font-semibold text-ink">Modern product development</dt>
              <dd class="mt-1 leading-6 text-ink/55">TypeScript, Nuxt 3, Vue, Auth0, Supabase and PostgreSQL.</dd>
            </div>
            <div>
              <dt class="font-semibold text-ink">Quality and production</dt>
              <dd class="mt-1 leading-6 text-ink/55">Pragmatic testing, CI/CD, Docker, observability, debugging and production support.</dd>
            </div>
          </dl>
          <AppButton to="/expertise" variant="text" class="mt-8">Explore expertise</AppButton>
        </aside>
      </div>
    </section>

    <section class="section-space border-y border-line bg-[#eee9f0]">
      <div class="page-shell">
        <SectionHeading eyebrow="People &amp; culture" title="Individuals before anything else." intro="Hypnoshroom believes we as individuals create and add value to our world. This means supporting those who create change, drive innovation or build to improve our society." />
        <ol class="mt-14 grid overflow-hidden rounded-2xl border border-line bg-paper sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="principle in culturePrinciples" :key="principle.title" class="border-b border-line p-7 last:border-b-0 sm:min-h-80 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:p-8 lg:last:border-r-0">
            <span class="flex size-11 items-center justify-center rounded-xl border border-line bg-paper shadow-sm" :class="principle.iconClass" aria-hidden="true">
              <component :is="principle.icon" class="size-5" :stroke-width="1.7" />
            </span>
            <h2 class="mt-12 font-display text-3xl">{{ principle.title }}</h2>
            <p class="mt-4 leading-7 text-ink/60">{{ principle.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="section-space border-b border-line">
      <div class="page-shell grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div>
          <p class="eyebrow">Learning by doing</p>
          <h2 class="font-display text-4xl leading-tight sm:text-5xl">Getting your hands dirty.</h2>
          <p class="mt-6 text-lg leading-8 text-ink/65">Documentation, discussion and theory provide a map. To truly learn and master we believe you must do! By building something, observing how it behaves and improving it turns that knowledge into practical judgement.</p>
        </div>
        <div class="grid gap-5 sm:grid-cols-3">
          <article v-for="principle in learningPrinciples" :key="principle.title" class="rounded-2xl border border-line bg-white/35 p-6">
            <span class="flex size-11 items-center justify-center rounded-xl border border-line bg-paper text-plum shadow-sm" aria-hidden="true">
              <component :is="principle.icon" class="size-5" :stroke-width="1.7" />
            </span>
            <h3 class="mt-8 font-display text-2xl">{{ principle.title }}</h3>
            <p class="mt-3 text-sm leading-6 text-ink/60">{{ principle.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <ContactCta />
  </div>
</template>
