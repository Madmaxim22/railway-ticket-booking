import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './api/baseApi'
import './api/citiesApi'
import './api/routesApi'
import { filtersReducer } from './slices/filtersSlice'
import { searchReducer } from './slices/searchSlice'
import { trainsReducer } from './slices/trainsSlice'

export const store = configureStore({
  reducer: {
    search: searchReducer,
    filters: filtersReducer,
    trains: trainsReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
