<script setup lang="ts">
import type { ArticleCode } from '~/data/articles'
import { highlightCode } from '~/utils/highlightCode'

const props = defineProps<{ code: ArticleCode }>()
const highlightedCode = computed(() => highlightCode(props.code.source, props.code.language))
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
      <span class="article-code__language">{{ code.language }}</span>
    </figcaption>
    <pre><code class="hljs" v-html="highlightedCode" /></pre>
  </figure>
</template>
