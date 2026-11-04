import { useState } from 'react'

/**
 * A list that opens one row at a time. `header` and `panel` render the item;
 * the panel's height animates from 0fr to 1fr, so it fits whatever is inside.
 */
export default function Accordion({ items, id, header, panel, nameOf = (it) => it.name, defaultOpen = null }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <ul className="m-0 list-none border-t border-line p-0">
      {items.map((item, i) => {
        const isOpen = open === i
        const panelId = `${id}-panel-${i}`

        return (
          <li key={nameOf(item)} className="relative border-b border-line">
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-y-0 left-0 w-[2px] origin-bottom bg-brand transition-transform duration-400 ease-out-soft ${
                isOpen ? 'scale-y-100' : 'scale-y-0'
              }`}
            />

            <button
              type="button"
              data-cursor
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="group flex w-full items-start gap-x-4 bg-transparent px-3 py-4 text-left sm:px-4"
            >
              <span className="min-w-0 flex-1">{header(item, i, isOpen)}</span>
              <span
                aria-hidden="true"
                className={`mt-1 shrink-0 font-mono text-[15px] leading-none text-ash transition-[transform,color] duration-400 ease-out-soft group-hover:text-brand ${
                  isOpen ? 'rotate-45 text-brand' : ''
                }`}
              >
                +
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              className={`grid transition-[grid-template-rows,opacity] duration-450 ease-out-soft ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-3 pb-6 sm:px-4">{panel(item, i)}</div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
