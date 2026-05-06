import './PassengersPage.css'

import { AddPassengerIcon } from '@/shared/ui/icons/passengers/PassengerFormIcons'
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
          <AddPassengerIcon className="add-passenger-btn__icon" />
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
