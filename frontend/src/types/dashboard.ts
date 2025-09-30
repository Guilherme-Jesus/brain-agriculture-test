export interface DashboardResponse {
  totalFarms: number
  totalAreaInHectares: number
  farmsByState: FarmsByState[]
  farmsByCulture: FarmsByCulture[]
  landUse: LandUse
}

export interface FarmsByState {
  state: string
  count: number
}

export interface FarmsByCulture {
  culture: string
  count: number
}

export interface LandUse {
  totalArableArea: number
  totalVegetationArea: number
}
