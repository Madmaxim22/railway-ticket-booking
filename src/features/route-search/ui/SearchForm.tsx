import { useMemo, type ReactNode } from 'react'
import { buildRoutesQueryString } from '@/store/api/routesQuerySerialize'
import { useGetRoutesQuery } from '@/store/api/routesApi'
import { useAppSelector } from '@/store/hooks'
import { selectRoutesQueryParams } from '@/store/selectors/routesQuerySelectors'
import { RoutesSearchQueryContext } from '@/features/route-search/model/RoutesSearchQueryContext'

type Props = {
  children: ReactNode
}

/**
 * Оркестратор: один экземпляр useGetRoutesQuery на шаге выбора поезда.
 * Дочерние компоненты читают кэш через useRoutesSearchModel / select(getRoutes).
 */
export default function SearchForm({ children }: Props) {
  const params = useAppSelector(selectRoutesQueryParams)
  const queryString = useMemo(() => buildRoutesQueryString(params), [params])
  const skip =
    !params.from_city_id?.trim() || !params.to_city_id?.trim()

  const { refetch } = useGetRoutesQuery(queryString, { skip })

  const contextValue = useMemo(() => ({ refetch }), [refetch])

  return (
    <RoutesSearchQueryContext.Provider value={contextValue}>
      {children}
    </RoutesSearchQueryContext.Provider>
  )
}
