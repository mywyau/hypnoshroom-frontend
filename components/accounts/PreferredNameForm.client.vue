<script setup lang="ts">
import type { User } from '@supabase/supabase-js'

const props = defineProps<{ user: User }>()
const client = useAccountClient()
const savedName = computed(() => preferredName(props.user))
const name = ref(savedName.value)
const saving = ref(false)
const message = ref('')

watch(savedName, (current, previous) => {
  if (name.value.trim() === previous) name.value = current
})

async function save() {
  const value = name.value.trim()
  if (saving.value || value === savedName.value) return
  saving.value = true
  message.value = ''
  try {
    const { error } = await client.auth.updateUser({ data: { preferred_name: value || null } })
    if (error) throw error
    name.value = value
    message.value = value ? 'Preferred name saved.' : 'Preferred name removed.'
  } catch {
    message.value = 'Could not save your preferred name. Please try again.'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <form class="mb-6" @submit.prevent="save">
    <label>Preferred name (optional)
      <input v-model="name" type="text" autocomplete="nickname" :disabled="saving" @input="message = ''">
    </label>
    <button class="action justify-self-start" type="submit" :disabled="saving || name.trim() === savedName">
      {{ saving ? 'Saving…' : 'Save name' }}
    </button>
    <p v-if="message" role="status">{{ message }}</p>
  </form>
</template>
