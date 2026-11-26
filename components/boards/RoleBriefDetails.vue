<script setup lang="ts">
import { advertisedPay, employmentLabels, workLocation, type ContractBrief } from '~/domain/employers/contract'

const props = defineProps<{ listing: ContractBrief }>()
const isContract = computed(() => props.listing.employment_type === 'contract')
</script>

<template>
  <dl class="my-8 grid max-w-3xl gap-4 border-y border-line py-6 sm:grid-cols-3">
    <div><dt>Location</dt><dd class="font-semibold">{{ workLocation(listing) }}</dd></div>
    <div><dt>Employment type</dt><dd class="font-semibold">{{ employmentLabels[listing.employment_type] }}</dd></div>
    <div v-if="listing.duration"><dt>Duration</dt><dd class="font-semibold">{{ listing.duration }}</dd></div>
    <div><dt>{{ isContract ? 'Advertised day rate' : 'Annual salary' }}</dt><dd class="font-semibold">{{ advertisedPay(listing) }}</dd></div>
    <div v-if="isContract"><dt>IR35 status or engagement basis</dt><dd class="font-semibold">{{ listing.ir35 }}</dd></div>
    <div v-if="listing.discipline"><dt>Engineering discipline</dt><dd class="font-semibold">{{ listing.discipline }}</dd></div>
    <div v-if="listing.languages.length || listing.other_language"><dt>Languages</dt><dd class="font-semibold">{{ [...listing.languages, listing.other_language].filter(Boolean).join(', ') }}</dd></div>
    <div><dt>Applications close</dt><dd class="font-semibold">{{ listing.closes_on }}</dd></div>
  </dl>
  <p class="mb-8 max-w-3xl whitespace-pre-line break-words">{{ listing.description }}</p>
</template>
