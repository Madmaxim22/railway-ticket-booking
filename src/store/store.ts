import { combineReducers, configureStore, type Middleware } from '@reduxjs/toolkit'
import { baseApi } from './api/baseApi'
import './api/citiesApi'
import './api/orderApi'
import './api/routesApi'
import './api/subscribeApi'
import { handleBookingPersistAction } from './persist/subscribeBookingSessionPersist'
import { getPreloadedSlicesFromBrowser } from './preloadFromUrl'
import { bookingReducer } from './slices/bookingSlice'
import { filtersReducer } from './slices/filtersSlice'
import { searchReducer } from './slices/searchSlice'
import { trainsReducer } from './slices/trainsSlice'

const rootReducer = combineReducers({
  search: searchReducer,
  filters: filtersReducer,
  trains: trainsReducer,
  booking: bookingReducer,
  [baseApi.reducerPath]: baseApi.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

function buildPreloadedState(): Partial<RootState> | undefined {
  const urlPreload = getPreloadedSlicesFromBrowser()
  if (!urlPreload) return undefined

  const preloaded: Partial<RootState> = {}

  if (urlPreload.search) {
    preloaded.search = urlPreload.search
  }
  if (urlPreload.filters) {
    preloaded.filters = urlPreload.filters
  }
  if (urlPreload.trains) {
    preloaded.trains = {
      sort: 'date',
      limit: 5,
      offset: 0,
      ...urlPreload.trains,
    }
  }
  if (urlPreload.booking) {
    preloaded.booking = urlPreload.booking
  }

  return preloaded
}

const bookingPersistMiddleware: Middleware<{}, RootState> =
  (storeApi) => (next) => (action) => {
    const result = next(action)
    handleBookingPersistAction(action, storeApi.getState)
    return result
  }

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: buildPreloadedState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware, bookingPersistMiddleware),
})

export type AppDispatch = typeof store.dispatch
