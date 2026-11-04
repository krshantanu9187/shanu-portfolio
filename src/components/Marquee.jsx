import { marquee } from '../data/portfolio'

export default function Marquee() {
  const items = [...marquee, ...marquee] // doubled for a seamless loop
  return (
    <div aria-hidden="true" className="group overflow-hidden border-y border-line bg-panel py-3.5">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-mono text-sm uppercase tracking-[0.14em] group-hover:[animation-play-state:paused]">
        {items.map((word, i) => (
          <span key={i} className="inline-flex items-center gap-10 text-muted">
            {word}
            <span className="text-ash">+</span>
          </span>
        ))}
      </div>
    </div>
  )
}
