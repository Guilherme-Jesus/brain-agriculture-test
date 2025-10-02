import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Modal from '@/components/atoms/Modal'
import Text from '@/components/atoms/Text'
import { DataTable } from '@/components/molecules/DataTable'
import FormActions from '@/components/molecules/FormActions'
import {
  producerSchema,
  type ProducerFormData,
} from '@/schemas/producer.schema'
import {
  useCreateProducerMutation,
  useDeleteProducerMutation,
  useGetAllProducersQuery,
  useUpdateProducerMutation,
} from '@/store/api/producers-api'
import type { ProducersResponse } from '@/types/producers'
import { formatarCNPJ, formatarCPF } from '@/utils/validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as S from './producers.styles'

export default function ProducersPage() {
  const { data: producers = [] } = useGetAllProducersQuery()

  const [createProducer] = useCreateProducerMutation()
  const [updateProducer] = useUpdateProducerMutation()
  const [deleteProducer] = useDeleteProducerMutation()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProducer, setEditingProducer] =
    useState<ProducersResponse | null>(null)

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ProducerFormData>({
    resolver: zodResolver(producerSchema),
    mode: 'onChange',
    defaultValues: {
      document: '',
      producerName: '',
    },
  })

  const onSubmit = async (data: ProducerFormData) => {
    try {
      // Remove formatação antes de enviar
      const cleanDocument = data.document.replace(/\D/g, '')

      if (editingProducer) {
        await updateProducer({
          id: editingProducer.id,
          document: cleanDocument,
          producerName: data.producerName,
        }).unwrap()
      } else {
        await createProducer({
          document: cleanDocument,
          producerName: data.producerName,
        }).unwrap()
      }
      handleCloseModal()
    } catch (error) {
      console.error('Erro ao salvar produtor:', error)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingProducer(null)
    reset({
      document: '',
      producerName: '',
    })
  }

  const handleOpenCreate = () => {
    setEditingProducer(null)
    reset({
      document: '',
      producerName: '',
    })
    setIsModalOpen(true)
  }

  const handleEdit = (producer: ProducersResponse) => {
    setEditingProducer(producer)
    reset({
      document: producer.document,
      producerName: producer.producerName,
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (producer: ProducersResponse) => {
    if (
      confirm(`Deseja realmente excluir o produtor ${producer.producerName}?`)
    ) {
      try {
        await deleteProducer(producer.id).unwrap()
      } catch (error) {
        console.error('Erro ao excluir produtor:', error)
      }
    }
  }

  const columns = [
    { key: 'document', label: 'CPF/CNPJ' },
    { key: 'producerName', label: 'Nome' },
  ]

  return (
    <>
      <S.PageHeader>
        <Text variant="h1" weight="bold">
          Produtores
        </Text>
        <Button variant="primary" onClick={handleOpenCreate}>
          + Novo Produtor
        </Button>
      </S.PageHeader>

      <DataTable
        data={producers}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingProducer ? 'Editar Produtor' : 'Novo Produtor'}
      >
        <S.FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="document"
            control={control}
            render={({ field }) => {
              const handleDocumentChange = (
                e: React.ChangeEvent<HTMLInputElement>
              ) => {
                const value = e.target.value
                const clean = value.replace(/\D/g, '')

                // Formata conforme o tamanho
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
            onCancel={handleCloseModal}
            isLoading={isSubmitting}
            isDisabled={!isValid}
            submitText={editingProducer ? 'Salvar' : 'Criar'}
          />
        </S.FormWrapper>
      </Modal>
    </>
  )
}
