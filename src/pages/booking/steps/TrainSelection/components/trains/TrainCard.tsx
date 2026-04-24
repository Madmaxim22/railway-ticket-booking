import './TrainCard.css'
import TrainRouteIcon from './icons/TrainRouteIcon'
import RouteArrowIcon from './icons/RouteArrowIcon'
import TripArrowIcon from './icons/TripArrowIcon'
import FarePriceIcon from './icons/FarePriceIcon'
import AmenitiesIconOne from './icons/AmenitiesIconOne'
import AmenitiesIconTwo from './icons/AmenitiesIconTwo'
import AmenitiesIconThree from './icons/AmenitiesIconThree'

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
          <p className="train-card__train-route-city">{departureCityPassenger}</p>
          <RouteArrowIcon className="train-card__arrow-active" />
          <p className="train-card__train-route-city">{arrivalCityPassenger}</p>
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
          <span className="train-card__fare-count">52</span>
          <span className="train-card__fare-from">от</span>
          <span className="train-card__fare-price">2 530</span>
          <FarePriceIcon className="train-card__fare-price-icon" />
        </div>
        <div className="train-card__fare-row">
          <span className="train-card__fare-type">Купе</span>
          <span className="train-card__fare-count">24</span>
          <span className="train-card__fare-from">от</span>
          <span className="train-card__fare-price">3 820</span>
          <FarePriceIcon className="train-card__fare-price-icon" />
        </div>
        <div className="train-card__fare-row">
          <span className="train-card__fare-type">Люкс</span>
          <span className="train-card__fare-count">15</span>
          <span className="train-card__fare-from">от</span>
          <span className="train-card__fare-price">4 950</span>
          <FarePriceIcon className="train-card__fare-price-icon" />
        </div>
        <div className="train-card__prices-bottom">
          <div className="train-card__amenities">
            <AmenitiesIconOne className="train-card__amenities-icon" />
            <AmenitiesIconTwo />
            <AmenitiesIconThree />
          </div>

          <div className="train-card__booking-button">
            <button className="train-card__booking-button-text">Выбрать места</button>
          </div>
        </div>
      </section>
    </article>
  )
}