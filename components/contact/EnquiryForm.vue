<script setup lang="ts">
interface EnquiryFormData {
  name: string
  company: string
  email: string
  project: string
  engagementType: string
}

const form = reactive<EnquiryFormData>({
  name: '', company: '', email: '', project: '', engagementType: '',
})
const status = ref<'idle' | 'submitted'>('idle')

const submitEnquiry = () => {
  // TODO: Send `form` to a server endpoint or external provider such as
  // Resend or Formspree. Keep provider credentials in server-side environment
  // variables, never in this client component.
  status.value = 'submitted'
}
</script>

<template>
  <form class="rounded-3xl border border-line bg-white/40 p-6 shadow-soft sm:p-9" @submit.prevent="submitEnquiry">
    <div class="grid gap-6 sm:grid-cols-2">
      <div>
        <label for="name" class="mb-2 block text-sm font-semibold">Name</label>
        <input id="name" v-model="form.name" name="name" type="text" autocomplete="name" required class="min-h-12 w-full rounded-xl border border-line bg-paper px-4 text-base transition hover:border-ink/30 focus:border-moss" />
      </div>
      <div>
        <label for="company" class="mb-2 block text-sm font-semibold">Company</label>
        <input id="company" v-model="form.company" name="company" type="text" autocomplete="organization" class="min-h-12 w-full rounded-xl border border-line bg-paper px-4 text-base transition hover:border-ink/30 focus:border-moss" />
      </div>
      <div class="sm:col-span-2">
        <label for="email" class="mb-2 block text-sm font-semibold">Email</label>
        <input id="email" v-model="form.email" name="email" type="email" autocomplete="email" required class="min-h-12 w-full rounded-xl border border-line bg-paper px-4 text-base transition hover:border-ink/30 focus:border-moss" />
      </div>
      <div class="sm:col-span-2">
        <label for="engagement-type" class="mb-2 block text-sm font-semibold">Engagement type</label>
        <select id="engagement-type" v-model="form.engagementType" name="engagementType" required class="min-h-12 w-full rounded-xl border border-line bg-paper px-4 text-base transition hover:border-ink/30 focus:border-moss">
          <option disabled value="">Select an engagement</option>
          <option>Scala / JVM engineering</option>
          <option>Scala modernisation</option>
          <option>Backend health check</option>
          <option>Modernisation sprint</option>
          <option>Other</option>
        </select>
      </div>
      <div class="sm:col-span-2">
        <label for="project" class="mb-2 block text-sm font-semibold">What are you working on?</label>
        <textarea id="project" v-model="form.project" name="project" rows="6" required class="w-full resize-y rounded-xl border border-line bg-paper px-4 py-3 text-base transition hover:border-ink/30 focus:border-moss" placeholder="What’s the system, what’s making life difficult, and when are you hoping to start?" />
      </div>
    </div>
    <div class="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
      <AppButton>Send enquiry</AppButton>
      <p class="text-xs leading-5 text-ink/50">The form is still being wired up, so it won’t send just yet.</p>
    </div>
    <p v-if="status === 'submitted'" role="status" class="mt-6 rounded-xl border border-moss/20 bg-moss/10 p-4 text-sm text-moss">Thanks. This is only a preview, so your message hasn’t gone anywhere yet.</p>
  </form>
</template>
