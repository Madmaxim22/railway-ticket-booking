import type { MouseEvent } from 'react'
import SeatLayoutCoupeSvg from '@/pages/booking/steps/SeatSelection/icons/SeatLayoutCoupeSvg'
import SeatLayoutLuxSvg from '@/pages/booking/steps/SeatSelection/icons/SeatLayoutLuxSvg'
import SeatLayoutPlatzkartSvg from '@/pages/booking/steps/SeatSelection/icons/SeatLayoutPlatzkartSvg'
import SeatLayoutSittingSvg from '@/pages/booking/steps/SeatSelection/icons/SeatLayoutSittingSvg'
import type { Carriage } from '@/pages/booking/steps/SeatSelection/types'

type SeatSchemeSectionProps = {
  selectedCarriage: Carriage | null
  selectedSeats: number[]
  onSeatToggle: (seatNumber: number) => void
}

function formatWagonNumber(number: number) {
  return String(number).padStart(2, '0')
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
    </div>
  )
}
