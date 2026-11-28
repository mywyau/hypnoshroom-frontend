<script setup lang="ts">
const props = defineProps<{ listingId: string }>()
const client = useAccountClient()
const { headers } = useApplicationIdentity()
interface Applicant { id: string; applicant_name: string; email: string; message: string; submitted_at: string }
const applicants = ref<Applicant[]>([])
const error = ref('')
const loading = ref(true)
async function load() {
  loading.value = true
  error.value = ''
  try {
    const { data } = await client.from('role_applications').select('id,applicant_name,email,message,submitted_at')
      .eq('listing_id', props.listingId).order('submitted_at', { ascending: false }).throwOnError()
    applicants.value = data
  } catch {
    applicants.value = []
    error.value = 'Could not load applications.'
  } finally {
    loading.value = false
  }
}
async function download(id: string) {
  error.value = ''
  try {
    const response = await fetch('/api/applications/' + id + '/cv', { headers: await headers() })
    if (!response.ok) throw new Error('CV unavailable')
    const url = URL.createObjectURL(await response.blob())
    const link = document.createElement('a')
    link.href = url
    link.download = 'CV-' + id + '.pdf'
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  } catch { error.value = 'CV unavailable. Refresh the inbox.' }
}
onMounted(load)
</script>
<template>
  <section class="mt-5 rounded-xl border border-line p-5" aria-label="Applications">
    <div class="flex items-baseline justify-between"><h4 class="font-semibold">Applications</h4><button class="link" :disabled="loading" @click="load">Refresh</button></div>
    <p v-if="error" role="alert">{{ error }}</p>
    <p v-if="loading" role="status">Loading applications…</p>
    <p v-else-if="!error && !applicants.length">No applications yet.</p>
    <article v-for="applicant in applicants" :key="applicant.id" class="mt-4 border-t border-line pt-3">
      <h5 class="font-semibold">{{ applicant.applicant_name }}</h5>
      <p class="text-sm">Submitted {{ formatArticleDate(applicant.submitted_at.slice(0,10)) }}</p>
      <a :href="'mailto:'+encodeURIComponent(applicant.email).replace('%40','@')" class="link break-all">{{ applicant.email }}</a>
      <p v-if="applicant.message" class="my-2 whitespace-pre-line break-words">{{ applicant.message }}</p>
      <button class="link block min-h-11" @click="download(applicant.id)">Download CV</button>
    </article>
  </section>
</template>
