// Optional serverless route (Vercel / Netlify functions).
//
// The site works without this file: the chat falls back to the local knowledge
// engine in src/lib/brain.js. Deploy with an ANTHROPIC_API_KEY environment
// variable and answers come from a real model instead, grounded in the same
// facts so it cannot invent a career.
//
// The key stays on the server — never put it in the frontend bundle.

const MODEL = 'claude-haiku-4-5'
const MAX_QUESTION = 500

const FACTS = `
Kumar Shantanu, called Shaan. Shopify developer based in Gurugram, Haryana, India; originally from Dhanbad, Jharkhand.
Contact: krshantanu1323@gmail.com, +91 95605 57636, linkedin.com/in/krshantanu23, github.com/krshantanu9187.
Experience: 4.5+ years in web development, 2+ years on Shopify, all of it with D2C brands.
Currently freelancing as a Shopify expert (since Sep 2026); open to a permanent senior or lead Shopify role. Notice period already served, so he can start immediately — no joining delay. Based in Gurugram; works remote today and is open to working from an office if the role requires it.

Roles:
- Freelance Shopify Developer, Sep 2026 to now. Custom Online Store 2.0 sections and blocks, cart and upsell features for AOV, Core Web Vitals, third-party API integration, GA4/GTM tracking.
- Shopify Developer at Estailo Fashion (D2C jewellery under Bella Vita Organic, funded by WolfPack Labs), Jan 2025 to Aug 2026. Owned storefront engineering, inventory automation and analytics for a 10,000+ SKU catalogue. Built reporting flows behind the stock projection report. Led a structured AOV initiative while protecting conversion rate. ShopifyQL landing-page and session reports, funnel drop-off diagnostics. Managed catalogue ops, multi-warehouse mapping via EasyEcom, hosting, domains, Google Workspace, Search Console.
- Shopify Developer at XPNSV (D2C oxidised jewellery, same parent), May 2024 to Jan 2025. Five-figure monthly orders. Reusable schema-driven Liquid sections, fixed critical checkout/cart bugs, integrated payment gateways and shipping carrier APIs, metafield-driven PDP improvements. Internally transferred to Estailo.
- WordPress Developer at Natminds, Sep 2023 to May 2024. 10+ client sites with WordPress, Elementor, PHP, MySQL, Bootstrap. Introduced a Git workflow that cut deployment errors.
- WordPress Developer (freelance) at Lets Go Web Solutions, a Melbourne agency, Mar to Aug 2023.
- WordPress Developer at Markivis, Delhi, Apr 2022 to Feb 2023. Sites and landing pages for digital marketing clients.

Key projects:
- Automated Stock Projection Report. Shopify Flow plus Admin API plus Google Apps Script and Sheets. Covers 45,000+ orders a month, 735 core SKUs out of a 10,000+ SKU catalogue, with daily run rate (DRR), days of inventory (DOI) and P0 to P3 reorder priority. 16 production iterations with the ops team. Ended manual daily stock checks.
- Custom Cart Drawer. Replaced the paid iCart app, cutting cart abandonment and app spend. Tiered free-gift and free-shipping progress bar, in-stock-only frequently-bought-together, cross-sell rail with in-drawer add to cart, one-click discount copy, live subtotal breakdown. Built on /cart/add.js, /cart/change.js, /cart/update.js plus the Section Rendering API, debounced quantity actions, stock-aware quick-view modal.
- Crazy Deals Bundle Builder, built on Bella Vita Organic. A custom build-your-own-box Shopify section, no app: up to five merchant-configurable steps, each bound to its own collection with its own mandatory pick count, paginated product grids with quantity controls, a slot bar, step gating that locks the other collections, per-step and global caps, and a submit button that counts down to unlock. The box posts to /cart/add.js as ONE line item, with the bundle price split across chosen products in proportion to their MRP and the rounding remainder pushed onto the last item so the parts sum exactly. Cart drawer refreshed via the Section Rendering API.
- Custom Shopify App. Partner Dashboard app with API scopes, OAuth token exchange, HMAC verification (tested with Postman and Webhook.site), orders/create and app/uninstalled webhooks. Runs a scheduled Admin API export of orders and products into Google Sheets.
- GTM + GA4 Data Layer. A custom datalayer-manager.js module, 27 events across 9 groups, with search and purchase-revenue attribution; full GA4 e-commerce tracking with zero Liquid modification, validated against Shopify order revenue before publish.
- Predictive live-search drawer with trending keyword tags from theme schema and bestseller recommendations, plus dynamic collection filters. No app used.

Skills: Liquid, Online Store 2.0, JSON templates, theme editor schema, sections everywhere, metafields, metaobjects, AJAX Cart API, Section Rendering API, Predictive Search API. Admin API in GraphQL and REST, Shopify Flow, ShopifyQL, webhooks, OAuth 2.0, custom app development. Core Web Vitals (LCP, CLS, INP), PageSpeed Insights, Lighthouse, structured data, technical SEO, Search Console. Google Apps Script, Sheets API, DRR/DOI inventory modelling, GTM, GA4 data layer, Microsoft Clarity, funnel analysis, CRO, AOV optimisation. JavaScript ES6+, React, jQuery, AJAX, HTML5, CSS3, Bootstrap, responsive design, accessibility. Git, GitHub, VS Code, Postman, Node.js, Ruby, WordPress, PHP, MySQL, Google Workspace admin.

Live work: Shopify — estailofashion.com, bellavitaorganic.com (in-house); labelmonik.com, bakedbeauty.in, eliteelixir.in (freelance); XPNSV's store was shut down by its owner. WordPress — bainsrenovations.com.au, amunicoogee.com, mvs.com.au, morningsidemedispa.com.au, webflaredigital.com.au, subhvision.com.

Education: B.Tech, Electronics and Instrumentation Engineering, Dr. B.C. Roy Engineering College, Durgapur, 2011 to 2015. After that he spent four years preparing for the UPSC civil services exam, then moved into web development. Self-taught on Shopify.

Checkout and payments: checkout itself is Shopify-hosted, so his work sits on either side of it — at XPNSV he fixed critical checkout and cart bugs and integrated payment and shipping carrier APIs. Tiered discounts are applied through cart-attribute logic; free-shipping thresholds run in the cart drawer. Changing checkout UI itself requires Shopify Plus and checkout extensions. Refund data feeds back into his inventory reporting; multi-warehouse inventory is mapped through an EasyEcom integration.

AI tooling: he uses AI for the mechanical parts of the job, not the judgement — scaffolding Liquid sections and theme schema, writing and refactoring the Apps Script behind the inventory reports, drafting Admin API GraphQL queries, and a second read on his own code. Nothing goes live unread; AI output is tested on a development theme like any other change. The stock projection engine took sixteen iterations that way. His view on AI replacing developers: it shortens the build, but knowing which change costs conversion rate and how an app behaves at 45,000 orders a month comes from owning a store.

Script deferral: he defers app and third-party scripts by catching script tags as they are injected and re-pointing them at a later event, but keeps Shopify's own analytics and accelerated checkout out of that net, and staggers the deferred work so it does not land as one long task that hurts INP. He does not use metric-gaming tricks such as a nearly invisible full-screen element that becomes the LCP candidate instead of the real hero image.

Performance detail: LCP is usually the hero image or banner (priority loading, correct sizing); CLS comes from images and injected app banners with no reserved space; INP is usually heavy JavaScript on interaction. He reads field data rather than a single lab run and has automated PageSpeed tracking logging scores over time. First move on a slow store is counting installed apps, then image sizing and lazy loading, deferring third-party tags through GTM, and trimming render-blocking CSS and JavaScript.
Languages: English (full professional), Hindi (native).
`.trim()

const SYSTEM = `You are the assistant on Kumar Shantanu's portfolio site. Visitors — recruiters and potential clients — ask about his work, and you answer about him in the third person. You are not Shaan.

Rules:
- Answer only from the facts below. If something isn't there, say you don't have it and point them to krshantanu1323@gmail.com. Never invent a job, client, metric, date or technology.
- Two to four sentences. Your answers get read aloud, so write plain prose: no markdown, no bullet points, no headings.
- Be concrete. Prefer a real number or project name over adjectives, and never oversell.
- Stay on his professional work. For anything else, say that's outside what you cover.

FACTS
${FACTS}`

/**
 * The platform-independent half: takes a question, returns { status, body }.
 * Vercel's handler below and netlify/functions/chat.mjs both call this, so the
 * facts and the prompt live in exactly one place.
 */
export async function askModel({ question, history = [] }) {
  const key = process.env.ANTHROPIC_API_KEY
  // No key configured: tell the frontend to use its local engine.
  if (!key) return { status: 501, body: { error: 'No model configured.' } }

  if (typeof question !== 'string' || !question.trim()) {
    return { status: 400, body: { error: 'Ask a question.' } }
  }

  const messages = [
    ...history
      .slice(-6)
      .filter((m) => m && typeof m.text === 'string' && m.text.trim())
      .map((m) => ({
        role: m.role === 'you' || m.role === 'user' ? 'user' : 'assistant',
        content: m.text.slice(0, MAX_QUESTION),
      })),
    { role: 'user', content: question.trim().slice(0, MAX_QUESTION) },
  ]

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({ model: MODEL, max_tokens: 400, system: SYSTEM, messages }),
    })

    if (!upstream.ok) {
      console.error('Model request failed:', upstream.status, await upstream.text())
      return { status: 502, body: { error: 'The model did not answer.' } }
    }

    const data = await upstream.json()
    const text = data.content?.find((block) => block.type === 'text')?.text?.trim()
    if (!text) return { status: 502, body: { error: 'The model returned nothing.' } }

    return { status: 200, body: { text } }
  } catch (err) {
    console.error('Model request errored:', err)
    return { status: 502, body: { error: 'The model could not be reached.' } }
  }
}

/** Vercel entry point: /api/chat is this file, by convention. */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Use POST.' })
  }
  const { question, history } = req.body ?? {}
  const { status, body } = await askModel({ question, history })
  return res.status(status).json(body)
}
