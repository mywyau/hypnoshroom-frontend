<script setup lang="ts">
import { advertisedPay, boardPath, disciplines, languages, ir35Options, workLocation, type EmploymentType, type PublicContract } from '~/domain/employers/contract'

const props = defineProps<{ type: EmploymentType }>()
const path = boardPath(props.type)
const isContract = props.type === 'contract'
const boardName = isContract ? 'Contract board' : 'Full-time jobs'
const intro = isContract ? 'Find UK engineering contracts and apply directly to the hiring team.' : 'Find permanent, full-time UK engineering roles and apply directly to the hiring team.'
usePageSeo({ title: boardName + ' | Hypnoshroom', description: intro, path })
const route = useRoute()
const page = computed(() => Math.max(1, Number(route.query.page) || 1))
const filters = computed(() => Object.fromEntries(
  ['q', 'location', 'ir35', 'discipline', 'language', 'remote'].flatMap(key => {
    const value = route.query[key]
    return typeof value === 'string' && value.trim() ? [[key, value.trim()]] : []
  }),
))
const hasFilters = computed(() => Object.keys(filters.value).length > 0)
const query = computed(() => ({ ...filters.value, page: page.value }))
const { data, error, status, refresh } = await useFetch<{ listings: PublicContract[]; hasNext: boolean }>('/api' + path, { query })
</script>

<template>
  <div>
    <PageHero :eyebrow="boardName" :title="isContract ? 'Find your next contract.' : 'Full-time engineering jobs.'" :intro="intro" gradient="forest" />
    <section class="page-shell py-12">
      <h2 class="mb-8 font-display text-3xl">{{ isContract ? 'Open contracts' : 'Open full-time roles' }}</h2>
      <form :key="route.fullPath" :action="path" method="get" role="search" class="mb-8 grid items-end gap-4 rounded-xl border border-line bg-white/40 p-5 sm:grid-cols-2 lg:grid-cols-3">
        <label class="text-sm font-semibold">Role or skill
          <input type="search" name="q" :value="filters.q" maxlength="100" placeholder="e.g. Scala" class="mt-1 block w-full rounded border border-line px-3 py-2">
        </label>
        <label class="text-sm font-semibold">Location
          <input type="search" name="location" :value="filters.location" maxlength="100" placeholder="e.g. Bristol" class="mt-1 block w-full rounded border border-line px-3 py-2">
        </label>
        <label class="text-sm font-semibold">Engineering discipline
          <select name="discipline" class="mt-1 block w-full rounded border border-line px-3 py-2">
            <option value="" :selected="!filters.discipline">All disciplines</option>
            <option v-for="item in disciplines" :key="item" :selected="filters.discipline === item">{{ item }}</option>
          </select>
        </label>
        <label class="text-sm font-semibold">Programming language
          <select name="language" class="mt-1 block w-full rounded border border-line px-3 py-2">
            <option value="" :selected="!filters.language">All languages</option>
            <option v-for="item in languages" :key="item" :selected="filters.language === item">{{ item }}</option>
          </select>
        </label>
        <label v-if="isContract" class="text-sm font-semibold">IR35 status
          <select name="ir35" class="mt-1 block w-full rounded border border-line px-3 py-2">
            <option value="" :selected="!filters.ir35">Any status</option>
            <option v-for="option in ir35Options" :key="option" :selected="filters.ir35 === option">{{ option }}</option>
          </select>
        </label>
        <label class="flex items-center gap-2 py-2 text-sm font-semibold"><input name="remote" type="checkbox" value="1" :checked="filters.remote === '1'" class="size-4 accent-moss">Fully remote only</label>
        <AppButton>Search roles</AppButton>
      </form>
      <NuxtLink v-if="hasFilters" :to="path" class="mb-4 inline-block text-moss underline">Clear filters</NuxtLink>
      <p v-if="status === 'pending'" role="status">Loading roles…</p>
      <p v-else-if="error" role="status">The job board is unavailable. <button class="underline" @click="refresh()">Try again</button></p>
      <p v-else-if="!data?.listings.length">{{ hasFilters ? 'No open roles match this search.' : page > 1 ? 'There are no open listings on this page.' : 'There are no open roles yet.' }}</p>
      <article v-for="listing in data?.listings" :key="listing.id" class="border-b border-line py-6">
        <p class="text-sm text-moss">{{ listing.company_name }}</p>
        <h3 class="my-1 font-display text-2xl"><NuxtLink :to="path + '/' + listing.id" class="hover:underline">{{ listing.title }}</NuxtLink></h3>
        <p>{{ workLocation(listing) }} · {{ advertisedPay(listing) }}<template v-if="isContract"> · {{ listing.duration }} · {{ listing.ir35 === 'Unspecified' ? 'IR35 unspecified' : listing.ir35 }}</template></p>
        <p v-if="listing.discipline || listing.languages.length" class="mt-1 text-sm text-ink/70">{{ [listing.discipline, ...listing.languages].filter(Boolean).join(' · ') }}</p>
      </article>
      <nav aria-label="Listing pages" class="mt-6 flex gap-6">
        <NuxtLink v-if="page > 1" :to="{query: { ...filters, page: page - 1 }}" class="underline">Previous page</NuxtLink>
        <NuxtLink v-if="data?.hasNext" :to="{query: { ...filters, page: page + 1 }}" class="underline">Next page</NuxtLink>
      </nav>
    </section>
  </div>
</template>
