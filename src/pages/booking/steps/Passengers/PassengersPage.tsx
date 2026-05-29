import './PassengersPage.css'

import { useAppSelector } from '@/store/hooks'
import { selectBookingTicketCounts } from '@/store/slices/bookingSlice'

import { PassengerCard } from './PassengerCard'
import { getPassengerCardTitle } from './passengers.types'
import { usePassengersForm } from './usePassengersForm'

export default function PassengersPage() {
  const ticketCounts = useAppSelector(selectBookingTicketCounts)
  const {
    passengers,
    isPassengerOpen,
    toggleOpen,
    updatePassenger,
    goToNextPassenger,
    getFooterState,
    errorsByPassengerId,
  } = usePassengersForm()

  return (
    <div className="passengers-page">
      {passengers.map((p, i) => (
        <PassengerCard
          key={p.id}
          passenger={p}
          title={getPassengerCardTitle(i, p.category, ticketCounts)}
          isOpen={isPassengerOpen(p.id)}
          onToggleOpen={() => toggleOpen(p.id)}
          onChange={updatePassenger}
          onNextPassenger={goToNextPassenger}
          errors={errorsByPassengerId[p.id]}
          footerState={getFooterState(p.id)}
        />
      ))}

      <footer className="passengers-page__footer">
        <button type="button" className="next-page-btn">
          Далее
        </button>
      </footer>
    </div>
  )
}
