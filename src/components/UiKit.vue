<script setup>
// Shared UI primitives — imported by views
</script>

<template>
  <!-- nothing — this file just holds the styles below -->
</template>

<style>
/* ════════════════════════════════════════
   UI KIT — Buttons, Cards, Inputs, Badges
   ════════════════════════════════════════ */

/* ── Buttons ── */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: .5rem;
  padding: .7rem 1.4rem;
  border: none; border-radius: var(--r-sm);
  font-family: var(--font-body); font-size: 1rem; font-weight: 600;
  cursor: pointer; transition: all .2s ease;
  letter-spacing: .02em;
}
.btn:disabled { opacity: .4; cursor: not-allowed; transform: none !important; filter: none !important; }
.btn-full { width: 100%; }
.btn-sm   { padding: .35rem .8rem; font-size: .88rem; }

.btn-gold {
  background: linear-gradient(135deg, var(--gold-dim), var(--gold));
  color: var(--bg);
  box-shadow: 0 0 18px rgba(201,168,76,.25);
}
.btn-gold:not(:disabled):hover { filter: brightness(1.12); transform: translateY(-1px); }

.btn-accent {
  background: linear-gradient(135deg, var(--accent-dim), var(--accent));
  color: #fff;
  box-shadow: 0 0 18px rgba(74,144,217,.2);
}
.btn-accent:not(:disabled):hover { filter: brightness(1.12); transform: translateY(-1px); }

.btn-ghost {
  background: transparent; color: var(--text2);
  border: 1px solid var(--border);
}
.btn-ghost:not(:disabled):hover { border-color: var(--gold-dim); color: var(--gold); }

.btn-danger {
  background: linear-gradient(135deg, #5a0f0f, var(--crimson));
  color: #fff;
}

/* ── Cards ── */
.card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--r); padding: 1.15rem;
  box-shadow: var(--shadow);
}
.card-gold { border-color: var(--gold-dim); box-shadow: var(--shadow), inset 0 1px 0 rgba(201,168,76,.08); }
.card-accent { border-color: var(--accent-dim); }
.card-ok   { border-color: var(--ok)  !important; }
.card-warn { border-color: var(--warn) !important; }
.card-err  { border-color: var(--err)  !important; }

/* ── Inputs ── */
.inp {
  width: 100%; background: var(--bg2); border: 1px solid var(--border);
  border-radius: var(--r-sm); color: var(--text);
  font-family: var(--font-body); font-size: 1rem;
  padding: .65rem .95rem; outline: none;
  transition: border-color .2s;
}
.inp:focus { border-color: var(--gold-dim); box-shadow: 0 0 0 2px rgba(201,168,76,.1); }
.inp::placeholder { color: var(--text3); }
.inp:disabled { opacity: .5; cursor: not-allowed; }
textarea.inp { resize: vertical; min-height: 90px; }
.inp-ok   { border-color: var(--ok)  !important; }
.inp-err  { border-color: var(--err)  !important; }

/* ── Badges ── */
.badge {
  display: inline-flex; align-items: center;
  padding: .18rem .55rem; border-radius: 20px;
  font-size: .75rem; font-family: var(--font-mono); font-weight: 600;
}
.badge-gold   { background: rgba(201,168,76,.12); color: var(--gold);   border: 1px solid var(--gold-dim); }
.badge-accent { background: rgba(74,144,217,.12);  color: var(--accent2);border: 1px solid var(--accent-dim); }
.badge-ok     { background: rgba(46,204,113,.12);  color: var(--ok);    border: 1px solid var(--ok); }
.badge-warn   { background: rgba(243,156,18,.12);  color: var(--warn);  border: 1px solid var(--warn); }
.badge-err    { background: rgba(231,76,60,.12);   color: var(--err);   border: 1px solid var(--err); }

/* ── Progress bar ── */
.prog { width: 100%; height: 4px; background: var(--bg3,#111); border-radius: 2px; overflow: hidden; }
.prog-fill { height: 100%; border-radius: 2px; transition: width .4s ease; background: linear-gradient(90deg, var(--gold-dim), var(--gold)); }

/* ── Divider ── */
.divider { width: 100%; height: 1px; background: linear-gradient(90deg, transparent, var(--gold-dim), transparent); margin: .85rem 0; }

/* ── Ornament ── */
.ornament { text-align: center; color: var(--gold-dim); letter-spacing: .6em; font-size: 1rem; }

/* ── Spinner ── */
.spinner {
  width: 34px; height: 34px; border: 3px solid var(--border);
  border-top-color: var(--gold); border-radius: 50%;
  animation: spin .8s linear infinite; margin: 0 auto;
}

/* ── Score display ── */
.score-num {
  font-family: var(--font-mono); font-size: 1.45rem;
  color: var(--gold); text-shadow: 0 0 18px rgba(201,168,76,.35);
}

/* ── Layout ── */
.game-wrap {
  display: flex; flex-direction: column;
  min-height: 100dvh; padding: 1rem;
  gap: .85rem; max-width: 620px; margin: 0 auto;
}
.game-topbar {
  display: flex; align-items: center; justify-content: space-between;
}

/* ── Util ── */
.muted   { color: var(--text3); }
.dim     { color: var(--text2); }
.t-gold  { color: var(--gold);  }
.t-ok    { color: var(--ok);    }
.t-err   { color: var(--err);   }
.t-warn  { color: var(--warn);  }
.mono    { font-family: var(--font-mono); }
.italic  { font-style: italic; }
.small   { font-size: .85rem; }
.center  { text-align: center; }
</style>