import './TicketsSection.css'

export function TicketsSection() {
  return (
    <div className="seat-selection-page__tickets">
      <h2 className="seat-selection-page__section-title">Количество билетов</h2>
      <div className="seat-selection-page__counters">
        <div className="seat-selection-page__counter seat-selection-page__counter--active">
          <p className="seat-selection-page__counter-label">Взрослых - 2</p>
          <p className="seat-selection-page__counter-hint">Можно добавить еще 3 пассажиров</p>
        </div>
        <div className="seat-selection-page__counter">
          <p className="seat-selection-page__counter-label">Детских - 1</p>
          <p className="seat-selection-page__counter-hint">
            Можно добавить еще 3 детей до 10 лет.Свое место в вагоне, как у взрослых, но дешевле
            в среднем на 50-65%.
          </p>
        </div>
        <div className="seat-selection-page__counter">
          <p className="seat-selection-page__counter-label">Детских «без места» — 0</p>
        </div>
      </div>
    </div>
  )
}
