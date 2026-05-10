import { baseApi } from './baseApi'

export interface CitySuggestion {
  _id: string
  name: string
}

export const citiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchCities: builder.query<CitySuggestion[], string>({
      query: (name) => `/routes/cities?name=${encodeURIComponent(name)}`,
    }),
  }),
})

export const { useSearchCitiesQuery } = citiesApi
