import { useEffect, useRef, useState } from 'react'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const hasFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

/** Returns [ref, inView]: inView flips to true once the element scrolls into view. */
export function useReveal() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, inView]
}

/** Counts from 0 to `to` once `start` is true. */
export function useCountUp(to, start, duration = 1600) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    if (prefersReducedMotion()) {
      setValue(to)
      return
    }
    let raf
    let t0
    const tick = (ts) => {
      t0 ??= ts
      const p = Math.min((ts - t0) / duration, 1)
      const eased = to * (1 - Math.pow(1 - p, 3))
      // Keep one decimal for fractional targets like 4.5, whole numbers otherwise.
      setValue(Number.isInteger(to) ? Math.round(eased) : Math.round(eased * 10) / 10)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, start, duration])
  return value
}
