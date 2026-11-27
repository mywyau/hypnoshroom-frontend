<script setup lang="ts">
import { boardPath, employmentLabels, londonDate, type EmployerContract, type StoredEmployerContract } from '~/domain/employers/contract'
import { PostgrestError } from '@supabase/supabase-js'

const props = defineProps<{ view: 'listings' | 'post'; editId?: string }>()
const client = useAccountClient()
const company = ref('')
const listings = ref<StoredEmployerContract[]>([])
const existingListing = computed(() => props.editId ? listings.value[0] ?? null : null)
const busy = ref(true)
const loadFailed = ref(false)
const savedNotice = useState('saved-listing-notice', () => '')
const message = ref(props.view === 'listings' ? savedNotice.value : '')
savedNotice.value = ''

async function reload() {
  busy.value = true
  if (loadFailed.value) message.value = ''
  loadFailed.value = false
  try {
    const [profile, contracts] = await Promise.all([
      client.from('employer_profiles').select('company_name').maybeSingle().throwOnError(),
      props.view === 'listings'
        ? client.from('employer_contracts').select('*').order('created_at', { ascending: false }).throwOnError()
        : props.editId
          ? client.from('employer_contracts').select('*').eq('id', props.editId).throwOnError()
          : null,
    ])
    company.value = profile.data?.company_name ?? ''
    listings.value = contracts?.data ?? []
  } catch (error) {
    loadFailed.value = true
    message.value = import.meta.dev && error instanceof PostgrestError && ['PGRST205', '42P01'].includes(error.code)
      ? 'The employer tables are missing from the connected Supabase schema. Check the employer migrations, then retry.'
      : 'Unable to load your workspace.'
  } finally {
    busy.value = false
  }
}

async function saveListing({ id, ...payload }: EmployerContract) {
  const initial = existingListing.value
  if (props.editId && !initial) throw new Error('The listing is unavailable.')
  if (!company.value) {
    await client.from('employer_profiles').upsert({ company_name: payload.company_name }, {
      onConflict: 'owner_id', ignoreDuplicates: true,
    }).throwOnError()
  }
  const query = initial
    ? client.from('employer_contracts').update(payload).eq('id', initial.id).eq('revision', initial.revision)
    : client.from('employer_contracts').insert({ ...payload, id })
  await query.select('id').single().throwOnError()
  savedNotice.value = payload.status === 'pending' ? 'Listing submitted for review.' : 'Draft saved.'
  await navigateTo('/employers/listings')
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
    <p v-else-if="editId && !existingListing">This listing is unavailable. <NuxtLink to="/employers/listings" class="link">Go to your listings</NuxtLink></p>
    <EmployerContractForm v-else-if="view === 'post'" :default-company="company" :listing="existingListing" @cancel="navigateTo('/employers/listings')" :submit-listing="saveListing" />
    <div v-else>
      <NuxtLink to="/employers/post-a-role" class="action inline-block hover:bg-moss hover:shadow-md focus-visible:bg-moss motion-safe:transition motion-safe:hover:-translate-y-0.5">New listing</NuxtLink>
      <p v-if="!listings.length" class="mt-6">Your first listing will appear here.</p>
      <article v-for="listing in listings" :key="listing.id" class="mt-4 border-t border-line pt-4">
        <h3 class="font-display text-xl">{{ listing.title }}</h3>
        <p class="capitalize">{{ listing.company_name ?? company }} · {{ employmentLabels[listing.employment_type] }} · {{ listing.status === 'published' && listing.closes_on < londonDate() ? 'Expired' : listing.status === 'pending' ? 'Awaiting review' : listing.status }}</p>
        <div class="mt-2 flex gap-4">
          <NuxtLink class="link" :to="{ path: '/employers/post-a-role', query: { edit: listing.id } }">Edit brief</NuxtLink>
          <NuxtLink v-if="listing.status === 'published' && listing.closes_on >= londonDate()" class="link" :to="boardPath(listing.employment_type) + '/' + listing.id">View listing</NuxtLink>
          <button v-if="listing.status === 'published'" class="link" @click="closeListing(listing)">Close listing</button>
        </div>
      </article>
    </div>
  </div>
</template>
