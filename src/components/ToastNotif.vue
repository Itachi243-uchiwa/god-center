<script setup>
import { ref } from 'vue'

const visible = ref(false)
const message = ref('')
const type    = ref('info')  // info | ok | warn | err

let timer = null
function show(msg, t = 'info', ms = 3200) {
  message.value = msg; type.value = t; visible.value = true
  clearTimeout(timer)
  timer = setTimeout(() => { visible.value = false }, ms)
}
defineExpose({ show })
</script>

<template>
  <Transition name="toast">
    <div v-if="visible" class="toast" :class="`toast-${type}`">
      {{ message }}
    </div>
  </Transition>
</template>

<style scoped>
.toast {
  position: fixed; bottom: 1.4rem; left: 50%;
  transform: translateX(-50%);
  background: var(--surface2); border: 1px solid var(--border);
  border-radius: var(--r); padding: .85rem 1.4rem;
  min-width: 260px; max-width: 90vw; z-index: 9999;
  box-shadow: var(--shadow); text-align: center;
  font-size: .95rem; color: var(--text);
}
.toast-ok   { border-color: var(--ok);   }
.toast-warn { border-color: var(--warn); }
.toast-err  { border-color: var(--err);  }

.toast-enter-active, .toast-leave-active { transition: opacity .25s, transform .25s; }
.toast-enter-from  { opacity: 0; transform: translateX(-50%) translateY(20px); }
.toast-leave-to    { opacity: 0; transform: translateX(-50%) translateY(20px); }
</style>