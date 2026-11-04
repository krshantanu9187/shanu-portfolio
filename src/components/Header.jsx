import { useEffect, useState } from 'react'
import { profile } from '../data/portfolio'

const links = [
  { href: '#ask', label: 'Ask my AI', always: true },
  { href: '#builds', label: 'Challenges' },
  { href: '#stores', label: 'Stores' },
  { href: '#experience', label: 'Experience' },
]

export default function Header() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let last = 0
    const onScroll = () => {
      const y = scrollY
      setHidden(y > last && y > 200)
      last = y
    }
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-10 border-b border-line bg-base/85 backdrop-blur-md transition-transform duration-400 ease-out-soft ${hidden ? '-translate-y-[110%]' : ''}`}
    >
      <div className="mx-auto flex h-[68px] max-w-[1120px] items-center justify-between gap-4 px-6">
        <a href="#top" className="font-mono text-[15px] font-medium uppercase tracking-[0.12em] no-underline">
          {profile.logo}
          <span className="inline-block animate-pulse-dot text-ash">.</span>
        </a>
        <nav aria-label="Main" className="flex items-center gap-6 font-mono text-[13px] uppercase tracking-[0.08em]">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative text-muted no-underline after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 hover:text-ink hover:after:origin-left hover:after:scale-x-100 ${l.always ? 'inline' : 'hidden sm:inline'}`}
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="font-medium text-brand no-underline">
            Hire me
          </a>
        </nav>
      </div>
    </header>
  )
}
