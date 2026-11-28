<script setup lang="ts">
usePageSeo({ title: 'Your applications | Hypnoshroom', description: 'View and withdraw your job applications.', path: '/applications', robots: 'noindex, nofollow' })
</script>
<template>
  <section class="page-shell py-12">
    <div class="employer-workspace mx-auto max-w-2xl">
      <h1 class="mb-6 font-display text-4xl">Your applications</h1>
      <ApplicationIdentity><CandidateApplications /></ApplicationIdentity>
    </div>
  </section>
</template>
