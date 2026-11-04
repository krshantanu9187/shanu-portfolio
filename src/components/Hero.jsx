import { useEffect, useRef, useState } from 'react'
import { facts, profile } from '../data/portfolio'
import { hasFinePointer, prefersReducedMotion } from '../hooks/useMotion'
import Counter from './Counter'
import Frame from './Frame'
import Magnetic from './Magnetic'
import Reveal from './Reveal'

/** Shows a Liquid tag first, then "renders" it into the real headline. */
function TypedHeadline({ text }) {
  const [phase, setPhase] = useState('liquid') // liquid → typing → done
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setPhase('done')
      setCount(text.length)
      return
    }
    const t = setTimeout(() => setPhase('typing'), 1200)
    return () => clearTimeout(t)
  }, [text])

  useEffect(() => {
    if (phase !== 'typing') return
    if (count >= text.length) {
      const t = setTimeout(() => setPhase('done'), 2000)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setCount((c) => c + 1), 30)
    return () => clearTimeout(t)
  }, [phase, count, text])

  return (
    <h1 aria-label={text} className="m-0 min-h-[2.2em] text-[clamp(38px,6.2vw,76px)] font-bold leading-[1.04] tracking-[-0.035em]">
      <span aria-hidden="true">
        {phase === 'liquid' ? (
          <span className="font-mono text-[.55em] font-normal tracking-[-0.01em] text-ash">{'{{ dev.tagline }}'}</span>
        ) : (
          text.slice(0, count)
        )}
        {phase !== 'done' && <span className="ml-[.04em] inline-block h-[.8em] w-[.06em] animate-blink bg-brand align-[-.06em]" />}
      </span>
    </h1>
  )
}

/* The snippet below is the real shape of the stock-projection work: a metafield
   holding daily run rate, inventory divided by it, a badge when cover is short. */
const D = ({ children }) => <span className="t-del">{children}</span>
const K = ({ children }) => <span className="t-kw">{children}</span>
const O = ({ children }) => <span className="t-obj">{children}</span>

const codeLines = [
  <span className="t-com">{'{% comment %} stock badge · ops {% endcomment %}'}</span>,
  <>
    <D>{'{% liquid'}</D>
  </>,
  <>
    {'  '}<K>assign</K> <O>drr</O> = <O>product.metafields.ops.drr</O>
  </>,
  <>
    {'  '}<K>assign</K> <O>cover</O> = <O>product.inventory_quantity</O>
  </>,
  <>
    {'    '}| <K>divided_by</K>: <O>drr</O>
  </>,
  <D>{'%}'}</D>,
  '',
  <>
    <D>{'{% if'}</D> <O>cover</O> {'< 14 '}<D>{'%}'}</D>
  </>,
  <>
    {'  '}<span className="t-txt">{'<span class='}</span>
    <span className="t-str">{'"badge badge--low"'}</span>
    <span className="t-txt">{'>'}</span>
  </>,
  <>
    {'    '}<span className="t-txt">Reorder in </span>
    <D>{'{{'}</D> <O>cover</O> <D>{'}}'}</D>
    <span className="t-txt"> days</span>
  </>,
  <>
    {'  '}<span className="t-txt">{'</span>'}</span>
  </>,
  <>
    <D>{'{% endif %}'}</D>
  </>,
]

/** An editor pane — the hero's second column, in place of a photo. */
function CodeCard() {
  return (
    <div className="code-card overflow-hidden rounded-xl border border-[var(--code-line)] shadow-[0_18px_40px_-16px_rgb(32_34_35/0.45)]">
      <div className="flex items-center gap-2 border-b border-[var(--code-line)] px-4 py-2.5">
        <span className="size-1.5 shrink-0 rounded-full bg-brand" />
        <span className="truncate font-mono text-[11.5px] text-[#9BA3A8]">sections/stock-badge.liquid</span>
        <span className="ml-auto shrink-0 rounded border border-[var(--code-line)] px-1.5 py-px font-mono text-[10px] uppercase tracking-[0.1em] text-[#6B7478]">
          Liquid
        </span>
      </div>

      <pre className="m-0 overflow-x-auto px-4 py-4 font-mono text-[11px] leading-[1.75] sm:text-[12.5px]">
        <code>
          {codeLines.map((line, i) => (
            <span key={i} className="block whitespace-pre">
              <span className="ln mr-4 inline-block w-4 text-right">{i + 1}</span>
              {line}
              {i === codeLines.length - 1 && (
                <span aria-hidden="true" className="ml-1 inline-block h-[1em] w-[7px] animate-blink bg-brand align-[-0.15em]" />
              )}
            </span>
          ))}
        </code>
      </pre>

      <div className="flex items-center gap-2 border-t border-[var(--code-line)] px-4 py-2.5 font-mono text-[11px] text-[#6B7478]">
        <span className="size-1.5 shrink-0 animate-pulse-dot rounded-full bg-brand" />
        theme check <span className="text-[#7FE0C0]">0 errors</span>
        <span className="ml-auto">735 SKUs</span>
      </div>
    </div>
  )
}

export default function Hero() {
  const blobs = useRef(null)

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return
    const move = (e) => {
      const x = (e.clientX / innerWidth - 0.5) * 36
      const y = (e.clientY / innerHeight - 0.5) * 36
      blobs.current.style.transform = `translate(${x}px, ${y}px)`
    }
    addEventListener('mousemove', move)
    return () => removeEventListener('mousemove', move)
  }, [])

  return (
    <div id="top" className="relative isolate">
      <div ref={blobs} aria-hidden="true" className="pointer-events-none absolute -inset-x-[10vw] -top-20 bottom-0 -z-10 overflow-hidden transition-transform duration-700 ease-out">
        <div className="absolute right-[6%] -top-16 size-[320px] animate-drift-1 rounded-full bg-[#5DCFA9] opacity-[0.12] blur-[100px] sm:size-[520px] sm:opacity-[0.2]" />
        <div className="absolute -bottom-24 left-[10%] size-[260px] animate-drift-2 rounded-full bg-[#008060] opacity-[0.08] blur-[100px] sm:size-[400px] sm:opacity-[0.12]" />
      </div>
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-40" />

      <div className="mx-auto max-w-[1120px] px-6 pb-14 pt-16 sm:pt-24">
        <Reveal as="p" className="mb-2 font-mono text-[13px] uppercase tracking-[0.18em] text-ash">
          {profile.role}
        </Reveal>
        <TypedHeadline text={profile.headline} />

        <div className="mt-10 grid items-start gap-10 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal as="p" delay={0.2} className="max-w-[36em] text-[17px] text-muted">
              {profile.intro}
            </Reveal>
            <Reveal delay={0.35} className="mt-8 flex flex-wrap gap-3">
              <Magnetic href="#contact" variant="primary">
                <span className="mr-2.5 inline-block size-2 animate-ping-soft rounded-full bg-current" />
                Get in touch
              </Magnetic>
              <Magnetic href="#ask">Ask my AI about me</Magnetic>
            </Reveal>
            <Reveal delay={0.45} as="address" className="mt-8 font-mono text-[13px] not-italic leading-relaxed text-muted">
              <span className="block">{profile.location}</span>
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="block no-underline hover:text-ink">{profile.phone}</a>
              <a href={`mailto:${profile.email}`} className="block no-underline hover:text-ink">{profile.email}</a>
            </Reveal>
          </div>

          <Reveal delay={0.3} className="w-full min-w-0 md:ml-auto md:max-w-[440px]">
            <CodeCard />
          </Reveal>
        </div>
      </div>

      {/* Stat band — the resume's four-cell strip, crosshairs and all */}
      <div className="mx-auto max-w-[1120px] px-6 pb-16">
        <Frame as="dl" className="m-0 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f, i) => (
            <Reveal key={i} delay={i * 0.12} className="bg-base px-6 py-7">
              <dt className="text-[clamp(26px,3vw,34px)] font-bold leading-none tracking-[-0.02em] text-brand">
                {f.value != null ? <Counter to={f.value} suffix={f.suffix} /> : f.text}
              </dt>
              <dd className="m-0 mt-2 text-sm leading-snug text-muted">{f.label}</dd>
            </Reveal>
          ))}
        </Frame>
      </div>
    </div>
  )
}
