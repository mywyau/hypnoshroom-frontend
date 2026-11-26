<script setup lang="ts">
const route = useRoute()
usePageSeo({
  title: 'Engineering jobs and hiring – coming soon | Hypnoshroom',
  description: 'The engineering job boards and employer accounts are coming soon.',
  path: route.path,
  robots: 'noindex, follow',
})
</script>

<template>
  <div>
    <PageHero eyebrow="Jobs &amp; hiring" title="Coming soon." intro="We’re preparing the engineering job boards and employer accounts. In the meantime, you can compare a contract day rate with a salary offer." gradient="forest" />
    <div class="page-shell py-10">
      <AppButton to="/contractor-intelligence">Explore contractor calculators</AppButton>
    </div>
  </div>
</template>
