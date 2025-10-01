import type { ProducersResponse } from './producers'

export interface FarmsResponse {
  id: string
  name: string
  city: string
  state: string
  totalArea: string
  arableArea: string
  vegetationArea: string
  producer: ProducersResponse
}

export interface CreateFarmDto {
  name: string
  city: string
  state: string
  totalArea: number
  arableArea: number
  vegetationArea: number
  producerId: string
}

export interface UpdateFarmDto {
  id: string
  name?: string
  city?: string
  state?: string
  totalArea?: number
  arableArea?: number
  vegetationArea?: number
}
