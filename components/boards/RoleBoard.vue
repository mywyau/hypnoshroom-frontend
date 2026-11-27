<script setup lang="ts">
import { advertisedPay, boardPath, disciplines, employmentLabels, languageChoices, ir35Options, workLocation, type BoardType, type PublicContract } from '~/domain/employers/contract'

const props = defineProps<{ type: BoardType }>()
const path = boardPath(props.type)
const isContract = props.type === 'contract'
const boardName = isContract ? 'Contract board' : 'Permanent & temporary jobs'
const intro = isContract ? 'Find UK engineering contracts and apply directly to the hiring team.' : 'Find permanent and fixed-term UK engineering roles and apply directly to the hiring team.'
usePageSeo({ title: boardName + ' | Hypnoshroom', description: intro, path })
const route = useRoute()
const page = computed(() => Math.max(1, Number(route.query.page) || 1))
const selectedLanguages = computed(() => {
  const value = route.query.language
  return languageChoices.filter(item => Array.isArray(value) ? value.includes(item) : value === item)
})
const filters = computed(() => {
  const result: Record<string, string | string[]> = {}
  for (const key of ['q', 'location', 'ir35', 'discipline', 'remote', 'hybrid', 'employment']) {
    const value = route.query[key]
    if (typeof value === 'string' && value.trim()) result[key] = value.trim()
  }
  if (selectedLanguages.value.length) result.language = selectedLanguages.value
  return result
})
const hasFilters = computed(() => Object.keys(filters.value).length > 0)
const query = computed(() => ({ ...filters.value, page: page.value }))
const { data, error, status, refresh } = await useFetch<{ listings: PublicContract[]; hasNext: boolean }>('/api' + path, { query })
</script>

<template>
  <div>
    <PageHero :eyebrow="boardName" :title="isContract ? 'Find your next contract.' : 'Find your next engineering job.'" :intro="intro" gradient="forest" size="compact-title" />
    <section class="page-shell py-12">
      <h2 class="mb-8 font-display text-3xl">{{ isContract ? 'Open contracts' : 'Open jobs' }}</h2>
      <form :key="route.fullPath" :action="path" method="get" role="search" class="mb-8 grid items-end gap-4 rounded-xl border border-line bg-white/40 p-5 sm:grid-cols-2 lg:grid-cols-3">
        <label class="text-sm font-semibold">Role or skill
          <input type="search" name="q" :value="filters.q" maxlength="100" placeholder="e.g. Scala" class="mt-1 block w-full rounded border border-line px-3 py-2">
        </label>
        <label class="text-sm font-semibold">Location
          <input type="search" name="location" :value="filters.location" maxlength="100" placeholder="e.g. Bristol" class="mt-1 block w-full rounded border border-line px-3 py-2">
        </label>
        <label class="text-sm font-semibold">Engineering discipline
          <select name="discipline" class="inset-select mt-1 block w-full rounded border border-line py-2 pl-3">
            <option value="" :selected="!filters.discipline">All disciplines</option>
            <option v-for="item in disciplines" :key="item" :selected="filters.discipline === item">{{ item }}</option>
          </select>
        </label>
        <label v-if="isContract" class="text-sm font-semibold">IR35 status
          <select name="ir35" class="inset-select mt-1 block w-full rounded border border-line py-2 pl-3">
            <option value="" :selected="!filters.ir35">Any status</option>
            <option v-for="option in ir35Options" :key="option" :selected="filters.ir35 === option">{{ option }}</option>
          </select>
        </label>
        <label v-else class="text-sm font-semibold">Employment type
          <select name="employment" class="inset-select mt-1 block w-full rounded border border-line py-2 pl-3">
            <option value="" :selected="!filters.employment">Permanent and temporary</option>
            <option value="permanent" :selected="filters.employment === 'permanent'">Permanent</option>
            <option value="temporary" :selected="filters.employment === 'temporary'">Temporary</option>
          </select>
        </label>
        <fieldset>
          <legend class="mb-1 text-sm font-semibold">Work arrangement</legend>
          <div class="flex flex-wrap gap-2">
            <label v-for="(label, key) in { remote: 'Fully remote', hybrid: 'Hybrid' }" :key="key" class="relative cursor-pointer">
              <input type="checkbox" role="switch" :name="key" value="1" :checked="filters[key] === '1'" class="peer sr-only">
              <span class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 text-sm font-semibold peer-checked:border-moss peer-checked:bg-moss peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-moss">{{ label }}</span>
            </label>
          </div>
        </fieldset>
        <fieldset class="col-span-full min-w-0">
          <legend class="mb-2 text-sm font-semibold">Programming languages <span class="font-normal text-ink/70">(match any selected)</span></legend>
          <div class="flex flex-wrap gap-2">
            <label v-for="item in languageChoices" :key="item" class="relative cursor-pointer">
              <input type="checkbox" name="language" :value="item" :checked="selectedLanguages.includes(item)" class="peer sr-only">
              <span class="flex min-h-11 items-center gap-2 rounded-lg border border-line bg-white/60 px-3 py-2 text-sm peer-checked:border-moss peer-checked:bg-moss/25 peer-checked:font-semibold peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-moss">
                <LanguageIcon :language="item" />{{ item }}
              </span>
            </label>
          </div>
        </fieldset>
        <AppButton>Search roles</AppButton>
      </form>
      <NuxtLink v-if="hasFilters" :to="path" class="mb-4 inline-block text-moss underline">Clear filters</NuxtLink>
      <p v-if="status === 'pending'" role="status">Loading roles…</p>
      <p v-else-if="error" role="status">The job board is unavailable. <button class="underline" @click="refresh()">Try again</button></p>
      <p v-else-if="!data?.listings.length">{{ hasFilters ? 'No open roles match this search.' : page > 1 ? 'There are no open listings on this page.' : 'There are no open roles yet.' }}</p>
      <article v-for="listing in data?.listings" :key="listing.id" class="border-b border-line py-6">
        <p class="text-sm text-moss">{{ listing.company_name }}<template v-if="!isContract"> · {{ employmentLabels[listing.employment_type] }}</template></p>
        <h3 class="my-1 font-display text-2xl"><NuxtLink :to="path + '/' + listing.id" class="hover:underline">{{ listing.title }}</NuxtLink></h3>
        <p>{{ workLocation(listing) }} · {{ advertisedPay(listing) }}<template v-if="listing.employment_type === 'temporary'"> · {{ listing.duration }}</template><template v-if="isContract"> · {{ listing.duration }} · {{ listing.ir35 === 'Unspecified' ? 'IR35 unspecified' : listing.ir35 }}</template></p>
        <p v-if="listing.discipline || listing.languages.length || listing.other_language" class="mt-1 text-sm text-ink/70">{{ [listing.discipline, ...listing.languages, listing.other_language].filter(Boolean).join(' · ') }}</p>
      </article>
      <nav aria-label="Listing pages" class="mt-6 flex gap-6">
        <NuxtLink v-if="page > 1" :to="{query: { ...filters, page: page - 1 }}" class="underline">Previous page</NuxtLink>
        <NuxtLink v-if="data?.hasNext" :to="{query: { ...filters, page: page + 1 }}" class="underline">Next page</NuxtLink>
      </nav>
    </section>
  </div>
</template>
