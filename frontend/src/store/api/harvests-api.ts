import type {
  CreateHarvestDto,
  HarvestsResponse,
  UpdateHarvestDto,
} from '@/types/harvests'
import { apiSlice } from './api'

export const harvestsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllHarvests: builder.query<HarvestsResponse[], void>({
      query: () => '/harvests',
      providesTags: ['Harvest'],
    }),
    getHarvestById: builder.query<HarvestsResponse, string>({
      query: (id) => `/harvests/${id}`,
      providesTags: ['Harvest'],
    }),
    createHarvest: builder.mutation<HarvestsResponse, CreateHarvestDto>({
      query: (body) => ({
        url: '/harvests',
        method: 'POST',
        body,
      }),
    }),
    updateHarvest: builder.mutation<HarvestsResponse, UpdateHarvestDto>({
      query: (body) => ({
        url: `/harvests/${body.id}`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteHarvest: builder.mutation<void, string>({
      query: (id) => ({
        url: `/harvests/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetAllHarvestsQuery,
  useGetHarvestByIdQuery,
  useCreateHarvestMutation,
  useUpdateHarvestMutation,
  useDeleteHarvestMutation,
} = harvestsApiSlice
