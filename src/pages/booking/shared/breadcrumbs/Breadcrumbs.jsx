import { NavLink } from 'react-router-dom'

import './Breadcrumbs.css'

export default function Breadcrumbs() {
  return (
    <nav className="breadcrumbs" aria-label="Этапы бронирования">
        <ol className="breadcrumbs__list">
          <li className="breadcrumbs__item ">
            <NavLink to="/booking/trains" className="breadcrumbs__link breadcrumbs__link--active">
              <span className="breadcrumbs__badge" aria-hidden="true">
                1
              </span>
              <span className="breadcrumbs__label">Билеты</span>
            </NavLink>
          </li>
          <li className="breadcrumbs__item">
            <NavLink to="/booking/passengers" className="breadcrumbs__link breadcrumbs__link--active">
              <span className="breadcrumbs__badge" aria-hidden="true">
                2
              </span>
              <span className="breadcrumbs__label">Пассажиры</span>
            </NavLink>
          </li>
          <li className="breadcrumbs__item">
            <NavLink to="/booking/payment" className="breadcrumbs__link">
              <span className="breadcrumbs__badge" aria-hidden="true">
                3
              </span>
              <span className="breadcrumbs__label">Оплата</span>
            </NavLink>
          </li>
          <li className="breadcrumbs__item">
            <NavLink to="/booking/confirmation" className="breadcrumbs__link">
              <span className="breadcrumbs__badge" aria-hidden="true">
                4
              </span>
              <span className="breadcrumbs__label">Проверка</span>
            </NavLink>
          </li>
        </ol>
      </nav>
  )
}