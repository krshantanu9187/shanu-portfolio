import { useCountUp, useReveal } from '../hooks/useMotion'

export default function Counter({ to, suffix = '' }) {
  const [ref, inView] = useReveal()
  const value = useCountUp(to, inView)
  const decimals = Number.isInteger(to) ? 0 : 1
  return (
    <span ref={ref}>
      {value.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}
