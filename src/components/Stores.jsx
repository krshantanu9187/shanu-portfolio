import { useCallback, useEffect, useRef, useState } from 'react'
import { stores } from '../data/portfolio'
import Frame from './Frame'
import Reveal from './Reveal'
import Section from './Section'
import Slider from './Slider'

const host = (url) => new URL(url).hostname.replace(/^www\./, '')

/* One flat deck — platform rides on the card, so both views share a list. */
const cards = Object.entries(stores).flatMap(([platform, list]) => list.map((s) => ({ ...s, platform })))

const PlatformChip = ({ children }) => (
  <span className="border border-brand/30 bg-brand/5 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-brand">
    {children}
  </span>
)

function VisitLink({ url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener"
      className="group/link inline-flex w-fit items-center gap-2 border border-rule px-3 py-1.5 font-mono text-[12px] text-ink no-underline transition-colors duration-300 hover:border-brand hover:text-brand"
    >
      {host(url)}
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-300 ease-out-soft group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
      >
        ↗
      </span>
    </a>
  )
}

/** Full card — the desktop slider. */
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
        <PlatformChip>{s.platform}</PlatformChip>
        <span>{String(i + 1).padStart(2, '0')}</span>
      </p>

      <h3 className="m-0 mt-4 text-[22px] font-bold leading-tight tracking-[-0.02em] transition-colors duration-300 group-hover:text-brand">
        {s.name}
      </h3>
      {s.note && <p className="m-0 mt-1 font-mono text-[11px] text-muted">{s.note}</p>}
      {s.desc && <p className="m-0 mt-3 flex-1 text-[14px] leading-relaxed text-muted">{s.desc}</p>}

      <div className="mt-5">{s.url ? <VisitLink url={s.url} /> : <p className="m-0 font-mono text-[12px] text-ash">No live link.</p>}</div>
    </Frame>
  )
}

/** Compact tile — the mobile grid. Tapping one opens the dialog. */
function Tile({ s, i, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(i)}
      className="group relative flex h-full flex-col items-start gap-2 border border-line bg-panel p-3.5 text-left transition-colors duration-300 active:border-brand"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[2px] origin-bottom scale-y-0 bg-brand transition-transform duration-400 ease-out-soft group-active:scale-y-100"
      />
      <PlatformChip>{s.platform}</PlatformChip>
      <span className="text-[15px] font-bold leading-snug tracking-[-0.01em]">{s.name}</span>
      <span className="mt-auto flex w-full items-end justify-between gap-2 pt-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">{s.note || 'View'}</span>
        <span aria-hidden="true" className="font-mono text-[13px] leading-none text-brand">
          +
        </span>
      </span>
    </button>
  )
}

export default function Stores() {
  const dialog = useRef(null)
  const [active, setActive] = useState(null)
  const s = active == null ? null : cards[active]

  const open = useCallback((i) => {
    setActive(i)
    dialog.current?.showModal()
  }, [])

  const close = useCallback(() => dialog.current?.close(), [])

  // Keep React's state in step however the dialog was dismissed — the close
  // button, Esc, or the backdrop.
  useEffect(() => {
    const el = dialog.current
    if (!el) return
    const onClose = () => setActive(null)
    el.addEventListener('close', onClose)
    return () => el.removeEventListener('close', onClose)
  }, [])

  // A click that lands on the dialog itself, not its panel, is the backdrop.
  const onBackdrop = (e) => {
    if (e.target === dialog.current) close()
  }

  return (
    <Section
      id="stores"
      number="03"
      title="Stores & sites"
      intro="Live projects I've developed or maintained — Shopify first, then the WordPress years."
    >
      <Reveal>
        {/* phones: a grid of tiles */}
        <div className="grid grid-cols-2 gap-3 sm:hidden">
          {cards.map((card, i) => (
            <Tile key={card.name} s={card} i={i} onOpen={open} />
          ))}
        </div>

        {/* everything wider: the slider, where the cards have room to speak */}
        <div className="hidden sm:block">
          <Slider items={cards} label="Stores and sites" nameOf={(c) => c.name} slideClass="sm:w-[46%] lg:w-[31%]" align="stretch">
            {(card, i) => <Postcard s={card} i={i} />}
          </Slider>
        </div>
      </Reveal>

      <dialog ref={dialog} onClick={onBackdrop} aria-label="Project details" className="sheet m-auto w-[min(92vw,420px)]">
        {s && (
          <div className="relative border border-line bg-base p-6 text-left shadow-[0_24px_60px_-20px_rgb(32_34_35/0.45)]">
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] bg-brand" />

            <div className="flex items-start justify-between gap-4">
              <PlatformChip>{s.platform}</PlatformChip>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="-mr-1 -mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-rule font-mono text-[15px] leading-none text-muted transition-colors duration-300 active:border-brand active:text-brand"
              >
                ×
              </button>
            </div>

            <h3 className="m-0 mt-4 text-[22px] font-bold leading-tight tracking-[-0.02em] text-ink">{s.name}</h3>
            {s.note && <p className="m-0 mt-1 font-mono text-[11px] text-muted">{s.note}</p>}
            {s.desc && <p className="m-0 mt-3 text-[14.5px] leading-relaxed text-muted">{s.desc}</p>}

            <div className="mt-5">
              {s.url ? <VisitLink url={s.url} /> : <p className="m-0 font-mono text-[12px] text-ash">No live link.</p>}
            </div>
          </div>
        )}
      </dialog>
    </Section>
  )
}
