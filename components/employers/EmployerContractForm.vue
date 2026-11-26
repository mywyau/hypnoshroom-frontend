<script setup lang="ts">
import { disciplines, languages, ir35Options, londonDate, type ContractBrief, type EmployerContract } from '~/domain/employers/contract'

const props = defineProps<{ listing: EmployerContract | null }>()
const emit = defineEmits<{ cancel: []; saved: [status: string] }>()
const client = useEmployerClient()
const initial = props.listing
const id = initial?.id ?? crypto.randomUUID()
const form = reactive<ContractBrief>({
  employment_type: initial?.employment_type ?? 'contract',
  fully_remote: initial?.fully_remote ?? false, discipline: initial?.discipline ?? null,
  languages: [...(initial?.languages ?? [])], salary_gbp: initial?.salary_gbp ?? null, salary_max_gbp: initial?.salary_max_gbp ?? null,
  title: initial?.title ?? '', location: initial?.fully_remote && initial.location === 'Remote' ? '' : initial?.location ?? '', duration: initial?.duration ?? '',
  day_rate_gbp: initial?.day_rate_gbp ?? null, ir35: initial?.ir35 ?? 'Unspecified',
  description: initial?.description ?? '', apply_url: initial?.apply_url ?? '', closes_on: initial?.closes_on ?? '',
})
const isContract = computed(() => form.employment_type === 'contract')
const busy = ref(false)
const message = ref('')

async function save(event: SubmitEvent) {
  if (busy.value) return
  const status = (event.submitter as HTMLButtonElement | null)?.value === 'published' ? 'published' : 'draft'
  if (status === 'published' && form.closes_on < londonDate()) {
    message.value = 'Choose a closing date of today or later to publish.'
    return
  }
  busy.value = true
  message.value = ''
  const payload = {
    ...form, status, location: form.location.trim() || 'Remote',
    duration: isContract.value ? form.duration : null, ir35: isContract.value ? form.ir35 : null,
    day_rate_gbp: isContract.value ? Number(form.day_rate_gbp) || null : null,
    salary_gbp: isContract.value ? null : Number(form.salary_gbp) || null,
    salary_max_gbp: isContract.value ? null : Number(form.salary_max_gbp) || null,
  }
  try {
    const query = initial
      ? client.from('employer_contracts').update(payload).eq('id', id).eq('status', initial.status)
      : client.from('employer_contracts').insert({ ...payload, id })
    await query.select('id').single().throwOnError()
    emit('saved', status)
  } catch {
    message.value = 'Unable to save this brief. Check the fields, or return to your listings to see its current status.'
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <form @submit.prevent="save">
    <h2>{{ listing ? 'Edit listing' : 'New listing' }}</h2>
    <fieldset :disabled="busy" class="grid gap-4">
      <label>Employment type<select v-model="form.employment_type"><option value="contract">Contract</option><option value="permanent">Permanent, full-time</option></select></label>
      <label>Role title<input v-model.trim="form.title" required maxlength="160"></label>
      <div class="grid gap-4 sm:grid-cols-2">
        <label>Location or eligible region<input v-model.trim="form.location" :required="!form.fully_remote" maxlength="160" placeholder="e.g. Bristol or UK-wide"></label>
        <label class="self-end py-2"><input v-model="form.fully_remote" type="checkbox"> Fully remote</label>
        <label v-if="isContract">Contract duration<input v-model.trim="form.duration" required maxlength="100" placeholder="e.g. 6 months"></label>
        <label v-if="isContract">Day rate in GBP (optional)<input v-model.number="form.day_rate_gbp" type="number" min="1" max="99999" step="1"></label>
        <label v-if="isContract">Advertised IR35 status<select v-model="form.ir35"><option v-for="value in ir35Options" :key="value">{{ value }}</option></select></label>
        <template v-if="!isContract">
          <label>Annual salary in GBP (optional)<input v-model.number="form.salary_gbp" type="number" min="1" max="9999999" step="1" :required="!!form.salary_max_gbp"></label>
          <label>Top of salary range (optional)<input v-model.number="form.salary_max_gbp" type="number" :min="form.salary_gbp || 1" max="9999999" step="1"></label>
        </template>
      </div>
      <label>Engineering discipline<select v-model="form.discipline"><option :value="null">Unspecified</option><option v-for="item in disciplines" :key="item">{{ item }}</option></select></label>
      <fieldset>
        <legend class="mb-2 text-sm font-semibold">Languages used in the role</legend>
        <div class="flex flex-wrap gap-x-5 gap-y-2">
          <label v-for="item in languages" :key="item"><input v-model="form.languages" type="checkbox" :value="item"> {{ item }}</label>
        </div>
      </fieldset>
      <label>Role brief<textarea v-model.trim="form.description" rows="6" required maxlength="5000" /></label>
      <label>Application URL<input v-model.trim="form.apply_url" type="url" required maxlength="2048" pattern="https://.+" placeholder="https://"></label>
      <label>Applications close (UK date)<input v-model="form.closes_on" type="date" required></label>
      <p class="text-sm">Publishing makes the brief and company name public. Hypnoshroom may include advertised terms in aggregate statistics.</p>
      <div class="flex flex-wrap gap-4">
        <button v-if="listing?.status !== 'published'" value="draft" class="link">Save draft</button>
        <button value="published" class="action">{{ listing?.status === 'published' ? 'Save published changes' : 'Publish listing' }}</button>
        <button type="button" class="link" @click="emit('cancel')">Cancel</button>
      </div>
    </fieldset>
    <p role="status">{{ message }}</p>
  </form>
</template>
