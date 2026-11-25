<script setup lang="ts">
import { ChevronDown } from '@lucide/vue'
import type { compare } from '~/domain/contractor/comparison'

const props = defineProps<{ flow: ReturnType<typeof compare>['flow']; months: string[] }>()
const selected = ref(11)
const money = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' })
const axisMoney = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', notation: 'compact', maximumFractionDigits: 2 })
const points = computed(() => {
  let permanent = 0
  let contract = 0
  return props.flow.map(month => {
    permanent += month.permanent
    contract += month.received - month.expenses
    return { permanent, contract }
  })
})
const axis = computed(() => {
  const values = points.value.flatMap(point => [point.permanent, point.contract])
  const min = Math.min(0, ...values)
  const max = Math.max(0, ...values)
  // Choose readable intervals in whole pence, including a usable all-zero scale.
  const roughStep = Math.max(1, (max - min || 400) / 4)
  const power = 10 ** Math.floor(Math.log10(roughStep))
  const step = ([1, 2, 5, 10].find(n => n * power >= roughStep) ?? 10) * power
  const bottom = Math.floor(min / step) * step
  const top = Math.max(bottom + step, Math.ceil(max / step) * step)
  const ticks = Array.from({ length: 1 + (top - bottom) / step }, (_, i) => top - i * step)
  return { bottom, top, ticks }
})
const x = (index: number) => 100 * index / (props.months.length - 1)
const y = (value: number) => 100 * (axis.value.top - value) / (axis.value.top - axis.value.bottom)
const line = (key: 'permanent' | 'contract') => points.value.map((p, i) => x(i) + ',' + y(p[key])).join(' ')
const current = computed(() => points.value[selected.value])
</script>
<template>
  <figure id="cash-chart" class="mt-6 scroll-mt-24 rounded-xl border border-line bg-white/60 p-5 sm:p-7">
    <figcaption>
      <h3 class="font-display text-3xl">Cash received over time</h3>
      <p class="mt-2 text-sm leading-6">Running total at each month end, after tax and work costs, before household spending. Delayed contract payments appear when received. Pension funding is shown separately above.</p>
    </figcaption>
    <div class="my-5 flex flex-wrap gap-x-6 gap-y-1 text-sm">
      <span class="flex items-center gap-2"><i class="w-7 border-t-[3px] border-moss"></i>Permanent</span>
      <span class="flex items-center gap-2"><i class="w-7 border-t-[3px] border-dashed border-plum"></i>Contract</span>
    </div>
    <div aria-hidden="true" class="relative mb-10 ml-16 mr-3 mt-6 h-44 sm:h-56">
      <div v-for="tick in axis.ticks" :key="tick" class="absolute inset-x-0 border-t" :class="tick === 0 ? 'border-ink/50' : 'border-line'" :style="{ top: y(tick) + '%' }">
        <span class="absolute right-full mr-2 -translate-y-1/2 whitespace-nowrap text-sm">{{ axisMoney.format(tick / 100) }}</span>
      </div>
      <svg class="absolute h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line :x1="x(selected)" :x2="x(selected)" y1="0" y2="100" stroke="#aaa397" vector-effect="non-scaling-stroke" />
        <polyline :points="line('permanent')" fill="none" stroke="#315948" stroke-width="3" vector-effect="non-scaling-stroke" />
        <polyline :points="line('contract')" fill="none" stroke="#65506d" stroke-width="3" stroke-dasharray="7 4" vector-effect="non-scaling-stroke" />
      </svg>
      <span v-for="index in [0, 3, 6, 9, 11]" :key="index" class="absolute top-full mt-2 -translate-x-1/2 text-sm" :style="{ left: x(index) + '%' }">{{ months[index] }}</span>
    </div>
    <div class="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 text-sm">
      <label class="flex items-center gap-2">Month end
        <span class="relative inline-flex">
          <select v-model="selected" class="appearance-none rounded border border-line bg-white py-2 pl-3 pr-10">
            <option v-for="(month, index) in months" :key="month" :value="index">{{ month }}</option>
          </select>
          <ChevronDown aria-hidden="true" class="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2" />
        </span>
      </label>
      <p aria-live="polite" class="flex flex-wrap gap-x-4 tabular-nums">
        <span>Permanent <strong>{{ money.format(current.permanent / 100) }}</strong></span>
        <span>Contract <strong>{{ money.format(current.contract / 100) }}</strong></span>
      </p>
    </div>
  </figure>
</template>
