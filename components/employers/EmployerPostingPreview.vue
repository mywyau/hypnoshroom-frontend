<script setup lang="ts">
import { employmentLabels, type EmployerContract } from '~/domain/employers/contract'

import { postingPlans } from '~/domain/employers/pricing'

const route = useRoute()
const plan = computed(() => postingPlans.find(option => option.id === route.query.plan) ?? postingPlans[0])
const step = ref<'company' | 'role' | 'review' | 'posted'>('company')
const company = ref('')
const listing = ref<EmployerContract | null>(null)
const formKey = ref(0)
const heading = ref<HTMLElement | null>(null)

watch(step, async () => {
  await nextTick()
  heading.value?.focus()
})

function review(role: EmployerContract) {
  listing.value = role
  step.value = 'review'
}

function startAnother() {
  listing.value = null
  formKey.value++
  step.value = 'role'
}
</script>

<template>
  <div>
    <p class="mb-6 border-l-2 border-moss pl-3 text-sm text-ink/75">Posting preview. Your example stays on this page and clears on refresh.</p>

    <p class="mb-5 text-sm">Sample plan · {{ plan.name }} · {{ plan.price }}</p>

    <form v-if="step === 'company'" class="max-w-md" @submit.prevent="step = 'role'">
      <h2 ref="heading" tabindex="-1">Who’s posting the role?</h2>
      <label>Company or agency name<input v-model.trim="company" required maxlength="140" autocomplete="organization"></label>
      <button class="action justify-self-start" :disabled="!company">Continue to role details</button>
    </form>

    <div v-show="step === 'role'">
      <p ref="heading" tabindex="-1" v-if="step === 'role'" class="mb-2 text-moss">{{ company }}</p>
      <EmployerContractForm :key="formKey" preview :listing="null" :submit-listing="review" @cancel="step = 'company'" />
    </div>

    <section v-if="step === 'review' && listing">
      <h2 ref="heading" tabindex="-1">Review your listing</h2>
      <article class="rounded-2xl border border-line bg-white/40 p-5 sm:p-8">
        <p class="text-sm text-moss">{{ company }} · {{ employmentLabels[listing.employment_type] }}</p>
        <h3 class="mt-2 break-words font-display text-3xl">{{ listing.title }}</h3>
        <RoleBriefDetails :listing="listing" />
        <template v-if="listing.apply_url">
          <p class="text-sm">Application URL</p>
          <p class="break-all">{{ listing.apply_url }}</p>
        </template>
      </article>
      <div class="mt-6 flex flex-wrap gap-4">
        <button class="action" @click="step = 'posted'">Submit for mock review</button>
        <button class="link" @click="step = 'role'">Edit listing</button>
      </div>
    </section>

    <section v-if="step === 'posted' && listing">
      <h2 ref="heading" tabindex="-1">Submitted for mock review</h2>
      <p><strong>{{ listing.title }}</strong> for {{ company }} is awaiting review in this preview. Refreshing clears this example.</p>
      <button class="link mt-5" @click="startAnother">Try another role</button>
    </section>
  </div>
</template>
