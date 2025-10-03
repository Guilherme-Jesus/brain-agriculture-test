import { z } from 'zod'

export const harvestSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome da safra é obrigatório')
    .min(2, 'Nome da safra deve ter pelo menos 2 caracteres')
    .max(50, 'Nome da safra deve ter no máximo 50 caracteres'),
})

export type HarvestFormData = z.infer<typeof harvestSchema>
