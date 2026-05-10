import PassengersIcon from '@/shared/ui/icons/PassengersIcon'
import FarePriceIcon from '@/shared/ui/icons/FarePriceIcon'
import TrainCard from '../TrainSelection/components/trains/TrainCard'

import './OrderReviewPage.css'

type Passenger = {
  id: number
  fullName: string
  type: string
  gender: string
  birthDate: string
  document: string
}

const passengers: Passenger[] = [
  {
    id: 1,
    fullName: 'Мартынюк Ирина Эдуардовна',
    type: 'Взрослый',
    gender: 'Пол женский',
    birthDate: 'Дата рождения 17.02.1985',
    document: 'Паспорт РФ 4204 380694',
  },
  {
    id: 2,
    fullName: 'Мартынюк Кирилл Сергеевич',
    type: 'Детский',
    gender: 'Пол мужской',
    birthDate: 'Дата рождения 25.01.2006',
    document: 'Свидетельство о рождении VIII УН 256319',
  },
  {
    id: 3,
    fullName: 'Мартынюк Сергей Петрович',
    type: 'Взрослый',
    gender: 'Пол мужской',
    birthDate: 'Дата рождения 19.06.1982',
    document: 'Паспорт РФ 4204 380694',
  },
]

export default function OrderReviewPage() {
  const reviewFares = [
    { type: 'Сидячий', count: 88, price: '1 920' },
    { type: 'Плацкарт', count: 52, price: '2 530' },
    { type: 'Купе', count: 24, price: '3 820' },
    { type: 'Люкс', count: 15, price: '4 950' },
  ]

  return (
    <div className="order-review-page">
      <section className="order-review-page__card">
        <h2 className="order-review-page__section-title">Поезд</h2>
        <TrainCard mode="review" actionLabel="Изменить" fares={reviewFares} showRoutePath={false} />
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
              <span className="order-review-page__total-value">7 760</span>
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
          <div className="order-review-page__payment-method">Наличными</div>

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
