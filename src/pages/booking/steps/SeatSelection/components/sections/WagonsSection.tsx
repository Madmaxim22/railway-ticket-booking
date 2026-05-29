import FarePriceIcon from '@/shared/ui/icons/FarePriceIcon'
import ServiceCupIcon from '@/pages/booking/steps/SeatSelection/icons/ServiceCupIcon'
import ServiceSnowflakeIcon from '@/pages/booking/steps/SeatSelection/icons/ServiceSnowflakeIcon'
import ServiceTrainIcon from '@/pages/booking/steps/SeatSelection/icons/ServiceTrainIcon'
import ServiceWifiIcon from '@/pages/booking/steps/SeatSelection/icons/ServiceWifiIcon'
import type { Carriage } from '@/pages/booking/steps/SeatSelection/types'
import './WagonsSection.css'

type WagonsSectionProps = {
  carriages: Carriage[]
  selectedCarriageId: string | null
  onCarriageSelect: (carriageId: string) => void
}

function formatWagonNumber(number: number) {
  return String(number).padStart(2, '0')
}

function getSeatStats(carriage: Carriage) {
  const availableSeats = carriage.seats.filter((seat) => !carriage.unavailableSeats.includes(seat))
  const topSeats = availableSeats.filter((seat) => seat % 2 === 0).length
  const bottomSeats = availableSeats.filter((seat) => seat % 2 !== 0).length

  return {
    total: availableSeats.length,
    top: topSeats,
    bottom: bottomSeats
  }
}

export function WagonsSection({
  carriages,
  selectedCarriageId,
  onCarriageSelect
}: WagonsSectionProps) {
  const selectedCarriage = carriages.find((carriage) => carriage.id === selectedCarriageId) ?? carriages[0]

  if (!selectedCarriage) {
    return (
      <div className="seat-selection-page__wagons-list">
        <div className="seat-selection-page__wagons-header">
          <div className="seat-selection-page__wagons-main">
            <h2 className="seat-selection-page__wagons-title">Вагоны</h2>
          </div>
        </div>
      </div>
    )
  }

  const stats = getSeatStats(selectedCarriage)

  return (
    <div className="seat-selection-page__wagons-list">
      <div className="seat-selection-page__wagons-header">
        <div className="seat-selection-page__wagons-main">
          <h2 className="seat-selection-page__wagons-title">Вагоны</h2>
          {carriages.map((carriage) => (
            <button
              key={carriage.id}
              type="button"
              className={`seat-selection-page__wagon-button ${
                carriage.id === selectedCarriage.id ? 'seat-selection-page__wagon-button--active' : ''
              }`}
              onClick={() => onCarriageSelect(carriage.id)}
            >
              {formatWagonNumber(carriage.number)}
            </button>
          ))}
        </div>
        <h2 className="seat-selection-page__wagons-note">
          Нумерация вагонов начинается с головы поезда
        </h2>
      </div>
      <div className="seat-selection-page__wagon-cards">
        <div className="seat-selection-page__wagon-card">
          <div className="seat-selection-page__wagon-number-block">
            <p className="seat-selection-page__wagon-number">{formatWagonNumber(selectedCarriage.number)}</p>
            <p className="seat-selection-page__wagon-number-caption">вагон</p>
          </div>
          <div className="seat-selection-page__wagon-seats">
            <p className="seat-selection-page__wagon-seats-total">
              Места <span className="seat-selection-page__wagon-seats-total-number">{stats.total}</span>
            </p>
            <p className="seat-selection-page__wagon-seats-top">
              Верхние <span className="seat-selection-page__wagon-seats-top-number">{stats.top}</span>
            </p>
            <p className="seat-selection-page__wagon-seats-bottom">
              Нижние <span className="seat-selection-page__wagon-seats-bottom-number">{stats.bottom}</span>
            </p>
          </div>
          <div className="seat-selection-page__wagon-prices">
            <p className="seat-selection-page__wagon-prices-title">Стоимость</p>
            <p className="seat-selection-page__wagon-price-line">
              {selectedCarriage.topPrice} <FarePriceIcon className="seat-selection-page__fare-price-icon" />
            </p>
            <p className="seat-selection-page__wagon-price-line">
              {selectedCarriage.bottomPrice} <FarePriceIcon className="seat-selection-page__fare-price-icon" />
            </p>
          </div>
          <div className="seat-selection-page__wagon-service">
            <p className="seat-selection-page__wagon-service-title">
              Обслуживание <span className="seat-selection-page__wagon-service-title-firm-name">ФПК</span>
            </p>
            <div className="seat-selection-page__wagon-service-icons">
              {selectedCarriage.haveAirConditioning && (
                <div className="seat-selection-page__wagon-service-item" tabIndex={0}>
                  <ServiceSnowflakeIcon className="seat-selection-page__wagon-service-icon" />
                  <span className="seat-selection-page__wagon-service-tooltip">кондиционер</span>
                </div>
              )}
              {selectedCarriage.haveWifi && (
                <div className="seat-selection-page__wagon-service-item" tabIndex={0}>
                  <ServiceWifiIcon className="seat-selection-page__wagon-service-icon" />
                  <span className="seat-selection-page__wagon-service-tooltip">WI-FI</span>
                </div>
              )}
              <div className="seat-selection-page__wagon-service-item" tabIndex={0}>
                <ServiceTrainIcon className="seat-selection-page__wagon-service-icon seat-selection-page__wagon-service-icon--active" />
                <span className="seat-selection-page__wagon-service-tooltip">белье</span>
              </div>
              <div className="seat-selection-page__wagon-service-item" tabIndex={0}>
                <ServiceCupIcon className="seat-selection-page__wagon-service-icon seat-selection-page__wagon-service-icon--active" />
                <span className="seat-selection-page__wagon-service-tooltip">питание</span>
              </div>
            </div>
          </div>
        </div>
        <div className="seat-selection-page__wagons-footer">
          <p className="seat-selection-page__wagons-activity">11 человек выбирают места в этом поезде</p>
        </div>
      </div>
    </div>
  )
}
