import './SeatSelectionPage.css'

import { useAppSelector } from '@/store/hooks'
import { selectBooking } from '@/store/slices/bookingSlice'

import { SeatSelectionTrainCard } from './components/SeatSelectionTrainCard'
import { useSeatSelectionState } from './hooks/useSeatSelectionState'
import { useSeatSelectionSubmit } from './hooks/useSeatSelectionSubmit'
import { useSeatSelectionTrains } from './hooks/useSeatSelectionTrains'
import { useTicketCounts } from './hooks/useTicketCounts'

export function SeatSelectionPageContainer() {
  const booking = useAppSelector(selectBooking)
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

  const departureSegmentId = booking.departure?.segment._id
  const returnSegmentId = booking.returnTrip?.segment._id

  const {
    selectionByTrainId,
    selectedSeatsByTrainId,
    seatSelectionHint,
    setSeatSelectionHint,
    clearSeatSelectionHint,
    updateTrainSelection,
    selectCarriage,
  } = useSeatSelectionState({
    trains,
    departureSegmentId,
    returnSegmentId,
    departureSeats: booking.departureSeats,
    returnTripSeats: booking.returnTripSeats,
  })

  const { handleChangeTrain, handleNext } = useSeatSelectionSubmit({
    trains,
    selectionByTrainId,
    selectedSeatsByTrainId,
    ticketCounts,
    setSeatSelectionHint,
  })

  const handleTicketCycle = (key: Parameters<typeof cycleTicketCount>[0]) => {
    cycleTicketCount(key)
    clearSeatSelectionHint()
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
            onCarriageSelect={(carriageId) => selectCarriage(train, train.id, carriageId)}
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
