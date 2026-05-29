import { useCallback, useMemo } from 'react'
import { routesApi } from '@/store/api/routesApi'
import { buildRoutesQueryString } from '@/store/api/routesQuerySerialize'
import type { RoutesQueryParams } from '@/store/api/routesQueryParams.types'
import { selectRoutesQueryParams } from '@/store/selectors/routesQuerySelectors'
import { splitRoutesQueryPatch } from '@/store/splitRoutesQueryPatch'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { mergeFilters } from '@/store/slices/filtersSlice'
import { mergeSearch } from '@/store/slices/searchSlice'
import { mergeTrains } from '@/store/slices/trainsSlice'
import { useRoutesSearchQueryRefetch } from '@/features/route-search/model/RoutesSearchQueryContext'

export function useRoutesSearchModel() {
  const dispatch = useAppDispatch()
  const filters = useAppSelector(selectRoutesQueryParams)
  const queryString = useMemo(() => buildRoutesQueryString(filters), [filters])
  const selectGetRoutesResult = useMemo(
    () => routesApi.endpoints.getRoutes.select(queryString),
    [queryString],
  )
  const routeSub = useAppSelector(selectGetRoutesResult)
  const data = routeSub.data
  const isError = routeSub.isError
  const error = routeSub.error
  const isFetching =
    routeSub.status === 'pending' ||
    (routeSub as { isFetching?: boolean }).isFetching === true

  const refetch = useRoutesSearchQueryRefetch()

  const sendServer = useCallback(
    (patch?: Partial<RoutesQueryParams>) => {
      if (patch && Object.keys(patch).length > 0) {
        const { search, filters: f, trains } = splitRoutesQueryPatch(patch)
        if (Object.keys(search).length > 0) dispatch(mergeSearch(search))
        if (Object.keys(f).length > 0) dispatch(mergeFilters(f))
        if (Object.keys(trains).length > 0) dispatch(mergeTrains(trains))
        return
      }

      void refetch?.()
    },
    [dispatch, refetch],
  )

  return {
    filters,
    sendServer,
    data,
    isFetching,
    isError,
    error,
  }
}
