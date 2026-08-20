<script setup lang="ts">
const groups = [
  { title: 'Languages', items: ['Scala', 'Java', 'TypeScript', 'Python'] },
  { title: 'Full-stack & frontend', items: ['Vue', 'Nuxt', 'Tailwind CSS', 'Vercel'] },
  { title: 'Backend frameworks', items: ['Play Framework', 'Spring Boot', 'Node.js', 'Serverless functions'] },
  { title: 'Build tooling', items: ['npm', 'Vite', 'sbt', 'Maven'] },
  { title: 'APIs & integration', items: ['REST APIs', 'SOAP', 'JMS', 'IBM MQ', 'RabbitMQ'] },
  { title: 'Databases', items: ['PostgreSQL', 'Oracle', 'MySQL', 'Redis'] },
  { title: 'Testing', items: ['ScalaTest', 'JUnit', 'Mockito', 'Cucumber', 'Selenium', 'Integration testing', 'Automated testing'] },
  { title: 'DevOps & delivery', items: ['Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'CI/CD'] },
  { title: 'Cloud & observability', items: ['AWS', 'Google Cloud', 'CloudWatch', 'Grafana', 'Kibana', 'Splunk'] },
]
</script>

<template>
  <section class="section-space border-y border-line bg-[#ece8de]">
    <div class="page-shell grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
      <SectionHeading eyebrow="Technology" title="From interface to infrastructure." intro="Hypnoshroom works across full-stack TypeScript, backend services, data and delivery. Scala and JVM engineering remain a deep specialism within that broader capability." />
      <div class="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        <div v-for="group in groups" :key="group.title" class="border-t border-ink/15 pt-4">
          <h3 class="text-xs font-semibold uppercase tracking-[0.16em] text-moss">{{ group.title }}</h3>
          <p class="mt-3 text-sm leading-7 text-ink/65">{{ group.items.join(' · ') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
