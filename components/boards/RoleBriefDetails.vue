<script setup lang="ts">
import { advertisedPay, employmentLabels, workLocation, type ContractBrief } from '~/domain/employers/contract'

const props = defineProps<{ listing: ContractBrief }>()
const isContract = computed(() => props.listing.employment_type === 'contract')
const roleLanguages = computed(() => [...new Set([
  ...props.listing.languages,
  ...(props.listing.other_language ? [props.listing.other_language] : []),
])])
</script>

<template>
  <dl class="my-6 grid min-w-0 max-w-4xl gap-x-6 gap-y-4 rounded-xl border border-line bg-white/50 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-3 [&_dt]:mb-1 [&_dt]:text-sm [&_dt]:text-ink/70">
    <div><dt>{{ isContract ? 'Advertised day rate' : 'Annual salary' }}</dt><dd class="font-semibold text-moss">{{ advertisedPay(listing) }}</dd></div>
    <div v-if="isContract"><dt>IR35 status or engagement basis</dt><dd class="font-semibold">{{ listing.ir35 }}</dd></div>
    <div><dt>Location</dt><dd class="font-semibold">{{ workLocation(listing) }}</dd></div>
    <div><dt>Employment type</dt><dd class="font-semibold">{{ employmentLabels[listing.employment_type] }}</dd></div>
    <div v-if="listing.duration"><dt>Duration</dt><dd class="font-semibold">{{ listing.duration }}</dd></div>
    <div v-if="listing.discipline"><dt>Engineering discipline</dt><dd class="font-semibold">{{ listing.discipline }}</dd></div>
    <div><dt>Applications close</dt><dd class="font-semibold"><time :datetime="listing.closes_on">{{ formatArticleDate(listing.closes_on) }}</time></dd></div>
    <div v-if="roleLanguages.length" class="col-span-full border-t border-line pt-4">
      <dt>Languages</dt>
      <dd>
        <ul class="flex flex-wrap gap-2 pt-1">
          <li v-for="language in roleLanguages" :key="language" class="inline-flex max-w-full items-center gap-2 rounded-lg border border-line bg-white/60 px-2.5 py-1.5 text-sm font-medium">
            <LanguageIcon :language="language" class="shrink-0" />
            <span class="min-w-0 break-words">{{ language }}</span>
          </li>
        </ul>
      </dd>
    </div>
  </dl>
  <p class="mb-8 max-w-3xl whitespace-pre-line break-words">{{ listing.description }}</p>
</template>
