/** A region marked with the resume's crosshair corners. */
export default function Frame({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={`crosshair ${className}`} {...rest}>
      <span className="ch-b" aria-hidden="true" />
      {children}
    </Tag>
  )
}
