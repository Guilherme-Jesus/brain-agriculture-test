import type { DashboardResponse } from '@/types/dashboard'
import { apiSlice } from './api'

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query<DashboardResponse, void>({
      query: () => '/dashboard',
      providesTags: ['Dashboard'],
    }),
  }),
})

export const { useGetDashboardDataQuery } = dashboardApiSlice
