import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const ref = useRef(null)
  useEffect(() => {
    let ticking = false
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight
      ref.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    }
    addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed left-0 top-0 z-50 h-0.5 w-full origin-left scale-x-0 bg-brand shadow-[0_0_14px_rgb(30_167_253/0.85)]"
    />
  )
}
