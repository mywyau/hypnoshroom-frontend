<script setup lang="ts">
import type { PublicContract } from '~/domain/employers/contract'
defineProps<{ listing: PublicContract }>()
const open = ref(false)
</script>

<template>
  <div class="mb-5 max-w-2xl">
    <button v-if="!open" type="button" class="rounded-full bg-moss px-6 py-3 font-semibold text-white" @click="open = true">Apply on Hypnoshroom</button>
    <section v-else class="employer-workspace rounded-xl border border-line p-5 sm:p-7">
      <h2>Apply to {{ listing.company_name }}</h2>
      <ApplicationIdentity>
        <CandidateApplicationForm :listing="listing" />
      </ApplicationIdentity>
      <NuxtLink to="/applications" class="link mt-4 inline-block">Your applications</NuxtLink>
    </section>
  </div>
</template>
