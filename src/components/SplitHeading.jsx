import { useReveal } from '../hooks/useMotion'

/** Heading whose words slide up one after another. */
export default function SplitHeading({ as: Tag = 'h2', text, className = '', id }) {
  const [ref, inView] = useReveal()
  return (
    <Tag ref={ref} id={id} aria-label={text} className={`${inView ? 'in' : ''} ${className}`}>
      {text.split(' ').map((word, i) => (
        <span key={i} aria-hidden="true">
          <span className="split-word">
            <i style={{ transitionDelay: `${i * 0.07}s` }}>{word}</i>
          </span>{' '}
        </span>
      ))}
    </Tag>
  )
}
