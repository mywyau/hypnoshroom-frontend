<script setup lang="ts">
const props = defineProps<{ email: string }>()
const client = useAccountClient()
const confirming = ref(false)
const confirmation = ref('')
const busy = ref(false)
const deleted = ref(false)
const deletionNotice = useState('account-deleted', () => false)
const message = ref('')
const matches = computed(() => !!props.email && confirmation.value.trim().toLowerCase() === props.email.toLowerCase())

async function removeAccount() {
  if (busy.value || !confirming.value || !matches.value) return
  busy.value = true
  message.value = ''
  try {
    if (!deleted.value) {
      const { error } = await client.rpc('delete_own_account', { confirmation_email: confirmation.value.trim() })
      if (error) throw error
      deleted.value = true
      deletionNotice.value = true
    }
    const { error } = await client.auth.signOut({ scope: 'local' })
    if (error) throw error
  } catch {
    message.value = deleted.value
      ? 'Your account was deleted. Try signing out again to clear this browser session.'
      : 'Could not confirm account deletion. Check your connection and try again.'
  } finally {
    busy.value = false
  }
}

function cancel() {
  confirming.value = false
  confirmation.value = ''
  message.value = ''
}
</script>

<template>
  <section class="mt-6 border-t border-line pt-5">
    <button v-if="!confirming" type="button" class="min-h-11 font-semibold text-red-800 underline" @click="confirming = true">Delete account</button>
    <form v-else @submit.prevent="removeAccount">
      <h2>Delete account</h2>
      <p>This permanently deletes your account, your employer profile and every listing you posted, including published roles.</p>
      <label>Enter your account email to confirm
        <input v-model="confirmation" type="email" required autocomplete="off" :disabled="busy || deleted">
      </label>
      <div class="flex flex-wrap items-center gap-4">
        <button type="submit" class="rounded-full bg-red-800 px-5 py-2 font-semibold text-white disabled:opacity-60" :disabled="busy || !matches">
          {{ busy ? 'Please wait…' : deleted ? 'Finish signing out' : 'Permanently delete account' }}
        </button>
        <button v-if="!deleted" type="button" class="link" :disabled="busy" @click="cancel">Cancel</button>
      </div>
      <p v-if="message" role="alert">{{ message }}</p>
    </form>
  </section>
</template>
