import type {
  CreatePlantedCropDto,
  PlantedCropResponse,
  UpdatePlantedCropDto,
} from '@/types/planted-crop'
import { capitalizeFirstLetter } from '@/utils/validators'
import { apiSlice } from './api'

export const plantedCropApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlantedCrops: builder.query<PlantedCropResponse[], void>({
      query: () => '/planted-crops',
      providesTags: ['PlantedCrop'],
      transformResponse: (response: PlantedCropResponse[]) => {
        if (response.length === 0) return []
        return response.map((plantedCrop) => ({
          ...plantedCrop,
          culture: {
            ...plantedCrop.culture,
            name: capitalizeFirstLetter(plantedCrop.culture.name),
          },
        }))
      },
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
      invalidatesTags: ['PlantedCrop'],
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
      invalidatesTags: ['PlantedCrop'],
    }),
    deletePlantedCrop: builder.mutation<void, string>({
      query: (id) => ({
        url: `/planted-crops/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PlantedCrop'],
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
