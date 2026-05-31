import { lazy, Suspense, type MouseEvent } from 'react'

import type { Carriage } from '@/features/seat-selection/types'

const SeatLayoutCoupeSvg = lazy(() => import('@/features/seat-selection/icons/SeatLayoutCoupeSvg'))
const SeatLayoutPlatzkartSvg = lazy(() => import('@/features/seat-selection/icons/SeatLayoutPlatzkartSvg'))
const SeatLayoutSittingSvg = lazy(() => import('@/features/seat-selection/icons/SeatLayoutSittingSvg'))
const SeatLayoutLuxSvg = lazy(() => import('@/features/seat-selection/icons/SeatLayoutLuxSvg'))

type SeatSchemeSectionProps = {
  selectedCarriage: Carriage | null
  selectedSeats: number[]
  onSeatToggle: (seatNumber: number) => void
}

function formatWagonNumber(number: number) {
  return String(number).padStart(2, '0')
}

function SeatSchemeFallback() {
  return <p className="seat-selection-page__loading">Загрузка схемы вагона…</p>
}

export function SeatSchemeSection({
  selectedCarriage,
  selectedSeats,
  onSeatToggle
}: SeatSchemeSectionProps) {
  if (!selectedCarriage) {
    return null
  }

  const wagonNumber = formatWagonNumber(selectedCarriage.number)
  const handleSeatClick = (_event: MouseEvent<SVGElement>, explicitSeatNumber?: number) => {
    const seatNumber = explicitSeatNumber
    
    if (!seatNumber) {
      return
    }

    if (!selectedCarriage.seats.includes(seatNumber)) {
      return
    }

    if (selectedCarriage.unavailableSeats.includes(seatNumber)) {
      return
    }

    onSeatToggle(seatNumber)
  }

  return (
    <div className="seat-selection-page__wagon-scheme">
      <Suspense fallback={<SeatSchemeFallback />}>
        {selectedCarriage.type === 'coupe' && (
          <SeatLayoutCoupeSvg
            wagonNumber={wagonNumber}
            selectedSeats={selectedSeats}
            unavailableSeats={selectedCarriage.unavailableSeats}
            onSeatClick={handleSeatClick}
          />
        )}
        {selectedCarriage.type === 'platkart' && (
          <SeatLayoutPlatzkartSvg
            wagonNumber={wagonNumber}
            selectedSeats={selectedSeats}
            unavailableSeats={selectedCarriage.unavailableSeats}
            onSeatClick={handleSeatClick}
          />
        )}
        {selectedCarriage.type === 'seated' && (
          <SeatLayoutSittingSvg
            wagonNumber={wagonNumber}
            selectedSeats={selectedSeats}
            unavailableSeats={selectedCarriage.unavailableSeats}
            onSeatClick={handleSeatClick}
          />
        )}
        {selectedCarriage.type === 'lux' && (
          <SeatLayoutLuxSvg
            wagonNumber={wagonNumber}
            selectedSeats={selectedSeats}
            unavailableSeats={selectedCarriage.unavailableSeats}
            onSeatClick={handleSeatClick}
          />
        )}
      </Suspense>
    </div>
  )
}
