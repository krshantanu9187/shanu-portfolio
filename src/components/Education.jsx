import { education, languages } from '../data/portfolio'
import Reveal from './Reveal'
import Section from './Section'

export default function Education() {
  return (
    <Section id="education" number="06" title="Education" intro={`I speak ${languages}.`}>
      <div className="border-t border-line">
        {education.map((e) => (
          <Reveal key={e.what} className="grid gap-1 border-b border-line py-6 sm:grid-cols-[180px_1fr] sm:gap-6">
            <div className="pt-1 font-mono text-[12px] uppercase tracking-[0.08em] text-muted">{e.when}</div>
            <div>
              <h3 className="m-0 text-[20px] font-bold tracking-[-0.015em]">{e.what}</h3>
              <p className="mt-1.5 text-[15px] text-muted">{e.where}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
