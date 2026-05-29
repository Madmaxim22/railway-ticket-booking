import type { SeatSelectionTicketCounts, TicketCountKey } from '../../constants'
import './TicketsSection.css'

type TicketsSectionProps = {
  counts: SeatSelectionTicketCounts
  activeKey: TicketCountKey
  onActiveKeyChange: (key: TicketCountKey) => void
  onCycle: (key: TicketCountKey) => void
  isAtMax: (key: TicketCountKey) => boolean
  remainingHint: (key: TicketCountKey) => string | null
}

const COUNTERS: Array<{
  key: TicketCountKey
  label: (counts: SeatSelectionTicketCounts) => string
}> = [
  { key: 'adults', label: (c) => `Взрослых - ${c.adults}` },
  { key: 'children', label: (c) => `Детских - ${c.children}` },
  {
    key: 'childrenWithoutSeat',
    label: (c) => `Детских «без места» — ${c.childrenWithoutSeat}`,
  },
]

export function TicketsSection({
  counts,
  activeKey,
  onActiveKeyChange,
  onCycle,
  isAtMax,
  remainingHint,
}: TicketsSectionProps) {
  return (
    <div className="seat-selection-page__tickets">
      <h2 className="seat-selection-page__section-title">Количество билетов</h2>
      <div className="seat-selection-page__counters">
        {COUNTERS.map(({ key, label }) => {
          const hint = remainingHint(key)
          const isActive = activeKey === key
          const atMax = isAtMax(key)

          return (
            <button
              key={key}
              type="button"
              className={`seat-selection-page__counter${isActive ? ' seat-selection-page__counter--active' : ''}${atMax ? ' seat-selection-page__counter--max' : ''}`}
              onClick={() => {
                onActiveKeyChange(key)
                onCycle(key)
              }}
              aria-label={`${label(counts)}. Нажмите, чтобы изменить количество`}
            >
              <span className="seat-selection-page__counter-label">{label(counts)}</span>
              <p className="seat-selection-page__counter-hint">{hint ?? ''}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
