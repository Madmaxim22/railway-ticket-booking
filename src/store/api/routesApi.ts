import { baseApi } from './baseApi'
import type { LastRoutesApiResponse, RoutesListResponse } from './routesResponse.types'
import type { RouteSeatsResponse } from './routesSeatsResponse.types'

export type GetRouteSeatsArg = {
  routeId: string
  queryString: string
}

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
    getRouteSeats: builder.query<RouteSeatsResponse, GetRouteSeatsArg>({
      query: ({ routeId, queryString }) => ({
        url: queryString
          ? `/routes/${routeId}/seats?${queryString}`
          : `/routes/${routeId}/seats`,
      }),
    }),
  }),
})

export const { useGetRoutesQuery, useGetLastRoutesQuery, useGetRouteSeatsQuery } = routesApi
