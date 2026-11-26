<script setup lang="ts">
defineProps<{ to: string }>()
const signedIn = ref(false)
let unsubscribe: (() => void) | undefined
const config = useRuntimeConfig().public

onMounted(() => {
  if (!config.employerSupabaseUrl || !config.employerSupabaseKey) return
  const { data: { subscription } } = useAccountClient().auth.onAuthStateChange((_event, session) => {
    signedIn.value = Boolean(session?.user)
  })
  unsubscribe = () => subscription.unsubscribe()
})
onBeforeUnmount(() => unsubscribe?.())
</script>

<template>
  <NuxtLink :to="signedIn ? to : '/login'" class="inline-flex min-h-11 flex-col items-start justify-center whitespace-nowrap text-sm font-semibold text-moss hover:underline">
    {{ signedIn ? 'My account' : 'Sign in' }}
  </NuxtLink>
</template>
