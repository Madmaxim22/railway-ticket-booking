import { useEffect, useMemo, useState } from 'react'
import type { Carriage, CarriageType, TrainOption } from '../types'
import ChangeTrainIcon from '../icons/ChangeTrainIcon'
import './SeatSelectionTrainCard.css'
import { CarriageTypeTabsSection } from './sections/CarriageTypeTabsSection.tsx'
import { SeatSchemeSection } from './sections/SeatSchemeSection.tsx'
import { TicketsSection } from './sections/TicketsSection.tsx'
import { TrainRouteSection } from './sections/TrainRouteSection.tsx'
import { WagonsSection } from './sections/WagonsSection.tsx'
import FarePriceIcon from '../../../shared/icons/FarePriceIcon'

type SeatSelectionTrainCardProps = {
  train: TrainOption
  isReturn?: boolean
}

export function SeatSelectionTrainCard({ train, isReturn = false }: SeatSelectionTrainCardProps) {
  const [activeType, setActiveType] = useState<CarriageType>(() => train.carriages[0]?.type ?? 'coupe')
  const [draftSelectedSeats, setDraftSelectedSeats] = useState<number[]>([])
  const availableTypes = useMemo(
    () => new Set(train.carriages.map((carriage) => carriage.type)),
    [train.carriages]
  )
  const filteredCarriages = useMemo(
    () => train.carriages.filter((carriage) => carriage.type === activeType),
    [train.carriages, activeType]
  )

  const [selectedCarriageId, setSelectedCarriageId] = useState<string | null>(
    filteredCarriages[0]?.id ?? null
  )

  useEffect(() => {
    if (!filteredCarriages.length) {
      setSelectedCarriageId(null)
      return
    }

    setSelectedCarriageId((prev) =>
      prev && filteredCarriages.some((carriage) => carriage.id === prev)
        ? prev
        : filteredCarriages[0].id
    )
  }, [filteredCarriages])

  const selectedCarriage: Carriage | null = useMemo(() => {
    const byId = filteredCarriages.find((carriage) => carriage.id === selectedCarriageId)
    return byId ?? filteredCarriages[0] ?? null
  }, [filteredCarriages, selectedCarriageId])

  const selectedSeatsTotal = useMemo(() => {
    if (!selectedCarriage || draftSelectedSeats.length === 0) {
      return 0
    }

    const getSeatPrice = (seatNumber: number) => {
      if (selectedCarriage.type === 'seated') {
        return selectedCarriage.bottomPrice
      }

      if (selectedCarriage.type === 'lux') {
        return selectedCarriage.luxPrice ?? selectedCarriage.bottomPrice
      }

      if (selectedCarriage.sidePrice && seatNumber > 32) {
        return selectedCarriage.sidePrice
      }

      return seatNumber % 2 === 0 ? selectedCarriage.topPrice : selectedCarriage.bottomPrice
    }

    return draftSelectedSeats.reduce((total, seatNumber) => total + getSeatPrice(seatNumber), 0)
  }, [selectedCarriage, draftSelectedSeats])

  const handleTypeChange = (type: CarriageType) => {
    setActiveType(type)
    const firstCarriageId =
      train.carriages.find((carriage) => carriage.type === type)?.id ?? null
    setSelectedCarriageId(firstCarriageId)
    setDraftSelectedSeats([])
  }

  const handleCarriageSelect = (carriageId: string) => {
    setSelectedCarriageId(carriageId)
    setDraftSelectedSeats([])
  }

  const handleSeatToggle = (seatNumber: number) => {
    setDraftSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((seat) => seat !== seatNumber)
        : [...prev, seatNumber].sort((a, b) => a - b)
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
        <button type="button" className="seat-selection-page__card-header-button">
          Выбрать другой поезд
        </button>
      </div>

      <TrainRouteSection train={train} />
      <TicketsSection />
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
        selectedSeats={draftSelectedSeats}
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
