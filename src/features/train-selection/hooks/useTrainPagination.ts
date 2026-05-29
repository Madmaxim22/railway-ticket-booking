import { useCallback, useMemo } from 'react'
import type { RoutesQueryParams } from '@/store/api/routesQueryParams.types'

const clampPage = (page: number, totalPages: number) =>
  Math.min(Math.max(page, 1), totalPages)

/** Элементы панели: номера страниц и многоточие между пропусками. */
export type TrainPaginationItem =
  | { kind: 'page'; page: number }
  | { kind: 'ellipsis'; id: string }

function buildPaginationItems(
  currentPage: number,
  totalPages: number,
): TrainPaginationItem[] {
  if (totalPages <= 1) {
    return [{ kind: 'page', page: 1 }]
  }

  const maxInlinePages = 7
  if (totalPages <= maxInlinePages) {
    return Array.from({ length: totalPages }, (_, index) => ({
      kind: 'page' as const,
      page: index + 1,
    }))
  }

  const siblingCount = 1
  const edgeBlock = 5
  const items: TrainPaginationItem[] = []

  const pushPage = (page: number) => {
    items.push({ kind: 'page', page })
  }
  const pushEllipsis = (id: string) => {
    items.push({ kind: 'ellipsis', id })
  }

  const showLeftCollapsed = currentPage > edgeBlock - 1
  const showRightCollapsed = currentPage < totalPages - (edgeBlock - 2)

  if (!showLeftCollapsed) {
    for (let p = 1; p <= edgeBlock; p += 1) {
      pushPage(p)
    }
    pushEllipsis('gap-end')
    pushPage(totalPages)
  } else if (!showRightCollapsed) {
    pushPage(1)
    pushEllipsis('gap-start')
    for (let p = totalPages - (edgeBlock - 1); p <= totalPages; p += 1) {
      pushPage(p)
    }
  } else {
    pushPage(1)
    pushEllipsis('gap-mid-left')
    for (
      let p = currentPage - siblingCount;
      p <= currentPage + siblingCount;
      p += 1
    ) {
      pushPage(p)
    }
    pushEllipsis('gap-mid-right')
    pushPage(totalPages)
  }

  return items
}

export type UseTrainPaginationParams = {
  limit: number | undefined
  offset: number | undefined
  totalItems: number
  perPageOptions: readonly number[]
  sendServer: (patch: Partial<RoutesQueryParams>) => void | Promise<unknown>
}

export function useTrainPagination({
  limit: limitFromFilters,
  offset: offsetFromFilters,
  totalItems,
  perPageOptions,
  sendServer,
}: UseTrainPaginationParams) {
  const limit = limitFromFilters ?? perPageOptions[0]
  const offset = offsetFromFilters ?? 0

  const totalPages = Math.max(1, Math.ceil(totalItems / limit))
  const currentPage = clampPage(Math.floor(offset / limit) + 1, totalPages)

  const paginationItems = useMemo(
    () => buildPaginationItems(currentPage, totalPages),
    [currentPage, totalPages],
  )

  const selectPerPage = useCallback(
    (option: number) => {
      void sendServer({ limit: option, offset: 0 })
    },
    [sendServer],
  )

  const goToPreviousPage = useCallback(() => {
    void sendServer({ offset: (currentPage - 2) * limit })
  }, [sendServer, currentPage, limit])

  const goToNextPage = useCallback(() => {
    void sendServer({ offset: currentPage * limit })
  }, [sendServer, currentPage, limit])

  const goToPage = useCallback(
    (page: number) => {
      void sendServer({ offset: (page - 1) * limit })
    },
    [sendServer, limit],
  )

  return {
    limit,
    totalPages,
    currentPage,
    paginationItems,
    selectPerPage,
    goToPreviousPage,
    goToNextPage,
    goToPage,
  }
}
