<script setup lang="ts">
import { services } from '~/data/services'

interface EnquiryFormData {
  name: string
  company: string
  email: string
  project: string
  engagementType: string
}

interface EnquiryError {
  data?: {
    statusMessage?: string
  }
}

declare global {
  interface Window {
    turnstile?: { reset: () => void }
  }
}

const route = useRoute()
const config = useRuntimeConfig()
const requestedService = Array.isArray(route.query.service) ? route.query.service[0] : route.query.service
const selectedService = services.find(service => service.slug === requestedService)
const turnstileSiteKey = config.public.turnstileSiteKey
const contactEmail = config.public.contactEmail

if (turnstileSiteKey) {
  useHead({
    script: [{
      src: 'https://challenges.cloudflare.com/turnstile/v0/api.js',
      async: true,
      defer: true,
    }],
  })
}

const form = reactive<EnquiryFormData>({
  name: '', company: '', email: '', project: '', engagementType: selectedService?.title || '',
})
const website = ref('')
const limits = {
  name: 100,
  company: 150,
  email: 254,
  project: 2000,
} as const
const status = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')
const errorMessage = ref('')

const submitEnquiry = async (event: SubmitEvent) => {
  if (status.value === 'submitting') return

  status.value = 'submitting'
  errorMessage.value = ''
  const formElement = event.currentTarget as HTMLFormElement
  const turnstileToken = String(new FormData(formElement).get('cf-turnstile-response') || '')

  try {
    await $fetch('/api/enquiry', {
      method: 'POST',
      body: {
        ...form,
        website: website.value,
        turnstileToken,
      },
    })

    status.value = 'success'
    form.name = ''
    form.company = ''
    form.email = ''
    form.project = ''
    form.engagementType = selectedService?.title || ''
    website.value = ''
  } catch (error: unknown) {
    const enquiryError = error as EnquiryError
    errorMessage.value = enquiryError.data?.statusMessage || 'Your enquiry could not be sent. Please try again later.'
    status.value = 'error'
    window.turnstile?.reset()
  }
}
</script>

<template>
  <form class="relative rounded-3xl border border-line bg-white/40 p-6 shadow-soft sm:p-9" :aria-busy="status === 'submitting'" @submit.prevent="submitEnquiry">
    <div class="absolute -left-[10000px] top-auto size-px overflow-hidden" aria-hidden="true">
      <label for="website">Leave this field empty</label>
      <input id="website" v-model="website" name="website" type="text" tabindex="-1" autocomplete="off" />
    </div>
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
          <option>Other</option>
        </select>
      </div>
      <div class="sm:col-span-2">
        <label for="project" class="mb-2 block text-sm font-semibold">What are you working on?</label>
        <textarea id="project" v-model="form.project" name="project" rows="6" required :maxlength="limits.project" aria-describedby="project-limit" class="w-full resize-y rounded-xl border border-line bg-paper px-4 py-3 text-base transition hover:border-ink/30 focus:border-moss" placeholder="What’s the system, what’s making life difficult, and when are you hoping to start?" />
        <p id="project-limit" class="mt-2 text-right text-xs text-ink/45" aria-live="polite">{{ form.project.length.toLocaleString() }} / {{ limits.project.toLocaleString() }} characters</p>
      </div>
    </div>
    <div
      v-if="turnstileSiteKey"
      class="cf-turnstile mt-7"
      :data-sitekey="turnstileSiteKey"
      data-action="contact"
      data-theme="light"
    />
    <div class="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
      <AppButton :disabled="status === 'submitting' || status === 'success'">
        {{ status === 'submitting' ? 'Sending…' : status === 'success' ? 'Enquiry sent' : 'Send enquiry' }}
      </AppButton>
      <p v-if="contactEmail" class="text-xs leading-5 text-ink/50">
        Prefer email?
        <a :href="`mailto:${contactEmail}`" class="font-semibold text-moss underline decoration-moss/30 underline-offset-4">{{ contactEmail }}</a>
      </p>
    </div>
    <p class="mt-5 text-xs leading-5 text-ink/45">
      Your details are used only to respond to this enquiry. Read the <NuxtLink to="/privacy" class="underline underline-offset-4 hover:text-moss">privacy notice</NuxtLink>.
    </p>
    <p v-if="status === 'success'" role="status" class="mt-6 rounded-xl border border-moss/20 bg-moss/10 p-4 text-sm leading-6 text-moss">Thanks—your enquiry has been sent. We’ll reply to the email address you provided.</p>
    <p v-if="status === 'error'" role="alert" class="mt-6 rounded-xl border border-clay/25 bg-clay/10 p-4 text-sm leading-6 text-ink">
      {{ errorMessage }}
      <template v-if="contactEmail">You can also email <a :href="`mailto:${contactEmail}`" class="font-semibold text-moss underline underline-offset-4">{{ contactEmail }}</a>.</template>
    </p>
  </form>
</template>
