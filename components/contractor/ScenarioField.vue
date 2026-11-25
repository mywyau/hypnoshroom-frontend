<script setup lang="ts">
defineProps<{ name: string; spec: readonly [string, number, number]; modelValue: number; error?: string }>()
const emit = defineEmits<{ 'update:modelValue': [number] }>()
function update(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).valueAsNumber)
}
</script>
<template>
  <div>
    <label :for="name" class="block text-sm font-medium">{{ spec[0] }}</label>
    <input :id="name" type="number" required min="0" :max="spec[1]" :step="spec[2]"
      :value="Number.isFinite(modelValue) ? modelValue : ''" :aria-invalid="!!error"
      :aria-describedby="error ? name + '-error' : undefined"
      class="mt-2 w-full rounded-md border border-ink/30 bg-white px-3 py-2 tabular-nums" @input="update">
    <p v-if="error" :id="name + '-error'" class="mt-1 text-sm text-red-800">{{ error }}</p>
  </div>
</template>
