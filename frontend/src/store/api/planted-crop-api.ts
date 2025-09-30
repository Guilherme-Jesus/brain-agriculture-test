import type {
  CreatePlantedCropDto,
  PlantedCropResponse,
  UpdatePlantedCropDto,
} from '@/types/planted-crop'
import { apiSlice } from './api'

export const plantedCropApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlantedCrops: builder.query<PlantedCropResponse[], void>({
      query: () => '/planted-crops',
      providesTags: ['PlantedCrop'],
    }),
    getPlantedCropById: builder.query<PlantedCropResponse, string>({
      query: (id) => `/planted-crops/${id}`,
      providesTags: ['PlantedCrop'],
    }),
    createPlantedCrop: builder.mutation<
      PlantedCropResponse,
      CreatePlantedCropDto
    >({
      query: (body) => ({
        url: '/planted-crops',
        method: 'POST',
        body,
      }),
    }),
    updatePlantedCrop: builder.mutation<
      PlantedCropResponse,
      UpdatePlantedCropDto
    >({
      query: (body) => ({
        url: `/planted-crops/${body.id}`,
        method: 'PATCH',
        body,
      }),
    }),
    deletePlantedCrop: builder.mutation<void, string>({
      query: (id) => ({
        url: `/planted-crops/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetAllPlantedCropsQuery,
  useGetPlantedCropByIdQuery,
  useCreatePlantedCropMutation,
  useUpdatePlantedCropMutation,
  useDeletePlantedCropMutation,
} = plantedCropApiSlice
