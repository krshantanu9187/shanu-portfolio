import { useRef } from 'react'
import { skills } from '../data/portfolio'
import { hasFinePointer, prefersReducedMotion } from '../hooks/useMotion'
import Reveal from './Reveal'
import Section from './Section'

/** A skill row that tilts slightly and lights under the cursor. */
function TiltRow({ title, desc, index }) {
  const ref = useRef(null)
  const onMove = (e) => {
    if (!hasFinePointer() || prefersReducedMotion()) return
    const el = ref.current
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
    el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 4}deg) rotateY(${(px - 0.5) * 5}deg)`
  }
  const onLeave = () => (ref.current.style.transform = '')

  return (
    <div
      ref={ref}
      data-cursor
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative isolate grid gap-x-8 gap-y-1 overflow-hidden border-b border-line px-3 py-5 transition-[transform,background-color] duration-200 ease-out hover:bg-panel sm:grid-cols-[220px_1fr]"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[var(--mx,50%)] top-[var(--my,50%)] -z-10 size-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand)_18%,transparent),transparent_65%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {/* brand rule that draws itself in as the row arrives */}
      <span aria-hidden="true" className="draw-line pointer-events-none absolute inset-x-0 bottom-0 h-px bg-brand/45" />

      <h3 className="m-0 flex items-baseline gap-2 font-mono text-[13px] text-ash transition-colors duration-300 group-hover:text-brand">
        <span className="text-ash/55 transition-colors duration-300 group-hover:text-brand/60">
          S/{String(index + 1).padStart(2, '0')}
        </span>
        {title}
      </h3>
      <p className="m-0 max-w-[62ch] text-[15px] leading-relaxed text-muted transition-transform duration-400 ease-out-soft group-hover:translate-x-1">
        {desc}
      </p>
    </div>
  )
}

export default function Skills() {
  return (
    <Section id="skills" number="05" title="Technical skills" intro="Day to day, and the stuff around it.">
      <div className="border-t border-line">
        {skills.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.07}>
            <TiltRow {...s} index={i} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
