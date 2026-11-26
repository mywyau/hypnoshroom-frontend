<script setup lang="ts">
import { advertisedPay, boardPath, workLocation, type EmploymentType, type PublicContract } from '~/domain/employers/contract'

const props = defineProps<{ type: EmploymentType }>()
const path = boardPath(props.type)
const isContract = props.type === 'contract'
const route = useRoute()
const { data: listing, error } = await useFetch<PublicContract>('/api' + path + '/' + encodeURIComponent(String(route.params.id)))
if (!listing.value) throw createError({ statusCode: error.value?.statusCode ?? 404, statusMessage: 'Role unavailable' })
usePageSeo({ title: listing.value.title + ' | Hypnoshroom', description: listing.value.description.slice(0, 150), path: route.path })
</script>

<template>
  <article v-if="listing" class="page-shell py-16">
    <NuxtLink class="text-moss underline" :to="path">{{ isContract ? 'All contracts' : 'All full-time jobs' }}</NuxtLink>
    <p class="eyebrow mt-12">{{ listing.company_name }}</p>
    <h1 class="max-w-4xl font-display text-5xl">{{ listing.title }}</h1>
    <dl class="my-8 grid max-w-3xl gap-4 border-y border-line py-6 sm:grid-cols-3">
      <div><dt>Location</dt><dd class="font-semibold">{{ workLocation(listing) }}</dd></div>
      <div v-if="isContract"><dt>Duration</dt><dd class="font-semibold">{{ listing.duration }}</dd></div>
      <div><dt>{{ isContract ? 'Advertised day rate' : 'Annual salary' }}</dt><dd class="font-semibold">{{ advertisedPay(listing) }}</dd></div>
      <div v-if="isContract"><dt>IR35 status</dt><dd class="font-semibold">{{ listing.ir35 }}</dd></div>
      <div v-if="listing.discipline"><dt>Engineering discipline</dt><dd class="font-semibold">{{ listing.discipline }}</dd></div>
      <div v-if="listing.languages.length"><dt>Languages</dt><dd class="font-semibold">{{ listing.languages.join(', ') }}</dd></div>
      <div><dt>Applications close</dt><dd class="font-semibold">{{ listing.closes_on }}</dd></div>
    </dl>
    <p class="mb-8 max-w-3xl whitespace-pre-line break-words">{{ listing.description }}</p>
    <a :href="listing.apply_url" rel="nofollow ugc noopener" class="rounded-full bg-ink px-6 py-3 text-white">Apply on employer’s site ↗</a>
  </article>
</template>
