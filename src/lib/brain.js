// Local answer engine. Scores the question against the knowledge base so the
// assistant works with no API key, no network and no cost.

import { fallback, greeting, knowledge } from '../data/knowledge'

const STOP = new Set([
  'a','an','the','is','are','was','were','be','been','am','do','does','did','can','could','would','should',
  'what','who','how','when','where','why','which','tell','me','about','your','you','his','him','he','she',
  'i','of','in','on','at','to','for','with','and','or','if','it','its','that','this','these','those','as',
  'any','some','there','their','they','we','us','my','mine','ok','okay','please','just','so','much','many',
  'has','have','had','will','shall','may','might','get','got','know','like','want','give','say','thing',
])

const normalize = (s) =>
  s.toLowerCase().replace(/[^a-z0-9\s.+-]/g, ' ').replace(/\s+/g, ' ').trim()

// Crude stemming: drop a trailing plural s so "stores" matches "store".
const stem = (w) => (w.length > 3 && w.endsWith('s') && !w.endsWith('ss') ? w.slice(0, -1) : w)

const tokenize = (s) =>
  normalize(s)
    .split(' ')
    .filter((w) => w && !STOP.has(w))
    .map(stem)

/**
 * How much each word is worth. A word used by one entry ("wordpress") identifies
 * that entry; a word spread across many ("shopify") barely narrows anything.
 */
const weights = (() => {
  const df = new Map()
  for (const entry of knowledge) {
    const seen = new Set(entry.keys.flatMap(tokenize))
    for (const t of seen) df.set(t, (df.get(t) || 0) + 1)
  }
  const n = knowledge.length
  const map = new Map()
  for (const [t, count] of df) map.set(t, Math.log(1 + n / count))
  return map
})()

const weightOf = (t) => weights.get(t) ?? Math.log(1 + knowledge.length)

/** Scores one entry against the already-tokenized question. */
function score(entry, q, qTokens) {
  const qSet = new Set(qTokens)
  let total = 0
  const credited = new Set()

  for (const key of entry.keys) {
    const kTokens = tokenize(key)
    if (!kTokens.length) continue

    // The whole multi-word phrase appears verbatim: worth extra.
    if (kTokens.length > 1 && q.includes(normalize(key))) {
      total += kTokens.reduce((sum, t) => sum + weightOf(t), 0) * 1.6
      kTokens.forEach((t) => credited.add(t))
      continue
    }

    const hits = kTokens.filter((t) => qSet.has(t))
    if (!hits.length) continue
    // All words of the key present, in any order.
    const complete = hits.length === kTokens.length
    for (const t of hits) {
      if (credited.has(t)) continue
      credited.add(t)
      total += weightOf(t) * (complete ? 1 : 0.5)
    }
  }
  return total
}

const GREETING = /^(hi|hey|hello|yo|namaste|hola|sup|good (morning|afternoon|evening))\b/i
const THANKS = /\b(thanks|thank you|thx|shukriya|dhanyavad|awesome|perfect)\b/i

/** Answers from the local knowledge base. Returns { text, id, confident }. */
export function answerLocally(question) {
  const q = normalize(question)
  if (!q) return { text: greeting, id: 'greeting', confident: true }
  if (GREETING.test(q) && q.split(' ').length <= 3) return { text: greeting, id: 'greeting', confident: true }

  const qTokens = tokenize(q)
  // Nothing but pronouns and filler left ("who is he?") — treat it as an intro.
  if (!qTokens.length) {
    const intro = knowledge.find((e) => e.id === 'who')
    if (intro) return { text: intro.a, id: intro.id, confident: true }
  }

  const ranked = knowledge
    .map((entry) => ({ entry, s: score(entry, q, qTokens) }))
    .sort((a, b) => b.s - a.s)

  const [best, second] = ranked
  if (!best || best.s < 1.2) {
    if (THANKS.test(q)) return { text: 'Any time. Ask away if something else comes up.', id: 'thanks', confident: true }
    return { text: fallback, id: 'fallback', confident: false }
  }

  // A close runner-up usually means the question spans both topics.
  const text =
    second && second.s >= best.s * 0.8 && second.s >= 2
      ? `${best.entry.a} ${second.entry.a}`
      : best.entry.a

  return { text, id: best.entry.id, confident: true }
}

// Once the serverless route has shown it isn't there, stop asking for it.
let routeAvailable = true

/**
 * Tries the serverless route first — a real LLM, if the site was deployed with
 * an API key — and falls back to the local engine when it isn't available.
 */
export async function askAssistant(question, history = []) {
  if (!routeAvailable) return { ...answerLocally(question), source: 'local' }

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, history }),
    })
    // On a dev server or static host, an unknown path falls back to index.html
    // with a 200. Only treat it as the route if it actually returned JSON.
    const isJson = res.headers.get('content-type')?.includes('application/json')
    if (res.ok && isJson) {
      const data = await res.json()
      if (data?.text) return { text: data.text, id: 'llm', confident: true, source: 'llm' }
    }
    if (!isJson) routeAvailable = false
    // 404 (no function deployed) or 501 (no API key): the route will never answer.
    if (res.status === 404 || res.status === 501 || res.status === 405) routeAvailable = false
  } catch {
    // Static hosting or offline — the local engine handles it from here.
    routeAvailable = false
  }
  return { ...answerLocally(question), source: 'local' }
}
