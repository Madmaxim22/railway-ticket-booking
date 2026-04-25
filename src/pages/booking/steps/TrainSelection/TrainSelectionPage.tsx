import { useEffect, useRef, useState } from 'react'
import TrainCard from './components/trains/TrainCard'
import './TrainSelectionPage.css'

export default function TrainSelectionPage() {
  const totalTrains = 20
  const perPageOptions = [5, 10, 20]
  const sortOptions = [
    { value: 'time', label: 'времени' },
    { value: 'price', label: 'стоимости' },
    { value: 'duration', label: 'длительности' },
  ]
  const [selectedSort, setSelectedSort] = useState(sortOptions[0])
  const [selectedPerPage, setSelectedPerPage] = useState(perPageOptions[0])
  const [currentPage, setCurrentPage] = useState(1)
  const [isSortOpen, setIsSortOpen] = useState(false)
  const sortDropdownRef = useRef<HTMLDivElement>(null)
  const totalPages = Math.ceil(totalTrains / selectedPerPage)
  const currentItemsCount = Math.min(selectedPerPage, totalTrains - (currentPage - 1) * selectedPerPage)

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

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedPerPage, selectedSort])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1)
    }
  }, [currentPage, totalPages])

  return (
    <div className="train-selection-page">
      <div className="train-selection-page__header">   
        <div className="train-selection-page__header-item">
          <p className="train-selection-page__header-item-text">найдено {totalTrains}</p>
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
        {Array.from({ length: currentItemsCount }, (_, index) => (
          <TrainCard key={`${currentPage}-${index}`} />
        ))}
      </div>

      <div className="train-selection-page__pagination">
        <button
          type="button"
          className="train-selection-page__pagination-arrow"
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          aria-label="Предыдущая страница"
        >
          &#8249;
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            type="button"
            className={`train-selection-page__pagination-page${currentPage === page ? ' train-selection-page__pagination-page--active' : ''}`}
            onClick={() => setCurrentPage(page)}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          className="train-selection-page__pagination-arrow"
          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          aria-label="Следующая страница"
        >
          &#8250;
        </button>
      </div>
    </div>
  )
}
