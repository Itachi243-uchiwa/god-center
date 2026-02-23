<script setup>
import { ref, reactive, computed, nextTick } from 'vue'
import { useGameStore } from '@/stores/game'
import { validateChokmahCell } from '@/services/ai'
import { grids as allGrids, CATEGORIES } from '@/data/chokmah'
import TimerBar from '@/components/TimerBar.vue'

const props = defineProps({ playerName: String })
const emit  = defineEmits(['finish'])
const store = useGameStore()

const POINTS = 50

const selectedGrids = ref([...allGrids].sort(() => Math.random() - 0.5).slice(0, 8))
const gIndex        = ref(0)
const phase         = ref('play')
const score         = ref(0)
const history       = ref([])
const timerRef      = ref(null)
const timerExpired  = ref(false)

// Explication IA affichée sous le tableau
const aiPanel = ref(null) // { cat, valid, explanation, correction, value }

const cells = reactive(
    Object.fromEntries(CATEGORIES.map(c => [c, {
      value: '', phase: 'idle', explanation: '', correction: ''
    }]))
)
const activeCell = ref(null)

const grid         = computed(() => selectedGrids.value[gIndex.value])
const letter       = computed(() => grid.value?.letter ?? 'A')
const progress     = computed(() => (gIndex.value / selectedGrids.value.length) * 100)
const allValidated = computed(() => CATEGORIES.every(c => ['correct','wrong','empty'].includes(cells[c].phase)))
const correctCount = computed(() => CATEGORIES.filter(c => cells[c].phase === 'correct').length)

function openCell(cat) {
  const st = cells[cat].phase
  // Cellule déjà validée → afficher son explication
  if (['correct','wrong','empty'].includes(st)) { showPanel(cat); return }
  if (st === 'validating') return
  aiPanel.value  = null
  activeCell.value = cat
  cells[cat].phase = 'editing'
  nextTick(() => document.getElementById(`inp-${cat.replace(/\s+/g,'-')}`)?.focus())
}

function closeCell(cat) {
  if (cells[cat].phase === 'editing') cells[cat].phase = 'idle'
  if (activeCell.value === cat) activeCell.value = null
}

function showPanel(cat) {
  aiPanel.value = {
    cat,
    valid:       cells[cat].phase === 'correct',
    explanation: cells[cat].explanation,
    correction:  cells[cat].correction,
    value:       cells[cat].value
  }
}

async function validateCell(cat) {
  const val      = cells[cat].value.trim()
  const catDef   = grid.value.categories[cat]
  const expected = catDef?.expected ?? []

  cells[cat].phase = 'validating'
  activeCell.value = null
  aiPanel.value    = null

  if (!val) {
    cells[cat].phase       = 'empty'
    cells[cat].correction  = expected[0] ?? ''
    cells[cat].explanation = 'Case non remplie.'
    showPanel(cat); return
  }
  if (!val.toUpperCase().startsWith(letter.value.toUpperCase())) {
    cells[cat].phase       = 'wrong'
    cells[cat].correction  = expected[0] ?? ''
    cells[cat].explanation = `La réponse doit commencer par la lettre « ${letter.value} ».`
    showPanel(cat); return
  }

  const res = await validateChokmahCell(letter.value, cat, val, catDef?.q ?? '', expected)
  cells[cat].phase       = res.valid ? 'correct' : 'wrong'
  cells[cat].correction  = res.correction || expected[0] || ''
  cells[cat].explanation = res.explanation ?? ''
  if (res.valid) score.value += POINTS
  showPanel(cat)
}

async function onTimerExpired() {
  timerExpired.value = true
  activeCell.value   = null
  for (const cat of CATEGORIES) {
    if (!['correct','wrong','empty'].includes(cells[cat].phase)) {
      await validateCell(cat)
    }
  }
}

function nextGrid() {
  history.value.push({ letter: letter.value, correct: correctCount.value, expired: timerExpired.value })
  if (gIndex.value + 1 < selectedGrids.value.length) {
    gIndex.value++
    CATEGORIES.forEach(c => { cells[c].value = ''; cells[c].phase = 'idle'; cells[c].explanation = ''; cells[c].correction = '' })
    activeCell.value   = null
    timerExpired.value = false
    aiPanel.value      = null
    timerRef.value?.reset()
  } else {
    phase.value = 'final'
  }
}

const CAT_COLORS = {
  'Prénoms bibliques':             { bg: '#EDE8F5', col: '#7965AF', border: '#C4B8F0', light: '#F5F2FF' },
  'Lieux et endroits symboliques': { bg: '#C8F5F5', col: '#006A6B', border: '#7CD4D5', light: '#F0FAFA' },
  'Livres de la Bible':            { bg: '#FFD8E4', col: '#7D5260', border: '#F0B4C8', light: '#FFF0F5' }
}
const CAT_ICONS = {
  'Prénoms bibliques':             '👤',
  'Lieux et endroits symboliques': '📍',
  'Livres de la Bible':            '📖'
}
const CAT_SHORT = {
  'Prénoms bibliques':             'Prénoms',
  'Lieux et endroits symboliques': 'Lieux',
  'Livres de la Bible':            'Livres'
}
</script>

<template>
  <div class="page safe-bottom chok-page">

    <div class="topbar">
      <button class="btn btn-text btn-sm" @click="store.goHome()">← Quitter</button>
      <div class="chok-chip">🎯 Chokmah</div>
      <div class="chok-score">{{ score }}</div>
    </div>

    <template v-if="phase === 'play'">
      <div class="prog-wrap"><div class="prog-fill" :style="{width: progress + '%'}" /></div>
      <div class="grid-meta">
        <span class="grid-counter">Grille {{ gIndex + 1 }} <span class="muted">/ {{ selectedGrids.length }}</span></span>
        <span v-if="timerExpired" class="time-warn">⏰ Temps écoulé…</span>
      </div>

      <div class="letter-header">
        <div class="letter-circle">{{ letter }}</div>
        <div class="letter-info">
          <p class="letter-title">Lettre « {{ letter }} »</p>
          <p class="letter-hint">Chaque réponse doit commencer par cette lettre</p>
          <div style="margin-top:.5rem">
            <TimerBar ref="timerRef" :seconds="grid.timerSeconds ?? 90" @expired="onTimerExpired" />
          </div>
        </div>
      </div>

      <!-- Grille -->
      <div class="grid-table">
        <div class="table-head">
          <div class="th-letter">{{ letter }}</div>
          <div v-for="cat in CATEGORIES" :key="cat" class="th-cat"
               :style="{background: CAT_COLORS[cat].bg, color: CAT_COLORS[cat].col}">
            <span class="th-icon">{{ CAT_ICONS[cat] }}</span>
            <span class="th-name">{{ CAT_SHORT[cat] }}</span>
          </div>
        </div>

        <div class="table-row">
          <div class="td-label"><span class="row-lbl">Réponse</span></div>

          <div v-for="cat in CATEGORIES" :key="cat"
               class="td-cell"
               :class="{
                 'state-idle':       cells[cat].phase==='idle',
                 'state-editing':    cells[cat].phase==='editing',
                 'state-validating': cells[cat].phase==='validating',
                 'state-correct':    cells[cat].phase==='correct',
                 'state-wrong':      cells[cat].phase==='wrong',
                 'state-empty':      cells[cat].phase==='empty'
               }"
               :style="['idle','editing'].includes(cells[cat].phase) ? {borderColor: CAT_COLORS[cat].border} : {}"
               @click="openCell(cat)"
          >
            <template v-if="cells[cat].phase==='idle'">
              <span class="cell-ph">
                <span class="ph-letter" :style="{color: CAT_COLORS[cat].col}">{{ letter }}</span>
                <span class="ph-dots">…</span>
              </span>
              <span class="cell-edit-hint">✏️</span>
            </template>

            <template v-else-if="cells[cat].phase==='editing'">
              <div class="cell-inp-wrap">
                <input :id="`inp-${cat.replace(/\s+/g,'-')}`"
                       v-model="cells[cat].value" class="cell-inp"
                       :placeholder="`${letter}…`" :style="{borderColor: CAT_COLORS[cat].col}"
                       @keyup.enter="validateCell(cat)" @keyup.escape="closeCell(cat)" @blur="closeCell(cat)" />
                <button class="cell-ok-btn" :style="{background: CAT_COLORS[cat].col}"
                        @mousedown.prevent="validateCell(cat)">✓</button>
              </div>
            </template>

            <template v-else-if="cells[cat].phase==='validating'">
              <div class="cell-loading">
                <span class="spinner spinner-sm" :style="{borderTopColor: CAT_COLORS[cat].col}" />
                <span class="cell-ai-lbl">IA…</span>
              </div>
            </template>

            <template v-else-if="cells[cat].phase==='correct'">
              <div class="cell-result">
                <span class="cell-res-icon">✅</span>
                <span class="cell-res-val ok">{{ cells[cat].value }}</span>
              </div>
            </template>

            <template v-else-if="cells[cat].phase==='wrong'">
              <div class="cell-result">
                <span class="cell-res-icon">❌</span>
                <span class="cell-res-val err">{{ cells[cat].value || '—' }}</span>
                <span v-if="cells[cat].correction" class="cell-correction">→ {{ cells[cat].correction }}</span>
              </div>
            </template>

            <template v-else-if="cells[cat].phase==='empty'">
              <div class="cell-result">
                <span class="cell-res-icon">⬜</span>
                <span class="cell-res-val muted" style="font-size:.6rem;font-style:italic">vide</span>
                <span v-if="cells[cat].correction" class="cell-correction">→ {{ cells[cat].correction }}</span>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- Panel IA (explication) ou hint (question) -->
      <Transition name="panel">
        <!-- Explication IA après validation d'une cellule -->
        <div v-if="aiPanel" :key="'ai-' + aiPanel.cat"
             class="ai-panel" :class="aiPanel.valid ? 'ai-ok' : 'ai-err'">
          <div class="ai-panel-top">
            <span class="ai-panel-icon">{{ aiPanel.valid ? '✅' : '❌' }}</span>
            <div>
              <p class="ai-panel-cat" :style="{color: CAT_COLORS[aiPanel.cat].col}">
                {{ CAT_ICONS[aiPanel.cat] }} {{ aiPanel.cat }}
              </p>
              <p class="ai-panel-verdict">{{ aiPanel.valid ? 'Correct !' : 'Incorrect' }}</p>
            </div>
          </div>
          <p class="ai-panel-text">{{ aiPanel.explanation }}</p>
          <p v-if="!aiPanel.valid && aiPanel.correction" class="ai-panel-corr">
            Réponse attendue : <strong>{{ aiPanel.correction }}</strong>
          </p>
        </div>

        <!-- Hint de la question active -->
        <div v-else-if="activeCell && grid.categories[activeCell]" :key="'hint-' + activeCell"
             class="hint-panel"
             :style="{borderLeftColor: CAT_COLORS[activeCell].col, background: CAT_COLORS[activeCell].light}">
          <p class="hint-cat" :style="{color: CAT_COLORS[activeCell].col}">{{ CAT_ICONS[activeCell] }} {{ activeCell }}</p>
          <p class="hint-q">{{ grid.categories[activeCell].q }}</p>
          <p class="hint-tip">💡 {{ grid.categories[activeCell].hint }}</p>
        </div>
      </Transition>

      <!-- Récap de grille -->
      <div v-if="allValidated" class="recap-card scale-in">
        <div class="recap-top">
          <div class="recap-score-wrap">
            <span class="recap-score">{{ correctCount }}</span>
            <span class="recap-of">/ {{ CATEGORIES.length }} correctes</span>
          </div>
          <div class="recap-pts">+{{ correctCount * POINTS }} pts</div>
        </div>
        <div class="recap-cells">
          <div v-for="cat in CATEGORIES" :key="cat" class="recap-cell" :style="{background: CAT_COLORS[cat].bg}">
            <span>{{ cells[cat].phase==='correct' ? '✅' : cells[cat].phase==='empty' ? '⬜' : '❌' }}</span>
            <span class="recap-lbl" :style="{color: CAT_COLORS[cat].col}">{{ CAT_SHORT[cat] }}</span>
          </div>
        </div>
        <button class="btn-next" @click="nextGrid">
          {{ gIndex+1 < selectedGrids.length ? 'Grille suivante →' : 'Voir les résultats →' }}
        </button>
      </div>
    </template>

    <!-- Final -->
    <template v-if="phase === 'final'">
      <div class="final-card scale-in">
        <div class="final-icon">🎯</div>
        <h1 class="final-name">{{ playerName }}</h1>
        <div class="final-score">{{ score }}</div>
        <p class="final-sub">Score final — Chokmah</p>
        <div class="final-divider" />
        <div class="final-rows">
          <div v-for="(h,i) in history" :key="i" class="final-row">
            <div class="final-letter-badge">{{ h.letter }}</div>
            <div class="final-pips">
              <div v-for="n in CATEGORIES.length" :key="n" class="pip"
                   :style="{background: n<=h.correct ? '#7965AF' : '#E0E0E0'}" />
            </div>
            <span class="final-tag correct-tag">{{ h.correct }}/{{ CATEGORIES.length }}</span>
            <span class="final-tag pts-tag">+{{ h.correct*POINTS }}</span>
            <span v-if="h.expired" class="final-tag warn-tag">⏰</span>
          </div>
        </div>
        <button class="btn-next" @click="emit('finish', score)">Retour à l'accueil</button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.chok-page { background: linear-gradient(160deg,#F0EDFF 0%,#FFFBFE 50%,#FFF0F8 100%); }
.chok-chip { font-size:.78rem;font-weight:700;padding:.3rem .8rem;border-radius:20px;background:#EDE8F5;color:#7965AF;border:1.5px solid #C4B8F0; }
.chok-score { font-family:var(--f-head);font-size:1.2rem;font-weight:900;color:#7965AF;min-width:40px;text-align:right; }
.prog-wrap { height:5px;background:#E0DAFA;border-radius:99px;overflow:hidden; }
.prog-fill { height:100%;background:linear-gradient(90deg,#7965AF,#9C89CC);border-radius:99px;transition:width .4s; }
.grid-meta { display:flex;justify-content:space-between;align-items:center;margin-top:.2rem; }
.grid-counter { font-size:.8rem;font-weight:700;color:#7965AF; }
.time-warn { font-size:.75rem;color:#E65100;font-weight:700; }

.letter-header { display:flex;align-items:flex-start;gap:1rem;background:white;border-radius:20px;padding:1rem 1.1rem;box-shadow:0 2px 14px rgba(121,101,175,.1);border:1.5px solid #E0DAFA; }
.letter-circle { width:60px;height:60px;border-radius:18px;flex-shrink:0;background:linear-gradient(135deg,#7965AF,#9C89CC);color:white;font-family:var(--f-head);font-size:2rem;font-weight:900;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(121,101,175,.3); }
.letter-info { flex:1;min-width:0; }
.letter-title { font-family:var(--f-head);font-size:1rem;font-weight:800;color:#7965AF; }
.letter-hint { font-size:.78rem;color:var(--on-surf-var);margin-top:.15rem; }

.grid-table { background:white;border-radius:20px;box-shadow:0 2px 14px rgba(121,101,175,.1);border:1.5px solid #E0DAFA;overflow:hidden; }
.table-head { display:grid;grid-template-columns:50px repeat(3,1fr);border-bottom:2px solid #E0DAFA; }
.th-letter { display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#7965AF,#9C89CC);color:white;font-family:var(--f-head);font-size:1.2rem;font-weight:900; }
.th-cat { display:flex;flex-direction:column;align-items:center;justify-content:center;padding:.45rem .2rem;gap:.1rem;border-left:1px solid rgba(0,0,0,.06);text-align:center; }
.th-icon { font-size:.9rem; }
.th-name { font-size:.5rem;font-weight:700;letter-spacing:.02em;line-height:1.2; }
.table-row { display:grid;grid-template-columns:50px repeat(3,1fr);min-height:90px; }
.td-label { display:flex;align-items:center;justify-content:center;padding:.4rem .2rem;background:#F8F6FF;border-right:2px solid #E0DAFA; }
.row-lbl { font-size:.52rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#9C89CC;writing-mode:vertical-rl;transform:rotate(180deg); }
.td-cell { border-left:1px solid #E0DAFA;padding:.3rem .25rem;display:flex;align-items:center;justify-content:center;position:relative;cursor:pointer;min-height:90px;transition:background .15s; }
.state-idle { background:white; } .state-idle:hover { background:#FAF8FF; }
.state-editing { background:white;cursor:text;box-shadow:inset 0 0 0 2.5px #7965AF;z-index:2; }
.state-validating { background:#FAF8FF;cursor:default; }
.state-correct { background:#E8F5E9;cursor:pointer; }
.state-wrong { background:#FDECEA;cursor:pointer; }
.state-empty { background:#F5F5F5;cursor:pointer; }

.cell-ph { display:flex;align-items:center;gap:.1rem; }
.ph-letter { font-family:var(--f-head);font-size:1.2rem;font-weight:800;opacity:.3; }
.ph-dots { font-size:.8rem;color:var(--on-surf-var);opacity:.4; }
.cell-edit-hint { position:absolute;top:3px;right:4px;font-size:.6rem;opacity:.3; }
.cell-inp-wrap { display:flex;flex-direction:column;gap:.25rem;width:100%; }
.cell-inp { width:100%;border:2px solid;border-radius:8px;padding:.28rem .3rem;font-family:var(--f-body);font-size:.82rem;background:white;color:var(--on-surface);outline:none; }
.cell-ok-btn { padding:.25rem;border:none;border-radius:8px;color:white;font-size:.82rem;font-weight:800;cursor:pointer;width:100%; }
.cell-loading { display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.2rem;width:100%; }
.cell-ai-lbl { font-size:.55rem;color:var(--on-surf-var);font-weight:600; }
.cell-result { display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.12rem;text-align:center;width:100%;padding:.15rem; }
.cell-res-icon { font-size:1rem; }
.cell-res-val { font-family:var(--f-head);font-size:.68rem;font-weight:700;line-height:1.2;word-break:break-word; }
.cell-res-val.ok { color:#1B6B40; }
.cell-res-val.err { color:#B3261E; }
.cell-correction { font-size:.55rem;color:#7965AF;font-style:italic;line-height:1.2;word-break:break-word; }

/* Hint panel (question en cours) */
.hint-panel { border-left:4px solid;border-radius:16px;padding:.9rem 1rem;box-shadow:0 2px 10px rgba(0,0,0,.05); }
.hint-cat { font-size:.72rem;font-weight:800;letter-spacing:.06em;margin-bottom:.4rem; }
.hint-q { font-size:.92rem;line-height:1.6;color:var(--on-surface); }
.hint-tip { font-size:.75rem;color:var(--on-surf-var);font-style:italic;margin-top:.25rem; }

/* AI panel (explication après validation) */
.ai-panel { border-radius:16px;padding:.9rem 1rem;box-shadow:0 2px 10px rgba(0,0,0,.07); }
.ai-ok { background:#E8F5E9;border:1.5px solid #82D9A8; }
.ai-err { background:#FDECEA;border:1.5px solid #F0A8A4; }
.ai-panel-top { display:flex;align-items:center;gap:.65rem;margin-bottom:.5rem; }
.ai-panel-icon { font-size:1.5rem;flex-shrink:0; }
.ai-panel-cat { font-size:.68rem;font-weight:800;letter-spacing:.05em; }
.ai-panel-verdict { font-family:var(--f-head);font-size:.95rem;font-weight:800;color:var(--on-surface); }
.ai-panel-text { font-size:.85rem;line-height:1.55;color:var(--on-surface); }
.ai-panel-corr { margin-top:.4rem;font-size:.8rem;color:#7965AF;font-style:italic; }

/* Transitions panels */
.panel-enter-active,.panel-leave-active { transition:opacity .22s,transform .22s; }
.panel-enter-from,.panel-leave-to { opacity:0;transform:translateY(-5px); }

/* Récap grille */
.recap-card { background:white;border-radius:20px;padding:1rem 1.1rem;box-shadow:0 4px 20px rgba(121,101,175,.12);border:1.5px solid #E0DAFA; }
.recap-top { display:flex;justify-content:space-between;align-items:center;margin-bottom:.8rem; }
.recap-score-wrap { display:flex;align-items:baseline;gap:.3rem; }
.recap-score { font-family:var(--f-head);font-size:2rem;font-weight:900;color:#7965AF; }
.recap-of { font-size:.85rem;color:var(--on-surf-var); }
.recap-pts { font-family:var(--f-head);font-size:1rem;font-weight:800;padding:.3rem .7rem;border-radius:20px;background:#EDE8F5;color:#7965AF; }
.recap-cells { display:grid;grid-template-columns:repeat(3,1fr);gap:.4rem;margin-bottom:1rem; }
.recap-cell { display:flex;flex-direction:column;align-items:center;gap:.2rem;padding:.5rem .3rem;border-radius:12px;font-size:.9rem; }
.recap-lbl { font-size:.6rem;font-weight:700;text-align:center; }

.btn-next { width:100%;padding:.9rem;border:none;border-radius:14px;background:linear-gradient(135deg,#7965AF,#9C89CC);color:white;font-family:var(--f-head);font-size:1rem;font-weight:800;cursor:pointer;transition:filter .15s,transform .15s;box-shadow:0 4px 14px rgba(121,101,175,.3); }
.btn-next:hover { filter:brightness(1.08);transform:translateY(-1px); }

/* Final */
.final-card { background:white;border-radius:24px;padding:2rem 1.5rem;display:flex;flex-direction:column;align-items:center;gap:.8rem;text-align:center;box-shadow:0 8px 32px rgba(121,101,175,.15);border:2px solid #E0DAFA; }
.final-icon { font-size:3rem; }
.final-name { font-family:var(--f-head);font-size:1.6rem;font-weight:900;color:#7965AF; }
.final-score { font-family:var(--f-head);font-size:3rem;font-weight:900;color:var(--on-surface); }
.final-sub { font-size:.9rem;color:var(--on-surf-var); }
.final-divider { width:100%;height:1px;background:#E0DAFA; }
.final-rows { width:100%;display:flex;flex-direction:column;gap:.4rem; }
.final-row { display:flex;align-items:center;gap:.45rem;padding:.35rem 0;border-bottom:1px solid #F0EDFF; }
.final-letter-badge { width:30px;height:30px;border-radius:10px;background:linear-gradient(135deg,#7965AF,#9C89CC);color:white;font-family:var(--f-head);font-size:.9rem;font-weight:900;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
.final-pips { display:flex;gap:3px;flex:1; }
.pip { width:14px;height:14px;border-radius:5px; }
.final-tag { font-size:.68rem;font-weight:700;padding:.15rem .45rem;border-radius:20px; }
.correct-tag { background:#EDE8F5;color:#7965AF; }
.pts-tag { background:#E8F5E9;color:#1B6B40; }
.warn-tag { background:#FFF3E0;color:#E65100; }
</style>