import { baseApi } from './baseApi'
import type { SubscribeRequest, SubscribeResponse } from './subscribeRequest.types'

export const subscribeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    subscribe: builder.mutation<SubscribeResponse, SubscribeRequest>({
      query: (body) => ({
        url: '/subscribe',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useSubscribeMutation } = subscribeApi
