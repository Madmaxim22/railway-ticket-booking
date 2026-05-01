import { useState } from 'react'
import './TripSummary.css';
import BackIcon from '@/shared/ui/icons/BackIcon'
import ForthIcon from '@/shared/ui/icons/ForthIcon'
import CloseToggleIcon from '@/shared/ui/icons/CloseToggleIcon'
import OpenToggleIcon from '@/shared/ui/icons/OpenToggleIcon'
import TripArrowIcon from '@/shared/ui/icons/TripArrowIcon'
import FarePriceIcon from '@/shared/ui/icons/FarePriceIcon'
import PassengersIcon from '@/shared/ui/icons/PassengersIcon'

export default function TripSummary() {

  const [isThereOpen, setIsThereOpen] = useState(false)
  const [isBackOpen, setIsBackOpen] = useState(false)
  const [isPassengersOpen, setIsPassengersOpen] = useState(false)

  return (
    <aside className="trip-summary">
      <h2 className="trip-summary__title">Детали поездки</h2>
      <div className="trip-summary__direction-section">
        <div className="trip-summary__content">
          <BackIcon className="trip-summary__icon" />
          <div className="trip-summary__direction-title-container">
            <p className="trip-summary__direction-title">Туда</p>
            <p className="trip-summary__direction-date">20.04.2026</p>
          </div>

          <button type="button" className="trip-summary__button" onClick={() => setIsThereOpen((prev) => !prev)}>
            {isThereOpen ? <OpenToggleIcon className="trip-summary__icon-open" /> : <CloseToggleIcon className="trip-summary__icon-close" />}
          </button>
        </div>
        {isThereOpen && (
          <div className="trip-summary__direction-section-content">
            <p className="trip-summary__trip-number">№ Поезда 
              <span className="trip-summary__trip-number-value">116C</span>
            </p> 
            <p className="trip-summary__train-name">Название
              <span className="trip-summary__train-name-value">
                <span>Москва</span>
                <br />
                <span>Санкт-Петербург</span>
              </span>
            </p>
            <div className="trip-summary__train-info">
              <div className="trip-summary__train-info-time-duration">
                <p className="trip-summary__time">9:00</p>
              </div>
              <div className="trip-summary__time-direction">
                <p className="trip-summary__train-info-item-departure">
                  <span className="trip-summary__train-info-item-title">00:10</span>
                  <span className="trip-summary__train-info-item-value">30.08.2026</span>
                </p>
                  <TripArrowIcon className="trip-summary__train-info-icon" />
                <p className="trip-summary__train-info-item-arrival">
                  <span className="trip-summary__train-info-item-title">01:10</span>
                  <span className="trip-summary__train-info-item-value">30.08.2026</span>
                </p>
              </div>
              <div className="trip-summary__station-direction">
                <p className="trip-summary__train-info-item-departure">
                  <span className="trip-summary__train-info-item-city">Москва</span>
                  <span className="trip-summary__train-info-item-station">Киевский <br /> вокзал</span>
                </p>
                <p className="trip-summary__train-info-item-arrival">
                  <span className="trip-summary__train-info-item-city">Санкт-Петербург</span>
                  <span className="trip-summary__train-info-item-station">Ленинградский <br /> вокзал</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="trip-summary__direction-section">
        <div className="trip-summary__content">
          <ForthIcon className="trip-summary__icon" />
          <div className="trip-summary__direction-title-container">
            <p className="trip-summary__direction-title">Обратно</p>
            <p className="trip-summary__direction-date">10.05.2026</p>
          </div>

          <button type="button" className="trip-summary__button" onClick={() => setIsBackOpen((prev) => !prev)}>
            {isBackOpen ? <OpenToggleIcon className="trip-summary__icon-open" /> : <CloseToggleIcon className="trip-summary__icon-close" />}
          </button>
        </div>
        {isBackOpen && (
         <div className="trip-summary__direction-section-content">
         <p className="trip-summary__trip-number">№ Поезда 
           <span className="trip-summary__trip-number-value">116C</span>
         </p> 
         <p className="trip-summary__train-name">Название
           <span className="trip-summary__train-name-value">
             <span>Москва</span>
             <br />
             <span>Санкт-Петербург</span>
           </span>
         </p>
         <div className="trip-summary__train-info">
           <div className="trip-summary__train-info-time-duration">
             <p className="trip-summary__time">9:00</p>
           </div>
           <div className="trip-summary__time-direction">
             <p className="trip-summary__train-info-item-departure">
               <span className="trip-summary__train-info-item-title">00:10</span>
               <span className="trip-summary__train-info-item-value">30.08.2026</span>
             </p>
               <TripArrowIcon className="trip-summary__train-info-icon" reverse />
             <p className="trip-summary__train-info-item-arrival">
               <span className="trip-summary__train-info-item-title">01:10</span>
               <span className="trip-summary__train-info-item-value">30.08.2026</span>
             </p>
           </div>
           <div className="trip-summary__station-direction">
             <p className="trip-summary__train-info-item-departure">
               <span className="trip-summary__train-info-item-city">Москва</span>
               <span className="trip-summary__train-info-item-station">Киевский <br /> вокзал</span>
             </p>
             <p className="trip-summary__train-info-item-arrival">
               <span className="trip-summary__train-info-item-city">Санкт-Петербург</span>
               <span className="trip-summary__train-info-item-station">Ленинградский <br /> вокзал</span>
             </p>
           </div>
         </div>
       </div>
        )}
      </div>
      <div className="trip-summary__direction-section">
        <div className="trip-summary__content">
          <PassengersIcon className="trip-summary__icon" />
          <div className="trip-summary__direction-title-container">
            <p className="trip-summary__direction-title">Пассажиры</p>
          </div>

          <button type="button" className="trip-summary__button" onClick={() => setIsPassengersOpen((prev) => !prev)}>
            {isPassengersOpen ? <OpenToggleIcon className="trip-summary__icon-open" /> : <CloseToggleIcon className="trip-summary__icon-close " />}
          </button>
        </div>
        {isPassengersOpen && (
          <div className="trip-summary__direction-section-content">
            <div className="trip-summary__passengers-list">
              <p className="trip-summary__passengers-item">
                <span className="trip-summary__passengers-item-count">
                  <span className="trip-summary__passengers-item-count-value">2</span>
                  <span className="trip-summary__passengers-item-count-text"> Взрослых</span>
                </span> 
                <span className="trip-summary__passengers-item-price">
                  <span className="trip-summary__passengers-item-price-value"> 5840 </span>
                  <span className="trip-summary__passengers-item-price-currency"> 
                  <FarePriceIcon className="trip-summary__passengers-item-icon" />
                  </span>
                </span>
              </p>
              <p className="trip-summary__passengers-item">
                <span className="trip-summary__passengers-item-count">
                  <span className="trip-summary__passengers-item-count-value">1</span>
                  <span className="trip-summary__passengers-item-count-text"> Ребенок</span>
                </span>
                <span className="trip-summary__passengers-item-price">
                  <span className="trip-summary__passengers-item-price-value"> 1920 </span>
                  <span className="trip-summary__passengers-item-price-currency"> 
                  <FarePriceIcon className="trip-summary__passengers-item-icon" />
                  </span>
                </span>
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="trip-summary__total-price">
        <p className="trip-summary__total-price-title">Итого</p>
        <p className="trip-summary__total-price-value"> 7760 </p>
        <span className="trip-summary__total-price-currency"> 
          <FarePriceIcon className="trip-summary__total-price-icon" />
        </span>
      </div>

    </aside>
  )
}