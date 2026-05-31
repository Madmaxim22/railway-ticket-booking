import { useCallback, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { readFromConfirmationFlag } from '@/features/booking-flow/lib/bookingEditNavigation'

import './SeatSelectionPage.css'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  selectBooking,
  setBookingPricing,
  setSeatSelections,
} from '@/store/slices/bookingSlice'

import { getTotalPassengerCount } from './constants'
import { SeatSelectionTrainCard } from './components/SeatSelectionTrainCard'
import {
  buildSelectionByTrainId,
  type TrainSelectionState,
} from './lib/buildSelectionByTrainId'
import {
  calculateBookingPassengerPrices,
  type TrainSeatSelection,
} from './lib/seatSelectionPricing'
import { validateSeatSelection } from './lib/validateSeatSelection'
import type { CarriageType } from './types'
import { useSeatSelectionTrains } from './hooks/useSeatSelectionTrains'
import { useTicketCounts } from './hooks/useTicketCounts'

function getActiveTypeForCarriage(
  train: { carriages: Array<{ id: string; type: CarriageType }> },
  carriageId: string,
): CarriageType {
  return train.carriages.find((carriage) => carriage.id === carriageId)?.type ?? 'coupe'
}

export function SeatSelectionPageContainer() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const booking = useAppSelector(selectBooking)
  const fromConfirmation = readFromConfirmationFlag(location.state)
  const { trains, isLoading, isError, errorMessage, isMissingNavigation } =
    useSeatSelectionTrains()
  const {
    counts: ticketCounts,
    activeKey,
    setActiveKey,
    cycleTicketCount,
    isAtMax,
    remainingHint,
  } = useTicketCounts()
  const [selectionByTrainId, setSelectionByTrainId] = useState<Record<string, TrainSelectionState>>(
    {},
  )
  const [seatSelectionHint, setSeatSelectionHint] = useState<string | null>(null)

  const departureSegmentId = booking.departure?.segment._id
  const returnSegmentId = booking.returnTrip?.segment._id

  const selectionSeedSignature = [
    trains.map((train) => train.id).join(','),
    departureSegmentId ?? '',
    returnSegmentId ?? '',
    booking.departureSeats?.carriageId ?? '',
    booking.departureSeats?.seats.join(',') ?? '',
    booking.returnTripSeats?.carriageId ?? '',
    booking.returnTripSeats?.seats.join(',') ?? '',
  ].join('|')

  const [lastSelectionSeedSignature, setLastSelectionSeedSignature] = useState('')

  if (trains.length > 0 && selectionSeedSignature !== lastSelectionSeedSignature) {
    setLastSelectionSeedSignature(selectionSeedSignature)
    setSelectionByTrainId((prev) =>
      buildSelectionByTrainId({
        trains,
        departureSegmentId,
        returnSegmentId,
        departureSeats: booking.departureSeats,
        returnTripSeats: booking.returnTripSeats,
        previous: prev,
      }),
    )
  }

  const selectedSeatsByTrainId = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(selectionByTrainId).map(([trainId, selection]) => [
          trainId,
          selection.seats,
        ]),
      ),
    [selectionByTrainId],
  )

  const updateTrainSelection = useCallback(
    (trainId: string, patch: Partial<TrainSelectionState>) => {
      setSelectionByTrainId((prev) => {
        const current = prev[trainId]
        if (!current) return prev
        return { ...prev, [trainId]: { ...current, ...patch } }
      })
      setSeatSelectionHint(null)
    },
    [],
  )

  const handleTicketCycle = useCallback(
    (key: Parameters<typeof cycleTicketCount>[0]) => {
      cycleTicketCount(key)
      setSeatSelectionHint(null)
    },
    [cycleTicketCount],
  )

  const handleChangeTrain = () => {
    navigate('/booking/trains')
  }

  const handleNext = () => {
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
      setSeatSelectionHint('Не удалось сохранить выбранные места. Попробуйте выбрать места снова.')
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
  }

  if (isMissingNavigation) {
    return (
      <div className="seat-selection-page">
        <h1 className="seat-selection-page__title">выбор мест</h1>
        <p className="seat-selection-page__error" role="alert">
          Сначала выберите поезд на предыдущем шаге.
        </p>
      </div>
    )
  }

  return (
    <div className="seat-selection-page">
      <h1 className="seat-selection-page__title">выбор мест</h1>

      {isError && (
        <p className="seat-selection-page__error" role="alert">
          {errorMessage}
        </p>
      )}

      {isLoading && trains.length === 0 && (
        <p className="seat-selection-page__loading">Загрузка мест…</p>
      )}

      {trains.map((train, index) => {
        const selection = selectionByTrainId[train.id]
        if (!selection) return null

        return (
          <SeatSelectionTrainCard
            key={train.id}
            train={train}
            isReturn={index === 1}
            activeType={selection.activeType}
            onActiveTypeChange={(activeType) => updateTrainSelection(train.id, { activeType })}
            selectedCarriageId={selection.carriageId}
            onCarriageSelect={(carriageId) =>
              updateTrainSelection(train.id, {
                carriageId,
                activeType: getActiveTypeForCarriage(train, carriageId),
                seats: [],
              })
            }
            selectedSeats={selection.seats}
            onSelectedSeatsChange={(seats) => updateTrainSelection(train.id, { seats })}
            showTicketsSection={index === 0}
            ticketsSectionProps={{
              counts: ticketCounts,
              activeKey,
              onActiveKeyChange: setActiveKey,
              onCycle: handleTicketCycle,
              isAtMax,
              remainingHint,
            }}
            onChangeTrain={handleChangeTrain}
          />
        )
      })}

      {seatSelectionHint && (
        <p className="seat-selection-page__hint" role="alert">
          {seatSelectionHint}
        </p>
      )}

      <button
        type="button"
        className="seat-selection-page__next-button"
        disabled={isLoading}
        onClick={handleNext}
      >
        Далее
      </button>
    </div>
  )
}
