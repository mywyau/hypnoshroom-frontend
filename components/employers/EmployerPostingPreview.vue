<script setup lang="ts">
import { type EmployerContract } from '~/domain/employers/contract'

import { postingPlans } from '~/domain/employers/pricing'

const route = useRoute()
const plan = computed(() => postingPlans.find(option => option.id === route.query.plan) ?? postingPlans[0])
const company = ref('')
const listing = ref<EmployerContract | null>(null)
const heading = ref<HTMLElement | null>(null)

watch(listing, async () => {
  await nextTick()
  heading.value?.focus()
})

function submitPreview(role: EmployerContract) {
  if (!company.value) company.value = role.company_name ?? ''
  listing.value = role
}
</script>

<template>
  <div>
    <p class="mb-6 border-l-2 border-moss pl-3 text-sm text-ink/75">Posting preview. Your example stays on this page and clears on refresh.</p>

    <p class="mb-5 text-sm">Sample plan · {{ plan.name }} · {{ plan.price }}</p>

    <div v-if="!listing">
      <p ref="heading" tabindex="-1" class="sr-only">Role details</p>
      <EmployerContractForm preview :default-company="company" :listing="null" :submit-listing="submitPreview" />
    </div>

    <section v-else>
      <h2 ref="heading" tabindex="-1">Submitted for mock review</h2>
      <p><strong>{{ listing.title }}</strong> for {{ listing.company_name }} is awaiting review in this preview. Refreshing clears this example.</p>
      <button class="link mt-5" @click="listing = null">Try another role</button>
    </section>
  </div>
</template>
