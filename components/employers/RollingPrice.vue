<script setup lang="ts">
const props = defineProps<{ price: string }>()

const amount = ref<HTMLElement | null>(null)
const rolling = ref(false)
let observer: IntersectionObserver | undefined

const amounts = computed(() => {
  if (!/^£\d+$/.test(props.price)) return []
  const pounds = Number(props.price.slice(1))
  if (pounds === 0) return ['', '0']
  const steps = Math.min(pounds, 9)
  return Array.from({ length: steps + 1 }, (_, step) => String(Math.round(pounds * step / steps)))
})

onMounted(() => {
  if (!amount.value || !('IntersectionObserver' in window)) return
  observer = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) {
      rolling.value = amounts.value.length > 0 && window.matchMedia('(prefers-reduced-motion: no-preference)').matches
      observer?.disconnect()
    }
  })
  observer.observe(amount.value)
})
onBeforeUnmount(() => observer?.disconnect())

</script>

<template>
  <strong ref="amount" class="font-display text-5xl leading-[1.1]">
    <span class="sr-only">{{ price }}</span>
    <span v-if="rolling" aria-hidden="true" class="inline-flex items-center">
      £<span class="number-window">
        <span class="reel" @animationend="rolling = false" @animationcancel="rolling = false">
          <span v-for="value in amounts" :key="value">{{ value }}</span>
        </span>
      </span>
    </span>
    <span v-else aria-hidden="true">{{ price }}</span>
  </strong>
</template>

<style scoped>
.number-window, .reel > span {
  display: block;
  height: 1.1em;
  line-height: 1.1;
}
.number-window { overflow: hidden; }
.reel {
  display: block;
  transform: translateY(calc(1.1em - 100%));
}
@media (prefers-reduced-motion: no-preference) {
  .reel { animation: roll-up 1.5s ease-in-out; }
}
@keyframes roll-up {
  from { transform: translateY(0); }
  to { transform: translateY(calc(1.1em - 100%)); }
}
</style>
