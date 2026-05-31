import './PassengersPage.css'

import { useLocation, useNavigate } from 'react-router-dom'

import { readFromConfirmationFlag } from '@/features/booking-flow/lib/bookingEditNavigation'
import { useAppSelector } from '@/store/hooks'
import { selectBookingTicketCounts } from '@/store/slices/bookingSlice'

import { PassengerCard } from './PassengerCard'
import { getPassengerCardTitle } from './passengers.types'
import { usePassengersForm } from './usePassengersForm'

export default function PassengersPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const fromConfirmation = readFromConfirmationFlag(location.state)
  const ticketCounts = useAppSelector(selectBookingTicketCounts)
  const {
    passengers,
    isPassengerOpen,
    toggleOpen,
    updatePassenger,
    goToNextPassenger,
    getFooterState,
    errorsByPassengerId,
    submit,
  } = usePassengersForm()

  const handleNext = () => {
    if (!submit()) return
    navigate(fromConfirmation ? '/booking/confirmation' : '/booking/payment')
  }

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
        <button type="button" className="next-page-btn" onClick={handleNext}>
          Далее
        </button>
      </footer>
    </div>
  )
}
