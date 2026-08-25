<script setup lang="ts">
import type { ArticleCode } from '~/data/articles'
import { highlightCode } from '~/utils/highlightCode'
import { Check, Copy } from '@lucide/vue'

const props = defineProps<{ code: ArticleCode }>()
const highlightedCode = computed(() => highlightCode(props.code.source, props.code.language))
const copied = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | undefined

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.code.source)
    copied.value = true
    if (resetTimer) clearTimeout(resetTimer)
    resetTimer = setTimeout(() => { copied.value = false }, 2000)
  }
  catch {
    copied.value = false
  }
}

onBeforeUnmount(() => {
  if (resetTimer) clearTimeout(resetTimer)
})
</script>

<template>
  <figure class="article-code">
    <figcaption>
      <span class="article-code__title">
        <span class="article-code__controls" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>{{ code.label }}</span>
      </span>
      <span class="article-code__actions">
        <span class="article-code__language">{{ code.language }}</span>
        <button
          type="button"
          class="article-code__copy"
          :aria-label="copied ? 'Code copied' : `Copy ${code.label}`"
          :title="copied ? 'Copied' : 'Copy code'"
          @click="copyCode"
        >
          <Check v-if="copied" :size="15" aria-hidden="true" />
          <Copy v-else :size="15" aria-hidden="true" />
          <span>{{ copied ? 'Copied' : 'Copy' }}</span>
        </button>
      </span>
    </figcaption>
    <pre><code class="hljs" v-html="highlightedCode" /></pre>
  </figure>
</template>
