<script setup lang="ts">
import { Code, Database, Plus } from '@lucide/vue'

defineProps<{ language: string }>()
const logos: Record<string, string> = {
  Scala: 'scala', Java: 'java', Python: 'python', TypeScript: 'typescript',
  JavaScript: 'javascript', Go: 'go', Rust: 'rust', C: 'c', 'C++': 'cplusplus',
  'C#': 'csharp', Kotlin: 'kotlin',
}
</script>

<template>
  <img v-if="Object.hasOwn(logos, language)" :src="'/languages/' + logos[language] + '.svg'" alt="" width="22" height="22" class="size-[22px] object-contain">
  <component :is="language === 'SQL' ? Database : language === 'Other' ? Plus : Code" v-else aria-hidden="true" class="size-[22px] text-moss" />
</template>
