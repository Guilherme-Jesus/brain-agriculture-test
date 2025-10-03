import Input from '@/components/atoms/Input'
import FormActions from '@/components/molecules/FormActions'
import FormWrapper from '@/components/molecules/FormWrapper'
import {
  producerSchema,
  type ProducerFormData,
} from '@/schemas/producer.schema'
import {
  useCreateProducerMutation,
  useGetProducerByIdQuery,
  useUpdateProducerMutation,
} from '@/store/api/producers-api'
import { formatarCNPJ, formatarCPF } from '@/utils/validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface ProducerFormProps {
  id?: string
  onSuccess: () => void
  onCancel: () => void
}

export function ProducerForm({ id, onSuccess, onCancel }: ProducerFormProps) {
  const { data: editingProducer } = useGetProducerByIdQuery(id!, { skip: !id })

  const [createProducer, { isLoading: isCreating }] =
    useCreateProducerMutation()
  const [updateProducer, { isLoading: isUpdating }] =
    useUpdateProducerMutation()

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ProducerFormData>({
    resolver: zodResolver(producerSchema),
    mode: 'onChange',
    defaultValues: {
      document: '',
      producerName: '',
    },
  })

  useEffect(() => {
    if (editingProducer) {
      reset({
        document: editingProducer.document,
        producerName: editingProducer.producerName,
      })
    }
  }, [editingProducer, reset])

  const onSubmit = async (data: ProducerFormData) => {
    try {
      const cleanDocument = data.document.replace(/\D/g, '')

      if (editingProducer) {
        await updateProducer({
          id: editingProducer.id,
          document: cleanDocument,
          producerName: data.producerName,
        }).unwrap()
        toast.success('Produtor atualizado com sucesso!')
      } else {
        await createProducer({
          document: cleanDocument,
          producerName: data.producerName,
        }).unwrap()
        toast.success('Produtor criado com sucesso!')
      }
      onSuccess()
    } catch {
      toast.error('Erro ao salvar produtor.')
    }
  }

  const isLoading = isCreating || isUpdating

  return (
    <FormWrapper key={id || 'new'} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="document"
        control={control}
        render={({ field }) => {
          const handleDocumentChange = (
            e: React.ChangeEvent<HTMLInputElement>
          ) => {
            const value = e.target.value
            const clean = value.replace(/\D/g, '')

            let formatted = value
            if (clean.length <= 11) {
              formatted = formatarCPF(value)
            } else {
              formatted = formatarCNPJ(value)
            }

            field.onChange(formatted)
          }

          return (
            <Input
              label="CPF/CNPJ"
              placeholder="Digite o CPF (11 dígitos) ou CNPJ (14 dígitos)"
              value={field.value}
              onChange={handleDocumentChange}
              error={errors.document?.message}
              disabled={!!editingProducer}
              maxLength={18}
            />
          )
        }}
      />

      <Input
        label="Nome do Produtor"
        placeholder="Digite o nome completo"
        {...register('producerName')}
        error={errors.producerName?.message}
      />

      <FormActions
        onCancel={onCancel}
        isLoading={isLoading}
        isDisabled={!isValid}
        submitText={editingProducer ? 'Salvar' : 'Criar'}
      />
    </FormWrapper>
  )
}
