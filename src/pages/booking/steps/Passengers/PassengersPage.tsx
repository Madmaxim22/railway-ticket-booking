import './PassengersPage.css'

import { PassengerCard } from './PassengerCard'
import { usePassengersForm } from './usePassengersForm'

export default function PassengersPage() {
  const {
    passengers,
    isPassengerOpen,
    toggleOpen,
    updatePassenger,
    addPassenger,
    removePassenger,
    goToNextPassenger,
    getFooterState,
    errorsByPassengerId,
  } = usePassengersForm()

  return (
    <div className="passengers-page">
      {passengers.map((p, i) => (
        <PassengerCard
          key={p.id}
          passenger={p}
          index={i}
          isOpen={isPassengerOpen(p.id)}
          onToggleOpen={() => toggleOpen(p.id)}
          onChange={updatePassenger}
          onRemove={removePassenger}
          onNextPassenger={goToNextPassenger}
          errors={errorsByPassengerId[p.id]}
          footerState={getFooterState(p.id)}
        />
      ))}

      <div className="passengers-page__add-passenger">
        <h3 className="passengers-page__add-passenger-title">Добавить пассажира</h3>
        <button type="button" className="add-passenger-btn" onClick={addPassenger}>
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.98836 1.50724L7.98836 7.98836L1.50724 7.98836C0.904343 7.98836 0.452171 8.44053 0.452171 9.04343C0.452171 9.64632 0.904343 10.0985 1.50724 10.0985L7.98836 10.0985L7.98836 16.5796C7.98836 17.1825 8.44053 17.6347 8.96807 17.5593L9.11879 17.5593C9.72169 17.5593 10.1739 17.1072 10.0985 16.5796L10.0985 10.0985L16.4289 10.0985C17.0318 10.0985 17.484 9.64632 17.484 9.04343C17.484 8.44053 17.0318 7.98836 16.4289 7.98836L10.0985 7.98836L10.0985 1.50724C10.0985 0.904343 9.64632 0.452171 9.11879 0.527533L8.96807 0.527533C8.36517 0.527533 7.913 0.979705 7.98836 1.50724Z" fill="#FFA800"/>
          </svg>
        </button>
      </div>

      <footer className="passengers-page__footer">
        <button type="button" className="next-page-btn">
          Далее
        </button>
      </footer>
    </div>
  )
}
