import { useRef } from 'react'
import { hasFinePointer, prefersReducedMotion } from '../hooks/useMotion'

/* Four colour schemes. `fill` is the shape that grows from the cursor on hover,
   so `hover` has to be the colour that reads on top of `fill` — that is the bit
   that was missing: white text sat on a white fill and disappeared. */
const schemes = {
  'light-primary': {
    look: 'border-brand bg-brand text-on-brand',
    fill: 'bg-brand-bright',
    hover: 'group-hover:text-on-brand',
  },
  'light-outline': {
    look: 'border-rule text-ink hover:border-brand',
    fill: 'bg-brand',
    hover: 'group-hover:text-on-brand',
  },
  'dark-primary': {
    look: 'border-white bg-white text-brand',
    fill: 'bg-brand-bright',
    hover: 'group-hover:text-white',
  },
  'dark-outline': {
    look: 'border-white/40 text-white hover:border-white',
    fill: 'bg-white',
    hover: 'group-hover:text-brand',
  },
}

/** Square-cornered button: leans toward the cursor, fill blooms from the pointer,
    label rolls over to a second copy. */
export default function Magnetic({ href, variant = 'outline', dark = false, children, ...rest }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el || !hasFinePointer() || prefersReducedMotion()) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    // lean toward the cursor
    el.style.transform = `translate(${(x - r.width / 2) * 0.22}px, ${(y - r.height / 2) * 0.26}px)`
    // and let the fill bloom from where the cursor came in
    el.style.setProperty('--mx', `${(x / r.width) * 100}%`)
    el.style.setProperty('--my', `${(y / r.height) * 100}%`)
  }

  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = ''
  }

  const { look, fill, hover } = schemes[`${dark ? 'dark' : 'light'}-${variant === 'primary' ? 'primary' : 'outline'}`]

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative isolate inline-flex items-center overflow-hidden border px-6 py-3 text-[15px] font-medium no-underline transition-[transform,border-color] duration-300 ease-out-soft ${look}`}
      {...rest}
    >
      {/* fill: a disc that grows out of the pointer */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute left-[var(--mx,50%)] top-[var(--my,100%)] -z-10 aspect-square w-[240%] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full transition-transform duration-[560ms] ease-[cubic-bezier(.45,0,.2,1)] group-hover:scale-100 ${fill}`}
      />
      {/* label: the first copy rolls up, an identical one rides in from below */}
      <span className={`relative block overflow-hidden transition-colors delay-[40ms] duration-[280ms] ${hover}`}>
        <span className="block whitespace-nowrap transition-transform delay-[90ms] duration-[420ms] ease-[cubic-bezier(.72,0,.24,1)] group-hover:-translate-y-[115%]">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 block translate-y-[115%] whitespace-nowrap transition-transform delay-[90ms] duration-[420ms] ease-[cubic-bezier(.72,0,.24,1)] group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
    </a>
  )
}
