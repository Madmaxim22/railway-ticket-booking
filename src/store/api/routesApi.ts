import { baseApi } from './baseApi'
import type { RoutesListResponse } from './routesResponse.types'

export const routesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoutes: builder.query<RoutesListResponse, string>({
      query: (searchString) => ({
        url: `/routes?${searchString}`,
      }),
    }),
  }),
})

export const { useLazyGetRoutesQuery } = routesApi
