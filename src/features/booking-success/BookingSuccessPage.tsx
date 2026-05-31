import { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'

import { useAppDispatch } from '@/store/hooks'
import { resetLocalBookingState } from '@/store/lib/resetLocalBookingState'
import { useBookingSuccessGuard } from './hooks/useBookingSuccessGuard'
import SuccessFeatureConductorIcon from './icons/SuccessFeatureConductorIcon'
import SuccessFeatureEmailIcon from './icons/SuccessFeatureEmailIcon'
import SuccessFeaturePrintIcon from './icons/SuccessFeaturePrintIcon'
import SuccessRatingStarIcon from './icons/SuccessRatingStarIcon'
import FarePriceIcon from '@/shared/ui/icons/FarePriceIcon'
import './BookingSuccessPage.css'

const RATING_STARS_COUNT = 5

export default function BookingSuccessPage() {
  const dispatch = useAppDispatch()
  const { successState } = useBookingSuccessGuard()

  useLayoutEffect(() => {
    if (!successState) return
    resetLocalBookingState(dispatch)
  }, [dispatch, successState])

  if (!successState) {
    return null
  }

  const { payerGreeting, orderNumber, totalPrice } = successState

  return (
    <section className="booking-success-page">
      <div className="booking-success-page__hero">
        <div className="booking-success-page__container">
          <h1 className="booking-success-page__title">Благодарим Вас за заказ!</h1>

          <article className="booking-success-card">
            <header className="booking-success-card__header">
              <p className="booking-success-card__order-number">№Заказа {orderNumber}</p>
              <p className="booking-success-card__sum">
                <span className="booking-success-card__sum-label">сумма</span>
                <span className="booking-success-card__sum-value">
                  {totalPrice.toLocaleString('ru-RU')}
                </span>
                <span className="booking-success-card__sum-currency">
                  <FarePriceIcon className="booking-success-card__sum-currency-icon" />
                </span>
              </p>
            </header>

            <div className="booking-success-card__features">
              <div className="booking-success-card__feature">
                <span
                  className="booking-success-card__feature-icon booking-success-card__feature-icon--email"
                  aria-hidden
                >
                  <SuccessFeatureEmailIcon />
                </span>
                <p className="booking-success-card__feature-text">
                  билеты будут отправлены на ваш 
                  <span className="booking-success-card__feature-text-medium">e-mail</span>
                </p>
              </div>

              <div className="booking-success-card__feature">
                <span
                  className="booking-success-card__feature-icon booking-success-card__feature-icon--print"
                  aria-hidden
                >
                  <SuccessFeaturePrintIcon />
                </span>
                <p className="booking-success-card__feature-text">
                  <span className="booking-success-card__feature-text-medium">распечатайте</span>
                  и сохраните билеты до даты поездки
                </p>
              </div>

              <div className="booking-success-card__feature">
                <span
                  className="booking-success-card__feature-icon booking-success-card__feature-icon--conductor"
                  aria-hidden
                >
                  <SuccessFeatureConductorIcon />
                </span>
                <p className="booking-success-card__feature-text">
                  <span className="booking-success-card__feature-text-medium">предъявите</span>
                  распечатанные билеты при посадке
                </p>
              </div>
            </div>

            <div className="booking-success-card__message">
              <h2 className="booking-success-card__name">{payerGreeting}</h2>
              <p className="booking-success-card__paragraph">
                Ваш заказ успешно оформлен.
                <br />
                В ближайшее время с вами свяжется наш оператор для подтверждения.
              </p>
              <p className="booking-success-card__paragraph booking-success-card__paragraph--strong">
                Благодарим Вас за оказанное доверие и желаем приятного путешествия!
              </p>
            </div>

            <footer className="booking-success-card__footer">
              <div className="booking-success-card__rating">
                <span className="booking-success-card__rating-label">Оценить сервис</span>
                <div className="booking-success-card__stars" aria-label="Оценка сервиса">
                  {Array.from({ length: RATING_STARS_COUNT }, (_, index) => (
                    <span key={index} className="booking-success-card__star">
                      <SuccessRatingStarIcon />
                    </span>
                  ))}
                </div>
              </div>

              <Link to="/" className="booking-success-card__home-link">
                Вернуться на главную
              </Link>
            </footer>
          </article>
        </div>
      </div>
    </section>
  )
}
