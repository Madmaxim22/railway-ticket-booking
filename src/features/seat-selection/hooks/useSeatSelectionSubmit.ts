import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { readFromConfirmationFlag } from '@/features/booking-flow/lib/bookingEditNavigation'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  selectBooking,
  setBookingPricing,
  setSeatSelections,
} from '@/store/slices/bookingSlice'

import { getTotalPassengerCount, type SeatSelectionTicketCounts } from '../constants'
import type { TrainSelectionState } from '../lib/buildSelectionByTrainId'
import {
  calculateBookingPassengerPrices,
  type TrainSeatSelection,
} from '../lib/seatSelectionPricing'
import { validateSeatSelection } from '../lib/validateSeatSelection'
import type { TrainOption } from '../types'

type UseSeatSelectionSubmitParams = {
  trains: TrainOption[]
  selectionByTrainId: Record<string, TrainSelectionState>
  selectedSeatsByTrainId: Record<string, number[]>
  ticketCounts: SeatSelectionTicketCounts
  setSeatSelectionHint: (hint: string | null) => void
}

export function useSeatSelectionSubmit({
  trains,
  selectionByTrainId,
  selectedSeatsByTrainId,
  ticketCounts,
  setSeatSelectionHint,
}: UseSeatSelectionSubmitParams) {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const booking = useAppSelector(selectBooking)
  const fromConfirmation = readFromConfirmationFlag(location.state)

  const handleChangeTrain = useCallback(() => {
    navigate('/booking/trains')
  }, [navigate])

  const handleNext = useCallback(() => {
    const validationMessage = validateSeatSelection(
      trains,
      selectedSeatsByTrainId,
      ticketCounts,
    )

    if (validationMessage) {
      setSeatSelectionHint(validationMessage)
      return
    }

    setSeatSelectionHint(null)

    const seatSelections: Record<string, TrainSeatSelection> = Object.fromEntries(
      Object.entries(selectionByTrainId).map(([trainId, { carriageId, seats }]) => [
        trainId,
        { carriageId, seats },
      ]),
    )

    const pricing = calculateBookingPassengerPrices(trains, seatSelections, ticketCounts)
    dispatch(setBookingPricing(pricing))

    const departureTrain = trains[0]
    const returnTrain = trains[1]
    const departureSelection = departureTrain ? seatSelections[departureTrain.id] : undefined

    if (!departureSelection) {
      setSeatSelectionHint(
        'Не удалось сохранить выбранные места. Попробуйте выбрать места снова.',
      )
      return
    }

    dispatch(
      setSeatSelections({
        departure: departureSelection,
        ...(returnTrain && seatSelections[returnTrain.id]
          ? { returnTrip: seatSelections[returnTrain.id] }
          : {}),
      }),
    )

    if (fromConfirmation) {
      const passengersMatchTickets =
        booking.passengers.length === getTotalPassengerCount(ticketCounts)

      navigate(
        passengersMatchTickets ? '/booking/confirmation' : '/booking/passengers',
        passengersMatchTickets ? undefined : { state: { fromConfirmation: true } },
      )
      return
    }

    navigate('/booking/passengers')
  }, [
    trains,
    selectedSeatsByTrainId,
    ticketCounts,
    setSeatSelectionHint,
    selectionByTrainId,
    dispatch,
    fromConfirmation,
    booking.passengers.length,
    navigate,
  ])

  return {
    handleChangeTrain,
    handleNext,
  }
}
