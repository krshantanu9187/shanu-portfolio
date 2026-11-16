import { useEffect, useRef } from 'react'
import { hasFinePointer, prefersReducedMotion } from '../hooks/useMotion'

/* Blocks the torch widens over and lifts with a glow. Deliberately only real
   prose — lighting up every span would make the whole page shimmer. */
const TEXT = 'h1, h2, h3, h4, p, dt, dd, li, blockquote, pre'

/**
 * The pointer: angle brackets around a dot that open over anything clickable,
 * plus a pool of light that follows the pointer and rests on whatever text it
 * is over. Skipped entirely on touch and when reduced motion is asked for.
 */
export default function Cursor() {
  const ptr = useRef(null)
  const dot = useRef(null)
  const torch = useRef(null)

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return

    let mx = innerWidth / 2
    let my = innerHeight / 2
    let cx = mx
    let cy = my
    let raf
    let lit = null

    const light = (el) => {
      if (el === lit) return
      lit?.classList.remove('torch-lit')
      el?.classList.add('torch-lit')
      lit = el
    }

    const move = (e) => {
      mx = e.clientX
      my = e.clientY

      // the dot and the torch sit on the real pointer; only the brackets lag
      dot.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
      ptr.current.dataset.big = e.target.closest('a, button, [data-cursor]') ? '1' : ''

      const t = torch.current
      t.style.setProperty('--tx', `${mx}px`)
      t.style.setProperty('--ty', `${my}px`)
      t.dataset.on = '1'

      const text = e.target.closest(TEXT)
      t.style.setProperty('--tr', text ? '300px' : '200px')
      light(text)
    }

    const leave = () => {
      torch.current.dataset.on = ''
      light(null)
    }

    const loop = () => {
      cx += (mx - cx) * 0.15
      cy += (my - cy) * 0.15
      ptr.current.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }

    ptr.current.style.opacity = dot.current.style.opacity = '1'
    addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    loop()

    return () => {
      removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
      cancelAnimationFrame(raf)
      light(null)
    }
  }, [])

  return (
    <>
      <div ref={torch} aria-hidden="true" className="torch" />
      <div
        ref={ptr}
        aria-hidden="true"
        className="ptr pointer-events-none fixed left-0 top-0 z-[60] flex items-center gap-[12px] font-mono text-[19px] leading-none opacity-0"
      >
        <b>&lt;</b>
        <b>&gt;</b>
      </div>
      <div ref={dot} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[61] size-1 bg-brand opacity-0" />
    </>
  )
}
