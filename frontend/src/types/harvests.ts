export interface HarvestsResponse {
  id: string
  name: string
}

export interface CreateHarvestDto {
  name: string
}

export interface UpdateHarvestDto {
  id: string
  name?: string
}
