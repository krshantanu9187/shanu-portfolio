import { stores } from '../data/portfolio'
import Frame from './Frame'
import Reveal from './Reveal'
import Section from './Section'
import Slider from './Slider'

const host = (url) => new URL(url).hostname.replace(/^www\./, '')

/* One flat deck — platform rides on the card, so both lists share a slider. */
const cards = Object.entries(stores).flatMap(([platform, list]) =>
  list.map((s) => ({ ...s, platform }))
)

function Postcard({ s, i }) {
  return (
    <Frame
      as="article"
      data-cursor
      className="group relative flex h-full min-h-[260px] flex-col border border-line p-6 transition-[border-color,box-shadow] duration-400 ease-out-soft hover:border-ash hover:shadow-[0_20px_40px_-26px_rgb(32_34_35/0.4)]"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[3px] origin-bottom scale-y-0 bg-brand transition-transform duration-500 ease-out-soft group-hover:scale-y-100"
      />

      <p className="m-0 flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ash">
        <span className="border border-brand/30 bg-brand/5 px-1.5 py-0.5 text-brand">{s.platform}</span>
        <span>{String(i + 1).padStart(2, '0')}</span>
      </p>

      <h3 className="m-0 mt-4 text-[22px] font-bold leading-tight tracking-[-0.02em] transition-colors duration-300 group-hover:text-brand">
        {s.name}
      </h3>
      {s.note && <p className="m-0 mt-1 font-mono text-[11px] text-muted">{s.note}</p>}

      {s.desc && <p className="m-0 mt-3 flex-1 text-[14px] leading-relaxed text-muted">{s.desc}</p>}

      {s.url ? (
        <a
          href={s.url}
          target="_blank"
          rel="noopener"
          className="group/link mt-5 inline-flex w-fit items-center gap-2 border border-rule px-3 py-1.5 font-mono text-[12px] text-ink no-underline transition-colors duration-300 hover:border-brand hover:text-brand"
        >
          {host(s.url)}
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 ease-out-soft group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
          >
            ↗
          </span>
        </a>
      ) : (
        <p className="m-0 mt-5 font-mono text-[12px] text-ash">No live link.</p>
      )}
    </Frame>
  )
}

export default function Stores() {
  return (
    <Section
      id="stores"
      number="03"
      title="Stores & sites"
      intro="Live projects I've developed or maintained — Shopify first, then the WordPress years."
    >
      <Reveal>
        <Slider
          items={cards}
          label="Stores and sites"
          nameOf={(s) => s.name}
          slideClass="w-[78%] sm:w-[46%] lg:w-[31%]"
          align="stretch"
        >
          {(s, i) => <Postcard s={s} i={i} />}
        </Slider>
      </Reveal>
    </Section>
  )
}
