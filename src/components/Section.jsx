import Reveal from './Reveal'
import SplitHeading from './SplitHeading'

/** Section header in the resume's style: icon-free title, rule, number on the right. */
export default function Section({ id, title, number, intro, children, first = false }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={`py-20 ${first ? '' : 'border-t border-line'}`}>
      <div className="mb-3 flex items-end justify-between gap-6">
        <SplitHeading
          id={`${id}-h`}
          text={title}
          className="m-0 text-[clamp(28px,4vw,44px)] font-bold uppercase leading-[1.05] tracking-[-0.02em]"
        />
        {number && <span className="shrink-0 pb-1 font-mono text-sm text-muted">{number}</span>}
      </div>
      <div className="mb-8 h-px w-full bg-rule/60" />
      {intro && (
        <Reveal as="p" className="mb-10 max-w-[38em] text-muted">
          {intro}
        </Reveal>
      )}
      {children}
    </section>
  )
}
