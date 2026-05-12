import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type SearchState = {
  from_city_id: string
  to_city_id: string
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
      if ('date_start' in p) state.date_start = p.date_start
      if ('date_end' in p) state.date_end = p.date_end
    },
  },
})

export const { mergeSearch } = searchSlice.actions
export const searchReducer = searchSlice.reducer

export const selectSearch = (state: { search: SearchState }) => state.search
