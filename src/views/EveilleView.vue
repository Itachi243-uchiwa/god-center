<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/game'
import { validateAnswer } from '@/services/ai'
import { eveilleQuestions } from '@/data/eveille'
import TimerBar from '@/components/TimerBar.vue'

const props = defineProps({ playerName: String })
const emit  = defineEmits(['finish'])
const store = useGameStore()

const questions  = ref([...eveilleQuestions].sort(() => Math.random() - 0.5).slice(0, 12))
const qIndex     = ref(0)
const phase      = ref('question')
const answer     = ref('')
const score      = ref(0)
const history    = ref([])
const validating = ref(false)
const lastResult = ref(null)
const timerRef   = ref(null)
const POINTS = 100

const current  = computed(() => questions.value[qIndex.value])
const progress = computed(() => (qIndex.value / questions.value.length) * 100)

async function confirm() {
  if (!answer.value.trim() || validating.value) return
  timerRef.value?.stop()
  validating.value = true
  try {
    const res = await validateAnswer(current.value.q, [current.value.a], answer.value)
    lastResult.value = res
    if (res.valid) score.value += POINTS
    history.value.push({
      userAnswer:  answer.value,
      correct:     res.valid,
      answer:      current.value.a,
      question:    current.value.q,
      explanation: res.explanation ?? ''
    })
    phase.value = 'result'
  } finally { validating.value = false }
}

function onTimerExpired() {
  if (!validating.value && phase.value === 'question') {
    lastResult.value = { valid: false, matched: null, explanation: 'Temps écoulé !' }
    history.value.push({ userAnswer: '', correct: false, answer: current.value.a, question: current.value.q, explanation: 'Temps écoulé !' })
    phase.value = 'result'
  }
}

function next() {
  answer.value = ''; lastResult.value = null
  if (qIndex.value + 1 < questions.value.length) {
    qIndex.value++; phase.value = 'question'
  } else {
    phase.value = 'final'
  }
}
</script>

<template>
  <div class="page safe-bottom eveille-page">

    <div class="topbar">
      <button class="btn btn-text btn-sm" @click="store.goHome()">← Quitter</button>
      <div class="ev-chip">💡 Esprit Éveillé</div>
      <div class="ev-score">{{ score }}</div>
    </div>

    <!-- QUESTION -->
    <template v-if="phase === 'question' && current">
      <div class="prog-wrap"><div class="prog-bar" :style="{width: progress + '%'}" /></div>
      <div class="q-counter">Question {{ qIndex + 1 }} <span class="q-total">/ {{ questions.length }}</span></div>

      <TimerBar ref="timerRef" :seconds="40" @expired="onTimerExpired" />

      <div class="q-card fade-up">
        <div class="q-label">📖 Question biblique</div>
        <p class="q-text">{{ current.q }}</p>
      </div>

      <div class="ans-wrap">
        <input v-model="answer" class="ans-inp" placeholder="Votre réponse…"
               :disabled="validating" @keyup.enter="confirm" autofocus />
        <button class="btn-confirm" :disabled="!answer.trim() || validating" @click="confirm">
          <span v-if="validating" class="validating-text">
            <span class="spinner spinner-sm" /> Gemini vérifie…
          </span>
          <span v-else>Confirmer →</span>
        </button>
      </div>
    </template>

    <!-- RÉSULTAT -->
    <template v-if="phase === 'result' && lastResult">
      <div class="result-card scale-in" :class="lastResult.valid ? 'result-ok' : 'result-err'">
        <div class="result-icon-wrap">
          <span class="result-icon">{{ lastResult.valid ? '✅' : '❌' }}</span>
        </div>
        <div class="result-body">
          <h2 class="result-title">{{ lastResult.valid ? `+${POINTS} points !` : 'Incorrect' }}</h2>

          <!-- Réponse du joueur -->
          <div v-if="history.at(-1).userAnswer" class="result-line">
            Votre réponse :
            <em :class="lastResult.valid ? 'ok-text' : 'err-text'">« {{ history.at(-1).userAnswer }} »</em>
          </div>

          <!-- Bonne réponse si incorrect -->
          <div v-if="!lastResult.valid" class="result-line correct-ans">
            Réponse attendue : <strong>{{ current?.a }}</strong>
          </div>

          <!-- Explication IA — TOUJOURS affichée (correct ou incorrect) -->
          <div v-if="lastResult.explanation" class="ai-expl">
            <span class="ai-badge">✦ Gemini</span>
            <span>{{ lastResult.explanation }}</span>
          </div>
        </div>
      </div>

      <button class="btn-next" @click="next">
        {{ qIndex + 1 < questions.length ? 'Question suivante →' : 'Voir les résultats →' }}
      </button>
    </template>

    <!-- FINAL -->
    <template v-if="phase === 'final'">
      <div class="final-card scale-in">
        <div class="final-trophy">🏆</div>
        <h1 class="final-name">{{ playerName }}</h1>
        <div class="final-score">{{ score }}</div>
        <p class="final-sub">{{ history.filter(h => h.correct).length }} / {{ history.length }} correctes</p>
        <div class="final-divider" />
        <div class="final-hist">
          <div v-for="(h, i) in history" :key="i" class="hist-row">
            <span class="hist-icon">{{ h.correct ? '✅' : '❌' }}</span>
            <div class="hist-content">
              <span class="hist-answer">{{ h.answer }}</span>
              <span v-if="h.explanation" class="hist-expl">{{ h.explanation }}</span>
            </div>
          </div>
        </div>
        <button class="btn-next" style="margin-top:.5rem" @click="emit('finish', score)">
          Retour à l'accueil
        </button>
      </div>
    </template>

  </div>
</template>

<style scoped>
.eveille-page { background: linear-gradient(160deg, #E0FBFB 0%, #FFFBFE 50%, #F0FFF4 100%); }
.ev-chip { font-size:.78rem;font-weight:700;padding:.3rem .8rem;border-radius:20px;background:#A2F3F4;color:#006A6B;border:1.5px solid #7CD4D5; }
.ev-score { font-family:var(--f-head);font-size:1.2rem;font-weight:900;color:#006A6B;min-width:40px;text-align:right; }
.prog-wrap { height:5px;background:#C8F0F0;border-radius:99px;overflow:hidden; }
.prog-bar { height:100%;background:#006A6B;border-radius:99px;transition:width .4s; }
.q-counter { font-size:.8rem;font-weight:700;color:#006A6B;text-align:right;margin-top:.2rem; }
.q-total { color:var(--on-surf-var);font-weight:400; }

.q-card { background:white;border-radius:20px;padding:1.3rem 1.2rem;box-shadow:0 4px 20px rgba(0,106,107,.1);border:1.5px solid #B8EDED; }
.q-label { font-size:.72rem;font-weight:700;color:#006A6B;letter-spacing:.08em;margin-bottom:.6rem; }
.q-text { font-size:1.05rem;line-height:1.7;color:var(--on-surface); }

.ans-wrap { display:flex;flex-direction:column;gap:.5rem; }
.ans-inp { width:100%;padding:.9rem 1rem;font-size:1.05rem;border:2px solid #B8EDED;border-radius:14px;outline:none;font-family:var(--f-body);background:white;color:var(--on-surface);transition:border-color .2s,box-shadow .2s; }
.ans-inp:focus { border-color:#006A6B;box-shadow:0 0 0 3px rgba(0,106,107,.15); }
.btn-confirm { padding:.9rem;border:none;border-radius:14px;background:#006A6B;color:white;font-family:var(--f-head);font-size:1rem;font-weight:800;cursor:pointer;transition:filter .15s,transform .15s; }
.btn-confirm:hover:not(:disabled) { filter:brightness(1.1);transform:translateY(-1px); }
.btn-confirm:disabled { opacity:.45;cursor:default; }
.validating-text { display:flex;align-items:center;gap:.5rem;justify-content:center; }

/* Result */
.result-card { border-radius:20px;padding:1.3rem;display:flex;gap:1rem;align-items:flex-start; }
.result-ok { background:#E6F9F0;border:2px solid #82D9A8; }
.result-err { background:#FDECEA;border:2px solid #F0A8A4; }
.result-icon-wrap { flex-shrink:0;font-size:2rem; }
.result-body { flex:1;min-width:0;display:flex;flex-direction:column;gap:.3rem; }
.result-title { font-family:var(--f-head);font-size:1.2rem;font-weight:800; }
.result-ok .result-title { color:#1B6B40; }
.result-err .result-title { color:#B3261E; }
.result-line { font-size:.88rem;line-height:1.5; }
.ok-text { color:#1B6B40; }
.err-text { color:#B3261E; }
.correct-ans { color:#1B6B40;font-size:.88rem; }

/* Explication IA — mise en valeur pour les deux cas */
.ai-expl {
  display:flex;gap:.5rem;align-items:flex-start;
  background:rgba(0,0,0,.04);border-radius:10px;
  padding:.55rem .7rem;margin-top:.2rem;
  font-size:.82rem;line-height:1.55;color:var(--on-surface);
}
.ai-badge {
  font-size:.6rem;font-weight:800;letter-spacing:.06em;
  background:#A2F3F4;color:#006A6B;
  padding:.1rem .38rem;border-radius:6px;
  flex-shrink:0;margin-top:.12rem;white-space:nowrap;
}

.btn-next { width:100%;padding:.9rem;border:none;border-radius:14px;background:#006A6B;color:white;font-family:var(--f-head);font-size:1rem;font-weight:800;cursor:pointer;transition:filter .15s,transform .15s; }
.btn-next:hover { filter:brightness(1.1);transform:translateY(-1px); }

/* Final */
.final-card { background:white;border-radius:24px;padding:2rem 1.5rem;display:flex;flex-direction:column;align-items:center;gap:.8rem;text-align:center;box-shadow:0 8px 32px rgba(0,106,107,.12);border:2px solid #B8EDED; }
.final-trophy { font-size:3rem; }
.final-name { font-family:var(--f-head);font-size:1.6rem;font-weight:900;color:#006A6B; }
.final-score { font-family:var(--f-head);font-size:3rem;font-weight:900;color:var(--on-surface); }
.final-sub { font-size:.9rem;color:var(--on-surf-var); }
.final-divider { width:100%;height:1px;background:var(--outline); }
.final-hist { width:100%;max-height:280px;overflow-y:auto;display:flex;flex-direction:column;gap:.25rem; }
.hist-row { display:flex;gap:.6rem;align-items:flex-start;padding:.35rem .2rem;border-bottom:1px solid var(--outline); }
.hist-icon { font-size:1rem;flex-shrink:0;margin-top:.1rem; }
.hist-content { display:flex;flex-direction:column;gap:.1rem;flex:1;text-align:left; }
.hist-answer { font-size:.85rem;font-weight:700;color:#006A6B; }
.hist-expl { font-size:.72rem;color:var(--on-surf-var);font-style:italic;line-height:1.4; }
</style>