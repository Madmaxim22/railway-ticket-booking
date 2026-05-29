import { baseApi } from './baseApi'
import type { CreateOrderRequest, CreateOrderResponse } from './orderRequest.types'

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<CreateOrderResponse, CreateOrderRequest>({
      query: (body) => ({
        url: '/order',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useCreateOrderMutation } = orderApi
