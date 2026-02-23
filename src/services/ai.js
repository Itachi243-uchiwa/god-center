/**
 * Service IA — Gemini API
 *
 * CORRECTIONS :
 * - Extraction JSON ultra-robuste (gère ```json ... ```, texte parasite, etc.)
 * - Prompts orientés tolérance : accepte fautes d'ortho, variantes, translittérations
 * - Refuse UNIQUEMENT les réponses bibliquement fausses ou inventées
 * - Basé EXCLUSIVEMENT sur la Bible (AT + NT)
 * - Retourne TOUJOURS une explication lisible
 */

const MODEL    = 'gemini-2.0-flash'
const API_KEY  = import.meta.env.VITE_GEMINI_KEY ?? ''
const BASE_URL = 'https://generativelanguage.googleapis.com'

/** Extrait le premier objet JSON valide d'une chaîne quelconque */
function extractJSON(raw) {
    if (!raw) return null
    // Retire les blocs markdown ```json ... ``` ou ``` ... ```
    const stripped = raw.replace(/```[\s\S]*?```/g, s => {
        // Garde le contenu brut sans les backticks
        return s.replace(/^```(?:json)?/, '').replace(/```$/, '')
    })
    // Cherche le premier {...} (y compris imbriqué)
    const start = stripped.indexOf('{')
    if (start === -1) return null
    let depth = 0
    for (let i = start; i < stripped.length; i++) {
        if (stripped[i] === '{') depth++
        else if (stripped[i] === '}') { depth--; if (depth === 0) return stripped.slice(start, i + 1) }
    }
    return null
}

async function callGemini(prompt) {
    const url = `${BASE_URL}/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.1, maxOutputTokens: 600 }
        })
    })
    if (!res.ok) throw new Error(`Gemini HTTP ${res.status}`)
    const json = await res.json()
    const raw  = json.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
    const extracted = extractJSON(raw)
    if (!extracted) throw new Error('Aucun JSON trouvé dans la réponse Gemini')
    return JSON.parse(extracted)
}

/* ── Fallback offline (sans clé API) ─────────────────────────────── */
function normStr(s) {
    return (s ?? '').toLowerCase().normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '').replace(/[-_'\s().]/g, '').trim()
}
function offlineMatch(candidates, input) {
    const ni = normStr(input)
    return candidates.find(c => normStr(c) === ni) ?? null
}

/* ── Instructions communes de tolérance ──────────────────────────── */
const TOLERANCE = `
RÈGLES ABSOLUES (à respecter impérativement) :
1. Basé UNIQUEMENT sur la Bible (Ancien Testament + Nouveau Testament). Aucune autre source.
2. Sois TRÈS TOLÉRANT sur la forme :
   - ACCEPTE les fautes d'orthographe mineures (ex : "Jozué" → Josué, "Ezechiel" → Ézéchiel)
   - ACCEPTE toutes les variantes de translittération (ex : "Joshua" = "Josué", "Elijah" = "Élie", "Esaie" = "Ésaïe")
   - ACCEPTE les accents manquants ou erronés (ex : "Gedeon" = "Gédéon")
   - ACCEPTE les noms partiels clairement identifiables (ex : "Jean Baptiste" = "Jean-Baptiste")
   - ACCEPTE si le sens biblique est correct, même formulé différemment
3. NE REFUSE que si la réponse est :
   - Bibliquement fausse (information réellement incorrecte selon la Bible)
   - Totalement inventée, hors contexte biblique, ou appartenant à un autre texte religieux`

/* ── 1. Réponse unique — Esprit Éveillé ──────────────────────────── */
export async function validateAnswer(question, correctAnswers, userAnswer) {
    if (!userAnswer?.trim()) return { valid: false, explanation: 'Réponse vide.' }

    if (!API_KEY) {
        const m = offlineMatch(correctAnswers, userAnswer)
        return m
            ? { valid: true, matched: m, explanation: 'Correct !' }
            : { valid: false, matched: null, explanation: 'Réponse incorrecte.' }
    }

    try {
        const result = await callGemini(
            `Tu es un juge bienveillant d'une compétition biblique francophone.
${TOLERANCE}

Question posée : "${question}"
Réponses de référence : ${JSON.stringify(correctAnswers)}
Réponse du joueur : "${userAnswer}"

Évalue si la réponse du joueur correspond (même approximativement) à l'une des réponses de référence.

Réponds avec EXACTEMENT ce JSON et RIEN d'autre (pas de texte avant, pas de texte après, pas de markdown) :
{"valid":true_ou_false,"matched":"réponse de référence la plus proche ou null","explanation":"Une phrase en français expliquant pourquoi c'est accepté ou refusé."}`)

        return result
    } catch {
        return { valid: false, matched: null, explanation: 'Erreur de validation.' }
    }
}

/* ── 2. Liste de réponses — Makanisi ─────────────────────────────── */
export async function validateAnswerList(question, correctAnswers, userAnswers) {
    if (!userAnswers.length) return { results: [], wrongAnswers: [] }

    if (!API_KEY) {
        const used = new Set()
        const results = userAnswers.map(ua => {
            const m = offlineMatch(correctAnswers.filter(c => !used.has(c)), ua)
            if (m) { used.add(m); return { userAnswer: ua, matched: m, valid: true } }
            return { userAnswer: ua, matched: null, valid: false }
        })
        return { results, wrongAnswers: results.filter(r => !r.valid).map(r => r.userAnswer) }
    }

    try {
        const result = await callGemini(
            `Tu es un juge bienveillant d'une compétition biblique francophone.
${TOLERANCE}

Thème de la question : "${question}"
Liste complète des bonnes réponses : ${JSON.stringify(correctAnswers)}
Réponses soumises par le joueur : ${JSON.stringify(userAnswers)}

Pour chaque réponse du joueur, cherche la meilleure correspondance dans les bonnes réponses (tolérant sur l'orthographe et les variantes).
Une bonne réponse ne peut correspondre qu'à une seule réponse du joueur.
"wrongAnswers" = uniquement les réponses du joueur qui sont bibliquement FAUSSES ou totalement inventées. Une réponse mal orthographiée mais bibliquement correcte N'EST PAS dans wrongAnswers.

Réponds avec EXACTEMENT ce JSON et RIEN d'autre (pas de texte avant, pas de texte après, pas de markdown) :
{"results":[{"userAnswer":"réponse du joueur","matched":"bonne réponse correspondante ou null","valid":true_ou_false}],"wrongAnswers":["réponses vraiment fausses"]}`)

        return { results: result.results ?? [], wrongAnswers: result.wrongAnswers ?? [] }
    } catch {
        return {
            results: userAnswers.map(ua => ({ userAnswer: ua, matched: null, valid: false })),
            wrongAnswers: []
        }
    }
}

/* ── 3. Cellule Chokmah ───────────────────────────────────────────── */
export async function validateChokmahCell(letter, category, userAnswer, question, expected = []) {
    const val = userAnswer.trim()

    if (!val.toUpperCase().startsWith(letter.toUpperCase()))
        return {
            valid: false,
            correction: expected[0] ?? '',
            explanation: `La réponse doit commencer par la lettre « ${letter} ».`
        }

    if (!API_KEY) {
        const m = offlineMatch(expected, val)
        return m
            ? { valid: true, correction: null, explanation: 'Correct !' }
            : { valid: false, correction: expected[0] ?? '', explanation: `Attendu par exemple : ${expected.slice(0, 2).join(' ou ')}` }
    }

    try {
        const result = await callGemini(
            `Tu es un juge bienveillant d'une compétition biblique francophone.
${TOLERANCE}

Catégorie : "${category}" | Lettre imposée : "${letter}"
Question : "${question}"
Réponses de référence possibles : ${JSON.stringify(expected)}
Réponse du joueur : "${val}"

La réponse doit : (1) commencer par "${letter}" ET (2) être bibliquement correcte pour cette catégorie.
Applique toutes les règles de tolérance : accepte variantes, translittérations et petites fautes d'orthographe.

Réponds avec EXACTEMENT ce JSON et RIEN d'autre (pas de texte avant, pas de texte après, pas de markdown) :
{"valid":true_ou_false,"correction":"une réponse correcte de référence si faux, sinon null","explanation":"Une phrase en français expliquant clairement pourquoi c'est accepté ou refusé."}`)

        return result
    } catch {
        return { valid: false, correction: expected[0] ?? '', explanation: 'Erreur de validation.' }
    }
}