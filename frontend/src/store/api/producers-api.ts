import type {
  CreateProducerDto,
  ProducersResponse,
  UpdateProducerDto,
} from '@/types/producers'
import { apiSlice } from './api'

export const producersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducers: builder.query<ProducersResponse[], void>({
      query: () => '/producers',
      providesTags: ['Producer'],
    }),
    getProducerById: builder.query<ProducersResponse, string>({
      query: (id) => `/producers/${id}`,
      providesTags: ['Producer'],
    }),
    getProducerWithFarms: builder.query<ProducersResponse, string>({
      query: (id) => `/producers/${id}/farms`,
      providesTags: ['Producer'],
    }),
    createProducer: builder.mutation<ProducersResponse, CreateProducerDto>({
      query: (body) => ({
        url: '/producers',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Producer'],
    }),
    updateProducer: builder.mutation<ProducersResponse, UpdateProducerDto>({
      query: (body) => ({
        url: `/producers/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Producer'],
    }),
    deleteProducer: builder.mutation<void, string>({
      query: (id) => ({
        url: `/producers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Producer'],
    }),
  }),
})

export const {
  useGetAllProducersQuery,
  useGetProducerByIdQuery,
  useGetProducerWithFarmsQuery,
  useCreateProducerMutation,
  useUpdateProducerMutation,
  useDeleteProducerMutation,
} = producersApiSlice
