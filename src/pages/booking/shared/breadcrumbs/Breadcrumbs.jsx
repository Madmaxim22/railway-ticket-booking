import { NavLink } from 'react-router-dom'

import { bookingBreadcrumbSteps } from '../config/bookingBreadcrumbSteps'
import './Breadcrumbs.css'

export default function Breadcrumbs() {
  return (
    <nav className="breadcrumbs" aria-label="Этапы бронирования">
      <ol className="breadcrumbs__list">
        {bookingBreadcrumbSteps.map((step) => (
          <li key={step.id} className="breadcrumbs__item">
            <NavLink
              to={step.to}
              className={`breadcrumbs__link${step.isActive ? ' breadcrumbs__link--active' : ''}`}
            >
              <span className="breadcrumbs__badge" aria-hidden="true">
                {step.badge}
              </span>
              <span className="breadcrumbs__label">{step.label}</span>
            </NavLink>
          </li>
        ))}
      </ol>
    </nav>
  )
}