export interface ProducersResponse {
  id: string
  document: string
  producerName: string
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
