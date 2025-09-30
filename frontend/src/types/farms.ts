import type { ProducersResponse } from './producers'

export interface FarmsResponse {
  id: string
  name: string
  city: string
  state: string
  totalArea: number
  arableArea: number
  vegetationArea: number
  producer: ProducersResponse[]
  plantedCrops: PlantedCrop[]
}

export interface PlantedCrop {
  id: string
  plantedArea: number
  farm: FarmsResponse[]
  culture: Culture[]
  harvest: Harvest[]
}

export interface Culture {
  id: string
  name: string
}

export interface Harvest {
  id: string
  name: string
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
