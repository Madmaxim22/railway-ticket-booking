import './TrainCard.css'
import TrainRouteIcon from '@/shared/ui/icons/TrainRouteIcon'
import RouteArrowIcon from '@/shared/ui/icons/RouteArrowIcon'
import TripArrowIcon from '@/shared/ui/icons/TripArrowIcon'
import FarePriceIcon from '@/shared/ui/icons/FarePriceIcon'
import AmenitiesIconWiFi from '@/shared/ui/icons/amenities/AmenitiesIconWiFi'
import AmenitiesIconExpress from '@/shared/ui/icons/amenities/AmenitiesIconExpress'
import AmenitiesIconFoot from '@/shared/ui/icons/amenities/AmenitiesIconFoot'
import FareCountTooltip from './FareCountTooltip'

export default function TrainCard() {

  const trainNumber = '116С'
  const departureCityTrain = 'Адлер'
  const arrivalCityTrain = 'Санкт-Петербург'
  const departureCityPassenger = 'Москва'
  const arrivalCityPassenger = 'Санкт-Петербург'
  const trainDuration = '8:32'
  const trainDurationReturn = '8:32'
  const trainDeparture = '10:00'
  const trainArrival = '12:00'
  const trainDepartureReturn = '00:41'
  const trainArrivalReturn = '09:13'
  const trainStationDeparture = 'Ленинградский вокзал'
  const trainStationArrival = 'Ладожский вокзал'

  return (
    <article className="train-card">
      <section className="train-card__route">
        <TrainRouteIcon className="train-card__route-icon" />
        <p className="train-card__train-number">{trainNumber}</p>
        <div className="train-card__route-path">
          <p className="train-card__train-route-city">{departureCityTrain}</p>
          <RouteArrowIcon className="train-card__arrow" />
          <p className="train-card__train-route-city train-card__train-route-city-active">{departureCityPassenger}</p>
          <RouteArrowIcon className="train-card__arrow-active" />
          <p className="train-card__train-route-city train-card__train-route-city-active">{arrivalCityPassenger}</p>
          <RouteArrowIcon className="train-card__arrow" />
          <p className="train-card__train-route-city">{arrivalCityTrain}</p>
        </div>
      </section>
      <section className="train-card__schedule">
      <div className="train-card__trip">
        <div className="train-card__departure">
          <div className="train-card__time">{trainDeparture}</div>
          <div className="train-card__city">{departureCityPassenger}</div>
          <div className="train-card__station">{trainStationDeparture}</div>
        </div>
        <div className="train-card__duration">
          <span className="train-card__duration-value">{trainDuration}</span>
          <TripArrowIcon className="train-card__arrow-icon" />
        </div>
        <div className="train-card__arrival">
          <div className="train-card__time">{trainArrival}</div>
          <div className="train-card__city">{arrivalCityPassenger}</div>
          <div className="train-card__station">{trainStationArrival}</div>
        </div>
      </div>

      {/* обратный рейс */}
      <div className="train-card__trip train-card__trip--return">
        <div className="train-card__departure">
          <div className="train-card__time">{trainDepartureReturn}</div>
          <div className="train-card__city">{arrivalCityPassenger}</div>
          <div className="train-card__station">{trainStationArrival}</div>
        </div>
        <div className="train-card__duration">
          <span className="train-card__duration-value">{trainDurationReturn}</span>
          <TripArrowIcon className="train-card__arrow-icon" reverse />
        </div>
        <div className="train-card__arrival">
          <div className="train-card__time">{trainArrivalReturn}</div>
          <div className="train-card__city">{departureCityPassenger}</div>
          <div className="train-card__station">{trainStationDeparture}</div>
        </div>
      </div>  

      </section>

      <section className="train-card__prices">
        <div className="train-card__fare-row">
          <span className="train-card__fare-type">Плацкарт</span>
          <FareCountTooltip
            count={52}
            upperCount={19}
            upperPrice="2 920"
            lowerCount={5}
            lowerPrice="3 530"
          />
          <span className="train-card__fare-from">от</span>
          <span className="train-card__fare-price">2 530</span>
          <FarePriceIcon className="train-card__fare-price-icon" />
        </div>
        <div className="train-card__fare-row">
          <span className="train-card__fare-type">Купе</span>
          <FareCountTooltip
            count={24}
            upperCount={19}
            upperPrice="2 920"
            lowerCount={5}
            lowerPrice="3 530"
          />
          <span className="train-card__fare-from">от</span>
          <span className="train-card__fare-price">3 820</span>
          <FarePriceIcon className="train-card__fare-price-icon" />
        </div>
        <div className="train-card__fare-row">
          <span className="train-card__fare-type">Люкс</span>
          <FareCountTooltip
            count={15}
            upperCount={19}
            upperPrice="2 920"
            lowerCount={5}
            lowerPrice="3 530"
          />
          <span className="train-card__fare-from">от</span>
          <span className="train-card__fare-price">4 950</span>
          <FarePriceIcon className="train-card__fare-price-icon" />
        </div>
        <div className="train-card__prices-bottom">
          <div className="train-card__amenities">
            <AmenitiesIconWiFi className="train-card__amenities-icon" />
            <AmenitiesIconExpress className="train-card__amenities-icon" />
            <AmenitiesIconFoot className="train-card__amenities-icon" />
          </div>

          <div className="train-card__booking-button">
            <button className="train-card__booking-button-text">Выбрать места</button>
          </div>
        </div>
      </section>
    </article>
  )
}