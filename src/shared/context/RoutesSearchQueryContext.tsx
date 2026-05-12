import { createContext, useContext } from 'react'

export type RoutesSearchQueryContextValue = {
  refetch: () => unknown
}

export const RoutesSearchQueryContext = createContext<RoutesSearchQueryContextValue | null>(null)

export function useRoutesSearchQueryRefetch() {
  return useContext(RoutesSearchQueryContext)?.refetch
}
