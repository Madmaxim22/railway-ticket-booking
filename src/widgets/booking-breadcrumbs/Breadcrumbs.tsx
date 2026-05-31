import { NavLink, useLocation } from 'react-router-dom'

import { bookingBreadcrumbSteps } from '@/features/booking-flow/config/bookingBreadcrumbSteps'
import { canAccessBookingBreadcrumb } from '@/features/booking-flow/lib/bookingStepAccess'
import { useAppSelector } from '@/store/hooks'
import { selectBooking } from '@/store/slices/bookingSlice'
import './Breadcrumbs.css'

/** Индекс последнего шага с классом активности (0 — только «Билеты», …, 3 — все этапы). */
function getMaxActiveBreadcrumbIndex(pathname: string): number {
  const segments = pathname.split('/').filter(Boolean)
  const bookingIdx = segments.indexOf('booking')
  const segment = bookingIdx >= 0 ? segments[bookingIdx + 1] : null

  switch (segment) {
    case 'trains':
    case 'seats':
      return 0
    case 'passengers':
      return 1
    case 'payment':
      return 2
    case 'confirmation':
      return 3
    default:
      return 0
  }
}

export default function Breadcrumbs() {
  const { pathname } = useLocation()
  const booking = useAppSelector(selectBooking)
  const maxActiveIndex = getMaxActiveBreadcrumbIndex(pathname)

  return (
    <nav className="breadcrumbs" aria-label="Этапы бронирования">
      <ol className="breadcrumbs__list">
        {bookingBreadcrumbSteps.map((step, index) => {
          const isActive = index <= maxActiveIndex
          const canNavigate = canAccessBookingBreadcrumb(booking, step.id)
          const linkClassName = `breadcrumbs__link${isActive ? ' breadcrumbs__link--active' : ''}${
            canNavigate ? '' : ' breadcrumbs__link--disabled'
          }`

          return (
            <li
              key={step.id}
              className="breadcrumbs__item"
              aria-current={index === maxActiveIndex ? 'step' : undefined}
            >
              {canNavigate ? (
                <NavLink to={step.to} className={linkClassName}>
                  <span className="breadcrumbs__badge" aria-hidden="true">
                    {step.badge}
                  </span>
                  <span className="breadcrumbs__label">{step.label}</span>
                </NavLink>
              ) : (
                <span className={linkClassName} aria-disabled="true">
                  <span className="breadcrumbs__badge" aria-hidden="true">
                    {step.badge}
                  </span>
                  <span className="breadcrumbs__label">{step.label}</span>
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
