<script setup>
import { ref } from 'vue'
import { useGameStore } from '@/stores/game'
import HomeView     from '@/views/HomeView.vue'
import EveilleView  from '@/views/EveilleView.vue'
import MakanisiView from '@/views/MakanisiView.vue'
import ChokhmahView from '@/views/ChokhmahView.vue'
import ToastNotif   from '@/components/ToastNotif.vue'

const store = useGameStore()
const toast = ref(null)

function onFinish(score) {
  toast.value?.show(`🏆 Partie terminée — ${score} points !`, 'ok', 4000)
  store.goHome()
}
</script>

<template>
  <div id="root">
    <Transition name="page" mode="out-in">
      <HomeView     v-if="store.view === 'home'"                key="home" />
      <EveilleView  v-else-if="store.view === 'eveille'"  key="eveille"
                    :player-name="store.playerName" @finish="onFinish" />
      <MakanisiView v-else-if="store.view === 'makanisi'" key="makanisi"
                    :player-name="store.playerName" @finish="onFinish" />
      <ChokhmahView v-else-if="store.view === 'chokmah'"  key="chokmah"
                    :player-name="store.playerName" @finish="onFinish" />
    </Transition>
    <ToastNotif ref="toast" />
  </div>
</template>

<style>
#root { min-height: 100dvh; }
</style>