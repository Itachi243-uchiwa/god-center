<script setup>
import { ref } from 'vue'
import { useGameStore } from '@/stores/game'

const store = useGameStore()
const nameInput = ref('')
const nameError = ref(false)

const modes = [
  { key: 'chokmah',  icon: '🎯', title: 'Chokmah',       sub: 'La Sagesse',          desc: 'Tableau interactif · Lettre imposée · 4 catégories',            color: '#7965AF', bg: '#EDE8F5', border: '#C4B8F0' },
  { key: 'makanisi', icon: '⚖️', title: 'Makanisi',       sub: 'La Réflexion',        desc: 'Enchères bibliques · Citez le maximum de réponses',             color: '#7D5260', bg: '#FFD8E4', border: '#F0B4C8' },
  { key: 'eveille',  icon: '💡', title: 'Esprit Éveillé', sub: 'Questions & Réponses', desc: 'Questions directes · Tirage aléatoire · 40 s par question',   color: '#006A6B', bg: '#A2F3F4', border: '#7CD4D5' }
]

function launch(modeKey) {
  // Nom déjà connu → lancer directement
  if (store.playerName.trim().length >= 2) {
    store.startMode(modeKey, store.playerName)
    return
  }
  // Sinon vérifier la saisie
  if (nameInput.value.trim().length < 2) {
    nameError.value = true
    document.getElementById('name-inp')?.focus()
    return
  }
  nameError.value = false
  store.startMode(modeKey, nameInput.value.trim())
}

function saveName() {
  if (nameInput.value.trim().length >= 2) {
    store.setName(nameInput.value.trim())
    nameError.value = false
    nameInput.value = ''
  }
}
</script>

<template>
  <div class="home">
    <div class="home-bg" />

    <!-- Hero -->
    <header class="hero fade-up">
      <div class="hero-badge">✞</div>
      <div class="hero-text">
        <h1 class="hero-title">Compétition<br>Biblique</h1>
        <p class="hero-sub">MAKANISI · ESPRIT ÉVEILLÉ · CHOKMAH</p>
      </div>
    </header>

    <!-- ── Bloc nom ── -->
    <!-- Nom connu : afficher la barre joueur -->
    <div v-if="store.playerName" class="player-bar fade-up">
      <div class="player-info">
        <div class="player-avatar">{{ store.playerName[0].toUpperCase() }}</div>
        <div>
          <p class="player-label">Joueur</p>
          <p class="player-name">{{ store.playerName }}</p>
        </div>
      </div>
      <button class="btn-reset" @click="store.resetName()">Changer ✕</button>
    </div>

    <!-- Nom inconnu : saisie inline -->
    <div v-else class="name-inline fade-up">
      <p class="name-inline-label">Entrez votre prénom pour jouer</p>
      <div class="name-inline-row">
        <input
            id="name-inp"
            v-model="nameInput"
            class="name-inp"
            :class="{ 'name-inp-err': nameError }"
            placeholder="Votre prénom…"
            maxlength="30"
            @keyup.enter="saveName"
            @input="nameError = false"
        />
        <button class="btn-name-save" :disabled="nameInput.trim().length < 2" @click="saveName">
          ✓
        </button>
      </div>
      <p v-if="nameError" class="name-err-msg">⚠️ Entrez votre prénom avant de jouer</p>
    </div>

    <!-- Mode cards -->
    <main class="modes">
      <button
          v-for="m in modes" :key="m.key"
          class="mode-card fade-up"
          :style="{'--accent': m.color, '--accent-bg': m.bg, '--accent-border': m.border}"
          @click="launch(m.key)"
      >
        <div class="mode-icon-wrap">
          <span class="mode-icon">{{ m.icon }}</span>
        </div>
        <div class="mode-body">
          <div class="mode-top">
            <span class="mode-title">{{ m.title }}</span>
            <span class="mode-badge">{{ m.sub }}</span>
          </div>
          <p class="mode-desc">{{ m.desc }}</p>
        </div>
        <div class="mode-arrow">›</div>
      </button>
    </main>

    <footer class="home-foot fade-up">
      <div class="foot-divider" />
      <p class="foot-text">Propulsé par Gemini AI · Material Design 3</p>
    </footer>
  </div>
</template>

<style scoped>
.home {
  position: relative; display: flex; flex-direction: column;
  min-height: 100dvh; max-width: 600px; margin: 0 auto;
  padding: 2rem 1.1rem 1.5rem; gap: 1rem; overflow: hidden;
  --accent: #7965AF;
  --accent-bg: #EDE8F5;
  --accent-border: #C4B8F0;
}
.home-bg {
  position: fixed; inset: 0; z-index: -1;
  background: linear-gradient(135deg, #F6F2FF 0%, #FFFBFE 45%, #F0FBF5 80%, #FFF0F8 100%);
}

/* Hero */
.hero { display: flex; align-items: center; gap: 1rem; padding: .4rem 0; }
.hero-badge {
  width: 60px; height: 60px; border-radius: 18px; flex-shrink: 0;
  background: linear-gradient(135deg, #7965AF, #9C89CC);
  color: white; font-size: 1.8rem;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 16px rgba(121,101,175,.35);
}
.hero-title {
  font-family: var(--f-head); font-size: 1.9rem; font-weight: 900;
  line-height: 1.05; color: var(--on-surface); letter-spacing: -.03em;
}
.hero-sub { font-size: .62rem; letter-spacing: .18em; color: var(--on-surf-var); margin-top: .3rem; font-weight: 600; }

/* Player bar (nom connu) */
.player-bar {
  display: flex; align-items: center; justify-content: space-between;
  background: rgba(121,101,175,.08); border: 1.5px solid rgba(121,101,175,.2);
  border-radius: 16px; padding: .65rem 1rem; gap: .7rem;
}
.player-info { display: flex; align-items: center; gap: .7rem; }
.player-avatar {
  width: 38px; height: 38px; border-radius: 12px; flex-shrink: 0;
  background: linear-gradient(135deg, #7965AF, #9C89CC);
  color: white; font-weight: 900; font-size: 1rem;
  display: flex; align-items: center; justify-content: center;
}
.player-label { font-size: .65rem; color: var(--on-surf-var); font-weight: 600; letter-spacing: .06em; line-height: 1; }
.player-name { font-weight: 800; color: #7965AF; font-size: 1rem; line-height: 1.2; }
.btn-reset {
  border: none; background: none; cursor: pointer;
  font-size: .72rem; color: var(--on-surf-var); padding: .3rem .6rem;
  border-radius: 8px; transition: background .15s; white-space: nowrap;
}
.btn-reset:hover { background: rgba(0,0,0,.06); }

/* Saisie nom inline (nom inconnu) */
.name-inline {
  background: white; border-radius: 18px; padding: .9rem 1rem;
  border: 1.5px solid rgba(121,101,175,.25);
  box-shadow: 0 2px 12px rgba(121,101,175,.08);
}
.name-inline-label { font-size: .8rem; font-weight: 700; color: #7965AF; margin-bottom: .55rem; }
.name-inline-row { display: flex; gap: .5rem; }
.name-inp {
  flex: 1; padding: .7rem .9rem; font-size: .95rem; font-family: var(--f-body);
  border: 2px solid #E0DAFA; border-radius: 12px; outline: none;
  color: var(--on-surface); background: #FAFAFA; transition: border-color .2s, box-shadow .2s;
}
.name-inp:focus { border-color: #7965AF; box-shadow: 0 0 0 3px rgba(121,101,175,.15); background: white; }
.name-inp-err { border-color: #B3261E !important; box-shadow: 0 0 0 3px rgba(179,38,30,.12) !important; }
.btn-name-save {
  width: 44px; height: 44px; border: none; border-radius: 12px; flex-shrink: 0;
  background: linear-gradient(135deg, #7965AF, #9C89CC); color: white;
  font-size: 1.1rem; font-weight: 900; cursor: pointer;
  transition: filter .15s, transform .15s;
  display: flex; align-items: center; justify-content: center;
}
.btn-name-save:hover:not(:disabled) { filter: brightness(1.1); transform: scale(1.04); }
.btn-name-save:disabled { opacity: .4; cursor: default; }
.name-err-msg { font-size: .75rem; color: #B3261E; margin-top: .4rem; font-weight: 600; }

/* Mode cards */
.modes { display: flex; flex-direction: column; gap: .65rem; flex: 1; }
.mode-card {
  display: flex; align-items: center; gap: .85rem;
  background: white; border-radius: 20px;
  padding: .95rem 1rem; cursor: pointer; text-align: left;
  width: 100%; color: var(--on-surface); border: none;
  box-shadow: 0 2px 12px rgba(0,0,0,.06), 0 0 0 1.5px rgba(0,0,0,.05);
  transition: transform .18s, box-shadow .18s; position: relative; overflow: hidden;
}
.mode-card::before {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0;
  width: 4px; background: var(--accent); border-radius: 20px 0 0 20px;
}
.mode-card:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,.1), 0 0 0 1.5px rgba(0,0,0,.05); }
.mode-card:active { transform: scale(.99); }
.mode-icon-wrap {
  width: 52px; height: 52px; border-radius: 16px; flex-shrink: 0;
  background: var(--accent-bg); border: 1.5px solid var(--accent-border);
  display: flex; align-items: center; justify-content: center;
}
.mode-icon { font-size: 1.65rem; }
.mode-body { flex: 1; min-width: 0; }
.mode-top { display: flex; align-items: center; gap: .45rem; flex-wrap: wrap; margin-bottom: .2rem; }
.mode-title { font-family: var(--f-head); font-size: 1.05rem; font-weight: 800; color: var(--accent); }
.mode-badge {
  font-size: .6rem; padding: .15rem .5rem; border-radius: 20px;
  background: var(--accent-bg); color: var(--accent);
  border: 1px solid var(--accent-border); font-weight: 700; letter-spacing: .04em;
}
.mode-desc { font-size: .8rem; color: var(--on-surf-var); line-height: 1.4; }
.mode-arrow { font-size: 1.6rem; color: var(--on-surf-var); flex-shrink: 0; opacity: .4; }

/* Footer */
.home-foot { text-align: center; margin-top: .5rem; }
.foot-divider { height: 1px; background: var(--outline); margin-bottom: .8rem; opacity: .5; }
.foot-text { font-size: .7rem; color: var(--on-surf-var); letter-spacing: .05em; }
</style>