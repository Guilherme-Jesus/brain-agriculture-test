import Input from '@/components/atoms/Input'
import FormActions from '@/components/molecules/FormActions'
import FormWrapper from '@/components/molecules/FormWrapper'
import { harvestSchema, type HarvestFormData } from '@/schemas/harvest.schema'
import {
  useCreateHarvestMutation,
  useGetHarvestByIdQuery,
  useUpdateHarvestMutation,
} from '@/store/api/harvests-api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface HarvestFormProps {
  id?: string
  onSuccess: () => void
  onCancel: () => void
}

export function HarvestForm({ id, onSuccess, onCancel }: HarvestFormProps) {
  const { data: editingHarvest } = useGetHarvestByIdQuery(id!, { skip: !id })

  const [createHarvest, { isLoading: isCreating }] = useCreateHarvestMutation()
  const [updateHarvest, { isLoading: isUpdating }] = useUpdateHarvestMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HarvestFormData>({
    resolver: zodResolver(harvestSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
    },
  })

  useEffect(() => {
    if (editingHarvest) {
      reset({ name: editingHarvest.name })
    }
  }, [editingHarvest, reset])

  const onSubmit = async (data: HarvestFormData) => {
    try {
      if (editingHarvest) {
        await updateHarvest({
          id: editingHarvest.id,
          name: data.name,
        }).unwrap()
        toast.success('Safra atualizada com sucesso!')
      } else {
        await createHarvest({
          name: data.name,
        }).unwrap()
        toast.success('Safra criada com sucesso!')
      }
      onSuccess()
    } catch {
      toast.error('Erro ao salvar safra.')
    }
  }

  const isLoading = isCreating || isUpdating

  return (
    <FormWrapper key={id || 'new'} onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Nome da Safra"
        placeholder="Ex: 2024/2025, Verão 2024"
        {...register('name')}
        error={errors.name?.message}
      />
      <FormActions
        onCancel={onCancel}
        isLoading={isLoading}
        submitText={editingHarvest ? 'Salvar' : 'Criar'}
      />
    </FormWrapper>
  )
}
