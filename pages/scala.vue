<script setup lang="ts">
const areas = [
  ['Language & runtime', 'Scala 2.13 · JVM · JDK · Scala 3 considerations'],
  ['Play & APIs', 'Play Framework · REST APIs · Play JSON · validation'],
  ['Functional Scala', 'Cats · Cats Effect · FS2 · http4s · typed errors'],
  ['Data & persistence', 'MongoDB · hmrc-mongo · document models · indexes'],
  ['Builds & dependencies', 'sbt · project builds · compiler plugins · dependency maintenance'],
  ['Testing & quality', 'ScalaTest · Mockito · unit · integration · acceptance tests'],
  ['Refactoring & code health', 'Type-driven design · safer boundaries · code cleanup · maintainability'],
  ['Production engineering', 'Live issue diagnosis · logging · monitoring · CI/CD · Docker'],
]

const workPackages = [
  {
    slug: 'technical-review',
    title: 'Scala Technical Review & Discovery',
    commercial: 'Fixed scope · fixed fee',
    price: 'From £3,500',
    duration: null,
    intro: 'Investigate one Scala service or technical question and provide evidence the team can use to decide what to do next.',
    goodFor: ['A Scala or Play service is difficult to change', 'A framework, dependency or runtime decision needs technical evidence', 'The build, tests or production behaviour do not provide enough confidence', 'A recurring problem has no agreed cause or priority'],
    work: ['Run the service and establish the available build and test baseline', 'Inspect the code, types, APIs, persistence and dependencies relevant to the question', 'Review relevant testing, delivery and production evidence', 'Use a small experimental branch when one assumption needs testing', 'Discuss missing domain or operational context with the client team'],
    outputs: ['Concise written review of the current system', 'Ranked findings supported by code or runtime evidence', 'Recommended next steps and realistic options', 'Experimental branch where agreed and useful', 'Technical walkthrough with the team'],
    boundary: 'The standard package covers one primary repository or deployable service and one technical question. It does not include implementation, an estate-wide audit, an exhaustive security assessment or a guaranteed delivery estimate. Broader reviews are scoped and quoted separately.',
    packagePath: '/services/technical-review',
    contactPath: '/contact?service=technical-review',
  },
  {
    slug: 'testing-suite-review',
    title: 'Scala Testing Suite Review',
    commercial: 'Fixed scope · fixed fee',
    price: 'From £3,500',
    duration: null,
    intro: 'Review the unit and integration testing approach around one Scala service and identify where the suite helps, misleads or slows the team down.',
    goodFor: ['Tests pass but releases still feel risky', 'The suite is slow, brittle or expensive to maintain', 'Unit and integration responsibilities are unclear', 'Mocks, fixtures or test setup obscure the behaviour being protected'],
    work: ['Review representative ScalaTest unit and integration tests', 'Assess test boundaries, naming, structure, fixtures and test doubles', 'Look for brittle assertions, excessive mocking, hidden coupling and missing integration evidence', 'Review feedback speed, repeatability and how failures are diagnosed'],
    outputs: ['Written assessment of the current testing approach', 'Examples of testing smells found in the suite', 'Prioritised recommendations by risk and value', 'Suggested unit and integration testing boundaries', 'Technical walkthrough with the team'],
    boundary: 'The standard package covers the unit and integration test suites for one primary repository or service. It assesses the existing approach and recommends changes; it does not include writing, rewriting or repairing production code or tests.',
    packagePath: '/services/testing-suite-review',
    contactPath: '/contact?service=testing-suite-review&language=scala',
  },
  {
    slug: 'embedded-engineering-support',
    title: 'Embedded Scala Engineering',
    commercial: 'Day-rate engagement',
    price: 'From £500 per day',
    duration: '3-month increments · up to 12 months',
    intro: 'Add experienced Scala engineering capacity to an established team with a backlog, product context and delivery process already in place.',
    goodFor: ['A team needs additional Scala or Play capacity', 'Features, maintenance or production issues need hands-on engineering', 'Planned framework, dependency or runtime changes need implementing', 'Testing, APIs, MongoDB or sbt work needs focused attention'],
    work: ['Join the team’s existing backlog, reviews and delivery rhythm', 'Implement and maintain Scala services, Play applications and REST APIs', 'Improve types, service boundaries, MongoDB access and automated tests', 'Investigate build, dependency and production problems', 'Document decisions and share system knowledge as the work develops'],
    outputs: ['Production-ready, reviewed engineering changes', 'Tests and documentation around completed work', 'Visible progress through the client’s existing workflow', 'Technical decisions recorded close to the work', 'A clean transfer of unfinished or completed work at the end'],
    boundary: 'The working pattern and responsibilities are agreed for each three-month increment, with a maximum total engagement of 12 months. The client owns product priorities, domain decisions and acceptance. This is not unlimited availability, team management or permanent on-call support.',
    packagePath: '/services/embedded-engineering-support',
    contactPath: '/contact?service=embedded-engineering-support',
  },
] as const

const engagementSteps = [
  { icon: 'choose', title: 'Choose the engagement', text: 'Use a technical review when the problem is unclear, a testing review when the suite needs scrutiny, or embedded engineering when work is ready to deliver.' },
  { icon: 'boundary', title: 'Agree the boundary', text: 'Confirm the repository, access, review question and outputs, or the embedded responsibilities and first three-month increment.' },
  { icon: 'commit', title: 'Start with that commitment', text: 'Complete the review or current three-month increment, then make a separate decision about any follow-on work.' },
] as const

usePageSeo({
  title: 'Scala & JVM Engineering | Hypnoshroom',
  description: 'Scala technical reviews, testing suite assessments and embedded engineering for Scala services, Play applications, sbt builds, APIs and MongoDB.',
  path: '/scala',
})
</script>

<template>
  <div>
    <PageHero eyebrow="Scala & JVM" title="Need help with a Scala system?" intro="Technical review, testing assessment and embedded engineering for Scala services, Play applications, sbt builds, APIs and MongoDB." gradient="scala" />

    <section class="border-b border-line bg-[#ece8de] py-12">
      <div class="page-shell grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="area in areas" :key="area[0]" class="border-t border-ink/15 pt-4">
          <h2 class="text-xs font-semibold uppercase tracking-[0.16em] text-moss">{{ area[0] }}</h2>
          <p class="mt-3 text-sm leading-6 text-ink/65">{{ area[1] }}</p>
        </div>
      </div>
    </section>

    <section class="section-space">
      <div class="page-shell">
        <SectionHeading eyebrow="Ways to work together" title="Three clear Scala engagements." intro="Use a Technical Review when a system question needs evidence, a Testing Suite Review when confidence in the tests is the problem, or Embedded Scala Engineering when the team has work ready to deliver." />
        <div class="mt-14">
          <article v-for="item in workPackages" :id="`package-${item.slug}`" :key="item.slug" class="scroll-mt-28 border-t border-line py-12 first:border-t-0 first:pt-0 lg:py-16">
            <div class="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
              <div>
                <div class="flex items-start justify-between gap-5">
                  <span class="text-xs font-semibold uppercase tracking-[0.16em] text-moss">{{ item.commercial }}</span>
                  <ServicePackageIcon :slug="item.slug" />
                </div>
                <h2 class="mt-5 font-display text-4xl leading-tight sm:text-5xl">{{ item.title }}</h2>
                <p class="mt-5 max-w-xl text-lg leading-8 text-ink/60">{{ item.intro }}</p>
                <div class="mt-5 flex flex-wrap gap-2">
                  <p v-if="item.price" class="inline-flex rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-ink/65">{{ item.price }}</p>
                  <p v-if="item.duration" class="inline-flex rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-ink/65">{{ item.duration }}</p>
                </div>
                <div class="mt-6 flex flex-wrap gap-3">
                  <AppButton :to="item.packagePath" variant="secondary">View engagement details</AppButton>
                  <AppButton :to="item.contactPath" variant="text">Discuss this engagement</AppButton>
                </div>
              </div>

              <div class="grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 class="text-xs font-semibold uppercase tracking-[0.16em] text-moss">Useful when</h3>
                  <ul class="mt-4 space-y-3 text-sm leading-6 text-ink/65">
                    <li v-for="point in item.goodFor" :key="point" class="border-t border-line pt-3">{{ point }}</li>
                  </ul>
                </div>
                <div>
                  <h3 class="text-xs font-semibold uppercase tracking-[0.16em] text-moss">Work included</h3>
                  <ul class="mt-4 space-y-3 text-sm leading-6 text-ink/65">
                    <li v-for="point in item.work" :key="point" class="border-t border-line pt-3">{{ point }}</li>
                  </ul>
                </div>
                <div class="sm:col-span-2 rounded-2xl border border-line bg-white/35 p-6 sm:p-8">
                  <h3 class="text-xs font-semibold uppercase tracking-[0.16em] text-moss">You receive</h3>
                  <ul class="mt-5 grid gap-x-8 gap-y-3 text-sm leading-6 text-ink/65 sm:grid-cols-2">
                    <li v-for="point in item.outputs" :key="point" class="border-t border-line pt-3">{{ point }}</li>
                  </ul>
                  <p class="mt-6 border-t border-line pt-5 text-sm leading-6 text-ink/55"><strong class="text-ink">Package boundary:</strong> {{ item.boundary }}</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section-space border-y border-line bg-[#ece8de]">
      <div class="page-shell">
        <SectionHeading eyebrow="Process" title="Choose the working model before work starts." intro="Review scope and embedded capacity are agreed differently. Both begin with explicit responsibilities, access and commercial terms." />
        <div class="mt-12 grid gap-8 md:grid-cols-3">
          <article v-for="step in engagementSteps" :key="step.icon" class="border-t border-ink/20 pt-5">
            <ServiceProcessIcon :icon="step.icon" />
            <h2 class="mt-8 font-display text-3xl">{{ step.title }}</h2>
            <p class="mt-4 text-sm leading-6 text-ink/60">{{ step.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section-space">
      <div class="page-shell grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
        <div>
          <p class="eyebrow">Client involvement</p>
          <h2 class="font-display text-4xl leading-tight sm:text-5xl">What access the work requires.</h2>
          <p class="mt-5 max-w-2xl text-lg leading-8 text-ink/60">The client provides repository access, build and deployment instructions, relevant logs or environments, and someone who can confirm required behaviour. A review owns the agreed investigation. Embedded engineering works through the client’s priorities and delivery process. Product decisions and acceptance remain with the client.</p>
        </div>
        <div class="rounded-2xl border border-line bg-white/35 p-7 sm:p-9">
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-moss">What to share</p>
          <p class="mt-4 leading-7 text-ink/60">Describe the service, current Scala and JDK versions, framework and sbt versions, and whether the team needs an unanswered technical question investigated or additional capacity for known work.</p>
          <AppButton to="/contact" class="mt-7">Discuss a Scala service</AppButton>
        </div>
      </div>
    </section>

    <ContactCta />
  </div>
</template>
