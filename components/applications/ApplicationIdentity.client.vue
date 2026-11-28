<script setup lang="ts">
const { user, guest, email, failure } = useApplicationIdentity()
const config = useRuntimeConfig().public
const configured = Boolean(config.employerSupabaseUrl && config.employerSupabaseKey)
watch(user, current => { if (current) guest.value = null }, { immediate: true })
const address = ref('')
const code = ref('')
const sent = ref(false)
const busy = ref(false)
const message = ref('')

async function send() {
  if (busy.value) return
  busy.value = true
  message.value = ''
  try {
    await $fetch('/api/applications/code', { method: 'POST', body: { email: address.value } })
    sent.value = true
    code.value = ''
    message.value = 'Check your inbox for a six-digit code. It expires in 10 minutes.'
  } catch (error) { message.value = failure(error, 'Could not send a code. Please try again.') }
  finally { busy.value = false }
}
async function verify() {
  if (busy.value) return
  busy.value = true
  try {
    const verified = await $fetch<{ email: string; token: string }>('/api/applications/verify', { method: 'POST', body: { email: address.value, code: code.value } })
    guest.value = verified
    code.value = ''
    sent.value = false
    message.value = ''
  } catch (error) { message.value = failure(error, 'Could not verify the code.') }
  finally { busy.value = false }
}
function changeEmail() {
  guest.value = null
  sent.value = false
  code.value = ''
  message.value = ''
}
</script>

<template>
  <p v-if="!configured">Applications are unavailable in this environment.</p>
  <div v-else-if="user === undefined"><p role="status">Loading application options…</p></div>
  <div v-else-if="email" :key="email">
    <p class="mb-4 break-words text-sm">Verified email · {{ email }}
      <button v-if="guest && !user" type="button" class="link ml-2" @click="changeEmail">Change email</button>
    </p>
    <slot />
  </div>
  <div v-else>
    <p v-if="!sent" class="mb-3 text-sm">Verify your email to continue as a guest.</p>
    <form v-if="!sent" @submit.prevent="send">
      <label>Email address<input v-model.trim="address" type="email" autocomplete="email" maxlength="254" required></label>
      <button class="action justify-self-start" :disabled="busy">Send verification code</button>
    </form>
    <form v-else @submit.prevent="verify">
      <p class="break-words">Enter the code sent to {{ address }}.</p>
      <label>Verification code<input v-model.trim="code" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6}" maxlength="6" required></label>
      <div class="flex flex-wrap gap-4">
        <button class="action" :disabled="busy">Verify email</button>
        <button type="button" class="link" :disabled="busy" @click="send">Resend code</button>
        <button type="button" class="link" :disabled="busy" @click="changeEmail">Change email</button>
      </div>
    </form>
    <p v-if="message" role="status" class="mt-3 text-sm">{{ message }}</p>
  </div>
</template>
