<script setup lang="ts">
const { headers, failure } = useApplicationIdentity()
const rows = ref<ApplicationReceipt[]>([])
const busy = ref(true)
const message = ref('')
async function load() {
  busy.value = true
  message.value = ''
  try { rows.value = await $fetch<ApplicationReceipt[]>('/api/applications', { headers: await headers() }) }
  catch (error) { message.value = failure(error, 'Could not load your applications.') }
  finally { busy.value = false }
}
async function withdraw(row: ApplicationReceipt) {
  if (busy.value || !window.confirm('Withdraw your application for ' + row.role_title + ' and remove your CV?')) return
  busy.value = true
  try {
    await $fetch('/api/applications/' + row.id, { method: 'DELETE', headers: await headers() })
    rows.value = rows.value.filter(application => application.id !== row.id)
    message.value = 'Application withdrawn.'
  } catch (error) { message.value = failure(error, 'Could not confirm withdrawal. Refresh your applications.') }
  finally { busy.value = false }
}
onMounted(load)
</script>
<template>
  <div>
    <p v-if="busy" role="status">Loading…</p>
    <p v-if="message" role="status">{{ message }} <button class="link" :disabled="busy" @click="load">Refresh</button></p>
    <p v-else-if="!busy && !rows.length">You have no applications.</p>
    <article v-for="row in rows" :key="row.id" class="mt-4 border-t border-line pt-4">
      <h2>{{ row.role_title }}</h2>
      <p>{{ row.recipient }} · Submitted {{ formatArticleDate(row.submitted_at.slice(0,10)) }}</p>
      <button class="link mt-2" :disabled="busy" @click="withdraw(row)">Withdraw application</button>
    </article>
  </div>
</template>
