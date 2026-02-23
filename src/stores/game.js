import { defineStore } from 'pinia'
import { ref } from 'vue'

const STORAGE_KEY = 'god-center-player-name'

export const useGameStore = defineStore('game', () => {
    const playerName  = ref(localStorage.getItem(STORAGE_KEY) ?? '')
    const currentMode = ref(null)
    const view        = ref('home')

    // Sauvegarder le nom sans lancer de mode
    function setName(name) {
        playerName.value = name
        localStorage.setItem(STORAGE_KEY, name)
    }

    // Lancer un mode directement (le nom est déjà connu)
    function startMode(mode, name) {
        if (name) {
            playerName.value = name
            localStorage.setItem(STORAGE_KEY, name)
        }
        currentMode.value = mode
        view.value = mode
    }

    function goHome() {
        view.value = 'home'
        currentMode.value = null
    }

    function resetName() {
        playerName.value = ''
        localStorage.removeItem(STORAGE_KEY)
    }

    return { playerName, currentMode, view, setName, startMode, goHome, resetName }
})