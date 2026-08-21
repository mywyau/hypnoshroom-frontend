<script setup lang="ts">
const areas = [
  ['Languages', 'Scala · Java'],
  ['Frameworks', 'Play Framework · Spring Boot'],
  ['Builds & upgrades', 'sbt · Maven · JDK upgrades · dependency modernisation'],
  ['Backend systems', 'REST APIs · microservices · distributed systems · relational databases'],
]

const workPackages = [
  {
    number: '01',
    title: 'Scala/JVM System Assessment',
    duration: '5 working days across 1–2 weeks',
    intro: 'Establish what is making one Scala or Java service difficult to upgrade, operate or change.',
    goodFor: ['An upgrade that keeps returning to the backlog', 'A build with unclear dependency or plugin constraints', 'A service the team no longer feels confident changing'],
    work: ['Run and inspect the build, tests and delivery setup', 'Map Scala, JDK, Play, sbt and dependency constraints', 'Review the technical boundaries most relevant to the problem', 'Discuss findings with the engineers who know the service'],
    outputs: ['A concise current-state technical map', 'Ranked risks, blockers and unknowns', 'A sequenced recommendation for what to do next', 'A walkthrough and estimate range for the first milestone'],
    boundary: 'One primary service or repository. This is a fixed-effort assessment, not an exhaustive estate-wide audit.',
  },
  {
    number: '02',
    title: 'Upgrade Feasibility Spike',
    duration: '3–5 working days',
    intro: 'Answer one technical question with working evidence before committing to a larger upgrade.',
    goodFor: ['Checking whether a service can move to a target JDK', 'Finding what blocks a Scala or Play upgrade', 'Proving whether a plugin, macro or dependency can be replaced'],
    work: ['Reproduce the relevant part of the system locally', 'Test the proposed change on an experimental branch', 'Record compatibility failures and behavioural risks', 'Compare viable approaches where there is more than one route'],
    outputs: ['A working branch or focused proof of concept', 'Build and test evidence', 'A clear proceed, change direction or stop recommendation', 'A tighter scope for production implementation'],
    boundary: 'The spike proves a route through a named constraint. Production rollout and unrelated remediation are separate work.',
  },
  {
    number: '03',
    title: 'Scoped Modernisation Delivery',
    duration: '1–4 week milestones',
    intro: 'Implement one agreed Scala/JVM improvement once the system and definition of done are understood.',
    goodFor: ['A JDK, Scala, Play or dependency upgrade with known constraints', 'A build or test problem isolated during an assessment', 'A technical risk small enough to deliver and verify independently'],
    work: ['Protect the behaviour affected by the change', 'Implement the upgrade or improvement in reviewable steps', 'Keep compatibility and unrelated behaviour changes separate', 'Verify the result in the client’s available delivery environment'],
    outputs: ['Working, reviewed code for the agreed milestone', 'Tests around changed or protected behaviour', 'Updated build, dependency or delivery configuration', 'Technical notes, remaining risks and a clean handover'],
    boundary: 'Offered after an assessment or where equivalent discovery already exists. Product priorities and behavioural acceptance remain with the client’s domain owner.',
  },
]

const engagementSteps = [
  ['01', 'Qualify', 'A short call confirms the service, technical problem, access and whether a package fits.'],
  ['02', 'Investigate', 'The assessment or spike turns assumptions into evidence and identifies the smallest responsible next step.'],
  ['03', 'Decide', 'The client can stop with the findings, use them internally or agree a bounded implementation milestone.'],
  ['04', 'Deliver', 'Implementation progresses in reviewable changes with explicit technical acceptance criteria.'],
]

usePageSeo({
  title: 'Scala & JVM Engineering | Hypnoshroom',
  description: 'Defined Scala and JVM work packages for system assessment, upgrade feasibility and scoped modernisation delivery.',
  path: '/scala-jvm',
})
</script>

<template>
  <div>
    <PageHero eyebrow="Scala & JVM" title="Defined help for difficult Scala systems." intro="Start with one service and one technical problem. Each package has a clear boundary, useful outputs and a decision point before any larger commitment." />

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
        <SectionHeading eyebrow="Work packages" title="Begin with what can be known and delivered." intro="There is no promise to modernise an unfamiliar system in a generic sprint. Assessment comes first when the constraints are unclear; implementation follows only when the next outcome is specific enough to own." />
        <div class="mt-14">
          <article v-for="item in workPackages" :id="`package-${item.number}`" :key="item.number" class="scroll-mt-28 border-t border-line py-12 first:pt-0 first:border-t-0 lg:py-16">
            <div class="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
              <div>
                <div class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em]">
                  <span class="text-clay">{{ item.number }}</span>
                  <span class="text-moss">{{ item.duration }}</span>
                </div>
                <h2 class="mt-5 font-display text-4xl leading-tight sm:text-5xl">{{ item.title }}</h2>
                <p class="mt-5 max-w-xl text-lg leading-8 text-ink/60">{{ item.intro }}</p>
                <AppButton to="/contact" variant="text" class="mt-6">Discuss this package</AppButton>
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
        <SectionHeading eyebrow="How it works" title="Learn enough before promising delivery." intro="The engagement is deliberately gated. Each stage creates something useful and leaves the client free to decide whether the next commitment is justified." />
        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <article v-for="step in engagementSteps" :key="step[0]" class="border-t border-ink/20 pt-5">
            <span class="font-mono text-xs text-clay">{{ step[0] }}</span>
            <h2 class="mt-8 font-display text-3xl">{{ step[1] }}</h2>
            <p class="mt-4 text-sm leading-6 text-ink/60">{{ step[2] }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section-space">
      <div class="page-shell grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
        <div>
          <p class="eyebrow">Client involvement</p>
          <h2 class="font-display text-4xl leading-tight sm:text-5xl">Technical ownership, with access to the people who know the product.</h2>
          <p class="mt-5 max-w-2xl text-lg leading-8 text-ink/60">The client provides a named engineer or domain owner, timely answers, repository and environment access, and agreement about behaviour that must be preserved. Hypnoshroom owns the agreed technical investigation or change—not product decisions made without the necessary context.</p>
        </div>
        <div class="rounded-2xl border border-line bg-white/35 p-7 sm:p-9">
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-moss">Start with one service</p>
          <p class="mt-4 leading-7 text-ink/60">Share the repository or service involved, its current Scala, JDK or framework versions, and the decision or change the team is struggling to make.</p>
          <AppButton to="/contact" class="mt-7">Discuss a Scala/JVM system</AppButton>
        </div>
      </div>
    </section>

    <ContactCta />
  </div>
</template>
