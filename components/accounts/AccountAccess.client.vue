<script setup lang="ts">
import { isAuthError, type User } from '@supabase/supabase-js'

const props = defineProps<{ audience: 'employer' | 'general' }>()
const emit = defineEmits<{ authenticated: [] }>()
type Mode = 'signin' | 'signup' | 'magic' | 'forgot'
const headings = { signin: 'Sign in', signup: 'Create an account', magic: 'Sign in by email', forgot: 'Reset your password' }
const actions = { signin: 'Sign in', signup: 'Create account', magic: 'Email me a sign-in link', forgot: 'Send password reset link' }
const client = useAccountClient()
const user = shallowRef<User | null>(null)
const mode = ref<Mode>('signin')
const email = ref('')
const password = ref('')
const message = ref('')
const loading = ref(true)
const busy = ref(false)
const { data: { subscription } } = client.auth.onAuthStateChange((event, session) => {
  user.value = session?.user ?? null
  if (event === 'SIGNED_OUT') {
    email.value = ''
    selectMode('signin')
  }
})
onBeforeUnmount(() => subscription.unsubscribe())

// Wait for any email callback to finish before leaving the sign-in page.
watch(() => !loading.value && Boolean(user.value), signedIn => {
  if (signedIn) emit('authenticated')
})

function emailLinkError(code?: string | null) {
  if (code === 'otp_expired' || code === 'flow_state_expired' || code === 'flow_state_not_found') {
    return 'This email link has expired or has already been used. If you created an account, try signing in with your email and password. For email sign-in, request a new link.'
  }
  if (code === 'pkce_code_verifier_not_found' || code === 'bad_code_verifier') {
    return 'This browser could not finish signing you in. If you created an account, try your email and password. For email sign-in, request one new link and open it in the same browser profile at the same site address.'
  }
  return 'Email sign-in could not be completed. Try signing in with your email and password, or request a new email link.'
}

onMounted(async () => {
  try {
    const url = new URL(window.location.href)
    const code = url.searchParams.get('code')
    const fragment = new URLSearchParams(url.hash.slice(1))
    const errorCode = url.searchParams.get('error_code') || fragment.get('error_code')
    const failed = errorCode || url.searchParams.has('error') || fragment.has('error')
    if (code || failed) {
      window.history.replaceState(window.history.state, '', url.pathname)
      if (failed) {
        message.value = emailLinkError(errorCode)
      } else if (code) {
        const { error } = await client.auth.exchangeCodeForSession(code)
        if (error) message.value = emailLinkError(error.code)
      }
    }
    const { data, error } = await client.auth.getSession()
    if (error) throw error
    user.value = data.session?.user ?? null
  } catch {
    message.value = 'Sign-in is temporarily unavailable. Please try again.'
  } finally {
    loading.value = false
  }
})

function selectMode(next: Mode) {
  mode.value = next
  password.value = ''
  message.value = ''
}

async function submit() {
  if (busy.value) return
  busy.value = true
  message.value = ''
  const emailRedirectTo = window.location.origin + (props.audience === 'employer' ? '/employers' : '/login')
  const address = email.value.trim()
  try {
    switch (mode.value) {
      case 'signin': {
        const { error } = await client.auth.signInWithPassword({ email: address, password: password.value })
        if (error) throw error
        break
      }
      case 'signup': {
        const { data, error } = await client.auth.signUp({ email: address, password: password.value, options: { emailRedirectTo } })
        if (error) throw error
        if (!data.session) {
          selectMode('signin')
          message.value = 'Check your inbox for a confirmation link and open it in this browser. If you already have an account, sign in.'
        }
        break
      }
      case 'forgot': {
        const { error } = await client.auth.resetPasswordForEmail(address, { redirectTo: window.location.origin + '/jobs/reset-password' })
        if (error) throw error
        message.value = 'If this email has an account, a reset link will arrive. Open it in this browser.'
        break
      }
      case 'magic': {
        const { error } = await client.auth.signInWithOtp({ email: address, options: { emailRedirectTo } })
        if (error) throw error
        message.value = 'Check your inbox. Open the sign-in link in this browser to continue.'
        break
      }
    }
    password.value = ''
  } catch (error) {
    if (isAuthError(error) && error.code === 'weak_password') message.value = error.message
    else if (isAuthError(error) && error.code === 'email_not_confirmed') message.value = 'Confirm your email address before signing in.'
    else if (isAuthError(error) && error.code === 'email_address_not_authorized') message.value = 'This project can only send account emails to Supabase team members. Use a team email address or configure a custom SMTP sender.'
    else if (isAuthError(error) && error.code === 'over_email_send_rate_limit') {
      message.value = mode.value === 'signup' ? 'Check your inbox and spam folder for a confirmation email. ' : 'Check your inbox for the previous email. '
      message.value += error.message || 'The email sending limit has been reached. Try again later.'
    }
    else if (isAuthError(error) && error.status === 429) message.value = 'Too many authentication requests. Wait before trying again.'
    else if (import.meta.dev && isAuthError(error) && error.code !== 'invalid_credentials') message.value = error.message
    else if (mode.value === 'signin') message.value = 'Unable to sign in. Check your email and password or request a password reset.'
    else message.value = 'Unable to complete this request. Please try again shortly.'
  } finally {
    busy.value = false
  }
}

</script>

<template>
  <div>
    <p v-if="loading" role="status">Loading your account…</p>
    <template v-else-if="user">
      <slot :user="user" />
    </template>
    <form v-else class="max-w-md" @submit.prevent="submit">
      <component :is="audience === 'general' ? 'h1' : 'h2'" class="font-display text-3xl">{{ headings[mode] }}</component>
      <fieldset :disabled="busy" class="grid gap-4">
        <label>{{ audience === 'employer' ? 'Work email' : 'Email' }}<input v-model.trim="email" type="email" autocomplete="email" required></label>
        <label v-if="mode === 'signin' || mode === 'signup'">Password<input v-model="password" type="password" :autocomplete="mode === 'signin' ? 'current-password' : 'new-password'" required></label>
        <button class="action justify-self-start">{{ actions[mode] }}</button>
        <div class="flex flex-wrap gap-x-4 gap-y-2">
          <button v-if="mode !== 'signin'" type="button" class="link" @click="selectMode('signin')">Back to sign in</button>
          <template v-else>
            <button type="button" class="link" @click="selectMode('signup')">Create an account</button>
            <button type="button" class="link" @click="selectMode('forgot')">Forgot password?</button>
            <button type="button" class="link" @click="selectMode('magic')">Use an email link</button>
          </template>
        </div>
      </fieldset>
    </form>
    <p role="status" class="mt-4">{{ message }}</p>
  </div>
</template>
