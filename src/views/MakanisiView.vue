<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/game'
import { validateAnswerList } from '@/services/ai'
import { makanisiQuestions } from '@/data/makanisi'
import TimerBar from '@/components/TimerBar.vue'

const props = defineProps({ playerName: String })
const emit  = defineEmits(['finish'])
const store = useGameStore()

const questions   = ref([...makanisiQuestions].sort(() => Math.random() - 0.5).slice(0, 5))
const qIndex      = ref(0)
const phase       = ref('bid')
const bidInput    = ref(1)
const userBid     = ref(0)
const answersText = ref('')
const score       = ref(0)
const history     = ref([])
const validating  = ref(false)
const result      = ref(null)
const timerBid    = ref(null)
const timerAns    = ref(null)

const current  = computed(() => questions.value[qIndex.value])
const progress = computed(() => (qIndex.value / questions.value.length) * 100)
const ansCount = computed(() => answersText.value.split(',').map(s=>s.trim()).filter(Boolean).length)

function submitBid() {
  const n = parseInt(bidInput.value)
  if (isNaN(n) || n < 1 || n > current.value.maxAnswers) return
  timerBid.value?.stop(); userBid.value = n; phase.value = 'answer'
}
function onBidExpired() { if (!userBid.value) submitBid() }

async function submitAnswers() {
  if (validating.value) return
  timerAns.value?.stop(); validating.value = true
  try {
    const q = current.value
    const userList = answersText.value.split(',').map(s => s.trim()).filter(Boolean)
    let val = { results:[], wrongAnswers:[] }
    if (userList.length) val = await validateAnswerList(q.theme, q.answers, userList)

    const res = val.results ?? []
    const validCount = res.filter(r => r.valid).length
    const wrongOnes  = val.wrongAnswers ?? []
    const hasErrors  = wrongOnes.length > 0

    let pts = 0, bidSuccess = false
    if (!hasErrors && validCount >= userBid.value) { pts = userBid.value * 10; bidSuccess = true }
    else if (!hasErrors && validCount > 0) { pts = validCount * 5 }

    score.value += pts
    result.value = { res, validCount, wrongOnes, pts, bidSuccess, hasErrors,
      userBid: userBid.value, maxAnswers: q.maxAnswers, allAnswers: q.answers,
      userHitMax: userBid.value >= q.maxAnswers }
    history.value.push({ theme: q.theme, userBid: userBid.value, validCount, pts, maxAnswers: q.maxAnswers, hasErrors })
    phase.value = 'result'
  } finally { validating.value = false }
}
function onAnswerExpired() { if (!validating.value) submitAnswers() }

function next() {
  bidInput.value = 1; userBid.value = 0; answersText.value = ''; result.value = null
  if (qIndex.value + 1 < questions.value.length) { qIndex.value++; phase.value = 'bid' }
  else { phase.value = 'final' }
}
</script>

<template>
  <div class="page safe-bottom" style="background:linear-gradient(160deg,#FFF0F5,#FFFBFE 60%)">

    <div class="topbar">
      <button class="btn btn-text btn-sm" @click="store.goHome()">← Quitter</button>
      <div class="chip" style="background:#FFD8E4;color:#7D5260;border-color:#D4A8B4">⚖️ Makanisi</div>
      <div class="score-display">{{ score }}</div>
    </div>

    <div class="prog"><div class="prog-fill" :style="{width:progress+'%',background:'var(--secondary)'}" /></div>
    <p class="xs muted" style="text-align:right">Question {{ qIndex+1 }} / {{ questions.length }}</p>

    <!-- ENCHÈRE -->
    <template v-if="phase === 'bid' && current">
      <div class="card fade-up" style="border-left:4px solid var(--secondary)">
        <p class="label-sm muted" style="margin-bottom:.4rem">Thème de la manche</p>
        <h2 class="title-lg" style="line-height:1.4;color:var(--secondary)">{{ current.theme }}</h2>
        <div class="divider" />
        <p class="small muted italic">💡 {{ current.hint }}</p>
        <div style="margin-top:.6rem">
          <span class="chip chip-secondary">{{ current.maxAnswers }} réponses possibles</span>
        </div>
      </div>

      <TimerBar ref="timerBid" :seconds="30" @expired="onBidExpired" />

      <div class="card card-secondary fade-up">
        <p class="title-md" style="margin-bottom:.55rem">Votre enchère</p>
        <p class="small muted" style="margin-bottom:.9rem">
          Combien de réponses correctes allez-vous citer ?
          <strong> (1 – {{ current.maxAnswers }})</strong>
        </p>
        <div class="bid-stepper">
          <button class="btn btn-tonal btn-sm" :disabled="bidInput <= 1" @click="bidInput = Math.max(1, bidInput-1)">−</button>
          <div class="bid-value">
            <span class="headline-sm" style="color:var(--secondary)">{{ bidInput }}</span>
            <span class="xs muted">= <strong>{{ bidInput * 10 }} pts</strong></span>
          </div>
          <button class="btn btn-tonal btn-sm" :disabled="bidInput >= current.maxAnswers" @click="bidInput = Math.min(current.maxAnswers, bidInput+1)">+</button>
        </div>
        <div class="bid-visual">
          <div v-for="n in current.maxAnswers" :key="n" class="bid-pip"
               :style="{background: n <= bidInput ? 'var(--secondary)' : 'var(--outline)'}" />
        </div>
        <button class="btn btn-primary btn-full" style="margin-top:.9rem;background:var(--secondary)" @click="submitBid">
          Confirmer l'enchère → {{ bidInput * 10 }} pts
        </button>
      </div>
    </template>

    <!-- RÉPONSES -->
    <template v-if="phase === 'answer' && current">
      <div class="card fade-up">
        <div class="ans-recap">
          <div>
            <p class="label-sm muted">Thème</p>
            <p class="small italic" style="margin-top:.15rem">{{ current.theme }}</p>
          </div>
          <div class="ans-bid-pill">
            <span class="headline-sm" style="color:var(--secondary)">{{ userBid }}</span>
            <span class="label-sm muted">enchères</span>
          </div>
        </div>
      </div>
      <TimerBar ref="timerAns" :seconds="90" @expired="onAnswerExpired" />
      <div class="card fade-up">
        <p class="small muted" style="margin-bottom:.6rem">
          Entrez vos <strong>{{ userBid }}</strong> réponses séparées par des <strong>virgules</strong> :
        </p>
        <textarea v-model="answersText" class="inp"
                  placeholder="Réponse 1, Réponse 2, Réponse 3…"
                  style="min-height:110px" :disabled="validating" />
        <div class="ans-counter">
          <span :style="{color: ansCount >= userBid ? 'var(--tertiary)' : 'var(--on-surf-var)'}">
            {{ ansCount }} réponse{{ ansCount > 1 ? 's' : '' }}
          </span>
          <span class="muted"> · objectif {{ userBid }}</span>
        </div>
        <button class="btn btn-primary btn-full" style="margin-top:.7rem;background:var(--secondary)"
                :disabled="validating" @click="submitAnswers">
          <span v-if="validating"><span class="spinner spinner-sm" /> Gemini vérifie…</span>
          <span v-else>Soumettre les réponses →</span>
        </button>
      </div>
    </template>

    <!-- RÉSULTAT -->
    <template v-if="phase === 'result' && result">
      <!-- Bannière bilan -->
      <div class="card fade-up result-banner"
           :class="result.hasErrors ? 'card-error' : result.bidSuccess ? 'card-success' : 'card-warn'">
        <span class="result-big-icon">{{ result.hasErrors ? '❌' : result.bidSuccess ? '🏆' : '⚠️' }}</span>
        <div>
          <h2 class="title-lg">{{ result.hasErrors ? 'Réponses invalides' : result.bidSuccess ? 'Enchère réussie !' : 'Enchère non atteinte' }}</h2>
          <div class="score-display" style="font-size:1.9rem;margin:.2rem 0">+{{ result.pts }} pts</div>
          <p class="small muted">{{ result.validCount }} valides · enchère {{ result.userBid }} · max {{ result.maxAnswers }}</p>
        </div>
      </div>

      <!-- Verdict IA par réponse -->
      <div class="card fade-up" style="border-left:4px solid var(--secondary)">
        <div class="ai-header">
          <span class="ai-gem-badge">✦ Gemini</span>
          <p class="title-md">Vérification de vos réponses</p>
        </div>
        <div class="player-results">
          <div v-for="(r, i) in result.res" :key="i"
               class="player-res-row" :class="r.valid ? 'res-ok' : 'res-err'">
            <span class="res-icon">{{ r.valid ? '✅' : '❌' }}</span>
            <div class="res-content">
              <span class="res-user">{{ r.userAnswer }}</span>
              <span v-if="r.valid && r.matched && r.matched.toLowerCase() !== r.userAnswer.toLowerCase()"
                    class="res-match">→ {{ r.matched }}</span>
              <span v-if="!r.valid" class="res-invalid">Non reconnu dans la Bible</span>
            </div>
          </div>
        </div>

        <!-- Réponses vraiment hors-liste -->
        <div v-if="result.hasErrors" class="errors-block">
          <p class="label-sm t-err" style="margin-bottom:.4rem">Réponses hors liste (annulent les points) :</p>
          <div class="tags">
            <span v-for="w in result.wrongOnes" :key="w" class="chip chip-error">{{ w }}</span>
          </div>
        </div>
      </div>

      <!-- Liste complète révélée -->
      <div class="card fade-up" style="border-left:4px solid var(--secondary)">
        <div class="reveal-head">
          <p class="title-md">Liste complète</p>
          <div v-if="result.userHitMax">
            <span class="chip chip-success">🏆 Enchère max !</span>
          </div>
          <div class="reveal-max">
            <p class="xs muted">Max possible</p>
            <span class="headline-sm" style="color:var(--secondary)">{{ result.maxAnswers }}</span>
          </div>
        </div>
        <div class="answers-scroll">
          <div v-for="(a, i) in result.allAnswers" :key="i" class="ans-row">
            <span class="ans-num">{{ i+1 }}</span>
            <span class="small">{{ a }}</span>
          </div>
        </div>
      </div>

      <button class="btn btn-primary btn-full" style="background:var(--secondary)" @click="next">
        {{ qIndex+1 < questions.length ? 'Question suivante →' : 'Résultats finaux →' }}
      </button>
    </template>

    <!-- FINAL -->
    <template v-if="phase === 'final'">
      <div class="card card-secondary scale-in final-card">
        <div class="final-icon">⚖️</div>
        <h1 class="headline-md" style="color:var(--secondary)">{{ playerName }}</h1>
        <div class="score-display" style="font-size:2.8rem">{{ score }}</div>
        <p class="muted">Score final — Makanisi</p>
        <div class="divider" />
        <div class="final-hist">
          <div v-for="(h,i) in history" :key="i" class="hist-row">
            <span>{{ h.hasErrors ? '❌' : h.pts > 0 ? '✅' : '⚠️' }}</span>
            <span class="small muted italic" style="flex:1">{{ h.theme.substring(0,35) }}…</span>
            <span class="chip chip-secondary" style="font-size:.65rem">{{ h.userBid }}/{{ h.maxAnswers }}</span>
            <span class="chip chip-primary"   style="font-size:.65rem">+{{ h.pts }}</span>
          </div>
        </div>
        <button class="btn btn-primary btn-full" @click="emit('finish', score)">Retour à l'accueil</button>
      </div>
    </template>

  </div>
</template>

<style scoped>
.bid-stepper { display:flex;align-items:center;gap:1rem;justify-content:center;margin-bottom:.6rem; }
.bid-value { display:flex;flex-direction:column;align-items:center;min-width:70px; }
.bid-visual { display:flex;flex-wrap:wrap;gap:5px;justify-content:center;margin:.4rem 0; }
.bid-pip { width:14px;height:14px;border-radius:4px;transition:background .2s; }
.ans-recap { display:flex;justify-content:space-between;align-items:flex-start;gap:.8rem; }
.ans-bid-pill { display:flex;flex-direction:column;align-items:center;background:var(--secondary-c);padding:.4rem .7rem;border-radius:var(--r-md); }
.ans-counter { font-size:.82rem;color:var(--on-surf-var);margin-top:.3rem;text-align:right; }
.result-banner { display:flex;align-items:center;gap:1rem;padding:1.1rem 1.2rem; }
.result-big-icon { font-size:2.6rem;flex-shrink:0; }

/* AI verdict block */
.ai-header { display:flex;align-items:center;gap:.55rem;margin-bottom:.7rem; }
.ai-gem-badge { font-size:.62rem;font-weight:800;letter-spacing:.06em;background:#FFD8E4;color:#7D5260;padding:.12rem .45rem;border-radius:6px;white-space:nowrap; }
.player-results { display:flex;flex-direction:column;gap:.3rem; }
.player-res-row { display:flex;align-items:flex-start;gap:.5rem;padding:.4rem .55rem;border-radius:10px; }
.res-ok { background:#E8F5E9; }
.res-err { background:#FDECEA; }
.res-icon { font-size:.95rem;flex-shrink:0;margin-top:.08rem; }
.res-content { display:flex;flex-direction:column;gap:.04rem; }
.res-user { font-size:.88rem;font-weight:700;color:var(--on-surface); }
.res-match { font-size:.75rem;color:#1B6B40;font-style:italic; }
.res-invalid { font-size:.72rem;color:#B3261E;font-style:italic; }
.errors-block { margin-top:.75rem;padding-top:.6rem;border-top:1px solid var(--outline); }
.tags { display:flex;flex-wrap:wrap;gap:.4rem; }

.reveal-head { display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.7rem;flex-wrap:wrap;gap:.4rem; }
.reveal-max { text-align:center; }
.answers-scroll { display:flex;flex-direction:column;gap:.3rem;max-height:240px;overflow-y:auto; }
.ans-row { display:flex;gap:.7rem;align-items:center;padding:.35rem .55rem;background:var(--surface1);border-radius:var(--r-sm); }
.ans-num { font-family:var(--f-head);font-size:.7rem;color:var(--secondary);font-weight:700;min-width:18px; }
.final-card { display:flex;flex-direction:column;align-items:center;gap:.8rem;text-align:center;padding:1.8rem 1.2rem; }
.final-icon { font-size:3rem; }
.final-hist { width:100%;display:flex;flex-direction:column;gap:.3rem; }
.hist-row { display:flex;align-items:center;gap:.4rem;padding:.3rem 0;border-bottom:1px solid var(--outline); }
</style>