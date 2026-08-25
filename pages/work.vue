<script setup lang="ts">
import { Boxes, GitPullRequest, MonitorUp, RefreshCw } from '@lucide/vue'

const experienceAreas = [
  {
    icon: Boxes,
    eyebrow: 'Scala & backend systems',
    title: 'Evolving long-lived Scala services',
    context: 'Professional experience · HMRC domain',
    intro: 'Around eight years of experience working with Scala services in an established public-sector domain, where changes need to respect existing behaviour, integrations and operational constraints.',
    work: [
      'Maintaining and extending Scala 2.13 and Play Framework applications',
      'Working with REST APIs, Play JSON, MongoDB and hmrc-mongo',
      'Managing sbt and multi-project builds, dependencies and compiler configuration',
      'Writing unit, integration and acceptance tests around changed behaviour',
      'Investigating live issues through logs, monitoring and production evidence',
      'Considering safe routes from long-lived Scala 2 systems towards Scala 3',
    ],
    perspective: 'This experience informs a cautious approach to mature systems: understand why the code looks the way it does, protect important behaviour and separate necessary change from optional cleanup.',
  },
  {
    icon: MonitorUp,
    eyebrow: 'Modern product development',
    title: 'Taking a web product from idea to production',
    context: 'Independent product engineering',
    intro: 'Hands-on experience designing, building and deploying SaaS-style applications as a solo developer, including the product decisions and operational details around the code.',
    work: [
      'Building full-stack applications with TypeScript, Nuxt 3 and Vue',
      'Implementing authentication and account flows with Auth0',
      'Designing database-backed features with Supabase and PostgreSQL',
      'Integrating external and geolocation APIs behind application boundaries',
      'Working through permissions, configuration and environment separation',
      'Deploying to Vercel and considering runtime, load and concurrency behaviour',
    ],
    perspective: 'The useful experience is not only assembling a technology stack. It is making trade-offs across the interface, server, data model, authentication and deployment path while keeping the product small enough to own.',
  },
  {
    icon: GitPullRequest,
    eyebrow: 'Quality & production delivery',
    title: 'Keeping changes reviewable and operable',
    context: 'Applied across backend and product work',
    intro: 'Testing, delivery and production support are treated as part of engineering rather than activities added after implementation is complete.',
    work: [
      'Using ScalaTest, JUnit, Mockito, Cucumber and Selenium where appropriate',
      'Balancing focused unit tests with integration and acceptance evidence',
      'Working with Git, GitHub, Jenkins, CI/CD pipelines and Docker',
      'Debugging live behaviour using Grafana, Kibana, Splunk and CloudWatch',
      'Improving code through bounded refactoring and dependency cleanup',
      'Recording decisions and leaving work understandable for the team taking it forward',
    ],
    perspective: 'The aim is pragmatic confidence: feedback that helps engineers make decisions, releases that can be understood and software that does not depend on one person retaining all of the context.',
  },
]

const engagementValue = [
  ['Established systems are familiar territory', 'The work can begin with an existing codebase, incomplete documentation and constraints that cannot simply be redesigned away.'],
  ['Decisions are followed across boundaries', 'Types, application logic, APIs, persistence, tests and production behaviour are considered together when the problem crosses them.'],
  ['Advice stays close to implementation', 'Recommendations are grounded in buildable, testable software and the realities of how a team will deliver and own the next change.'],
]

usePageSeo({
  title: 'Selected Engineering Experience | Hypnoshroom',
  description: 'Selected professional experience behind Hypnoshroom across Scala and Play services, modern TypeScript products, testing and production delivery.',
  path: '/work',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
  ],
})
</script>

<template>
  <div>
    <PageHero eyebrow="Selected experience" title="Work grounded in real systems." intro="The experience behind Hypnoshroom spans long-lived Scala services, independently built web products and the testing and production work needed to keep software useful." gradient="heather" />

    <section class="border-b border-line bg-[#ece8de] py-12 sm:py-16">
      <div class="page-shell grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <p class="eyebrow">A transparent starting point</p>
        <div class="max-w-3xl">
          <h2 class="font-display text-4xl leading-tight sm:text-5xl">Hypnoshroom maybe new. The experience behind it is not.</h2>
          <p class="mt-6 text-lg leading-8 text-ink/65">The examples below describe professional and independently delivered engineering experience. They are not presented as Hypnoshroom client case studies, and no client result is being claimed without evidence or permission.</p>
        </div>
      </div>
    </section>

    <section class="section-space">
      <div class="page-shell">
        <SectionHeading eyebrow="Selected work" title="Three areas of applied experience." intro="The common thread is software that already has users, constraints and consequences when a change goes wrong." />

        <div class="mt-14 divide-y divide-line border-y border-line">
          <article v-for="area in experienceAreas" :key="area.title" class="grid gap-10 py-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:py-16">
            <div>
              <span class="flex size-12 items-center justify-center rounded-2xl border border-moss/20 bg-paper text-moss shadow-sm" aria-hidden="true">
                <component :is="area.icon" class="size-6" :stroke-width="1.6" />
              </span>
              <p class="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-moss">{{ area.eyebrow }}</p>
              <h2 class="mt-3 font-display text-4xl leading-tight sm:text-5xl">{{ area.title }}</h2>
              <p class="mt-4 text-sm font-semibold text-ink/50">{{ area.context }}</p>
              <p class="mt-5 text-lg leading-8 text-ink/65">{{ area.intro }}</p>
            </div>

            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.16em] text-moss">Representative work</p>
              <ul class="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                <li v-for="item in area.work" :key="item" class="border-t border-line pt-4 text-sm leading-6 text-ink/65">{{ item }}</li>
              </ul>
              <div class="mt-8 rounded-2xl border border-line bg-white/35 p-6 sm:p-7">
                <p class="text-xs font-semibold uppercase tracking-[0.14em] text-ink/45">What this experience brings</p>
                <p class="mt-3 leading-7 text-ink/65">{{ area.perspective }}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section-space border-t border-line bg-[#eee9f0]">
      <div class="page-shell grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div>
          <span class="flex size-12 items-center justify-center rounded-2xl border border-plum/20 bg-paper text-plum shadow-sm" aria-hidden="true">
            <RefreshCw class="size-6" :stroke-width="1.6" />
          </span>
          <p class="mt-7 eyebrow">Continuous learning</p>
          <h2 class="font-display text-4xl leading-tight sm:text-5xl">Stay current. Adopt deliberately.</h2>
        </div>
        <div>
          <p class="max-w-3xl text-lg leading-8 text-ink/65">Software keeps moving. Languages, frameworks, build tools and delivery platforms change, and staying useful means keeping up with the parts of that change that affect real systems.</p>
          <p class="mt-5 max-w-3xl leading-7 text-ink/60">That does not mean replacing working technology whenever something new appears. New approaches are read about, tested and weighed against support, maintainability, migration cost and the people who will own the result.</p>
          <dl class="mt-9 grid gap-8 sm:grid-cols-3">
            <div class="border-t border-plum/20 pt-5">
              <dt class="font-semibold text-ink">Follow the ecosystems</dt>
              <dd class="mt-2 text-sm leading-6 text-ink/60">Keep track of relevant language releases, framework direction, dependency support and changing production practices.</dd>
            </div>
            <div class="border-t border-plum/20 pt-5">
              <dt class="font-semibold text-ink">Learn by building</dt>
              <dd class="mt-2 text-sm leading-6 text-ink/60">Use small experiments and independently built products to understand how a tool behaves beyond its introductory example.</dd>
            </div>
            <div class="border-t border-plum/20 pt-5">
              <dt class="font-semibold text-ink">Modernise with a reason</dt>
              <dd class="mt-2 text-sm leading-6 text-ink/60">Adopt newer technology when it improves support, delivery, reliability or ownership—not simply because it is fashionable.</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <section class="section-space border-y border-line bg-[#ece8de]">
      <div class="page-shell">
        <SectionHeading eyebrow="In an engagement" title="Experience that shortens the path to useful work." intro="Previous experience does not remove the need to understand a new system. It helps identify the right questions, recognise familiar risks and avoid treating every problem as if it starts from a blank page." />
        <dl class="mt-12 grid gap-8 md:grid-cols-3">
          <div v-for="item in engagementValue" :key="item[0]" class="border-t border-ink/20 pt-5">
            <dt class="font-display text-2xl">{{ item[0] }}</dt>
            <dd class="mt-3 text-sm leading-6 text-ink/60">{{ item[1] }}</dd>
          </div>
        </dl>
        <div class="mt-10 flex flex-wrap gap-3">
          <AppButton to="/services">Explore ways to work together</AppButton>
          <AppButton to="/expertise" variant="secondary">View technical expertise</AppButton>
        </div>
      </div>
    </section>

    <ContactCta />
  </div>
</template>
