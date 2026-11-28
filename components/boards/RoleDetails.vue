<script setup lang="ts">
import { boardPath, type BoardType, type PublicContract } from '~/domain/employers/contract'

const props = defineProps<{ type: BoardType }>()
const path = boardPath(props.type)
const isContract = props.type === 'contract'
const route = useRoute()
const { data: listing, error } = await useFetch<PublicContract>('/api' + path + '/' + encodeURIComponent(String(route.params.id)))
if (!listing.value) throw createError({ statusCode: error.value?.statusCode ?? 404, statusMessage: 'Role unavailable' })
usePageSeo({ title: listing.value.title + ' | Hypnoshroom', description: listing.value.description.slice(0, 150), path: route.path })
const applicationEmailLink = computed(() => {
  const role = listing.value
  if (!role?.apply_email) return
  const address = encodeURIComponent(role.apply_email).replace('%40', '@')
  const subject = encodeURIComponent('Application for ' + role.title.replace(/[\r\n]+/g, ' '))
  return `mailto:${address}?subject=${subject}`
})
</script>

<template>
  <article v-if="listing" class="page-shell max-w-3xl py-8 sm:py-12">
    <NuxtLink class="text-moss underline" :to="path">{{ isContract ? 'All contracts' : 'All permanent and temporary jobs' }}</NuxtLink>
    <p class="eyebrow mt-8 break-words">{{ listing.company_name }}</p>
    <h1 class="max-w-4xl break-words font-display text-4xl sm:text-5xl">{{ listing.title }}</h1>
    <RoleBriefDetails :listing="listing" />
    <OnsiteApplication v-if="listing.apply_onsite" :key="listing.id" :listing="listing" />
    <section aria-label="How to apply" class="flex flex-wrap items-center justify-center gap-4 text-center">
      <a v-if="listing.apply_url" :href="listing.apply_url" rel="nofollow ugc noopener" class="rounded-full bg-ink px-6 py-3 text-white">Apply on employer’s site ↗</a>
      <div v-if="listing.apply_email">
        <a :href="applicationEmailLink"
          class="inline-flex min-h-11 items-center rounded-full bg-moss px-6 py-3 text-white">Apply by email</a>
        <p class="mt-1 break-all text-sm text-ink/75">{{ listing.apply_email }}</p>
      </div>
      <p v-if="!listing.apply_onsite && !listing.apply_url && !listing.apply_email">The employer hasn’t provided application details for this listing.</p>
    </section>
  </article>
</template>
