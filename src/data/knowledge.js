// The assistant's knowledge base. Each entry: keywords it answers to, and the answer.
// Answers are short on purpose — they get read aloud.

import { profile } from './portfolio'

export const suggestions = [
  'What does Shaan work on?',
  'What has he built on Shopify?',
  'Is he available for work?',
  'How good is he with analytics?',
  'Can he replace my paid apps?',
]

export const knowledge = [
  {
    id: 'who',
    keys: ['who is shaan', 'introduce', 'yourself', 'himself', 'shaan', 'shantanu', 'background', 'profile', 'bio'],
    a: `Shaan — full name Kumar Shantanu — is a Shopify developer based in Gurugram, India. He has 4.5+ years in web development and 2+ years building high-performance stores, all of it for D2C brands. He currently freelances as a Shopify expert.`,
  },
  {
    id: 'what-does-he-do',
    keys: ['what does he do', 'what do you do', 'what does shaan do', 'work on', 'role', 'job', 'profession', 'works as', 'title', 'speciality', 'specialty', 'specialise', 'specialize', 'day to day'],
    a: `He builds and optimises Shopify storefronts: custom Online Store 2.0 themes in Liquid, cart and upsell features that lift average order value, Core Web Vitals work, and reporting automation that gives ops teams numbers they can act on.`,
  },
  {
    id: 'capable',
    keys: ['capable', 'capability', 'what can he do', 'what can you do', 'strength', 'strongest', 'expertise', 'best skills', 'what has he built', 'built on shopify', 'has he built'],
    a: `Three things he is strongest at. One, theme engineering — anything in Liquid and Online Store 2.0, built from scratch rather than installed. Two, replacing paid apps with custom builds, like the cart drawer that replaced iCart. Three, data — Admin API, ShopifyQL, GA4 data layers and automated inventory reports. Ask about the stock report, the cart drawer, the bundle builder or the tracking module for any one of them.`,
  },
  {
    id: 'current-work',
    keys: ['currently', 'right now', 'these days', 'present', 'freelance', 'freelancing', 'available', 'availability', 'open to work', 'taking clients', 'looking for work', 'accepting projects', 'notice period', 'immediate joiner', 'joining', 'start date', 'how soon', 'serving notice', 'onsite', 'work from office', 'hybrid', 'permanent'],
    a: `Yes, and he can start immediately — his notice period is already served, so there is no joining delay. He is freelancing with D2C brands at the moment and is open to a permanent senior or lead Shopify role. He is based in Gurugram, works remote today, and is happy to work from an office if the role calls for it. Email him at ${profile.email} or call ${profile.phone}.`,
  },
  {
    id: 'contact',
    keys: ['contact', 'email', 'reach', 'phone', 'number', 'call', 'linkedin', 'github', 'get in touch', 'talk to him'],
    a: `Email ${profile.email}, phone ${profile.phone}. He is also on LinkedIn at linkedin.com/in/krshantanu23 and GitHub as krshantanu9187.`,
  },
  {
    id: 'location',
    keys: ['where', 'location', 'based', 'city', 'country', 'remote', 'relocate', 'timezone', 'india'],
    a: `He is based in Gurugram, Haryana, India, and originally from Dhanbad, Jharkhand. He works remote and has delivered for agencies in Australia as well as Indian brands.`,
  },
  {
    id: 'experience-estailo',
    keys: ['estailo', 'estailo fashion', 'current employer', 'last job', 'bella vita', 'bellavita', 'jewellery', 'jewelry'],
    a: `At Estailo Fashion — a D2C jewellery brand under Bella Vita Organic — he was the in-house Shopify developer from January 2025 to August 2026. He owned storefront engineering, inventory automation and analytics for a catalogue of over 10,000 SKUs, and led a structured AOV initiative without hurting conversion rate.`,
  },
  {
    id: 'experience-xpnsv',
    keys: ['xpnsv', 'oxidised', 'oxidized', 'previous', 'before that'],
    a: `Before Estailo he was at XPNSV, an oxidised jewellery brand under the same parent company, from May 2024 to January 2025. He kept the storefront running for a brand doing five-figure monthly orders, fixed critical checkout and cart bugs, and integrated payment and shipping carrier APIs. His metafield work there led to an internal transfer to Estailo.`,
  },
  {
    id: 'experience-wordpress',
    keys: ['wordpress', 'wp', 'elementor', 'php', 'natminds', 'markivis', 'lets go web', 'agency', 'earlier career', 'start'],
    a: `He started in WordPress. At Natminds he delivered more than ten client sites and introduced a Git-based workflow that reduced deployment errors. Before that he built sites and landing pages for a Melbourne agency remotely, and for digital marketing clients at Markivis in Delhi.`,
  },
  {
    id: 'experience-years',
    keys: ['how long', 'years', 'experience', 'how many years', 'seniority', 'senior'],
    a: `4.5+ years in web development overall, with 2+ years focused on Shopify. The Shopify time has all been with D2C brands, in-house rather than agency, so he has owned stores end to end.`,
  },
  {
    id: 'project-stock',
    keys: ['stock', 'inventory', 'projection', 'report', 'dashboard', 'forecast', 'reorder', 'doi', 'drr', 'shopify flow', 'apps script', 'sheets', 'flow', 'automation', 'automate'],
    a: `His biggest automation project is the Automated Stock Projection Report. Shopify flows pull order, bundle and refund data covering more than 45,000 orders a month into Google Sheets, and Apps Script turns it into a live dashboard with daily run rate, days of inventory and P0 to P3 reorder priority across 735 core SKUs. It replaced manual daily stock checks and flags reorder risk before a stockout.`,
  },
  {
    id: 'project-cart',
    keys: ['cart', 'drawer', 'icart', 'cart drawer', 'upsell', 'cross-sell', 'bought together', 'fbt', 'free gift', 'progress bar'],
    a: `He built a custom cart drawer that replaced the paid iCart app, which cut both cart abandonment and recurring app spend. It has a tiered free-gift and free-shipping progress bar, in-stock-only bought-together recommendations, a cross-sell rail with add to cart inside the drawer, and a live subtotal breakdown. It uses the Section Rendering API so only the drawer markup re-renders.`,
  },
  {
    id: 'project-bundle',
    keys: ['bundle', 'bundle builder', 'crazy deals', 'slot', 'box', 'aov', 'average order value', 'order value'],
    a: `The Crazy Deals bundle builder, built on Bella Vita Organic, is a custom build-your-own-box section — no app. A merchant configures up to five steps, each bound to its own collection with its own mandatory pick count, and the shopper fills slots step by step while the submit button counts down to unlock. The interesting part is the pricing: the whole box posts to the cart as one line item, and the bundle price is split across the chosen products in proportion to their MRP, with the rounding remainder pushed onto the last item so the parts always sum to the bundle price exactly.`,
  },
  {
    id: 'project-tracking',
    keys: ['ga4', 'gtm', 'analytics', 'tracking', 'data layer', 'datalayer', 'tag manager', 'attribution', 'conversion tracking', 'clarity', 'shopifyql', 'funnel'],
    a: `He wrote a custom datalayer-manager.js module that gives a Shopify theme full GA4 e-commerce tracking — 27 events across 9 groups, including search and purchase-revenue attribution — with no Liquid modification needed, validated against real Shopify order revenue before publish. He also runs ShopifyQL reporting, funnel drop-off diagnostics and Microsoft Clarity analysis.`,
  },
  {
    id: 'project-app',
    keys: ['app', 'custom app', 'oauth', 'webhook', 'hmac', 'admin api', 'graphql', 'partner', 'api'],
    a: `He has built a custom Shopify app end to end: API scopes, OAuth token exchange with HMAC verification, and verified orders/create and app/uninstalled webhooks. It runs a scheduled Admin API export of orders and product data into Google Sheets. He works with the Admin API in both GraphQL and REST.`,
  },
  {
    id: 'project-search',
    keys: ['search', 'predictive', 'live search', 'filter', 'filters', 'autocomplete'],
    a: `He built a predictive live-search drawer from scratch — no app — with trending keyword tags driven by theme schema settings and bestseller-based recommendations, plus dynamic collection filters.`,
  },
  {
    id: 'replace-apps',
    keys: ['replace', 'replace app', 'paid app', 'app spend', 'save money', 'cheaper', 'custom build', 'instead of app', 'reduce cost'],
    a: `That is one of his specialities. He replaced iCart with a custom cart drawer, and built search, filters, bundles and bought-together sections natively instead of installing apps. The payoff is lower recurring spend, fewer scripts slowing the store down, and features that behave exactly how the brand wants.`,
  },
  {
    id: 'performance',
    keys: ['performance', 'speed', 'fast', 'core web vitals', 'lighthouse', 'pagespeed', 'optimise', 'optimize'],
    a: `Performance is a standing focus. He works on Core Web Vitals — LCP, CLS and INP — with PageSpeed Insights and Lighthouse, and has set up automated PageSpeed tracking that logs scores over time. He also writes lean vanilla JavaScript rather than pulling in frameworks for storefront features.`,
  },
  {
    id: 'web-vitals',
    keys: ['lcp', 'cls', 'inp', 'largest contentful paint', 'cumulative layout shift', 'interaction to next paint', 'crux', 'field data', 'lab data', 'lighthouse score', 'what score'],
    a: `He treats the three Core Web Vitals separately, because they have different causes. LCP is usually the hero image or banner, so it gets priority loading and correct sizing. CLS comes from images and injected app banners with no reserved space. INP is almost always heavy JavaScript running on interaction. He reads field data rather than trusting a single lab run, and has automated PageSpeed tracking that logs scores over time so regressions show up.`,
  },
  {
    id: 'speed-how',
    keys: ['how to speed up', 'make it faster', 'what slows', 'slow store', 'heavy theme', 'too many apps', 'image optimisation', 'image optimization', 'render blocking', 'third party script', 'bloat'],
    a: `His first move is usually to count the apps. Every installed app adds scripts that block rendering, which is why he rebuilds features natively instead of installing them. After that: image sizing and lazy loading, deferring third-party tags through GTM, trimming render-blocking CSS and JavaScript, and reserving space for elements so the layout does not shift. He writes storefront features in vanilla JavaScript rather than pulling in a framework.`,
  },
  {
    id: 'lazyload-apps',
    keys: ['lazy load', 'lazyload', 'defer app', 'defer script', 'mutationobserver', 'block script', 'delay script', 'speed app', 'lcp hack', 'preload', 'async load'],
    a: `He defers app and third-party scripts rather than letting them run on page load, usually by catching script tags as they are injected and re-pointing them at a later event. He is deliberate about what gets caught, though. Shopify's own analytics and the accelerated checkout script should stay out of that net, because blocking them costs reporting and a checkout button. And pushing every app script to one later event creates a single long task that hurts INP, so the deferred work has to be staggered.`,
  },
  {
    id: 'metric-gaming',
    keys: ['decoy', 'fake lcp', 'game the score', 'trick', 'cheat', 'opacity', 'placeholder element', 'fake the score', 'inflate the score', 'score vs real'],
    a: `He does not use the tricks that only move the number. The common one is a nearly invisible full-screen element that the browser records as the Largest Contentful Paint instead of the real hero image. It improves the score without the page being any faster, Chrome has closed loopholes like it before, and the real LCP comes back the day it does. He would rather fix the hero image and keep the score honest.`,
  },
  {
    id: 'ai-tools',
    keys: ['ai', 'claude', 'chatgpt', 'copilot', 'llm', 'ai tool', 'use ai', 'ai coding', 'cursor', 'automate with ai', 'prompt', 'vibe coding'],
    a: `He uses AI the way he uses any other tool in the stack — for the mechanical parts, not the judgement. In practice that means scaffolding Liquid sections and theme schema, writing and refactoring the Apps Script behind the inventory reports, drafting Admin API GraphQL queries, and getting a second read on his own code before it ships. The rule is that nothing goes live unread: AI output gets tested on a development theme like any other change. The stock projection engine went through sixteen iterations that way, with the ops team checking the numbers each round.`,
  },
  {
    id: 'ai-replace',
    keys: ['replace developer', 'ai replace', 'still need a developer', 'will ai', 'why not just use ai', 'no code'],
    a: `His view is that AI has made writing a section faster but has not changed the hard part. Knowing which change costs conversion rate, what a theme update will break, why a metric moved, how an app behaves at 45,000 orders a month — that comes from having owned a store, not from generating code. AI shortens the build. Someone still has to decide what gets built and catch it when it is wrong.`,
  },
  {
    id: 'checkout',
    keys: ['checkout', 'checkout page', 'thank you page', 'order status page', 'abandoned', 'discount code', 'cod', 'shipping rates', 'shipping threshold', 'plus'],
    a: `Checkout itself is hosted by Shopify, so most of the work sits on either side of it. At XPNSV he fixed critical checkout and cart bugs for a brand running five-figure monthly orders. On the cart side he drives tiered discounts through cart-attribute logic in the bundle builder, and free-shipping threshold nudges in the cart drawer. Changing the checkout UI itself needs Shopify Plus and checkout extensions.`,
  },
  {
    id: 'payments',
    keys: ['payment', 'payment gateway', 'payment integration', 'gateway', 'razorpay', 'upi', 'prepaid', 'refund', 'returns', 'carrier', 'shipping api', 'logistics', 'courier'],
    a: `At XPNSV he integrated payment and shipping carrier APIs into the storefront and kept them running through a high order volume. Refunds feed back into his reporting, so the stock projection accounts for returns rather than counting every order as a sale. On the fulfilment side he mapped multi-warehouse inventory through an EasyEcom integration.`,
  },
  {
    id: 'apis',
    keys: ['which api', 'shopify api', 'apis', 'storefront api', 'section rendering', 'ajax api', 'rest', 'rate limit', 'webhooks', 'bulk operation'],
    a: `Day to day: the AJAX Cart API for cart actions, the Section Rendering API so only the markup that changed re-renders, and the Predictive Search API for live search. For data he uses the Admin API in both GraphQL and REST, for orders, products and scheduled exports. In his custom app he set up OAuth token exchange with HMAC verification and verified orders/create and app/uninstalled webhooks. Shopify Flow and ShopifyQL cover the automation and reporting side.`,
  },
  {
    id: 'seo',
    keys: ['seo', 'search console', 'structured data', 'schema markup', 'ranking', 'organic'],
    a: `He handles technical SEO: structured data, Search Console setup including DNS troubleshooting, metafield-driven product detail improvements, and page-speed work alongside SEO teams.`,
  },
  {
    id: 'tech-stack',
    keys: ['stack', 'technologies', 'tech', 'languages', 'tools', 'liquid', 'javascript', 'react', 'node', 'git', 'metaobject', 'metafield'],
    a: `Shopify side: Liquid, Online Store 2.0, JSON templates, theme schema, metafields and metaobjects, AJAX Cart, Section Rendering and Predictive Search APIs, Admin API, Shopify Flow and ShopifyQL. Beyond that: JavaScript ES6+, React, Node.js, Apps Script, Git, Postman, and WordPress with PHP and MySQL from his earlier years.`,
  },
  {
    id: 'react',
    keys: ['react', 'reactjs', 'frontend framework', 'spa', 'vite', 'tailwind'],
    a: `Yes, he works with React — this site is React with Vite and Tailwind, and he has a React project on the side. Day to day on Shopify though, he favours vanilla JavaScript so storefronts stay fast.`,
  },
  {
    id: 'education',
    keys: ['education', 'degree', 'college', 'university', 'study', 'studied', 'btech', 'b.tech', 'graduate', 'qualification', 'upsc', 'civil services'],
    a: `A B.Tech in Electronics and Instrumentation Engineering from Dr. B.C. Roy Engineering College, Durgapur, finished in 2015. He then spent four years preparing for the UPSC civil services exam, and moved into web development after that. On the Shopify side he is self-taught.`,
  },
  {
    id: 'stores',
    keys: ['stores', 'clients', 'brands', 'portfolio', 'websites', 'live site', 'worked on', 'examples', 'case study', 'monik', 'baked beauty', 'elite elixir'],
    a: `On Shopify, his current freelance work is Elite Elixir, Label Monik and Baked Beauty. Before that, in-house, Estailo Fashion and Bella Vita Organic. XPNSV has since been shut down by its owner. On WordPress: Bains Renovations, Amuni Coogee, MVS, Morningside Medispa, Webflare Digital and Subh Vision. The links are all in the Stores section of this page.`,
  },
  {
    id: 'why-hire',
    keys: ['why hire', 'hire', 'hiring', 'why should', 'what makes him', 'different', 'stand out', 'value', 'recommend'],
    a: `Because he has run a store, not just worked tickets on one. At Estailo he owned the theme, a catalogue of over 10,000 SKUs, the tracking and the inventory reporting at the same time, so he knows which change costs conversion rate and which one actually pays. He builds instead of installing — the cart drawer that replaced iCart cut app spend and page weight in the same move — and he ships against numbers, like the stock report that covers 45,000 orders a month. Hire him if you want someone who will tell you when a feature is not worth the milliseconds.`,
  },
  {
    id: 'cro',
    keys: ['cro', 'conversion', 'conversion rate', 'revenue', 'sales', 'increase sales', 'optimization'],
    a: `He ran a structured AOV programme at Estailo: audit first, then upsell and cross-sell builds like bought-together sections and shipping-threshold nudges, then testing — with a hard rule that nothing ships if it risks conversion rate. He also corrected conversion-rate measurement for traffic that came heavily through social and WhatsApp.`,
  },
  {
    id: 'ops',
    keys: ['ops', 'operations', 'warehouse', 'easyecom', 'catalogue', 'catalog', 'hosting', 'domain', 'workspace'],
    a: `He also covers the operational side: product catalogue operations, multi-warehouse inventory mapping through an EasyEcom integration, hosting and domain management, and Google Workspace administration.`,
  },
  {
    id: 'languages-spoken',
    keys: ['speak', 'language', 'hindi', 'english', 'communication'],
    a: `English at full professional level, and Hindi natively.`,
  },
]

export const fallback = `I only know about Shaan's work, so I may not have that one. Try asking what he does, what he has built on Shopify, how he handles analytics, or whether he is available for work. For anything else, email him at ${profile.email}.`

export const greeting = `Good day. I'm Neo, Shaan's assistant. Ask me what he does, what he has built, or whether he is free for a project — type, or use the mic and I'll answer aloud.`
