import type { CulturesResponse } from './cultures'
import type { FarmsResponse } from './farms'
import type { HarvestsResponse } from './harvests'

export interface PlantedCropResponse {
  id: string
  plantedArea: number
  farm: FarmsResponse
  culture: CulturesResponse
  harvest: HarvestsResponse
}

export interface CreatePlantedCropDto {
  plantedArea: number
  farmId: string
  cultureId: string
  harvestId: string
}

export interface UpdatePlantedCropDto {
  id: string
  plantedArea?: number
}
