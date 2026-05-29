import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  selectBookingContactInfo,
  selectBookingPaymentMethod,
  setContactInfo,
  setPaymentMethod,
  type BookingContactInfo,
  type PaymentMethod,
} from '@/store/slices/bookingSlice'

import './PaymentPage.css'

const EMPTY_CONTACT: BookingContactInfo = {
  firstName: '',
  lastName: '',
  patronymic: '',
  phone: '',
  email: '',
}

export default function PaymentPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const savedPaymentMethod = useAppSelector(selectBookingPaymentMethod)
  const savedContactInfo = useAppSelector(selectBookingContactInfo)
  const [paymentMethod, setPaymentMethodState] = useState<PaymentMethod>(
    savedPaymentMethod ?? 'online',
  )
  const [contactInfo, setContactInfoState] = useState<BookingContactInfo>(
    savedContactInfo ?? EMPTY_CONTACT,
  )

  const updateContact = <K extends keyof BookingContactInfo>(key: K, value: BookingContactInfo[K]) => {
    setContactInfoState((prev) => ({ ...prev, [key]: value }))
  }

  const handleBuyTickets = () => {
    dispatch(setContactInfo(contactInfo))
    dispatch(setPaymentMethod(paymentMethod))
    navigate('/booking/confirmation')
  }

  return (
    <div className="payment-page">
      <div className="payment-page__sections">

        <section className="payment-page__section">
          <h2 className="payment-page__title">Персональные данные</h2>

          <div className="payment-page__content">
            <div className="payment-page__row payment-page__row--three-cols">
              <label className="payment-page__field">
                <span className="payment-page__label">Фамилия</span>
                <input
                  className="payment-page__input"
                  type="text"
                  value={contactInfo.lastName}
                  onChange={(event) => updateContact('lastName', event.target.value)}
                />
              </label>

              <label className="payment-page__field">
                <span className="payment-page__label">Имя</span>
                <input
                  className="payment-page__input"
                  type="text"
                  value={contactInfo.firstName}
                  onChange={(event) => updateContact('firstName', event.target.value)}
                />
              </label>

              <label className="payment-page__field">
                <span className="payment-page__label">Отчество</span>
                <input
                  className="payment-page__input"
                  type="text"
                  value={contactInfo.patronymic}
                  onChange={(event) => updateContact('patronymic', event.target.value)}
                />
              </label>
            </div>

            <div className="payment-page__row payment-page__row--single">
              <label className="payment-page__field payment-page__field--short">
                <span className="payment-page__label">Контактный телефон</span>
                <input
                  className="payment-page__input"
                  type="tel"
                  placeholder="+7 ___ ___ __ __"
                  value={contactInfo.phone}
                  onChange={(event) => updateContact('phone', event.target.value)}
                />
              </label>
            </div>

            <div className="payment-page__row payment-page__row--single">
              <label className="payment-page__field payment-page__field--short">
                <span className="payment-page__label">E-mail</span>
                <input
                  className="payment-page__input"
                  type="email"
                  placeholder="inbox@gmail.ru"
                  value={contactInfo.email}
                  onChange={(event) => updateContact('email', event.target.value)}
                />
              </label>
            </div>
          </div>
        </section>

        <section className="payment-page__section payment-page__section--payment-method">
          <h2 className="payment-page__title">Способ оплаты</h2>

          <div className="payment-page__payment-options">
            <label className="payment-page__checkbox-row">
              <input
                className="payment-page__checkbox"
                type="checkbox"
                checked={paymentMethod === 'online'}
                onChange={() => setPaymentMethodState('online')}
              />
              <span className="payment-page__checkbox-label">Онлайн</span>
            </label>

            {paymentMethod === 'online' && (
              <div className="payment-page__online-methods">
                <span className="payment-page__method">Банковской картой</span>
                <span className="payment-page__method">PayPal</span>
                <span className="payment-page__method">Visa QIWI Wallet</span>
              </div>
            )}
          </div>

          <div className="payment-page__cash-row">
            <label className="payment-page__checkbox-row">
              <input
                className="payment-page__checkbox"
                type="checkbox"
                checked={paymentMethod === 'cash'}
                onChange={() => setPaymentMethodState('cash')}
              />
              <span className="payment-page__checkbox-label">Наличными</span>
            </label>
          </div>
        </section>
      </div>

      <footer className="payment-page__footer">
        <button
          type="button"
          className="payment-page__submit-btn"
          onClick={handleBuyTickets}
        >
          Купить билеты
        </button>
      </footer>
    </div>
  )
}
