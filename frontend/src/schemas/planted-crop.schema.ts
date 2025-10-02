import { z } from 'zod'

export const plantedCropSchema = z.object({
  farmId: z.string().min(1, 'Selecione uma fazenda'),
  cultureId: z.string().min(1, 'Selecione uma cultura'),
  harvestId: z.string().min(1, 'Selecione uma safra'),
  plantedArea: z.number().min(1, 'Área plantada deve ser maior que zero'),
})

export type PlantedCropFormData = z.infer<typeof plantedCropSchema>
