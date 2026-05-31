import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '@/store/store'
import type { RoutesQueryParams, RoutesSortParam } from '@/store/api/routesQueryParams.types'

export type TrainsState = {
  sort: RoutesSortParam
  limit: number
  offset: number
}

type TrainsPatch = Partial<Pick<RoutesQueryParams, 'sort' | 'limit' | 'offset'>>

const initialState: TrainsState = {
  sort: 'date',
  limit: 5,
  offset: 0,
}

export const trainsSlice = createSlice({
  name: 'trains',
  initialState,
  reducers: {
    mergeTrains(state, action: PayloadAction<TrainsPatch>) {
      const p = action.payload
      if ('sort' in p && p.sort !== undefined) state.sort = p.sort
      if ('limit' in p && p.limit !== undefined) state.limit = p.limit
      if ('offset' in p && p.offset !== undefined) state.offset = p.offset
    },
  },
})

export const { mergeTrains } = trainsSlice.actions
export const trainsReducer = trainsSlice.reducer

export const selectTrains = (state: RootState) => state.trains
