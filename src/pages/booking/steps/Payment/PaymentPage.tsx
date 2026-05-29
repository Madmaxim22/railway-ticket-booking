import { useState } from 'react'

import './PaymentPage.css'

type PaymentMethod = 'online' | 'cash'

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('online')

  return (
    <div className="payment-page">
      <div className="payment-page__sections">

        <section className="payment-page__section">
          <h2 className="payment-page__title">Персональные данные</h2>

          <div className="payment-page__content">
            <div className="payment-page__row payment-page__row--three-cols">
              <label className="payment-page__field">
                <span className="payment-page__label">Фамилия</span>
                <input className="payment-page__input" type="text" />
              </label>

              <label className="payment-page__field">
                <span className="payment-page__label">Имя</span>
                <input className="payment-page__input" type="text" />
              </label>

              <label className="payment-page__field">
                <span className="payment-page__label">Отчество</span>
                <input className="payment-page__input" type="text" />
              </label>
            </div>

            <div className="payment-page__row payment-page__row--single">
              <label className="payment-page__field payment-page__field--short">
                <span className="payment-page__label">Контактный телефон</span>
                <input className="payment-page__input" type="tel" placeholder="+7 ___ ___ __ __" />
              </label>
            </div>

            <div className="payment-page__row payment-page__row--single">
              <label className="payment-page__field payment-page__field--short">
                <span className="payment-page__label">E-mail</span>
                <input className="payment-page__input" type="email" placeholder="inbox@gmail.ru" />
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
                onChange={() => setPaymentMethod('online')}
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
                onChange={() => setPaymentMethod('cash')}
              />
              <span className="payment-page__checkbox-label">Наличными</span>
            </label>
          </div>
        </section>
      </div>

      <footer className="payment-page__footer">
        <button type="button" className="payment-page__submit-btn">
          Купить билеты
        </button>
      </footer>
    </div>
  )
}
