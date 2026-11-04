// Netlify entry point for the same assistant route as api/chat.js (Vercel).
// Both import askModel, so the facts and the prompt exist in one place only.
//
// Set ANTHROPIC_API_KEY in Netlify → Site configuration → Environment variables
// and Neo answers from the model instead of the local knowledge base. Without
// it this returns 501 and the frontend falls back on its own.

import { askModel } from '../../api/chat.js'

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Use POST.' }), {
      status: 405,
      headers: { 'content-type': 'application/json', allow: 'POST' },
    })
  }

  let payload
  try {
    payload = await req.json()
  } catch {
    return json(400, { error: 'Send JSON.' })
  }

  const { status, body } = await askModel({
    question: payload?.question,
    history: payload?.history,
  })
  return json(status, body)
}

// Serve it at the same path the frontend already calls.
export const config = { path: '/api/chat' }
