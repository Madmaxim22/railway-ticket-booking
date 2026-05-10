import { Fragment } from 'react'
import TrainCard from './components/trains/TrainCard'
import './TrainSelectionPage.css'
import { useTrainPagination } from './useTrainPagination'
import { useTrainSort } from './useTrainSort'

export default function TrainSelectionPage() {
  const totalTrains = 30
  const perPageOptions = [5, 10, 20]
  const SORT_LABEL_OPTIONS = [
    { value: 'time', label: 'времени' },
    { value: 'price', label: 'стоимости' },
    { value: 'duration', label: 'длительности' },
  ] as const

  const {
    selectedPerPage,
    currentPage,
    totalPages,
    currentItemsCount,
    visiblePages,
    setPerPage,
    setPage,
    goToNextPage,
    goToPreviousPage,
  } = useTrainPagination({
    totalItems: totalTrains,
    perPageOptions,
  })

  const {
    isSortMenuOpen,
    selectedSortValue,
    selectedSortLabel,
    dropdownRef,
    toggleSortMenu,
    selectSort,
  } = useTrainSort({
    options: SORT_LABEL_OPTIONS,
  })


  return (
    <div className="train-selection-page">
      <div className="train-selection-page__header">   
        <div className="train-selection-page__header-item">
          <p className="train-selection-page__header-item-text">найдено {totalTrains}</p>
        </div>
        <div className="train-selection-page__header-controls">
          <div className="train-selection-page__header-item">
            <p className="train-selection-page__header-item-text">сортировать по:</p>
            <div className="train-selection-page__dropdown" ref={dropdownRef}>
              <button
                type="button"
                className="train-selection-page__dropdown-trigger"
                aria-haspopup="listbox"
                aria-expanded={isSortMenuOpen}
                onClick={toggleSortMenu}
              >
                {selectedSortLabel}
              </button>
              {isSortMenuOpen && (
                <ul className="train-selection-page__dropdown-menu" role="listbox" aria-label="Сортировка поездов">
                  {SORT_LABEL_OPTIONS.map((option) => (
                    <li key={option.value}>
                      <button
                        type="button"
                        className={`train-selection-page__dropdown-item${selectedSortValue === option.value ? ' train-selection-page__dropdown-item--active' : ''}`}
                        role="option"
                        aria-selected={selectedSortValue === option.value}
                        onClick={() => selectSort(option.value)}
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
                aria-pressed={selectedPerPage === option}
                onClick={() => setPerPage(option)}
              >
                {option}
              </button>
            ))}
          </div>
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
          disabled={currentPage === 1}
          aria-label="Предыдущая страница"
          onClick={goToPreviousPage}
        >
          <svg width="17" height="28" viewBox="0 0 17 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="train-selection-page__pagination-arrow-icon">
            <path d="M5.91132 13.6362C9.39583 10.2308 12.6952 7.03047 15.9482 3.85955C16.842 2.9883 16.7737 1.48294 15.8845 0.607056C15.0166 -0.247731 13.6946 -0.177635 12.8267 0.677152C8.63824 4.8026 4.43672 8.9409 0.298344 13.017C-0.0993557 13.4087 -0.0994549 14.05 0.298367 14.4416C4.2848 18.3656 8.43732 22.4346 12.57 26.5206C13.4706 27.411 14.8436 27.4847 15.7195 26.5701C16.5737 25.6781 16.6267 24.1841 15.7495 23.3148C12.6509 20.244 9.38459 17.0307 5.91132 13.6362Z" fill="currentColor"/>
          </svg>
        </button>

        {visiblePages.map((page, index) => (
          <Fragment key={page}>
          <button
            key={page}
            type="button"
            className={`train-selection-page__pagination-page${currentPage === page ? ' train-selection-page__pagination-page--active' : ''}`}
            aria-current={currentPage === page ? 'page' : undefined}
            onClick={() => setPage(page)}
          >
            {page}
          </button>
          {totalPages > 4 && index === 2 && (
            <button
              type="button"
              className="train-selection-page__pagination-page train-selection-page__pagination-page--dots"
              aria-label="Пропущенные страницы"
              disabled
            >
              <svg width="42" height="9" viewBox="0 0 42 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="train-selection-page__pagination-dots-icon">
                <ellipse cx="4.45455" cy="4.5" rx="4.45455" ry="4.5" fill="currentColor"/>
                <ellipse cx="20.5" cy="4.5" rx="4.45455" ry="4.5" fill="currentColor"/>
                <ellipse cx="37.5455" cy="4.5" rx="4.45455" ry="4.5" fill="currentColor"/>
              </svg>
            </button>
          )}
          </Fragment>
        ))}

        <button
          type="button"
          className="train-selection-page__pagination-arrow"
          disabled={currentPage === totalPages}
          aria-label="Следующая страница"
          onClick={goToNextPage}
        >
          <svg width="17" height="28" viewBox="0 0 17 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="train-selection-page__pagination-arrow-icon">
            <path d="M10.6746 13.6362C7.19004 10.2308 3.8907 7.03047 0.637687 3.85955C-0.256115 2.9883 -0.18787 1.48294 0.701393 0.607056C1.56924 -0.247731 2.89131 -0.177635 3.75916 0.677152C7.94764 4.8026 12.1492 8.9409 16.2875 13.017C16.6852 13.4087 16.6853 14.05 16.2875 14.4416C12.3011 18.3656 8.14855 22.4346 4.01587 26.5206C3.11528 27.411 1.7423 27.4847 0.866345 26.5701C0.0121312 25.6781 -0.0408515 24.1841 0.836369 23.3148C3.93498 20.244 7.20128 17.0307 10.6746 13.6362Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
