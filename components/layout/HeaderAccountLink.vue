<script setup lang="ts">
defineProps<{ to?: string }>()
const config = useRuntimeConfig().public
const client = import.meta.dev && import.meta.client && config.employerSupabaseUrl && config.employerSupabaseKey
  ? useAccountClient()
  : undefined
const user = useAccountUser()
const signingOut = ref(false)
const message = ref('')
watch(user, () => { message.value = '' })

async function signOut() {
  if (!client || signingOut.value) return
  signingOut.value = true
  message.value = ''
  try {
    const { error } = await client.auth.signOut({ scope: 'local' })
    if (error) throw error
  } catch {
    message.value = 'Sign-out failed. Please try again.'
  } finally {
    signingOut.value = false
  }
}
</script>

<template>
  <div class="flex min-w-0 flex-wrap items-center justify-end gap-x-3 sm:gap-x-4"
    :class="user ? 'col-span-full row-start-3 border-t border-line/60 py-1 lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:border-0' : 'col-start-2 row-start-1 md:col-start-3'">
    <NuxtLink v-if="!user && to" to="/login" class="inline-flex min-h-11 items-center whitespace-nowrap text-sm font-semibold text-moss hover:underline">Sign in</NuxtLink>
    <slot />
    <template v-if="user">
      <NuxtLink :to="to || '/login'" class="min-w-0 max-w-52 flex-1 py-1 text-sm text-moss hover:underline">
        <span class="block text-xs text-ink/75">Signed in as</span>
        <span class="break-all font-semibold">{{ user.email }}</span>
      </NuxtLink>
      <button type="button" :disabled="signingOut" class="min-h-11 whitespace-nowrap text-sm font-semibold text-moss hover:underline disabled:opacity-60" @click="signOut">
        {{ signingOut ? 'Signing out…' : 'Sign out' }}
      </button>
    </template>
    <p v-if="message" role="alert" class="basis-full text-sm">{{ message }}</p>
  </div>
</template>
