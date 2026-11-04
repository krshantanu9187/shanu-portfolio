import { useCallback, useEffect, useRef, useState } from 'react'
import { experience } from '../data/portfolio'
import Frame from './Frame'
import Reveal from './Reveal'
import Section from './Section'

const startYear = (when) => (when.match(/\d{4}/) || ['—'])[0]

/**
 * Roles scroll horizontally, newest first. The year rail above doubles as the
 * progress indicator and the jump-to control.
 */
export default function ExperienceRail() {
  const track = useRef(null)
  const [active, setActive] = useState(0)
  const last = experience.length - 1

  const sync = useCallback(() => {
    const el = track.current
    if (!el) return
    const step = el.scrollWidth / experience.length
    setActive(Math.min(last, Math.max(0, Math.round(el.scrollLeft / step))))
  }, [last])

  useEffect(() => {
    const el = track.current
    if (!el) return
    el.addEventListener('scroll', sync, { passive: true })
    return () => el.removeEventListener('scroll', sync)
  }, [sync])

  const goTo = (i) => {
    const el = track.current
    if (!el) return
    const step = el.scrollWidth / experience.length
    el.scrollTo({ left: Math.min(last, Math.max(0, i)) * step })
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
      intro="Most recent first — scroll sideways, or jump to a year."
    >
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

        {/* the roles */}
        <div
          ref={track}
          role="group"
          aria-roledescription="carousel"
          aria-label="Experience"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="slider-track -mx-1 flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto px-1 pb-1"
        >
          {experience.map((e, i) => (
            <div
              key={e.role}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${experience.length}: ${e.role}`}
              className="w-full shrink-0 snap-center md:w-[88%] lg:w-[82%]"
            >
              <Frame
                as="article"
                data-cursor
                className="group relative flex h-full flex-col border border-line p-6 transition-[border-color,box-shadow] duration-400 ease-out-soft hover:border-ash hover:shadow-[0_20px_40px_-26px_rgb(32_34_35/0.4)] sm:p-8"
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
    </Section>
  )
}
