import type {
  CreateCultureDto,
  CulturesResponse,
  UpdateCultureDto,
} from '@/types/cultures'
import { apiSlice } from './api'

export const culturesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCultures: builder.query<CulturesResponse[], void>({
      query: () => '/cultures',
      providesTags: ['Culture'],
    }),
    getCultureById: builder.query<CulturesResponse, string>({
      query: (id) => `/cultures/${id}`,
      providesTags: ['Culture'],
    }),
    createCulture: builder.mutation<CulturesResponse, CreateCultureDto>({
      query: (body) => ({
        url: '/cultures',
        method: 'POST',
        body,
      }),
    }),
    updateCulture: builder.mutation<CulturesResponse, UpdateCultureDto>({
      query: (body) => ({
        url: `/cultures/${body.id}`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteCulture: builder.mutation<void, string>({
      query: (id) => ({
        url: `/cultures/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetAllCulturesQuery,
  useGetCultureByIdQuery,
  useCreateCultureMutation,
  useUpdateCultureMutation,
  useDeleteCultureMutation,
} = culturesApiSlice
