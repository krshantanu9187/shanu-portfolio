import { useEffect, useRef } from 'react'
import { hasFinePointer, prefersReducedMotion } from '../hooks/useMotion'

/** A crosshair that trails the mouse and opens up over links and cards. */
export default function Cursor() {
  const ring = useRef(null)
  const dot = useRef(null)

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return
    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my, raf
    const move = (e) => {
      mx = e.clientX
      my = e.clientY
      dot.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
      ring.current.dataset.big = e.target.closest('a, button, [data-cursor]') ? '1' : ''
    }
    const loop = () => {
      cx += (mx - cx) * 0.15
      cy += (my - cy) * 0.15
      ring.current.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    ring.current.style.opacity = dot.current.style.opacity = '1'
    addEventListener('mousemove', move)
    loop()
    return () => {
      removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={ring}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] size-8 border border-ash opacity-0 transition-[width,height,background-color,border-color] duration-300 ease-out-soft data-[big=1]:size-16 data-[big=1]:border-brand data-[big=1]:bg-ash/10"
      />
      <div ref={dot} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[61] size-1 bg-ash opacity-0" />
    </>
  )
}
