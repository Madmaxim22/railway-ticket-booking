import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import PassengersIcon from '@/shared/ui/icons/PassengersIcon'
import FarePriceIcon from '@/shared/ui/icons/FarePriceIcon'
import { useCreateOrderMutation } from '@/store/api/orderApi'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { buildOrderRequest } from '@/store/lib/buildOrderRequest'
import { selectOrderReviewViewModel } from '@/store/selectors/orderReviewSelectors'
import { buildSeatSelectionNavigationStateFromBooking } from '@/pages/booking/steps/SeatSelection/lib/seatSelectionNavigation'
import { resetBooking, selectBooking } from '@/store/slices/bookingSlice'
import TrainCard from '../TrainSelection/components/TrainCard'

import './OrderReviewPage.css'

function formatOrderError(error: unknown): string {
  if (!error || typeof error !== 'object') {
    return 'Не удалось оформить заказ. Попробуйте ещё раз.'
  }

  if ('data' in error && typeof (error as { data: unknown }).data === 'object') {
    const data = (error as { data: Record<string, unknown> }).data
    if (typeof data.message === 'string') return data.message
    if (typeof data.error === 'string') return data.error
  }

  if ('status' in error) {
    return `Ошибка оформления заказа (${String((error as { status: unknown }).status)})`
  }

  return 'Не удалось оформить заказ. Попробуйте ещё раз.'
}

export default function OrderReviewPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const booking = useAppSelector(selectBooking)
  const { trainCardItem, showReturnTrip, passengers, totalPrice, paymentMethodLabel } =
    useAppSelector(selectOrderReviewViewModel)
  const [createOrder, { isLoading }] = useCreateOrderMutation()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const editNavigationState = { fromConfirmation: true as const }

  const goToSeats = () => {
    const seatNavigation = buildSeatSelectionNavigationStateFromBooking(booking)
    if (seatNavigation) {
      navigate('/booking/seats', { state: { ...seatNavigation, ...editNavigationState } })
      return
    }
    navigate('/booking/trains')
  }

  const goToPassengers = () => {
    navigate('/booking/passengers', { state: editNavigationState })
  }

  const goToPayment = () => {
    navigate('/booking/payment', { state: editNavigationState })
  }

  const handleConfirm = async () => {
    setSubmitError(null)

    const orderBody = buildOrderRequest(booking)
    if (!orderBody) {
      setSubmitError('Не хватает данных для оформления заказа. Проверьте все шаги бронирования.')
      return
    }

    try {
      const result = await createOrder(orderBody).unwrap()

      if (!result.status) {
        setSubmitError('Сервер отклонил заказ. Проверьте данные и попробуйте снова.')
        return
      }

      dispatch(resetBooking())
      navigate('/booking/success')
    } catch (error) {
      setSubmitError(formatOrderError(error))
    }
  }

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
            onActionClick={goToSeats}
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

            <button
              type="button"
              className="order-review-page__edit-button"
              onClick={goToPassengers}
            >
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
            <button
              type="button"
              className="order-review-page__edit-button"
              onClick={goToPayment}
            >
              Изменить
            </button>
          </div>
        </div>
      </section>

      {submitError && (
        <p className="order-review-page__error" role="alert">
          {submitError}
        </p>
      )}

      <footer className="order-review-page__footer">
        <button
          type="button"
          className="order-review-page__confirm-button"
          disabled={isLoading}
          onClick={() => void handleConfirm()}
        >
          {isLoading ? 'Оформление…' : 'Подтвердить'}
        </button>
      </footer>
    </div>
  )
}
