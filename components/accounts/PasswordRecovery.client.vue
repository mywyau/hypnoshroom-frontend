<script setup lang="ts">
import { isAuthError } from '@supabase/supabase-js'

const client = useAccountClient()
const valid = ref(false)
const password = ref('')
const busy = ref(false)
const message = ref('Checking your reset link…')
let recoveryUser: string | undefined
const invalidLink = 'This reset link could not be used. Open the latest link in the browser where you requested it, or request a new one from sign-in.'
const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
  if (valid.value && session?.user.id !== recoveryUser) {
    valid.value = false
    password.value = ''
    message.value = invalidLink
  }
})
onBeforeUnmount(() => subscription.unsubscribe())

onMounted(async () => {
  const url = new URL(window.location.href)
  const code = url.searchParams.get('code')
  window.history.replaceState(window.history.state, '', url.pathname)
  try {
    if (code) {
      const { data, error } = await client.auth.exchangeCodeForSession(code)
      if (!error && data.session) {
        recoveryUser = data.session.user.id
        valid.value = true
        message.value = ''
        return
      }
    }
    message.value = invalidLink
  } catch {
    message.value = invalidLink
  }
})

async function updatePassword() {
  if (!valid.value || busy.value) return
  busy.value = true
  try {
    const { error } = await client.auth.updateUser({ password: password.value })
    if (error) throw error
    password.value = ''
    valid.value = false
    message.value = 'Password updated. You can use it the next time you sign in.'
  } catch (error) {
    message.value = isAuthError(error) && error.code === 'weak_password' ? error.message : 'Unable to update your password. Try a different password or request a new reset link.'
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <form v-if="valid" @submit.prevent="updatePassword">
    <label>New password<input v-model="password" type="password" autocomplete="new-password" required :disabled="busy"></label>
    <button class="action justify-self-start" :disabled="busy">Save new password</button>
  </form>
  <p role="status">{{ message }}</p>
</template>
