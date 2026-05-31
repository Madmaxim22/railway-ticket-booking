import { useNavigate } from 'react-router-dom'

import { TextField } from '@/components/FormField/FormField'
import { formatRussianPhoneDisplay } from '@/shared/lib/formatRussianPhone'

import { usePaymentForm } from './usePaymentForm'

import './PaymentPage.css'

const PAYMENT_INPUT_CLASS = 'field-label__field'

export default function PaymentPage() {
  const navigate = useNavigate()
  const { contactInfo, paymentMethod, errors, updateContact, setPaymentMethod, submit } =
    usePaymentForm()

  const handleBuyTickets = () => {
    if (!submit()) return
    navigate('/booking/confirmation')
  }

  return (
    <div className="payment-page">
      <div className="payment-page__sections">

        <section className="payment-page__section">
          <h2 className="payment-page__title">Персональные данные</h2>

          <div className="payment-page__content">
            <div className="payment-page__row payment-page__row--three-cols">
              <TextField
                label="Фамилия"
                className="payment-page__field"
                inputClassName={PAYMENT_INPUT_CLASS}
                value={contactInfo.lastName}
                invalid={Boolean(errors.lastName)}
                errorText={errors.lastName}
                onChange={(event) => updateContact('lastName', event.target.value)}
              />
              <TextField
                label="Имя"
                className="payment-page__field"
                inputClassName={PAYMENT_INPUT_CLASS}
                value={contactInfo.firstName}
                invalid={Boolean(errors.firstName)}
                errorText={errors.firstName}
                onChange={(event) => updateContact('firstName', event.target.value)}
              />
              <TextField
                label="Отчество"
                className="payment-page__field"
                inputClassName={PAYMENT_INPUT_CLASS}
                value={contactInfo.patronymic}
                invalid={Boolean(errors.patronymic)}
                errorText={errors.patronymic}
                onChange={(event) => updateContact('patronymic', event.target.value)}
              />
            </div>

            <div className="payment-page__row payment-page__row--single">
              <TextField
                label="Контактный телефон"
                type="tel"
                placeholder="+7 ___ ___ __ __"
                className="payment-page__field payment-page__field--short"
                inputClassName={PAYMENT_INPUT_CLASS}
                maxLength={18}
                value={contactInfo.phone}
                invalid={Boolean(errors.phone)}
                errorText={errors.phone}
                onChange={(event) =>
                  updateContact('phone', formatRussianPhoneDisplay(event.target.value))
                }
              />
            </div>

            <div className="payment-page__row payment-page__row--single">
              <TextField
                label="E-mail"
                type="email"
                placeholder="inbox@gmail.ru"
                className="payment-page__field payment-page__field--short"
                inputClassName={PAYMENT_INPUT_CLASS}
                value={contactInfo.email}
                invalid={Boolean(errors.email)}
                errorText={errors.email}
                onChange={(event) => updateContact('email', event.target.value)}
              />
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
