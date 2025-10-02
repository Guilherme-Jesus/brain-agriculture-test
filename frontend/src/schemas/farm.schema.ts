import { z } from 'zod'

export const farmFormSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Nome da fazenda é obrigatório')
      .min(2, 'Nome deve ter pelo menos 2 caracteres')
      .max(100, 'Nome deve ter no máximo 100 caracteres'),

    city: z
      .string()
      .min(1, 'Cidade é obrigatória')
      .min(2, 'Cidade deve ter pelo menos 2 caracteres')
      .max(100, 'Cidade deve ter no máximo 100 caracteres'),

    state: z.string().min(1, 'Estado é obrigatório'),

    totalArea: z
      .number()
      .min(1, 'Área total deve ser maior que zero')
      .max(1000000, 'Área total não pode ser maior que 1.000.000 hectares'),

    arableArea: z
      .number()
      .min(0, 'Área agricultável não pode ser negativa')
      .max(
        1000000,
        'Área agricultável não pode ser maior que 1.000.000 hectares'
      ),

    vegetationArea: z
      .number()
      .min(0, 'Área de vegetação não pode ser negativa')
      .max(
        1000000,
        'Área de vegetação não pode ser maior que 1.000.000 hectares'
      ),

    producerId: z.string().min(1, 'Selecione um produtor'),
  })
  .superRefine((data, ctx) => {
    const totalUsedArea = data.arableArea + data.vegetationArea

    if (totalUsedArea > data.totalArea) {
      const errorMessage = `A soma das áreas (${totalUsedArea} ha) não pode ultrapassar a área total (${data.totalArea} ha)`

      // Adiciona erro em todos os campos relacionados
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: errorMessage,
        path: ['arableArea'],
      })

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: errorMessage,
        path: ['vegetationArea'],
      })
    }
  })

export type FarmFormData = z.infer<typeof farmFormSchema>
