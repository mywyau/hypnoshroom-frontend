 <script setup lang="ts">
import { boardPath, employmentLabels, londonDate, type EmployerContract, type StoredEmployerContract } from '~/domain/employers/contract'
import { PostgrestError } from '@supabase/supabase-js'

const client = useAccountClient()
const company = ref('')
const accountReady = ref(false)
const listings = ref<StoredEmployerContract[]>([])
const route = useRoute()
const editing = ref<StoredEmployerContract | 'new' | null>(route.query.view === 'listings' ? null : 'new')
const busy = ref(false)
const loadFailed = ref(false)
const message = ref('')

async function reload() {
  busy.value = true
  if (loadFailed.value) message.value = ''
  loadFailed.value = false
  try {
    const [profile, contracts] = await Promise.all([
      client.from('employer_profiles').select('company_name').maybeSingle().throwOnError(),
      client.from('employer_contracts').select('*').order('created_at', { ascending: false }).throwOnError(),
    ])
    company.value = profile.data?.company_name ?? ''
    accountReady.value = !!profile.data
    listings.value = contracts.data ?? []
  } catch (error) {
    loadFailed.value = true
    message.value = import.meta.dev && error instanceof PostgrestError && ['PGRST205', '42P01'].includes(error.code)
      ? 'The employer tables are missing from the connected Supabase schema. Check the employer migrations, then retry.'
      : 'Unable to load your workspace.'
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

async function saveListing({ id, ...payload }: EmployerContract) {
  const initial = editing.value
  if (!initial) throw new Error('Select a listing to save.')
  const query = initial === 'new'
    ? client.from('employer_contracts').insert({ ...payload, id })
    : client.from('employer_contracts').update(payload).eq('id', id).eq('revision', initial.revision)
  await query.select('id').single().throwOnError()
  editing.value = null
  message.value = payload.status === 'pending' ? 'Listing submitted for review.' : 'Draft saved.'
  await reload()
}

async function closeListing(listing: StoredEmployerContract) {
  busy.value = true
  try {
    await client.from('employer_contracts').update({ status: 'closed' })
      .eq('id', listing.id).eq('revision', listing.revision).select('id').single().throwOnError()
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
      <p class="text-sm">This name will be prefilled on each listing. You can change it when posting for a client.</p>
      <button class="action justify-self-start">Save company</button>
    </form>
    <EmployerContractForm v-else-if="editing" :default-company="company" :listing="editing === 'new' ? null : editing" @cancel="editing = null" :submit-listing="saveListing" />
    <div v-else>
      <div class="flex flex-wrap items-baseline justify-between gap-4">
        <h2>Your listings</h2>
        <button class="action hover:bg-moss hover:shadow-md focus-visible:bg-moss motion-safe:transition motion-safe:hover:-translate-y-0.5" @click="editing = 'new'; message = ''">New listing</button>
      </div>
      <p v-if="!listings.length" class="mt-6">Your first listing will appear here.</p>
      <article v-for="listing in listings" :key="listing.id" class="mt-4 border-t border-line pt-4">
        <h3 class="font-display text-xl">{{ listing.title }}</h3>
        <p class="capitalize">{{ listing.company_name ?? company }} · {{ employmentLabels[listing.employment_type] }} · {{ listing.status === 'published' && listing.closes_on < londonDate() ? 'Expired' : listing.status === 'pending' ? 'Awaiting review' : listing.status }}</p>
        <div class="mt-2 flex gap-4">
          <button class="link" @click="editing = listing; message = ''">Edit brief</button>
          <NuxtLink v-if="listing.status === 'published' && listing.closes_on >= londonDate()" class="link" :to="boardPath(listing.employment_type) + '/' + listing.id">View listing</NuxtLink>
          <button v-if="listing.status === 'published'" class="link" @click="closeListing(listing)">Close listing</button>
        </div>
      </article>
    </div>
  </div>
</template>
