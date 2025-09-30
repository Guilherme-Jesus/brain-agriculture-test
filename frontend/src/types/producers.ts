export interface ProducersResponse {
  id: string
  document: string
  producerName: string
  farms: Farm[]
}

export interface Farm {
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
  farm: Farm[]
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

export interface UpdateProducerDto {
  id: string
  document?: string
  producerName?: string
}

export interface CreateProducerDto {
  document: string
  producerName: string
}
