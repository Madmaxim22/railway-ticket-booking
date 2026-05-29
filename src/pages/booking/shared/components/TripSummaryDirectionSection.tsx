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
    <div className="trip-summary__direction-section">
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
          <p className="trip-summary__trip-number">
            № Поезда
            <span className="trip-summary__trip-number-value">{leg.trainNumber}</span>
          </p>
          <p className="trip-summary__train-name">
            Название
            <span className="trip-summary__train-name-value">
              <span>{leg.fromCity}</span>
              <br />
              <span>{leg.toCity}</span>
            </span>
          </p>
          <div className="trip-summary__train-info">
            <div className="trip-summary__train-info-time-duration">
              <p className="trip-summary__time">{leg.duration}</p>
            </div>
            <div className="trip-summary__time-direction">
              <p className="trip-summary__train-info-item-departure">
                <span className="trip-summary__train-info-item-title">{leg.departureTime}</span>
                <span className="trip-summary__train-info-item-value">{leg.departureDate}</span>
              </p>
              <TripArrowIcon className="trip-summary__train-info-icon" reverse={reverseArrow} />
              <p className="trip-summary__train-info-item-arrival">
                <span className="trip-summary__train-info-item-title">{leg.arrivalTime}</span>
                <span className="trip-summary__train-info-item-value">{leg.arrivalDate}</span>
              </p>
            </div>
            <div className="trip-summary__station-direction">
              <p className="trip-summary__train-info-item-departure">
                <span className="trip-summary__train-info-item-city">{leg.departureCity}</span>
                <span className="trip-summary__train-info-item-station">{leg.departureStation}</span>
              </p>
              <p className="trip-summary__train-info-item-arrival">
                <span className="trip-summary__train-info-item-city">{leg.arrivalCity}</span>
                <span className="trip-summary__train-info-item-station">{leg.arrivalStation}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
