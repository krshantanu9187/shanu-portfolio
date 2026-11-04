# Kumar Shantanu — Shopify Developer Portfolio

Personal portfolio built with **React 19 + Vite + Tailwind CSS v4**, including a voice-capable assistant that answers visitors' questions about my work.

No animation libraries: the typing hero, scroll reveals, counters, marquee, magnetic buttons, tilt cards, custom cursor and timeline fill are plain React and CSS, and all of it switches off for `prefers-reduced-motion`. Fonts are self-hosted through `@fontsource-variable`, so the site makes no third-party requests at all.

## Run locally

```bash
npm install
npm run dev
```

## Edit content

| What | Where |
| --- | --- |
| Name, links, projects, stores, experience, skills, education | `src/data/portfolio.js` |
| What the assistant knows and its suggested questions | `src/data/knowledge.js` |
| Colors, fonts, keyframes | `src/index.css` |

## The "Ask about me" assistant

It runs in two modes, and swaps between them on its own:

1. **Local (default).** `src/lib/brain.js` scores the visitor's question against the knowledge base in `src/data/knowledge.js` and returns the best-matching answer. No API key, no backend, no cost — works on GitHub Pages or any static host.
2. **Real model (optional).** If `api/chat.js` is deployed with an `ANTHROPIC_API_KEY` environment variable, answers come from a model instead, grounded in the same facts so it can't invent a career. The frontend tries the route once; if it isn't there, it quietly stays local for the rest of the session.

**Voice** uses the browser's own APIs, so there is nothing to pay for or install:

- *Speaking to it* — the mic button uses `SpeechRecognition` (Chrome, Edge, Safari). The button hides itself in browsers that don't support it; typing works everywhere.
- *Hearing it back* — the `voice on/off` toggle uses `speechSynthesis`. A question asked by voice is always answered out loud.

To add a fact, add an entry to `knowledge` with the words people would use to ask about it:

```js
{
  id: 'rates',
  keys: ['rate', 'pricing', 'how much', 'cost', 'budget'],
  a: 'Project rates depend on scope — email for a quote.',
}
```

If you deploy the serverless route too, add the same fact to the `FACTS` block in `api/chat.js`.

## Push to GitHub

```bash
git init
git add .
git commit -m "Portfolio with AI assistant"
git branch -M main
git remote add origin https://github.com/krshantanu9187/shaan-portfolio.git
git push -u origin main
```

## Deploy

**Vercel (recommended — the assistant route only works here).**

1. vercel.com → **Add New Project** → import the repo. Framework preset: **Vite**, auto-detected.
2. Optional, for the real-model assistant: **Settings → Environment Variables** → add `ANTHROPIC_API_KEY`, then redeploy.
3. Every push to `main` redeploys.

**GitHub Pages** works too, with the local assistant only. Add your repo name as the base path in `vite.config.js`:

```js
export default defineConfig({ base: '/shaan-portfolio/', plugins: [react(), tailwindcss()] })
```

Then publish `dist/` with GitHub Actions or the `gh-pages` package.

## Structure

```
api/chat.js              ← optional serverless assistant route
src/
  data/portfolio.js      ← all site content
  data/knowledge.js      ← what the assistant knows
  lib/brain.js           ← local answer engine
  hooks/useMotion.js     ← reveal + count-up
  hooks/useVoice.js      ← mic input + spoken answers
  components/            ← Header, Hero, AskAI, Builds, Stores, Experience, Skills, Education, Contact…
  index.css              ← Tailwind theme, tokens, keyframes
```
