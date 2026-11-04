import { useCallback, useEffect, useRef, useState } from 'react'

const Arrow = ({ dir }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={dir === 'prev' ? 'M14.5 5 8 12l6.5 7' : 'M9.5 5 16 12l-6.5 7'} />
  </svg>
)

/**
 * Horizontal slider built on native scroll snapping, so drag, swipe and
 * momentum come from the browser rather than from gesture code.
 * `items` are rendered by `children(item, index)`.
 */
export default function Slider({
  items,
  children,
  label,
  slideClass = 'w-full md:w-[88%] lg:w-[80%]',
  nameOf = (it) => it.name,
  // 'stretch' makes every card the height of the tallest one in view — right
  // for a deck of equal postcards, wrong for cards of very different lengths.
  align = 'start',
}) {
  const track = useRef(null)
  const [active, setActive] = useState(0)
  const last = items.length - 1

  // Read the active card off the real scroll position, so dragging stays in
  // step with the arrows and dots.
  const sync = useCallback(() => {
    const el = track.current
    if (!el) return
    const step = el.scrollWidth / items.length
    setActive(Math.min(last, Math.max(0, Math.round(el.scrollLeft / step))))
  }, [items.length, last])

  useEffect(() => {
    const el = track.current
    if (!el) return
    el.addEventListener('scroll', sync, { passive: true })
    return () => el.removeEventListener('scroll', sync)
  }, [sync])

  const goTo = (i) => {
    const el = track.current
    if (!el) return
    const step = el.scrollWidth / items.length
    el.scrollTo({ left: Math.min(last, Math.max(0, i)) * step })
  }

  const onKeyDown = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    goTo(active + (e.key === 'ArrowRight' ? 1 : -1))
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="m-0 font-mono text-[11px] uppercase tracking-[0.16em] text-ash">
          {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </p>
        <div className="flex items-center gap-2">
          {['prev', 'next'].map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => goTo(dir === 'prev' ? active - 1 : active + 1)}
              disabled={dir === 'prev' ? active === 0 : active === last}
              aria-label={`${dir === 'prev' ? 'Previous' : 'Next'} — ${label}`}
              className="grid size-9 place-items-center rounded-full border border-rule text-ink transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-on-brand disabled:pointer-events-none disabled:opacity-30"
            >
              <Arrow dir={dir} />
            </button>
          ))}
        </div>
      </div>

      <div
        ref={track}
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className={`slider-track -mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-1 ${
          align === 'stretch' ? 'items-stretch' : 'items-start'
        }`}
      >
        {items.map((item, i) => (
          <div
            key={nameOf(item)}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}: ${nameOf(item)}`}
            className={`shrink-0 snap-center ${slideClass}`}
          >
            {children(item, i)}
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {items.map((item, i) => (
          <button
            key={nameOf(item)}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to ${nameOf(item)}`}
            aria-current={i === active}
            className={`h-1.5 rounded-full transition-[width,background-color] duration-400 ease-out-soft ${
              i === active ? 'w-7 bg-brand' : 'w-1.5 bg-rule hover:bg-ash'
            }`}
          />
        ))}
      </div>
    </>
  )
}
