import { useState } from 'react'

import BackIcon from '@/shared/ui/icons/BackIcon'
import CloseToggleIcon from '@/shared/ui/icons/CloseToggleIcon'
import FarePriceIcon from '@/shared/ui/icons/FarePriceIcon'
import ForthIcon from '@/shared/ui/icons/ForthIcon'
import OpenToggleIcon from '@/shared/ui/icons/OpenToggleIcon'
import PassengersIcon from '@/shared/ui/icons/PassengersIcon'
import { formatRoutePrice } from '@/shared/lib/routeFormatters'
import { useAppSelector } from '@/store/hooks'
import { selectTripSummaryViewModel } from '@/store/selectors/tripSummarySelectors'

import { TripSummaryDirectionSection } from './TripSummaryDirectionSection'
import './TripSummary.css'

function formatPassengerCountLabel(count: number, one: string, few: string, many: string): string {
  const mod10 = count % 10
  const mod100 = count % 100
  if (mod10 === 1 && mod100 !== 11) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few
  return many
}

export default function TripSummary() {
  const viewModel = useAppSelector(selectTripSummaryViewModel)
  const [isPassengersOpen, setIsPassengersOpen] = useState(false)

  const { hasBooking, departureLeg, returnLeg, ticketCounts, passengerPrices, totalPrice } =
    viewModel

  if (!hasBooking || !departureLeg) {
    return (
      <aside className="trip-summary">
        <h2 className="trip-summary__title">Детали поездки</h2>
        <p className="trip-summary__empty">Выберите поезд на предыдущем шаге.</p>
      </aside>
    )
  }

  const passengerRows: Array<{ count: number; label: string; price: number }> = []

  if (ticketCounts.adults > 0) {
    passengerRows.push({
      count: ticketCounts.adults,
      label: formatPassengerCountLabel(
        ticketCounts.adults,
        'Взрослый',
        'Взрослых',
        'Взрослых',
      ),
      price: passengerPrices.adults,
    })
  }
  if (ticketCounts.children > 0) {
    passengerRows.push({
      count: ticketCounts.children,
      label: formatPassengerCountLabel(ticketCounts.children, 'Ребенок', 'Ребенка', 'Детей'),
      price: passengerPrices.children,
    })
  }
  if (ticketCounts.childrenWithoutSeat > 0) {
    passengerRows.push({
      count: ticketCounts.childrenWithoutSeat,
      label: formatPassengerCountLabel(
        ticketCounts.childrenWithoutSeat,
        'ребёнок без места',
        'ребёнка без места',
        'детей без места',
      ),
      price: passengerPrices.childrenWithoutSeat,
    })
  }

  return (
    <aside className="trip-summary">
      <h2 className="trip-summary__title">Детали поездки</h2>

      <TripSummaryDirectionSection
        title="Туда"
        dateLabel={viewModel.departureDateLabel}
        leg={departureLeg}
        icon={<BackIcon className="trip-summary__icon" />}
      />

      {returnLeg && (
        <TripSummaryDirectionSection
          title="Обратно"
          dateLabel={viewModel.returnDateLabel}
          leg={returnLeg}
          icon={<ForthIcon className="trip-summary__icon" />}
          reverseArrow
        />
      )}

      <div
        className={`trip-summary__direction-section${isPassengersOpen ? ' trip-summary__direction-section--open' : ''}`}
      >
        <div className="trip-summary__content">
          <PassengersIcon className="trip-summary__icon" />
          <div className="trip-summary__direction-title-container">
            <p className="trip-summary__direction-title">Пассажиры</p>
          </div>

          <button
            type="button"
            className="trip-summary__button"
            onClick={() => setIsPassengersOpen((prev) => !prev)}
            aria-expanded={isPassengersOpen}
          >
            {isPassengersOpen ? (
              <OpenToggleIcon className="trip-summary__icon-open" />
            ) : (
              <CloseToggleIcon className="trip-summary__icon-close" />
            )}
          </button>
        </div>

        {isPassengersOpen && (
          <div className="trip-summary__direction-section-content">
            <div className="trip-summary__passengers-list">
              {passengerRows.map((row) => (
                <p key={`${row.label}-${row.count}`} className="trip-summary__passengers-item">
                  <span className="trip-summary__passengers-item-count">
                    <span className="trip-summary__passengers-item-count-value">{row.count}</span>
                    <span className="trip-summary__passengers-item-count-text"> {row.label}</span>
                  </span>
                  <span className="trip-summary__passengers-item-price">
                    <span className="trip-summary__passengers-item-price-value">
                      {formatRoutePrice(row.price)}
                    </span>
                    <span className="trip-summary__passengers-item-price-currency">
                      <FarePriceIcon className="trip-summary__passengers-item-icon" />
                    </span>
                  </span>
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="trip-summary__total-price">
        <p className="trip-summary__total-price-title">Итого</p>
        <p className="trip-summary__total-price-value">{formatRoutePrice(totalPrice)}</p>
        <span className="trip-summary__total-price-currency">
          <FarePriceIcon className="trip-summary__total-price-icon" />
        </span>
      </div>
    </aside>
  )
}
