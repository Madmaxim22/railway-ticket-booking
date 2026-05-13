import { baseApi } from './baseApi'
import type { LastRoutesApiResponse, RoutesListResponse } from './routesResponse.types'

export const routesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoutes: builder.query<RoutesListResponse, string>({
      query: (searchString) => ({
        url: `/routes?${searchString}`,
      }),
    }),
    getLastRoutes: builder.query<LastRoutesApiResponse, void>({
      query: () => '/routes/last',
    }),
  }),
})

export const { useGetRoutesQuery, useGetLastRoutesQuery } = routesApi
