import { useMemo, useState } from 'react'

type UseTrainPaginationParams = {
  totalItems: number
  perPageOptions: readonly number[]
}

const clampPage = (page: number, totalPages: number) =>
  Math.min(Math.max(page, 1), totalPages)

export function useTrainPagination({
  totalItems,
  perPageOptions,
}: UseTrainPaginationParams) {
  const [selectedPerPage, setSelectedPerPage] = useState(perPageOptions[0] ?? 1)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(totalItems / selectedPerPage))
  const normalizedPage = clampPage(currentPage, totalPages)
  const currentPageStartIndex = (normalizedPage - 1) * selectedPerPage
  const currentItemsCount = Math.max(
    0,
    Math.min(selectedPerPage, totalItems - currentPageStartIndex),
  )

  const visiblePages = useMemo(
    () =>
      totalPages > 4
        ? [1, 2, 3, totalPages]
        : Array.from({ length: totalPages }, (_, index) => index + 1),
    [totalPages],
  )

  const setPage = (page: number) => {
    setCurrentPage(clampPage(page, totalPages))
  }

  const goToNextPage = () => {
    setCurrentPage((prev) => clampPage(prev + 1, totalPages))
  }

  const goToPreviousPage = () => {
    setCurrentPage((prev) => clampPage(prev - 1, totalPages))
  }

  const setPerPage = (nextPerPage: number) => {
    if (nextPerPage === selectedPerPage) return
    setSelectedPerPage(nextPerPage)
    setCurrentPage(1)
  }

  return {
    selectedPerPage,
    currentPage: normalizedPage,
    totalPages,
    currentItemsCount,
    visiblePages,
    setPerPage,
    setPage,
    goToNextPage,
    goToPreviousPage,
  }
}
