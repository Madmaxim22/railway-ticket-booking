import { useState, type ReactNode } from 'react'

import CloseToggleIcon from '@/shared/ui/icons/CloseToggleIcon'
import OpenToggleIcon from '@/shared/ui/icons/OpenToggleIcon'
import TripArrowIcon from '@/shared/ui/icons/TripArrowIcon'
import type { TripLegView } from '@/pages/booking/shared/lib/mapSegmentToTripLeg'

type TripSummaryDirectionSectionProps = {
  title: string
  dateLabel: string
  leg: TripLegView
  icon: ReactNode
  reverseArrow?: boolean
}

export function TripSummaryDirectionSection({
  title,
  dateLabel,
  leg,
  icon,
  reverseArrow = false,
}: TripSummaryDirectionSectionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`trip-summary__direction-section${isOpen ? ' trip-summary__direction-section--open' : ''}`}>
      <div className="trip-summary__content">
        {icon}
        <div className="trip-summary__direction-title-container">
          <p className="trip-summary__direction-title">{title}</p>
          <p className="trip-summary__direction-date">{dateLabel}</p>
        </div>

        <button
          type="button"
          className="trip-summary__button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <OpenToggleIcon className="trip-summary__icon-open" />
          ) : (
            <CloseToggleIcon className="trip-summary__icon-close" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="trip-summary__direction-section-content">
          <div className="trip-summary__meta">
            <p className="trip-summary__trip-number">
              № Поезда
              <span className="trip-summary__trip-number-value">{leg.trainNumber}</span>
            </p>
            <p className="trip-summary__route">
              <span className="trip-summary__route-label">Маршрут</span>
              <span className="trip-summary__route-value">
                {leg.fromCity} — {leg.toCity}
              </span>
            </p>
          </div>

          <div className="trip-summary__schedule">
            <div className="trip-summary__endpoint trip-summary__endpoint--departure">
              <span className="trip-summary__endpoint-time">{leg.departureTime}</span>
              <span className="trip-summary__endpoint-date">{leg.departureDate}</span>
              <span className="trip-summary__endpoint-city">{leg.departureCity}</span>
              <span className="trip-summary__endpoint-station">{leg.departureStation}</span>
            </div>

            <div className="trip-summary__schedule-middle">
              <span className="trip-summary__duration">{leg.duration}</span>
              <TripArrowIcon className="trip-summary__train-info-icon" reverse={reverseArrow} />
            </div>

            <div className="trip-summary__endpoint trip-summary__endpoint--arrival">
              <span className="trip-summary__endpoint-time">{leg.arrivalTime}</span>
              <span className="trip-summary__endpoint-date">{leg.arrivalDate}</span>
              <span className="trip-summary__endpoint-city">{leg.arrivalCity}</span>
              <span className="trip-summary__endpoint-station">{leg.arrivalStation}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
