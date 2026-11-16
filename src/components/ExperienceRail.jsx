import { useCallback, useEffect, useRef, useState } from 'react'
import { experience } from '../data/portfolio'
import { prefersReducedMotion } from '../hooks/useMotion'
import Frame from './Frame'
import Reveal from './Reveal'
import Section from './Section'

const startYear = (when) => (when.match(/\d{4}/) || ['—'])[0]

/* How much page scroll the sideways run costs. Below 1 the roles move faster
   than the page does, which keeps the pinned stretch from dragging on. */
const PACE = 0.75

/**
 * Roles run horizontally, newest first. On a wide screen the section pins
 * itself and the page's own scroll drives the run — once the last role is in,
 * the pin releases and the page carries on down. Narrow screens keep the plain
 * swipe slider, where a pin would fight the user's thumb.
 *
 * The year rail above is both the progress indicator and the jump control.
 */
export default function ExperienceRail() {
  const wrap = useRef(null)
  const track = useRef(null)
  const [active, setActive] = useState(0)
  const [pinned, setPinned] = useState(false)
  const [dist, setDist] = useState(0)
  const last = experience.length - 1

  // Decide whether to pin, and how much height the run needs. Re-measured on
  // resize because the card widths are percentages.
  useEffect(() => {
    const el = track.current
    if (!el) return
    const measure = () => {
      const pin = matchMedia('(min-width: 1024px)').matches && !prefersReducedMotion()
      setPinned(pin)
      setDist(pin ? Math.max(240, Math.round((el.scrollWidth - el.clientWidth) * PACE)) : 0)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Pinned: the page's scroll position is the only thing that moves the track.
  useEffect(() => {
    if (!pinned || !dist) return
    let ticking = false
    const update = () => {
      ticking = false
      const w = wrap.current
      const el = track.current
      if (!w || !el) return
      const p = Math.min(1, Math.max(0, -w.getBoundingClientRect().top / dist))
      el.scrollLeft = p * (el.scrollWidth - el.clientWidth)
      setActive(Math.round(p * last))
    }
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    }
    addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => removeEventListener('scroll', onScroll)
  }, [pinned, dist, last])

  // Not pinned: the track scrolls itself, so read the active role back off it.
  const sync = useCallback(() => {
    const el = track.current
    if (!el) return
    const step = el.scrollWidth / experience.length
    setActive(Math.min(last, Math.max(0, Math.round(el.scrollLeft / step))))
  }, [last])

  useEffect(() => {
    const el = track.current
    if (!el || pinned) return
    el.addEventListener('scroll', sync, { passive: true })
    return () => el.removeEventListener('scroll', sync)
  }, [sync, pinned])

  /* Jumping to a year means jumping to the page scroll that lands on it while
     pinned, and scrolling the track itself otherwise. */
  const goTo = (i) => {
    const el = track.current
    const w = wrap.current
    const n = Math.min(last, Math.max(0, i))
    if (!el) return
    if (pinned && w) {
      const top = w.getBoundingClientRect().top + scrollY
      scrollTo({ top: top + (n / last) * dist, behavior: 'smooth' })
    } else {
      el.scrollTo({ left: n * (el.scrollWidth / experience.length) })
    }
  }

  const onKeyDown = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    goTo(active + (e.key === 'ArrowRight' ? 1 : -1))
  }

  return (
    <Section
      id="experience"
      number="04"
      title="Experience"
      intro="Most recent first — keep scrolling, or jump straight to a year."
    >
      {/* spacer: its extra height is the runway the pinned block scrolls through */}
      <div ref={wrap} style={pinned ? { height: `calc(100vh + ${dist}px)` } : undefined}>
        <div className={pinned ? 'sticky top-0 flex h-screen flex-col justify-center' : ''}>
          <Reveal>
            {/* the rail */}
            <div className="relative mb-9">
              <span aria-hidden="true" className="absolute inset-x-0 top-[5px] h-px bg-line" />
              <span
                aria-hidden="true"
                className="absolute left-0 top-[5px] h-px bg-brand transition-[width] duration-400 ease-out-soft"
                style={{ width: `${(active / last) * 100}%` }}
              />

              <ol className="relative m-0 flex list-none justify-between p-0">
                {experience.map((e, i) => (
                  <li key={e.role}>
                    <button
                      type="button"
                      data-cursor
                      onClick={() => goTo(i)}
                      aria-current={i === active}
                      aria-label={`Jump to ${e.role}`}
                      className="group flex flex-col items-center gap-2.5 bg-transparent"
                    >
                      <span
                        aria-hidden="true"
                        className={`size-[11px] border transition-all duration-400 ease-out-soft group-hover:scale-125 ${
                          i === active
                            ? 'rotate-45 border-brand bg-brand'
                            : i < active
                              ? 'border-brand bg-brand'
                              : 'border-rule bg-base'
                        }`}
                      />
                      <span
                        className={`font-mono text-[13px] tracking-[0.06em] transition-colors duration-300 group-hover:text-brand ${
                          i === active ? 'font-medium text-brand' : 'text-ash'
                        }`}
                      >
                        {startYear(e.when)}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            {/* the roles — snapping and self-scrolling only when not pinned */}
            <div
              ref={track}
              role="group"
              aria-roledescription="carousel"
              aria-label="Experience"
              tabIndex={0}
              onKeyDown={onKeyDown}
              className={`slider-track -mx-1 flex items-stretch gap-5 px-1 pb-1 ${
                pinned ? 'overflow-x-hidden' : 'snap-x snap-mandatory overflow-x-auto'
              }`}
            >
              {experience.map((e, i) => (
                <div
                  key={e.role}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${experience.length}: ${e.role}`}
                  className="w-full shrink-0 snap-center md:w-[70%] lg:w-[46%]"
                >
                  <Frame
                    as="article"
                    data-cursor
                    className="group relative flex h-full flex-col border border-line p-6 glow-card sm:p-8"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-[3px] origin-bottom scale-y-0 bg-brand transition-transform duration-500 ease-out-soft group-hover:scale-y-100"
                    />

                    <p className="m-0 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ash">
                      {i === 0 && (
                        <span className="inline-flex items-center gap-1.5 border border-brand/35 bg-brand/5 px-1.5 py-0.5 text-brand">
                          <span aria-hidden="true" className="size-1.5 animate-ping-soft rounded-full bg-brand" />
                          Now
                        </span>
                      )}
                      <span>{e.when}</span>
                    </p>

                    <h3 className="m-0 mt-3 text-[clamp(20px,2.3vw,26px)] font-bold leading-tight tracking-[-0.02em] transition-colors duration-300 group-hover:text-brand">
                      {e.role}
                    </h3>
                    {e.where && <p className="m-0 mt-1.5 font-mono text-[12px] text-ash">{e.where}</p>}

                    <p className="m-0 mt-4 max-w-[70ch] text-[15px] leading-relaxed text-muted">{e.desc}</p>
                  </Frame>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
