import { z } from 'zod'

export const producerSchema = z.object({
  document: z
    .string()
    .min(1, 'CPF/CNPJ é obrigatório')
    .refine(
      (value) => {
        const clean = value.replace(/\D/g, '')
        return clean.length === 11 || clean.length === 14
      },
      {
        message: 'CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos',
      }
    ),

  producerName: z
    .string()
    .min(1, 'Nome do produtor é obrigatório')
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
})

export type ProducerFormData = z.infer<typeof producerSchema>
