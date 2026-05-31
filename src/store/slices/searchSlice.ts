import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '@/store/store'

export type SearchState = {
  from_city_id: string
  to_city_id: string
  /** Подписи для UI шапки (не уходят в API) */
  from_city_name?: string
  to_city_name?: string
  /** YYYY-MM-DD для query API */
  date_start?: string
  date_end?: string
}

type SearchPatch = Partial<SearchState>

const initialState: SearchState = {
  from_city_id: '',
  to_city_id: '',
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    mergeSearch(state, action: PayloadAction<SearchPatch>) {
      const p = action.payload
      if ('from_city_id' in p) state.from_city_id = p.from_city_id ?? state.from_city_id
      if ('to_city_id' in p) state.to_city_id = p.to_city_id ?? state.to_city_id
      if ('from_city_name' in p) state.from_city_name = p.from_city_name
      if ('to_city_name' in p) state.to_city_name = p.to_city_name
      if ('date_start' in p) state.date_start = p.date_start
      if ('date_end' in p) state.date_end = p.date_end
    },
  },
})

export const { mergeSearch } = searchSlice.actions
export const searchReducer = searchSlice.reducer

export const selectSearch = (state: RootState) => state.search
