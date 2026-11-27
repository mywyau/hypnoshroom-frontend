<script setup lang="ts">
import { PostgrestError } from '@supabase/supabase-js'
import { londonDate, type StoredEmployerContract } from '~/domain/employers/contract'

const client = useAccountClient()
const listings = ref<StoredEmployerContract[]>([])
const busy = ref(true)
const loadError = ref('')
const message = ref('')

async function load() {
  busy.value = true
  loadError.value = ''
  try {
    const { data } = await client.rpc('pending_listing_reviews').throwOnError()
    listings.value = data ?? []
  } catch (error) {
    if (error instanceof PostgrestError && error.code === 'PGRST202') {
      loadError.value = 'Supabase cannot find the review queue function. Check that migration 20261126000600 is applied to the connected project and its API schema cache is up to date.'
    } else if (error instanceof PostgrestError && error.code === '42501') {
      loadError.value = 'Supabase denied access to the review queue. Check your listing administrator permission and sign in again.'
    } else {
      loadError.value = 'Unable to load pending listings. Refresh the queue to try again.'
    }
    listings.value = []
  } finally {
    busy.value = false
  }
}

async function review(listing: StoredEmployerContract, approve: boolean) {
  if (busy.value) return
  busy.value = true
  try {
    const { data: changed } = await client.rpc('review_listing', {
      listing_id: listing.id, expected_revision: listing.revision, approve,
    }).throwOnError()
    message.value = changed
      ? approve ? 'Listing approved and published.' : 'Listing returned to the employer’s drafts.'
      : 'The listing changed or its closing date passed. Check the refreshed queue.'
  } catch {
    message.value = 'Could not confirm the review decision. Check the refreshed queue before trying again.'
  }
  await load()
}
onMounted(load)
</script>

<template>
  <div class="max-w-3xl">
    <button type="button" class="link" :disabled="busy" @click="message = ''; load()">Refresh queue</button>
    <p role="status" class="my-3">{{ message }}</p>
    <p v-if="loadError" role="alert">{{ loadError }}</p>
    <p v-else-if="busy">Loading review queue…</p>
    <p v-else-if="!listings.length">No listings are awaiting review.</p>
    <article v-for="listing in listings" :key="listing.id" class="mt-6 rounded-xl border border-line p-5">
      <p class="text-moss">{{ listing.company_name }}</p>
      <h2>{{ listing.title }}</h2>
      <RoleBriefDetails :listing="listing" />
      <p v-if="listing.apply_url" class="mb-4 break-all">Application URL · {{ listing.apply_url }}</p>
      <p v-if="listing.closes_on < londonDate()" class="mb-3">The closing date has passed. Return this listing to draft so the employer can update it.</p>
      <div class="flex flex-wrap gap-4">
        <button class="action" :disabled="busy || listing.closes_on < londonDate()" @click="review(listing, true)">Approve and publish</button>
        <button class="link" :disabled="busy" @click="review(listing, false)">Return to draft</button>
      </div>
    </article>
  </div>
</template>
