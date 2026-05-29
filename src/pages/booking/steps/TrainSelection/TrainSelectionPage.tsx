import TrainCard from './components/TrainCard'
import './TrainSelectionPage.css'
import { useTrainSort } from './hooks/useTrainSort'
import { useTrainPagination } from './hooks/useTrainPagination'
import { useRoutesSearchModel } from '@/shared/hooks/useRoutesSearchModel'
import PaginationArrowLeftIcon from '@/shared/ui/icons/pagination/PaginationArrowLeftIcon'
import PaginationArrowRightIcon from '@/shared/ui/icons/pagination/PaginationArrowRightIcon'
import PaginationDotsIcon from '@/shared/ui/icons/pagination/PaginationDotsIcon'
import { useNavigate } from 'react-router-dom'
import type { SeatSelectionNavigationState } from '@/pages/booking/steps/SeatSelection/lib/seatSelectionNavigation'
import { useAppDispatch } from '@/store/hooks'
import { setSelectedRoutes } from '@/store/slices/bookingSlice'

function formatRoutesRequestError(error: unknown): string {
  if (!error || typeof error !== 'object') return 'Не удалось загрузить маршруты.'
  if ('message' in error && typeof (error as { message: unknown }).message === 'string') {
    return (error as { message: string }).message
  }
  if ('error' in error && typeof (error as { error: unknown }).error === 'string') {
    return (error as { error: string }).error
  }
  if ('status' in error) {
    return `Ошибка запроса (${String((error as { status: unknown }).status)})`
  }
  return 'Не удалось загрузить маршруты.'
}

export default function TrainSelectionPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const perPageOptions = [5, 10, 20] as const
  const SORT_LABEL_OPTIONS = [
    { value: 'date', label: 'времени' },
    { value: 'price', label: 'стоимости' },
    { value: 'duration', label: 'длительности' },
  ] as const

  const {
    filters,
    sendServer,
    data,
    isFetching,
    isError,
    error,
  } = useRoutesSearchModel()

  const totalItems = data?.total_count ?? 0
  const items = data?.items ?? []

  const {
    limit,
    totalPages,
    currentPage,
    paginationItems,
    selectPerPage,
    goToPreviousPage,
    goToNextPage,
    goToPage,
  } = useTrainPagination({
    limit: filters.limit,
    offset: filters.offset,
    totalItems,
    perPageOptions,
    sendServer,
  })

  const {
    isSortMenuOpen,
    selectedSortLabel,
    dropdownRef,
    toggleSortMenu,
    selectSort,
  } = useTrainSort({
    options: SORT_LABEL_OPTIONS,
    value: filters.sort ?? 'date',
    onSelect: (sort) => {
      void sendServer({ sort })
    },
  })


  /* TODO: Add loading state editor*/
  return (
    <div className="train-selection-page">
      <div className="train-selection-page__header">
        <div className="train-selection-page__header-item">
          <p className="train-selection-page__header-item-text">
            найдено {totalItems}
            {isFetching ? ' (загрузка…)' : ''}
          </p>
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
                        className={`train-selection-page__dropdown-item${filters.sort === option.value ? ' train-selection-page__dropdown-item--active' : ''}`}
                        role="option"
                        aria-selected={filters.sort === option.value}
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
                className={`train-selection-page__header-item-button${limit === option ? ' train-selection-page__header-item-button--active' : ''}`}
                aria-pressed={limit === option}
                onClick={() => selectPerPage(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isError && (
        <p className="train-selection-page__error" role="alert">
          {formatRoutesRequestError(error)}
        </p>
      )}

      <div className="train-selection-page__content">
        {items.map((item) => (
          <TrainCard
            key={item.departure._id}
            item={item}
            onActionClick={() => {
              const state: SeatSelectionNavigationState = {
                departure: {
                  routeId: item.departure._id,
                  segment: item.departure,
                },
                ...(item.arrival
                  ? {
                      returnTrip: {
                        routeId: item.arrival._id,
                        segment: item.arrival,
                      },
                    }
                  : {}),
              }
              dispatch(
                setSelectedRoutes({
                  departure: state.departure,
                  ...(state.returnTrip ? { returnTrip: state.returnTrip } : {}),
                }),
              )
              navigate('/booking/seats', { state })
            }}
          />
        ))}
      </div>

      {totalItems > 0 && (
        <div className="train-selection-page__pagination">
          <button
            type="button"
            className="train-selection-page__pagination-arrow"
            disabled={currentPage === 1 || isFetching}
            aria-label="Предыдущая страница"
            onClick={goToPreviousPage}
          >
            <PaginationArrowLeftIcon className="train-selection-page__pagination-arrow-icon" />
          </button>

          {paginationItems.map((item) =>
            item.kind === 'page' ? (
              <button
                key={`page-${item.page}`}
                type="button"
                className={`train-selection-page__pagination-page${currentPage === item.page ? ' train-selection-page__pagination-page--active' : ''}`}
                aria-current={currentPage === item.page ? 'page' : undefined}
                disabled={isFetching}
                onClick={() => goToPage(item.page)}
              >
                {item.page}
              </button>
            ) : (
              <button
                key={item.id}
                type="button"
                className="train-selection-page__pagination-page train-selection-page__pagination-page--dots"
                aria-hidden
                tabIndex={-1}
                disabled
              >
                <PaginationDotsIcon className="train-selection-page__pagination-dots-icon" />
              </button>
            ),
          )}

          <button
            type="button"
            className="train-selection-page__pagination-arrow"
            disabled={currentPage === totalPages || isFetching}
            aria-label="Следующая страница"
            onClick={goToNextPage}
          >
            <PaginationArrowRightIcon className="train-selection-page__pagination-arrow-icon" />
          </button>
        </div>
      )}
    </div>
  )
}
