<script setup lang="ts">
import { boardPath, londonDate, type EmployerContract } from '~/domain/employers/contract'

const client = useEmployerClient()
const company = ref('')
const accountReady = ref(false)
const listings = ref<EmployerContract[]>([])
const editing = ref<EmployerContract | 'new' | null>(null)
const busy = ref(false)
const loadFailed = ref(false)
const message = ref('')

async function reload() {
  busy.value = true
  loadFailed.value = false
  try {
    const [profile, contracts] = await Promise.all([
      client.from('employer_profiles').select('company_name').maybeSingle().throwOnError(),
      client.from('employer_contracts').select('*').order('created_at', { ascending: false }).throwOnError(),
    ])
    company.value = profile.data?.company_name ?? ''
    accountReady.value = !!profile.data
    listings.value = contracts.data ?? []
  } catch {
    loadFailed.value = true
    message.value = 'Unable to load your workspace.'
  } finally {
    busy.value = false
  }
}

async function saveProfile() {
  busy.value = true
  try {
    await client.from('employer_profiles').insert({ company_name: company.value.trim() }).throwOnError()
    message.value = 'Company profile saved.'
    await reload()
  } catch {
    message.value = 'Could not save your company. Refresh to check your profile and try again.'
  } finally {
    busy.value = false
  }
}

async function saved(status: string) {
  editing.value = null
  message.value = status === 'published' ? 'Listing published.' : 'Draft saved.'
  await reload()
}

async function closeListing(listing: EmployerContract) {
  busy.value = true
  try {
    await client.from('employer_contracts').update({ status: 'closed' })
      .eq('id', listing.id).eq('status', 'published').select('id').single().throwOnError()
    message.value = 'Listing closed.'
    await reload()
  } catch {
    message.value = 'Could not close this listing. Refresh and try again.'
  } finally {
    busy.value = false
  }
}
onMounted(reload)
</script>

<template>
  <div>
    <p role="status" class="mb-3">{{ message }}</p>
    <p v-if="busy">Loading your workspace…</p>
    <button v-else-if="loadFailed" class="link" @click="reload">Retry</button>
    <form v-else-if="!accountReady" class="max-w-md" @submit.prevent="saveProfile">
      <h2>Company profile</h2>
      <label>Company name<input v-model="company" required maxlength="140" autocomplete="organization"></label>
      <p class="text-sm">Applicants will see this name on your listings.</p>
      <button class="action justify-self-start">Save company</button>
    </form>
    <EmployerContractForm v-else-if="editing" :listing="editing === 'new' ? null : editing" @cancel="editing = null" @saved="saved" />
    <div v-else>
      <div class="flex flex-wrap items-baseline justify-between gap-4">
        <h2>{{ company }} listings</h2>
        <button class="action" @click="editing = 'new'; message = ''">New listing</button>
      </div>
      <p v-if="!listings.length" class="mt-6">Your first listing will appear here.</p>
      <article v-for="listing in listings" :key="listing.id" class="mt-4 border-t border-line pt-4">
        <h3 class="font-display text-xl">{{ listing.title }}</h3>
        <p class="capitalize">{{ listing.employment_type === 'permanent' ? 'Full-time' : 'Contract' }} · {{ listing.status === 'published' && listing.closes_on < londonDate() ? 'Expired' : listing.status }}</p>
        <div class="mt-2 flex gap-4">
          <button class="link" @click="editing = listing; message = ''">Edit brief</button>
          <NuxtLink v-if="listing.status === 'published' && listing.closes_on >= londonDate()" class="link" :to="boardPath(listing.employment_type) + '/' + listing.id">View listing</NuxtLink>
          <button v-if="listing.status === 'published'" class="link" @click="closeListing(listing)">Close listing</button>
        </div>
      </article>
    </div>
  </div>
</template>
