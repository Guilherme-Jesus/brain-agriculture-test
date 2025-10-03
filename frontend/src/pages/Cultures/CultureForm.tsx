import Input from '@/components/atoms/Input'
import FormActions from '@/components/molecules/FormActions'
import FormWrapper from '@/components/molecules/FormWrapper'
import { cultureSchema, type CultureFormData } from '@/schemas/culture.schema'
import {
  useCreateCultureMutation,
  useGetCultureByIdQuery,
  useUpdateCultureMutation,
} from '@/store/api/cultures-api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface CultureFormProps {
  id?: string
  onSuccess: () => void
  onCancel: () => void
}

export function CultureForm({ id, onSuccess, onCancel }: CultureFormProps) {
  const { data: editingCulture } = useGetCultureByIdQuery(id!, { skip: !id })

  const [createCulture, { isLoading: isCreating }] = useCreateCultureMutation()
  const [updateCulture, { isLoading: isUpdating }] = useUpdateCultureMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CultureFormData>({
    resolver: zodResolver(cultureSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
    },
  })

  useEffect(() => {
    if (editingCulture) {
      reset({ name: editingCulture.name })
    }
  }, [editingCulture, reset])

  const onSubmit = async (data: CultureFormData) => {
    try {
      if (editingCulture) {
        await updateCulture({
          id: editingCulture.id,
          name: data.name,
        }).unwrap()
        toast.success('Cultura atualizada com sucesso!')
      } else {
        await createCulture({
          name: data.name,
        }).unwrap()
        toast.success('Cultura criada com sucesso!')
      }
      onSuccess()
    } catch {
      toast.error('Erro ao salvar cultura.')
    }
  }

  const isLoading = isCreating || isUpdating

  return (
    <FormWrapper key={id || 'new'} onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Nome da Cultura"
        placeholder="Ex: Soja, Milho, Café"
        {...register('name')}
        error={errors.name?.message}
      />
      <FormActions
        onCancel={onCancel}
        isLoading={isLoading}
        submitText={editingCulture ? 'Salvar' : 'Criar'}
      />
    </FormWrapper>
  )
}
