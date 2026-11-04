import { builds } from '../data/portfolio'
import Accordion from './Accordion'
import Counter from './Counter'
import Reveal from './Reveal'
import Section from './Section'

export default function Builds() {
  return (
    <Section
      id="builds"
      number="02"
      title="Key challenges"
      intro="The problems that actually took thinking — at Estailo Fashion and Bella Vita Organic. Mostly paid apps replaced with custom builds, or ops teams given numbers they could act on. Open one for how it was solved."
    >
      <Reveal>
        <Accordion
          items={builds}
          id="challenge"
          nameOf={(b) => b.title}
          defaultOpen={0}
          header={(b, i, isOpen) => (
            <>
              <span className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ash">
                <span className="border border-brand/30 bg-brand/5 px-1.5 py-0.5 text-brand">{b.brand}</span>
                <span>
                  C/{String(i + 1).padStart(2, '0')} · {b.tag}
                </span>
              </span>

              <span className="mt-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <span
                  className={`text-[clamp(18px,2.1vw,24px)] font-bold leading-tight tracking-[-0.02em] transition-colors duration-300 group-hover:text-brand ${
                    isOpen ? 'text-brand' : ''
                  }`}
                >
                  {b.title}
                </span>
                <span className="shrink-0 text-right">
                  <b className="text-[19px] font-bold leading-none tracking-[-0.02em] text-brand">
                    {b.stat.value != null ? <Counter to={b.stat.value} suffix={b.stat.suffix} /> : b.stat.text}
                  </b>
                  <span className="ml-2 font-mono text-[11px] text-muted">{b.stat.label}</span>
                </span>
              </span>
            </>
          )}
          panel={(b) => (
            <dl className="m-0 grid max-w-[76ch] gap-x-8 gap-y-3">
              {b.rows.map((row) => (
                <div key={row.label} className="grid gap-x-6 gap-y-1 sm:grid-cols-[130px_1fr]">
                  <dt className="font-mono text-[13px] text-ash">{row.label}</dt>
                  <dd className="m-0 text-[15px] leading-relaxed text-muted">{row.value}</dd>
                </div>
              ))}
            </dl>
          )}
        />
      </Reveal>
    </Section>
  )
}
