// Everything on the site comes from this file. Edit here, nowhere else.

export const profile = {
  name: 'Kumar Shantanu',
  logo: 'Kr Shantanu',
  role: 'Shopify Developer · Shopify Expert',
  subtitle: 'E-Commerce Automation, Analytics & Theme Engineering',
  headline: 'I build Shopify stores that load fast and sell more.',
  intro:
    'Shopify developer with 4.5+ years in web development and 2+ years building high-performance stores, all for D2C brands. I pair storefront engineering with reporting automation, and I replace paid apps with custom builds.',
  email: 'krshantanu1323@gmail.com',
  phone: '+91 95605 57636',
  linkedin: 'https://www.linkedin.com/in/krshantanu23/',
  github: 'https://github.com/krshantanu9187',
  location: 'Gurugram, Haryana, India',
  available: true,
}

export const facts = [
  { value: 4.5, suffix: '+ yrs', label: 'Web development' },
  { value: 2, suffix: '+ yrs', label: 'Shopify work, all with D2C brands' },
  { value: 45000, suffix: '+', label: 'Orders a month covered by automated reports' },
  { value: 10000, suffix: '+', label: 'SKU catalogue engineered for' },
]

export const marquee = [
  'Liquid', 'Online Store 2.0', 'Metaobjects', 'AJAX Cart API',
  'Admin API', 'ShopifyQL', 'GA4 + GTM', 'Core Web Vitals',
  'Shopify Flow', 'Apps Script',
]

// Key projects, in the resume's own label/value shape.
export const builds = [
  {
    title: 'Automated Stock Projection Report',
    brand: 'Estailo Fashion',
    tag: 'Shopify Flow · Reports · Google Apps Script',
    rows: [
      { label: 'Impact', value: 'Eliminated manual daily stock checks and flagged reorder-risk SKUs before stockouts, across 16 production iterations with the ops team.' },
      { label: 'Scope', value: 'Inventory-planning report turning raw Shopify order data into a live dashboard with daily run rate (DRR), days of inventory (DOI) and P0–P3 priority across 735 core SKUs.' },
      { label: 'Built', value: 'Shopify flows pulling order, bundle and refund data into scheduled reports, feeding the stock dashboard in Google Sheets.' },
      { label: 'Engineered', value: 'Apps Script logic for SKU mapping, bundle-component breakdown, deduplication and DRR/DOI calculations.' },
    ],
    stat: { value: 45000, suffix: '+', label: 'orders a month' },
  },
  {
    title: 'Custom Cart Drawer',
    brand: 'Estailo Fashion',
    tag: 'AJAX Cart API · Section Rendering API',
    rows: [
      { label: 'Impact', value: 'Replaced a paid cart app (iCart), reducing cart abandonment and recurring app spend.' },
      { label: 'Built', value: 'Tiered free-gift and free-shipping progress bar, in-stock-only frequently-bought-together recommendations, cross-sell rail with in-drawer add-to-cart, one-click discount copy, and a live subtotal breakdown.' },
      { label: 'Engineered', value: '/cart/add.js, /cart/change.js and /cart/update.js with the Section Rendering API to re-render only drawer markup, debounced quantity actions, and a stock-aware quick-view variant modal.' },
    ],
    stat: { text: 'iCart', label: 'paid app replaced' },
  },
  {
    title: 'Crazy Deals Bundle Builder',
    brand: 'Bella Vita Organic',
    tag: 'Custom Liquid section · Flexi Box',
    rows: [
      {
        label: 'Challenge',
        value: 'No bundle app could do a multi-step build-your-own-box where each step draws from a different collection with its own pick count — and the ones that came close billed per order for it.',
      },
      {
        label: 'Built',
        value: 'A Shopify section with up to five merchant-configurable steps. Each step binds to a collection, sets how many products are mandatory, and renders a paginated grid with per-product quantity controls, plus a slot bar that fills as the shopper picks.',
      },
      {
        label: 'Engineered',
        value: 'Step gating that locks every collection except the one in play, per-step and global selection caps with inline messages, and a submit button that reads "Add N more to unlock cart" until the box is complete, then flips to the bundle price.',
      },
      {
        label: 'The hard part',
        value: 'The whole box posts to /cart/add.js as one line item. The bundle price is split across the chosen products in proportion to their MRP, and the rounding remainder is pushed onto the last item so the parts always sum to the bundle price exactly — no drift at checkout.',
      },
      {
        label: 'Hardened',
        value: 'Cart drawer refreshed through the Section Rendering API, click handling delegated in the capture phase so injected buttons still work, and a fallback chain for the required count so a mis-set theme setting cannot break the step logic.',
      },
    ],
    stat: { value: 5, label: 'configurable steps' },
  },
  {
    title: 'Google Sheets Export App and GTM + GA4 Data Layer',
    brand: 'Estailo Fashion',
    tag: 'Admin API · GTM · GA4',
    rows: [
      { label: 'Impact', value: 'GA4 e-commerce tracking with zero Liquid modification, validated against Shopify order revenue before publish.' },
      { label: 'Built', value: 'A scheduled Admin API to Google Sheets export app, OAuth-authenticated, for orders and product data.' },
      { label: 'Implemented', value: 'Full-site GA4 tracking — view_item, add_to_cart, purchase, promo impressions — through a custom datalayer-manager.js module with search and purchase-revenue attribution.' },
    ],
    stat: { value: 27, label: 'events across 9 groups' },
  },
  {
    title: 'Custom Shopify App',
    brand: 'Estailo Fashion',
    tag: 'Partner Dashboard · OAuth · Webhooks',
    rows: [
      { label: 'Impact', value: 'Delivered a working custom app integration end-to-end and documented the setup flow for the team.' },
      { label: 'Engineered', value: 'API scopes, OAuth token exchange with HMAC verification (validated via Postman and Webhook.site), and orders/create and app/uninstalled webhooks posting verified payloads to the app backend.' },
    ],
    stat: { text: 'App', label: 'end to end' },
  },
  {
    title: 'Predictive Search Drawer',
    brand: 'Estailo Fashion',
    tag: 'Predictive Search API · Liquid',
    rows: [
      { label: 'Impact', value: 'Replaced a search app with a native drawer, keeping the storefront light.' },
      { label: 'Built', value: 'Live search with predictive results, trending keyword tags driven by theme schema settings, bestseller-based recommendations and dynamic collection filters.' },
    ],
    stat: { text: '0', label: 'third-party apps' },
  },
]

export const stores = {
  Shopify: [
    // Current freelance work first — it is the most recent, so it leads.
    // Theme-preview link: it carries a preview_theme_id, so it stops working
    // once that theme is published or deleted. Swap in the live URL when it goes live.
    {
      name: 'Elite Elixir',
      url: 'https://eliteelixir.in/?_ab=0&_fd=0&_sc=1&preview_theme_id=158626283675',
      note: 'freelance',
      desc: 'Freelance storefront build. The link opens the theme preview, so swap it for the live URL once the theme is published.',
    },
    {
      name: 'Label Monik',
      url: 'https://labelmonik.com/',
      note: 'freelance',
      desc: 'Freelance theme development — custom sections and blocks on the brand storefront.',
    },
    {
      name: 'Baked Beauty',
      url: 'https://bakedbeauty.in/',
      note: 'freelance',
      desc: 'Freelance theme development and ongoing storefront maintenance.',
    },
    {
      name: 'Estailo Fashion',
      url: 'https://estailofashion.com/',
      note: 'in-house developer',
      desc: 'In-house from January 2025 to August 2026. Theme engineering, inventory automation and analytics across a catalogue of over 10,000 SKUs, plus a structured AOV programme that shipped nothing at the cost of conversion rate.',
    },
    {
      name: 'Bella Vita Organic',
      url: 'https://bellavitaorganic.com/',
      note: 'parent brand',
      desc: 'Parent brand of both Estailo Fashion and XPNSV. Home of the Crazy Deals bundle builder — a slot-based add-to-box experience across 500+ products, with custom bundles whose tiered discounts apply themselves through cart-attribute logic.',
    },
    {
      name: 'XPNSV Luxury Retail',
      url: null,
      note: 'store since dissolved',
      desc: 'Oxidised jewellery brand, May 2024 to January 2025. Storefront upkeep at five-figure monthly order volume, critical checkout and cart fixes, and payment and shipping carrier API integration. The store has since been shut down by its owner.',
    },
  ],
  WordPress: [
    { name: 'Bains Renovations', url: 'https://bainsrenovations.com.au/', desc: 'Agency client site — build and maintenance.' },
    { name: 'Amuni Coogee', url: 'https://www.amunicoogee.com/', desc: 'Agency client site — build and maintenance.' },
    { name: 'MVS', url: 'https://www.mvs.com.au/', desc: 'Agency client site — build and maintenance.' },
    { name: 'Morningside Medispa', url: 'https://www.morningsidemedispa.com.au/', desc: 'Agency client site — build and maintenance.' },
    { name: 'Webflare Digital', url: 'https://www.webflaredigital.com.au/', desc: 'Agency client site — build and maintenance.' },
    { name: 'Subh Vision', url: 'https://subhvision.com/', desc: 'Agency client site — build and maintenance.' },
  ],
}

export const experience = [
  {
    when: 'Sep 2026 – Present',
    role: 'Freelance Shopify Developer · Shopify Expert',
    where: 'Remote, Gurugram',
    desc: 'Working with D2C brands to build, customise and scale their stores: custom Online Store 2.0 sections and blocks, product page and cart features that raise AOV, Core Web Vitals work, third-party API integration and GA4/GTM tracking.',
  },
  {
    when: 'Jan 2025 – Aug 2026',
    role: 'Shopify Developer · Estailo Fashion',
    where: 'Gurugram — D2C jewellery under Bella Vita Organic',
    desc: 'Owned storefront engineering, inventory automation and analytics for a 10,000+ SKU catalogue. Built the reporting flows behind the stock projection report, led a structured AOV initiative while protecting conversion rate, and ran ShopifyQL funnel and landing-page analysis for merchandising.',
  },
  {
    when: 'May 2024 – Jan 2025',
    role: 'Shopify Developer · XPNSV',
    where: 'Gurugram — D2C oxidised jewellery under Bella Vita Organic',
    desc: 'Maintained the storefront for a brand doing five-figure monthly orders. Wrote reusable schema-driven Liquid sections so merchandising could update the store themselves, fixed critical checkout and cart bugs, and integrated payment and shipping carrier APIs.',
  },
  {
    when: 'Sep 2023 – May 2024',
    role: 'WordPress Developer · Natminds',
    where: 'Gurugram',
    desc: 'Delivered 10+ responsive client sites with WordPress, Elementor, PHP and MySQL, and introduced a Git-based workflow that reduced deployment errors.',
  },
  {
    when: 'Apr 2022 – Aug 2023',
    role: 'WordPress Developer · Lets Go Web, Markivis',
    where: 'Melbourne agency (remote) and Delhi',
    desc: 'End-to-end WordPress sites and high-converting landing pages for agency and digital marketing clients, working closely with SEO and content teams.',
  },
]

export const skills = [
  {
    title: 'Shopify platform',
    desc: 'Liquid, Online Store 2.0, JSON templates, theme editor schema, sections everywhere, metafields and metaobjects, AJAX Cart, Section Rendering and Predictive Search APIs.',
  },
  {
    title: 'Shopify APIs & data',
    desc: 'Admin API in GraphQL and REST, Shopify Flow reporting automations, ShopifyQL analytics, webhooks, OAuth 2.0 and custom app development.',
  },
  {
    title: 'Performance & SEO',
    desc: 'Core Web Vitals (LCP, CLS, INP), PageSpeed Insights, Lighthouse, structured data, technical SEO and Search Console.',
  },
  {
    title: 'Automation & analytics',
    desc: 'Google Apps Script, Sheets API, DRR/DOI inventory modelling, GTM, GA4 data layers, Microsoft Clarity, funnel analysis, CRO and AOV optimisation.',
  },
  {
    title: 'Front-end',
    desc: 'JavaScript ES6+, React, jQuery, AJAX, HTML5, CSS3, Bootstrap, responsive design and web accessibility.',
  },
  {
    title: 'Tools & other',
    desc: 'Git, GitHub, VS Code, Postman, Node.js, Ruby, WordPress, PHP, MySQL and Google Workspace admin.',
  },
]

export const education = [
  {
    when: '2011 – 2015',
    what: 'B.Tech, Electronics & Instrumentation Engineering',
    where: 'Dr. B.C. Roy Engineering College, Durgapur',
  },
]

export const languages = 'English (full professional) and Hindi (native)'
