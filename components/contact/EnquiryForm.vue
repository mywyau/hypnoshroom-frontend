<script setup lang="ts">
import { services } from '~/data/services'

interface EnquiryFormData {
  name: string
  company: string
  email: string
  project: string
  engagementType: string
}

const route = useRoute()
const requestedService = Array.isArray(route.query.service) ? route.query.service[0] : route.query.service
const selectedService = services.find(service => service.slug === requestedService)

const form = reactive<EnquiryFormData>({
  name: '', company: '', email: '', project: '', engagementType: selectedService?.title || '',
})
const limits = {
  name: 100,
  company: 150,
  email: 254,
  project: 2000,
} as const
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
        <input id="name" v-model="form.name" name="name" type="text" autocomplete="name" required :maxlength="limits.name" aria-describedby="name-limit" class="min-h-12 w-full rounded-xl border border-line bg-paper px-4 text-base transition hover:border-ink/30 focus:border-moss" />
        <p id="name-limit" class="mt-2 text-right text-xs text-ink/45">{{ form.name.length }} / {{ limits.name }} characters</p>
      </div>
      <div>
        <label for="company" class="mb-2 block text-sm font-semibold">Company</label>
        <input id="company" v-model="form.company" name="company" type="text" autocomplete="organization" :maxlength="limits.company" aria-describedby="company-limit" class="min-h-12 w-full rounded-xl border border-line bg-paper px-4 text-base transition hover:border-ink/30 focus:border-moss" />
        <p id="company-limit" class="mt-2 text-right text-xs text-ink/45">{{ form.company.length }} / {{ limits.company }} characters</p>
      </div>
      <div class="sm:col-span-2">
        <label for="email" class="mb-2 block text-sm font-semibold">Email</label>
        <input id="email" v-model="form.email" name="email" type="email" autocomplete="email" required :maxlength="limits.email" aria-describedby="email-limit" class="min-h-12 w-full rounded-xl border border-line bg-paper px-4 text-base transition hover:border-ink/30 focus:border-moss" />
        <p id="email-limit" class="mt-2 text-right text-xs text-ink/45">{{ form.email.length }} / {{ limits.email }} characters</p>
      </div>
      <div class="sm:col-span-2">
        <label for="engagement-type" class="mb-2 block text-sm font-semibold">Engagement type</label>
        <select id="engagement-type" v-model="form.engagementType" name="engagementType" required class="min-h-12 w-full rounded-xl border border-line bg-paper px-4 text-base transition hover:border-ink/30 focus:border-moss">
          <option disabled value="">Select an engagement</option>
          <option v-for="service in services" :key="service.id" :value="service.title">{{ service.title }}</option>
          <option>Scala/JVM work package</option>
          <option>Other</option>
        </select>
      </div>
      <div class="sm:col-span-2">
        <label for="project" class="mb-2 block text-sm font-semibold">What are you working on?</label>
        <textarea id="project" v-model="form.project" name="project" rows="6" required :maxlength="limits.project" aria-describedby="project-limit" class="w-full resize-y rounded-xl border border-line bg-paper px-4 py-3 text-base transition hover:border-ink/30 focus:border-moss" placeholder="What’s the system, what’s making life difficult, and when are you hoping to start?" />
        <p id="project-limit" class="mt-2 text-right text-xs text-ink/45" aria-live="polite">{{ form.project.length.toLocaleString() }} / {{ limits.project.toLocaleString() }} characters</p>
      </div>
    </div>
    <div class="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
      <AppButton>Send enquiry</AppButton>
      <p class="text-xs leading-5 text-ink/50">The form is still being wired up, so it won’t send just yet.</p>
    </div>
    <p v-if="status === 'submitted'" role="status" class="mt-6 rounded-xl border border-moss/20 bg-moss/10 p-4 text-sm text-moss">Thanks. This is only a preview, so your message hasn’t gone anywhere yet.</p>
  </form>
</template>
