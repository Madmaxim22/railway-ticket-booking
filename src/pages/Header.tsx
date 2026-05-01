import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import DatePickerPopover from '../components/DatePickerPopover'
import CalendarIcon from '@/shared/ui/icons/CalendarIcon'
import LocationPinIcon from '@/shared/ui/icons/LocationPinIcon'
import SearchSwapIcon from '@/shared/ui/icons/SearchSwapIcon'
import './Header.css'

export default function Header() {
  const [departureDate, setDepartureDate] = useState<Date | null>(null)
  const [arrivalDate, setArrivalDate] = useState<Date | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <header className="header">
      <div className="header__container">
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
        <div className="header__search">
          <div className="header__search-content">
            <h1 className="header__search-title">Вся жизнь -</h1>
            <p className="header__search-description">путешествие!</p>
          </div>
          <div className="header__search-form">
            <form className="header__search-form-content" onSubmit={handleSubmit}>
              <p className="header__search-form-title">Направление:</p>
              <div className="header__search-form-content-item">
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

              <p className="header__search-form-title header__search-form-title--date">Дата:</p>
              <div className="header__search-form-content-item">
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
              <button type="submit" className="header__search-form-button">найти билеты</button>
            </form>
          </div>
        </div>
        <div className="header__line" />
      </div>
    </header>
  )
}
