import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import DatePickerPopover from '../components/DatePickerPopover'
import CalendarIcon from '@/shared/ui/icons/CalendarIcon'
import LocationPinIcon from '@/shared/ui/icons/LocationPinIcon'
import SearchSwapIcon from '@/shared/ui/icons/SearchSwapIcon'
import './Header.css'
import { useLocation } from 'react-router-dom'

const BOOKING_STEP_PATHS = [
  '/booking/trains',
  '/booking/seats',
  '/booking/passengers',
  '/booking/payment',
  '/booking/confirmation',
] as const


export default function Header() {
  const [departureDate, setDepartureDate] = useState<Date | null>(null)
  const [arrivalDate, setArrivalDate] = useState<Date | null>(null)

  const { pathname } = useLocation()
  const isBookingSuccess = pathname === '/booking/success'
  const isBookingSteps = BOOKING_STEP_PATHS.includes(pathname as (typeof BOOKING_STEP_PATHS)[number])


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <header className="header">
      <div className={`header__container ${isBookingSteps || isBookingSuccess ? 'header__container--booking-steps' : ''}`}>
        <div className="header__content">
          <Link to="/" className="header__logo">Лого</Link>
        </div>
        <div className="header__menu">
          <ul className="header__menu-list">
            <li className="header__menu-item">
              <Link to="/" className="header__menu-link">О нас</Link>
            </li>
            <li className="header__menu-item">
              <Link to="/" className="header__menu-link">Как это работает</Link>
            </li>
            <li className="header__menu-item">
              <Link to="/" className="header__menu-link">Отзывы</Link>
            </li>
            <li className="header__menu-item">
              <Link to="/" className="header__menu-link">Контакты</Link>
            </li>
          </ul>
        </div>
        {!isBookingSuccess && (
        <div className={`header__search ${isBookingSteps ? 'header__search--booking-steps' : ''}`}>
          {!isBookingSteps && (
          <div className="header__search-content">
            <h1 className="header__search-title">Вся жизнь -</h1>
            <p className="header__search-description">путешествие!</p>
          </div>
          )}
          <div
            className={`header__search-form-panel ${isBookingSteps ? 'header__search-form-panel--booking-steps' : ''}`}
          >
            <form className="header__search-form" onSubmit={handleSubmit}>
              <div className="header__search-form-body">
                <div className="header__search-form-content-item">
                  <p className="header__search-form-title">Направление:</p>
                  <div className="header__search-form-fields">
                    <div className="header__search-form-field">
                      <input type="text" placeholder="Откуда" className="header__search-form-input" />
                      <LocationPinIcon className="header__search-form-icon" />
                    </div>
                    <SearchSwapIcon className="header__search-form-swap-icon" />
                    <div className="header__search-form-field">
                      <input type="text" placeholder="Куда" className="header__search-form-input" />
                      <LocationPinIcon className="header__search-form-icon" />
                    </div>
                  </div>
                </div>
              
                <div className="header__search-form-content-item">
                  <p className="header__search-form-title">Дата:</p>
                  <div className="header__search-form-fields">
                    <div className="header__search-form-field">
                      <DatePickerPopover
                        id="departure-date"
                        value={departureDate}
                        onChange={setDepartureDate}
                        placeholder="Дата отправления"
                        inputClassName="header__search-form-input"
                      />
                      <CalendarIcon className="header__search-form-icon" />
                    </div>
                    <div className="header__search-form-field">
                      <DatePickerPopover
                        id="arrival-date"
                        value={arrivalDate}
                        onChange={setArrivalDate}
                        placeholder="Дата прибытия"
                        inputClassName="header__search-form-input"
                      />
                      <CalendarIcon className="header__search-form-icon" />
                    </div>
                  </div>
                </div>
              </div>
              <button type="submit" className="header__search-form-button">найти билеты</button>
            </form>
          </div>
        </div>
        )}
        
        {/* <div className="header__line" /> */}
      </div>
    </header>
  )
}
