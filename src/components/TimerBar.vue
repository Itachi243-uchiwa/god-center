<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'

const props = defineProps({
  seconds: { type: Number, required: true },
  running: { type: Boolean, default: true }
})
const emit = defineEmits(['expired'])

const left = ref(props.seconds)
let interval = null

const pct   = computed(() => Math.max(0, (left.value / props.seconds) * 100))
const color = computed(() => {
  if (pct.value > 50) return 'var(--ok)'
  if (pct.value > 20) return 'var(--warn)'
  return 'var(--err)'
})
const label = computed(() => {
  const m = Math.floor(left.value / 60)
  const s = left.value % 60
  return m > 0 ? `${m}:${s.toString().padStart(2, '0')}` : `${s}s`
})

function start() {
  interval = setInterval(() => {
    left.value--
    if (left.value <= 0) { clearInterval(interval); emit('expired') }
  }, 1000)
}
function stop() { clearInterval(interval) }
function reset(newSecs) { stop(); left.value = newSecs ?? props.seconds; if (props.running) start() }

watch(() => props.running, (v) => { v ? start() : stop() }, { immediate: true })
onUnmounted(stop)

defineExpose({ stop, reset })
</script>

<template>
  <div class="timer-wrap">
    <div class="timer-row">
      <span class="muted small">⏱ Temps restant</span>
      <span class="mono" :style="{ color }" :class="{ pulse: left <= 10 }">{{ label }}</span>
    </div>
    <div class="prog">
      <div class="prog-fill" :style="{ width: pct + '%', background: color, transition: 'width 1s linear' }" />
    </div>
  </div>
</template>

<style scoped>
.timer-wrap { display: flex; flex-direction: column; gap: .3rem; }
.timer-row  { display: flex; justify-content: space-between; align-items: center; font-size: .82rem; }
</style>