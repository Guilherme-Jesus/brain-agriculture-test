import { z } from 'zod'

export const cultureSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome da cultura é obrigatório')
    .min(2, 'Nome da cultura deve ter pelo menos 2 caracteres')
    .max(100, 'Nome da cultura deve ter no máximo 100 caracteres'),
})

export type CultureFormData = z.infer<typeof cultureSchema>
