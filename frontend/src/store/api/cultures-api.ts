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
      transformResponse: (response: CulturesResponse[]) => {
        if (response.length === 0) return []
        const cultures = response.map((culture) => ({
          ...culture,
          name: culture.name.charAt(0).toUpperCase() + culture.name.slice(1),
        }))
        return cultures
      },
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
      invalidatesTags: ['Culture'],
    }),
    updateCulture: builder.mutation<CulturesResponse, UpdateCultureDto>({
      query: (body) => ({
        url: `/cultures/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Culture'],
    }),
    deleteCulture: builder.mutation<void, string>({
      query: (id) => ({
        url: `/cultures/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Culture'],
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
