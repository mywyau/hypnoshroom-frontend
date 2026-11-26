<script setup lang="ts">
import type { User } from '@supabase/supabase-js'

const client = useEmployerClient()
const user = shallowRef<User | null>(null)
const email = ref('')
const message = ref('')
const busy = ref(true)
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
        message.value = 'This sign-in link could not be used. Request a fresh link and open it in this browser.'
      }
    }
    const { data, error } = await client.auth.getSession()
    if (error) throw error
    user.value = data.session?.user ?? null
  } catch {
    message.value = 'Sign-in is temporarily unavailable. Please try again.'
  } finally {
    busy.value = false
  }
})

async function authenticate(signOut = false) {
  if (busy.value) return
  busy.value = true
  message.value = ''
  try {
    if (signOut) {
      const { error } = await client.auth.signOut({ scope: 'local' })
      if (error) throw error
      email.value = ''
    } else {
      const { error } = await client.auth.signInWithOtp({
        email: email.value.trim(), options: { emailRedirectTo: window.location.origin + '/employers' },
      })
      if (error) throw error
      message.value = 'Check your inbox. Open the sign-in link in this browser to continue.'
    }
  } catch {
    message.value = signOut ? 'Sign-out failed. Please try again.' : 'Unable to send a sign-in link. Check the address and try again shortly.'
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <div>
    <template v-if="user">
      <div class="mb-8 flex flex-wrap justify-between gap-3">
        <span>Signed in as {{ user.email }}</span>
        <button class="link" :disabled="busy" @click="authenticate(true)">Sign out</button>
      </div>
      <EmployerWorkspace :key="user.id" />
    </template>
    <form v-else class="max-w-md" @submit.prevent="authenticate()">
      <h2>Sign in or create an account</h2>
      <label>Work email<input v-model="email" type="email" autocomplete="email" required></label>
      <p class="text-sm">We’ll email you a sign-in link. Your first sign-in creates your account.</p>
      <button class="action justify-self-start" :disabled="busy">Email me a sign-in link</button>
    </form>
    <p role="status" class="mt-4">{{ message }}</p>
  </div>
</template>
