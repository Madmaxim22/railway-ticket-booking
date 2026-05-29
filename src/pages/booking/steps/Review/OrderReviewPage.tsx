import PassengersIcon from '@/shared/ui/icons/PassengersIcon'
import FarePriceIcon from '@/shared/ui/icons/FarePriceIcon'
import { useAppSelector } from '@/store/hooks'
import { selectOrderReviewViewModel } from '@/store/selectors/orderReviewSelectors'
import TrainCard from '../TrainSelection/components/TrainCard'

import './OrderReviewPage.css'

export default function OrderReviewPage() {
  const { trainCardItem, showReturnTrip, passengers, totalPrice, paymentMethodLabel } =
    useAppSelector(selectOrderReviewViewModel)

  return (
    <div className="order-review-page">
      <section className="order-review-page__card">
        <h2 className="order-review-page__section-title">Поезд</h2>
        {trainCardItem && (
          <TrainCard
            mode="review"
            actionLabel="Изменить"
            showReturnTrip={showReturnTrip}
            item={trainCardItem}
          />
        )}
      </section>

      <section className="order-review-page__card">
        <h2 className="order-review-page__section-title">Пассажиры</h2>

        <div className="order-review-page__passengers-content">
          <div className="order-review-page__passengers-list">
            {passengers.map((passenger) => (
              <div key={passenger.id} className="order-review-page__passenger-row">
                <div className="order-review-page__passenger-avatar-wrap">
                  <div className="order-review-page__passenger-avatar">
                    <PassengersIcon className="order-review-page__passenger-icon" />
                  </div>
                  <div className="order-review-page__passenger-type">{passenger.type}</div>
                </div>

                <div className="order-review-page__passenger-info">
                  <div className="order-review-page__passenger-name">{passenger.fullName}</div>
                  <div className="order-review-page__passenger-detail">{passenger.gender}</div>
                  <div className="order-review-page__passenger-detail">{passenger.birthDate}</div>
                  <div className="order-review-page__passenger-detail">{passenger.document}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="order-review-page__passengers-side">
            <div className="order-review-page__total">
              <span className="order-review-page__total-label">Всего</span>
              <span className="order-review-page__total-value">
                {totalPrice.toLocaleString('ru-RU')}
              </span>
              <FarePriceIcon className="order-review-page__total-currency" />
            </div>

            <button type="button" className="order-review-page__edit-button">
              Изменить
            </button>
          </div>
        </div>
      </section>

      <section className="order-review-page__card">
        <h2 className="order-review-page__section-title">Способ оплаты</h2>

        <div className="order-review-page__payment-content">
          <div className="order-review-page__payment-method">{paymentMethodLabel}</div>

          <div className="order-review-page__payment-side">
            <button type="button" className="order-review-page__edit-button">
              Изменить
            </button>
          </div>
        </div>
      </section>

      <footer className="order-review-page__footer">
        <button type="button" className="order-review-page__confirm-button">
          Подтвердить
        </button>
      </footer>
    </div>
  )
}
