<script setup lang="ts">
import { boardPath, type BoardType, type PublicContract } from '~/domain/employers/contract'

const props = defineProps<{ type: BoardType }>()
const path = boardPath(props.type)
const isContract = props.type === 'contract'
const route = useRoute()
const { data: listing, error } = await useFetch<PublicContract>('/api' + path + '/' + encodeURIComponent(String(route.params.id)))
if (!listing.value) throw createError({ statusCode: error.value?.statusCode ?? 404, statusMessage: 'Role unavailable' })
usePageSeo({ title: listing.value.title + ' | Hypnoshroom', description: listing.value.description.slice(0, 150), path: route.path })
</script>

<template>
  <article v-if="listing" class="page-shell py-16">
    <NuxtLink class="text-moss underline" :to="path">{{ isContract ? 'All contracts' : 'All permanent and temporary jobs' }}</NuxtLink>
    <p class="eyebrow mt-12">{{ listing.company_name }}</p>
    <h1 class="max-w-4xl font-display text-5xl">{{ listing.title }}</h1>
    <RoleBriefDetails :listing="listing" />
    <a v-if="listing.apply_url" :href="listing.apply_url" rel="nofollow ugc noopener" class="rounded-full bg-ink px-6 py-3 text-white">Apply on employer’s site ↗</a>
  </article>
</template>
