import { useEffect, useRef, useState } from 'react'
import TrainCard from './components/trains/TrainCard'
import './TrainSelectionPage.css'

export default function TrainSelectionPage() {
  const perPageOptions = [5, 10, 20]
  const sortOptions = [
    { value: 'time', label: 'времени' },
    { value: 'price', label: 'стоимости' },
    { value: 'duration', label: 'длительности' },
  ]
  const [selectedSort, setSelectedSort] = useState(sortOptions[0])
  const [selectedPerPage, setSelectedPerPage] = useState(perPageOptions[0])
  const [isSortOpen, setIsSortOpen] = useState(false)
  const sortDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!sortDropdownRef.current?.contains(event.target as Node)) {
        setIsSortOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="train-selection-page">
      <div className="train-selection-page__header">   
        <div className="train-selection-page__header-item">
          <p className="train-selection-page__header-item-text">найдено 20</p>
        </div>
        <div className="train-selection-page__header-item train-selection-page__header-item--sort">
          <p className="train-selection-page__header-item-text">сортировать по:</p>
          <div className="train-selection-page__dropdown" ref={sortDropdownRef}>
            <button
              type="button"
              className="train-selection-page__dropdown-trigger"
              onClick={() => setIsSortOpen((prev) => !prev)}
            >
              {selectedSort.label}
            </button>

            {isSortOpen && (
              <ul className="train-selection-page__dropdown-menu">
                {sortOptions.map((option) => (
                  <li key={option.value}>
                    <button
                      type="button"
                      className="train-selection-page__dropdown-item"
                      onClick={() => {
                        setSelectedSort(option)
                        setIsSortOpen(false)
                      }}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="train-selection-page__header-item">
          <p className="train-selection-page__header-item-text">показывать по:</p> 
          {perPageOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={`train-selection-page__header-item-button${selectedPerPage === option ? ' train-selection-page__header-item-button--active' : ''}`}
              onClick={() => setSelectedPerPage(option)}
              aria-pressed={selectedPerPage === option}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="train-selection-page__content">
        <TrainCard />
        <TrainCard />
      </div>
    </div>
  )
}
