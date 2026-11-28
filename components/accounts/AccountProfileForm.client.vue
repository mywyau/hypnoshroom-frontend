<script setup lang="ts">
import type { User } from '@supabase/supabase-js'

const props = defineProps<{ user: User }>()
const client = useAccountClient()
const savedName = computed(() => preferredName(props.user))
const savedCompany = computed(() => {
  const company = props.user.user_metadata?.company_name
  return typeof company === 'string' ? company.trim() : ''
})
const name = ref(savedName.value)
const company = ref(savedCompany.value)
const changes = computed(() => {
  const data: Record<string, string | null> = {}
  if (name.value.trim() !== savedName.value) data.preferred_name = name.value.trim() || null
  if (company.value.trim() !== savedCompany.value) data.company_name = company.value.trim() || null
  return data
})
const hasChanges = computed(() => Object.keys(changes.value).length > 0)
const saving = ref(false)
const message = ref('')

watch(savedName, (current, previous) => {
  if (name.value.trim() === previous) name.value = current
})
watch(savedCompany, (current, previous) => {
  if (company.value.trim() === previous) company.value = current
})

async function save() {
  if (saving.value || !hasChanges.value) return
  saving.value = true
  message.value = ''
  try {
    const { error } = await client.auth.updateUser({ data: changes.value })
    if (error) throw error
    name.value = name.value.trim()
    company.value = company.value.trim()
    message.value = 'Profile saved.'
  } catch {
    message.value = 'Could not save your profile. Please try again.'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <form @submit.prevent="save">
    <label>Preferred name (optional)
      <input v-model="name" type="text" autocomplete="nickname" :disabled="saving" @input="message = ''">
    </label>
    <label>Company (optional)
      <input v-model="company" type="text" autocomplete="organization" maxlength="140" :disabled="saving" @input="message = ''">
    </label>
    <button class="action justify-self-start" type="submit" :disabled="saving || !hasChanges">
      {{ saving ? 'Saving…' : 'Save profile' }}
    </button>
    <p v-if="message" role="status">{{ message }}</p>
  </form>
</template>
