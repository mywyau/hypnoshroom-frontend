<script setup lang="ts">
import { isAuthError, type User } from '@supabase/supabase-js'

const props = defineProps<{ audience: 'employer' | 'general' }>()
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
const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
  user.value = session?.user ?? null
})
onBeforeUnmount(() => subscription.unsubscribe())

onMounted(async () => {
  try {
    const url = new URL(window.location.href)
    const code = url.searchParams.get('code')
    const failed = url.searchParams.has('error') || new URLSearchParams(url.hash.slice(1)).has('error')
    if (code || failed) {
      window.history.replaceState(window.history.state, '', url.pathname)
      if (failed || (code && (await client.auth.exchangeCodeForSession(code)).error)) {
        message.value = 'This email link could not be used. Request a fresh link and open it in this browser.'
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
    else if (mode.value === 'signin') message.value = 'Unable to sign in. Check your email and password or request a password reset.'
    else message.value = 'Unable to complete this request. Please try again shortly.'
  } finally {
    busy.value = false
  }
}

async function signOut() {
  if (busy.value) return
  busy.value = true
  try {
    const { error } = await client.auth.signOut({ scope: 'local' })
    if (error) throw error
    email.value = ''
    selectMode('signin')
  } catch {
    message.value = 'Sign-out failed. Please try again.'
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <div>
    <p v-if="loading" role="status">Loading your account…</p>
    <template v-else-if="user">
      <h1 v-if="audience === 'general'" class="mb-4 font-display text-3xl">Your account</h1>
      <div class="mb-8 flex flex-wrap justify-between gap-3">
        <span>Signed in as {{ user.email }}</span>
        <button class="link" :disabled="busy" @click="signOut">Sign out</button>
      </div>
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
