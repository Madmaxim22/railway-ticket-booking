import { useMemo } from 'react'
import type { ComponentProps } from 'react'

import FarePriceIcon from '@/shared/ui/icons/FarePriceIcon'
import type { Carriage, CarriageType, TrainOption } from '../types'
import {
  calculateCarriageSeatsTotal,
} from '../lib/seatSelectionPricing'
import ChangeTrainIcon from '../icons/ChangeTrainIcon'
import './SeatSelectionTrainCard.css'
import { CarriageTypeTabsSection } from './sections/CarriageTypeTabsSection.tsx'
import { SeatSchemeSection } from './sections/SeatSchemeSection.tsx'
import { TicketsSection } from './sections/TicketsSection.tsx'
import { TrainRouteSection } from './sections/TrainRouteSection.tsx'
import { WagonsSection } from './sections/WagonsSection.tsx'

type SeatSelectionTrainCardProps = {
  train: TrainOption
  isReturn?: boolean
  activeType: CarriageType
  onActiveTypeChange: (type: CarriageType) => void
  selectedCarriageId: string | null
  onCarriageSelect: (carriageId: string) => void
  selectedSeats: number[]
  onSelectedSeatsChange: (seats: number[]) => void
  showTicketsSection?: boolean
  ticketsSectionProps?: ComponentProps<typeof TicketsSection>
  onChangeTrain?: () => void
}

export function SeatSelectionTrainCard({
  train,
  isReturn = false,
  activeType,
  onActiveTypeChange,
  selectedCarriageId,
  onCarriageSelect,
  selectedSeats,
  onSelectedSeatsChange,
  showTicketsSection = false,
  ticketsSectionProps,
  onChangeTrain,
}: SeatSelectionTrainCardProps) {
  const availableTypes = useMemo(
    () => new Set(train.carriages.map((carriage) => carriage.type)),
    [train.carriages],
  )
  const filteredCarriages = useMemo(
    () => train.carriages.filter((carriage) => carriage.type === activeType),
    [train.carriages, activeType],
  )

  const selectedCarriage: Carriage | null = useMemo(() => {
    const byId = filteredCarriages.find((carriage) => carriage.id === selectedCarriageId)
    return byId ?? filteredCarriages[0] ?? null
  }, [filteredCarriages, selectedCarriageId])

  const selectedSeatsTotal = useMemo(() => {
    if (!selectedCarriage || selectedSeats.length === 0) {
      return 0
    }
    return calculateCarriageSeatsTotal(selectedCarriage, selectedSeats)
  }, [selectedCarriage, selectedSeats])

  const handleTypeChange = (type: CarriageType) => {
    onActiveTypeChange(type)
    const firstCarriage = train.carriages.find((carriage) => carriage.type === type)
    if (firstCarriage) {
      onCarriageSelect(firstCarriage.id)
    }
    onSelectedSeatsChange([])
  }

  const handleCarriageSelect = (carriageId: string) => {
    onCarriageSelect(carriageId)
    onSelectedSeatsChange([])
  }

  const handleSeatToggle = (seatNumber: number) => {
    onSelectedSeatsChange(
      selectedSeats.includes(seatNumber)
        ? selectedSeats.filter((seat) => seat !== seatNumber)
        : [...selectedSeats, seatNumber].sort((a, b) => a - b),
    )
  }

  return (
    <article className="seat-selection-page__card">
      <div
        className={`seat-selection-page__card-header${
          isReturn ? ' seat-selection-page__card-header--return' : ''
        }`}
      >
        <ChangeTrainIcon
          className={`seat-selection-page__card-header-icon${
            isReturn ? ' seat-selection-page__card-header-icon--return' : ''
          }`}
        />
        <button
          type="button"
          className="seat-selection-page__card-header-button"
          onClick={onChangeTrain}
        >
          Выбрать другой поезд
        </button>
      </div>

      <TrainRouteSection train={train} />
      {showTicketsSection && ticketsSectionProps ? (
        <TicketsSection {...ticketsSectionProps} />
      ) : null}
      <CarriageTypeTabsSection
        activeType={activeType}
        onTypeChange={handleTypeChange}
        availableTypes={availableTypes}
      />
      <WagonsSection
        carriages={filteredCarriages}
        selectedCarriageId={selectedCarriage?.id ?? null}
        onCarriageSelect={handleCarriageSelect}
      />
      <SeatSchemeSection
        selectedCarriage={selectedCarriage}
        selectedSeats={selectedSeats}
        onSeatToggle={handleSeatToggle}
      />
      <div className="seat-selection-page__selected-seats-summary">
        <p className="seat-selection-page__selected-seats-summary-price">
          {selectedSeatsTotal.toLocaleString('ru-RU')}
          <FarePriceIcon className="seat-selection-page__fare-price-icon" />
        </p>
      </div>
    </article>
  )
}
