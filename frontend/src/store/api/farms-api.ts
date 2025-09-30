import type { CreateFarmDto, FarmsResponse, UpdateFarmDto } from '@/types/farms'
import { apiSlice } from './api'

export const farmsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFarms: builder.query<FarmsResponse[], void>({
      query: () => '/farms',
      providesTags: ['Farm'],
    }),
    getFarmById: builder.query<FarmsResponse, string>({
      query: (id) => `/farms/${id}`,
      providesTags: ['Farm'],
    }),

    createFarm: builder.mutation<FarmsResponse, CreateFarmDto>({
      query: (body) => ({
        url: '/farms',
        method: 'POST',
        body: {
          name: body.name,
          city: body.city,
          state: body.state,
          totalArea: body.totalArea,
          arableArea: body.arableArea,
          vegetationArea: body.vegetationArea,
          producerId: body.producerId,
        },
      }),
    }),
    updateFarm: builder.mutation<FarmsResponse, UpdateFarmDto>({
      query: (body) => ({
        url: `/farms/${body.id}`,
        method: 'PATCH',
        body: {
          name: body.name,
          city: body.city,
          state: body.state,
          totalArea: body.totalArea,
          arableArea: body.arableArea,
          vegetationArea: body.vegetationArea,
        },
      }),
    }),
    deleteFarm: builder.mutation<void, string>({
      query: (id) => ({
        url: `/farms/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetAllFarmsQuery,
  useGetFarmByIdQuery,
  useCreateFarmMutation,
  useUpdateFarmMutation,
  useDeleteFarmMutation,
} = farmsApiSlice
