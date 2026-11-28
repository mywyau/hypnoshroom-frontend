<script setup lang="ts">
import type { PublicContract } from '~/domain/employers/contract'
const props = defineProps<{ listing: PublicContract }>()
const { user, headers, failure } = useApplicationIdentity()
const name = ref(preferredName(user.value ?? null))
const note = ref('')
const cv = shallowRef<File | null>(null)
const busy = ref(false)
const message = ref('')
const receipt = ref<ApplicationReceipt>()
function chooseFile(event: Event) {
  const input = event.target as HTMLInputElement
  cv.value = input.files?.[0] ?? null
  input.setCustomValidity(cv.value && cv.value.size > 3 * 1024 * 1024 ? 'Choose a PDF up to 3 MB.' : '')
  input.reportValidity()
}
async function submit() {
  if (busy.value || !cv.value) return
  busy.value = true
  message.value = ''
  try {
    const data = new FormData()
    data.set('listing', props.listing.id)
    data.set('recipient', props.listing.company_name)
    data.set('role', props.listing.title)
    data.set('name', name.value.trim())
    data.set('message', note.value.trim())
    data.set('cv', cv.value)
    receipt.value = await $fetch<ApplicationReceipt>('/api/applications', { method: 'POST', headers: await headers(), body: data })
    cv.value = null
    note.value = ''
  } catch (error) { message.value = failure(error, 'Could not submit your application. Please try again.') }
  finally { busy.value = false }
}
</script>

<template>
  <p v-if="receipt" role="status">Application submitted for <strong>{{ receipt.role_title }}</strong> to {{ receipt.recipient }} on {{ formatArticleDate(receipt.submitted_at.slice(0,10)) }}.</p>
  <form v-else @submit.prevent="submit">
    <label>Your name<input v-model.trim="name" autocomplete="name" maxlength="140" required pattern=".*\S.*"></label>
    <label>CV (PDF, up to 3 MB)<input type="file" accept=".pdf,application/pdf" required @change="chooseFile"></label>
    <label>Message (optional)<textarea v-model="note" maxlength="3000" rows="4" /></label>
    <p class="text-sm">The poster for {{ listing.company_name }} will receive your details and CV. You can withdraw from Your applications. <NuxtLink to="/privacy" class="link">Privacy notice</NuxtLink></p>
    <button class="action justify-self-start" :disabled="busy">{{ busy ? 'Submitting…' : 'Submit application' }}</button>
    <p v-if="message" role="alert">{{ message }}</p>
  </form>
</template>
