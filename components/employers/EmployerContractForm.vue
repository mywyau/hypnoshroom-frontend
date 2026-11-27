<script setup lang="ts">
import { disciplines, employmentLabels, languageChoices, advertisedIr35Options, londonDate, type ContractBrief, type EmployerContract, type ListingStatus } from '~/domain/employers/contract'

const props = defineProps<{
  listing: EmployerContract | null
  defaultCompany: string
  preview?: boolean
  submitListing: (listing: EmployerContract) => void | Promise<void>
}>()
const emit = defineEmits<{ cancel: [] }>()
const initial = props.listing
const id = initial?.id ?? crypto.randomUUID()
const rateUnspecified = ref(Boolean(initial?.employment_type === 'contract' && initial.day_rate_gbp == null))
const otherSelected = ref(Boolean(initial?.other_language))
const arrangement = ref(initial?.fully_remote ? 'remote' : initial?.hybrid ? 'hybrid' : '')
type PostingForm = Omit<ContractBrief, 'ir35' | 'fully_remote' | 'hybrid'> & { ir35: ContractBrief['ir35'] | '' }
const form = reactive<PostingForm>({
  employment_type: initial?.employment_type ?? 'contract',
  discipline: initial?.discipline ?? '',
  other_language: initial?.other_language ?? null, languages: [...(initial?.languages ?? [])], salary_gbp: initial?.salary_gbp ?? null, salary_max_gbp: initial?.salary_max_gbp ?? null,
  title: initial?.title ?? '', location: initial?.fully_remote && initial.location === 'Remote' ? '' : initial?.location ?? '', duration: initial?.duration ?? '',
  day_rate_gbp: initial?.day_rate_gbp ?? null, ir35: initial?.ir35 === 'Unspecified' ? '' : initial?.ir35 ?? '',
  description: initial?.description ?? '', apply_url: initial?.apply_url ?? '', closes_on: initial?.closes_on ?? '',
})
const companyOverride = ref(initial?.company_name ?? null)
const listingCompany = computed({
  get: () => companyOverride.value ?? props.defaultCompany,
  set: (value: string) => { companyOverride.value = value },
})
const isContract = computed(() => form.employment_type === 'contract')
const busy = ref(false)
const message = ref('')

const steps = ['Role details', 'Pay and terms', 'Skills and applications', 'Review your listing']
const step = ref(1)
const stepHeading = ref<HTMLElement | null>(null)

async function goToStep(next: number) {
  step.value = next
  message.value = ''
  await nextTick()
  stepHeading.value?.focus()
}

const brief = computed(() => ({
  ...form, id, company_name: listingCompany.value.trim(), location: form.location.trim() || 'Remote',
  fully_remote: arrangement.value === 'remote', hybrid: arrangement.value === 'hybrid',
  apply_url: form.apply_url?.trim() || null,
  duration: form.employment_type !== 'permanent' ? form.duration : null, ir35: isContract.value ? form.ir35 || null : null,
  other_language: otherSelected.value ? form.other_language?.trim() || null : null,
  day_rate_gbp: isContract.value && !rateUnspecified.value ? Number(form.day_rate_gbp) || null : null,
  salary_gbp: isContract.value ? null : Number(form.salary_gbp) || null,
  salary_max_gbp: isContract.value ? null : Number(form.salary_max_gbp) || null,
}))

async function advance(event: SubmitEvent) {
  if (busy.value) return
  if (step.value < steps.length) {
    await goToStep(step.value + 1)
    return
  }
  const status: ListingStatus = (event.submitter as HTMLButtonElement | null)?.value === 'draft' ? 'draft' : 'pending'
  if (status === 'pending' && form.closes_on < londonDate()) {
    await goToStep(3)
    message.value = 'Choose a closing date of today or later to submit for review.'
    return
  }
  busy.value = true
  message.value = ''
  try {
    await props.submitListing({ ...brief.value, status })
  } catch {
    message.value = 'Unable to save this brief. Check the fields, or return to your listings to see its current status.'
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <form class="employer-workspace" @submit.prevent="advance">
    <div>
      <p class="text-sm font-semibold text-moss">{{ listing ? 'Edit listing' : 'New listing' }} · Step {{ step }} of {{ steps.length }}</p>
      <div role="progressbar" aria-label="Listing progress" :aria-valuenow="step" :aria-valuemax="steps.length"
        :aria-valuetext="`Step ${step} of ${steps.length}`" class="mt-2 h-2 overflow-hidden rounded-full bg-moss/15">
        <div class="h-full rounded-full bg-moss" :style="{ width: (step / steps.length) * 100 + '%' }" />
      </div>
      <h2 ref="stepHeading" tabindex="-1" class="mt-4 scroll-mt-40">{{ steps[step - 1] }}</h2>
    </div>
    <fieldset :disabled="busy" class="grid gap-4">
      <template v-if="step === 1">
        <label>Company shown on this listing<input v-model.trim="listingCompany" required pattern=".*\S.*" maxlength="140" autocomplete="organization"></label>
        <label>Employment type<select class="inset-select" v-model="form.employment_type"><option v-for="(label, value) in employmentLabels" :key="value" :value="value">{{ label }}</option></select></label>
        <label>Role title<input v-model.trim="form.title" required maxlength="160"></label>
        <div class="grid gap-4 sm:grid-cols-2">
          <label>Location or eligible region<input v-model.trim="form.location" :required="arrangement !== 'remote'" maxlength="160" placeholder="e.g. Bristol or UK-wide"></label>
          <label>Work arrangement<select v-model="arrangement" class="inset-select">
            <option value="">Use location only</option>
            <option value="remote">Fully remote</option>
            <option value="hybrid">Hybrid</option>
          </select></label>
        </div>
      </template>
      <div v-else-if="step === 2" class="grid gap-4 sm:grid-cols-2">
        <label v-if="form.employment_type !== 'permanent'">{{ isContract ? 'Contract duration' : 'Fixed-term duration' }}<input v-model.trim="form.duration" required maxlength="100" placeholder="e.g. 6 months"></label>
        <label v-if="isContract">Day rate in GBP<input :disabled="rateUnspecified" :required="!rateUnspecified" v-model.number="form.day_rate_gbp" type="number" min="1" max="99999" step="1"></label>
        <label v-if="isContract" class="self-end py-2"><input v-model="rateUnspecified" type="checkbox"> Day rate unspecified</label>
        <label v-if="isContract">Advertised IR35 status or engagement basis
          <select v-model="form.ir35" required class="inset-select">
            <option disabled value="">Select an option</option>
            <option v-for="value in advertisedIr35Options" :key="value">{{ value }}</option>
          </select>
        </label>
        <template v-if="!isContract">
          <label>Minimum annual salary in GBP<input v-model.number="form.salary_gbp" type="number" min="1" max="9999999" step="1" required></label>
          <label>Maximum annual salary in GBP<input v-model.number="form.salary_max_gbp" type="number" required :min="form.salary_gbp || 1" max="9999999" step="1"></label>
        </template>
      </div>
      <template v-else-if="step === 3">
        <label>Engineering discipline<select class="inset-select" v-model="form.discipline" required><option disabled value="">Select a discipline</option><option v-for="item in disciplines" :key="item">{{ item }}</option></select></label>
        <fieldset>
          <legend class="mb-2 text-sm font-semibold">Languages used in the role</legend>
          <div class="flex flex-wrap gap-2">
            <label v-for="item in languageChoices" :key="item" class="relative cursor-pointer">
              <input v-if="item === 'Other'" v-model="otherSelected" type="checkbox" class="peer sr-only">
              <input v-else v-model="form.languages" type="checkbox" :value="item" class="peer sr-only">
              <span class="flex items-center gap-2 rounded-lg border border-line bg-white/60 px-3 py-2 peer-checked:border-moss peer-checked:bg-moss/25 peer-checked:font-bold peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-moss">
                <LanguageIcon :language="item" />
                {{ item }}
              </span>
            </label>
          </div>
          <label v-if="otherSelected" class="mt-3">Other language name<input v-model.trim="form.other_language" required maxlength="60" pattern=".*\S.*"></label>
        </fieldset>
        <label>Role brief<textarea v-model.trim="form.description" rows="6" required maxlength="5000" /></label>
        <label>Application URL (optional)<input v-model.trim="form.apply_url" type="url" maxlength="2048" pattern="https://.+" placeholder="https://"></label>
        <label>Applications close (UK date)<input v-model="form.closes_on" type="date" required></label>
      </template>
      <article v-else class="min-w-0 rounded-2xl border border-line bg-white/40 p-5 sm:p-8">
        <p class="break-words text-sm text-moss">{{ brief.company_name }}</p>
        <h3 class="mt-2 break-words font-display text-3xl">{{ brief.title }}</h3>
        <RoleBriefDetails :listing="brief" />
        <p v-if="brief.apply_url" class="break-all text-sm">Application URL · {{ brief.apply_url }}</p>
      </article>
      <p v-if="step === steps.length && !preview" class="text-sm">{{ listing?.status === 'published' ? 'Submitting changes takes this listing off the board until an administrator approves it again.' : 'An administrator reviews the brief and company name before the listing goes live.' }}</p>
      <div class="flex flex-wrap gap-4">
        <button v-if="step > 1" type="button" class="link" @click="goToStep(step - 1)">Back</button>
        <button v-if="!preview" type="button" class="link" @click="emit('cancel')">Cancel</button>
        <button v-if="step < steps.length" type="submit" class="action">{{ step === steps.length - 1 ? 'Review listing' : 'Continue' }}</button>
        <template v-else>
          <button v-if="!preview && listing?.status !== 'published'" type="submit" value="draft" class="link">Save draft</button>
          <button type="submit" value="pending" class="action">{{ preview ? 'Submit for mock review' : 'Submit for review' }}</button>
        </template>
      </div>
    </fieldset>
    <p role="status">{{ message }}</p>
  </form>
</template>
