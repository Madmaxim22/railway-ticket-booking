import { useNavigate } from 'react-router-dom'

import { formatRussianPhoneDisplay } from '@/shared/lib/formatRussianPhone'

import { usePaymentForm } from './usePaymentForm'

import './PaymentPage.css'

type ContactFieldProps = {
  label: string
  value: string
  error?: string
  type?: 'text' | 'tel' | 'email'
  placeholder?: string
  fieldClassName?: string
  maxLength?: number
  onChange: (value: string) => void
}

function ContactField({
  label,
  value,
  error,
  type = 'text',
  placeholder,
  fieldClassName,
  maxLength,
  onChange,
}: ContactFieldProps) {
  return (
    <label
      className={['payment-page__field', fieldClassName].filter(Boolean).join(' ')}
    >
      <span className="payment-page__label">{label}</span>
      <input
        className={['payment-page__input', error ? 'payment-page__input--error' : '']
          .filter(Boolean)
          .join(' ')}
        type={type}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
      />
      {error ? <span className="payment-page__error-text">{error}</span> : null}
    </label>
  )
}

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
              <ContactField
                label="Фамилия"
                value={contactInfo.lastName}
                error={errors.lastName}
                onChange={(value) => updateContact('lastName', value)}
              />
              <ContactField
                label="Имя"
                value={contactInfo.firstName}
                error={errors.firstName}
                onChange={(value) => updateContact('firstName', value)}
              />
              <ContactField
                label="Отчество"
                value={contactInfo.patronymic}
                error={errors.patronymic}
                onChange={(value) => updateContact('patronymic', value)}
              />
            </div>

            <div className="payment-page__row payment-page__row--single">
              <ContactField
                label="Контактный телефон"
                type="tel"
                placeholder="+7 ___ ___ __ __"
                fieldClassName="payment-page__field--short"
                maxLength={18}
                value={contactInfo.phone}
                error={errors.phone}
                onChange={(value) => updateContact('phone', formatRussianPhoneDisplay(value))}
              />
            </div>

            <div className="payment-page__row payment-page__row--single">
              <ContactField
                label="E-mail"
                type="email"
                placeholder="inbox@gmail.ru"
                fieldClassName="payment-page__field--short"
                value={contactInfo.email}
                error={errors.email}
                onChange={(value) => updateContact('email', value)}
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
