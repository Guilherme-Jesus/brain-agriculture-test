export interface CulturesResponse {
  id: string
  name: string
}

export interface CreateCultureDto {
  name: string
}

export interface UpdateCultureDto {
  id: string
  name?: string
}
