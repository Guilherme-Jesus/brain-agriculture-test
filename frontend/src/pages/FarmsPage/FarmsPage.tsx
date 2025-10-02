import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Modal from '@/components/atoms/Modal'
import { Select } from '@/components/atoms/Select'
import { Slider } from '@/components/atoms/Slider/Slider'
import Text from '@/components/atoms/Text'
import { DataTable } from '@/components/molecules/DataTable'
import FormActions from '@/components/molecules/FormActions'
import { farmFormSchema, type FarmFormData } from '@/schemas/farm.schema'
import {
  useCreateFarmMutation,
  useDeleteFarmMutation,
  useGetAllFarmsQuery,
  useUpdateFarmMutation,
} from '@/store/api/farms-api'
import { useGetAllProducersQuery } from '@/store/api/producers-api'
import type { FarmsResponse } from '@/types/farms'
import { BRAZILIAN_STATES } from '@/utils/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.md};
  }
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export default function FarmsPage() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting, isValid, touchedFields },
  } = useForm<FarmFormData>({
    resolver: zodResolver(farmFormSchema),
    mode: 'onChange',
    defaultValues: {
      totalArea: 0,
      arableArea: 0,
      vegetationArea: 0,
    },
  })

  const totalArea = watch('totalArea') || 0
  const arableArea = watch('arableArea') || 0
  const vegetationArea = watch('vegetationArea') || 0

  const { data: farms = [] } = useGetAllFarmsQuery()

  const { data: producersData = [] } = useGetAllProducersQuery()
  const producers = producersData.map((producer) => ({
    value: producer.id,
    label: producer.producerName,
  }))

  const [createFarm] = useCreateFarmMutation()
  const [updateFarm] = useUpdateFarmMutation()
  const [deleteFarm] = useDeleteFarmMutation()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingFarm, setEditingFarm] = useState<FarmsResponse | null>(null)

  const onSubmit = async (data: FarmFormData) => {
    try {
      if (editingFarm) {
        await updateFarm({
          id: editingFarm.id,
          totalArea: Number(data.totalArea),
          arableArea: Number(data.arableArea),
          vegetationArea: Number(data.vegetationArea),
        }).unwrap()
      } else {
        await createFarm({
          name: data.name,
          city: data.city,
          state: data.state,
          totalArea: Number(data.totalArea),
          arableArea: Number(data.arableArea),
          vegetationArea: Number(data.vegetationArea),
          producerId: data.producerId,
        }).unwrap()
      }
      handleCloseModal()
    } catch (error) {
      console.error('Erro ao salvar fazenda:', error)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingFarm(null)
    reset({
      totalArea: 0,
      arableArea: 0,
      vegetationArea: 0,
    })
  }

  const handleEdit = (farm: FarmsResponse) => {
    setEditingFarm(farm)
    reset({
      name: farm.name,
      city: farm.city,
      state: farm.state,
      totalArea: Number(farm.totalArea),
      arableArea: Number(farm.arableArea),
      vegetationArea: Number(farm.vegetationArea),
      producerId: farm.producer.id,
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (farm: FarmsResponse) => {
    if (confirm(`Deseja realmente excluir esta fazenda?`)) {
      try {
        await deleteFarm(farm.id).unwrap()
      } catch (error) {
        console.error('Erro ao excluir fazenda:', error)
      }
    }
  }

  const columns = [
    { key: 'name', label: 'Nome' },
    { key: 'city', label: 'Cidade' },
    { key: 'state', label: 'Estado' },
    {
      key: 'producer',
      label: 'Produtor',
      render: (farm: FarmsResponse) => farm.producer.producerName,
    },
    {
      key: 'totalArea',
      label: 'Área Total (ha)',
      render: (farm: FarmsResponse) => `${farm.totalArea} ha`,
    },
    {
      key: 'arableArea',
      label: 'Área Agricultável (ha)',
      render: (farm: FarmsResponse) => `${farm.arableArea} ha`,
    },
    {
      key: 'vegetationArea',
      label: 'Área Vegetal (ha)',
      render: (farm: FarmsResponse) => `${farm.vegetationArea} ha`,
    },
  ]

  return (
    <>
      <PageHeader>
        <Text variant="h1" weight="bold">
          Fazendas
        </Text>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          + Nova Fazenda
        </Button>
      </PageHeader>

      <DataTable
        data={farms}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingFarm ? 'Editar Fazenda' : 'Nova Fazenda'}
      >
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Nome da Fazenda"
            placeholder="Digite o nome da propriedade"
            {...register('name')}
            error={errors.name?.message}
            disabled={!!editingFarm}
          />

          <Select
            label="Produtor"
            {...register('producerId')}
            error={errors.producerId?.message}
            options={producers}
            disabled={!!editingFarm}
          />

          <Row>
            <Input
              label="Cidade"
              placeholder="Digite a cidade"
              {...register('city')}
              error={errors.city?.message}
              disabled={!!editingFarm}
            />
            <Select
              label="Estado"
              {...register('state')}
              error={errors.state?.message}
              options={BRAZILIAN_STATES}
              disabled={!!editingFarm}
            />
          </Row>

          <Controller
            name="totalArea"
            control={control}
            render={({ field }) => (
              <Slider
                label="Área Total"
                min={0}
                max={2000}
                step={10}
                unit="hectares"
                showValue
                error={errors.totalArea?.message}
                value={field.value || 0}
                onChange={(e) => {
                  const newValue = Number(e.target.value)
                  field.onChange(newValue)

                  const currentSum = arableArea + vegetationArea
                  if (currentSum > newValue) {
                    if (arableArea > 0 && vegetationArea > 0) {
                      const ratio = arableArea / currentSum
                      setValue(
                        'arableArea',
                        Math.floor((newValue * ratio) / 10) * 10
                      )
                      setValue(
                        'vegetationArea',
                        Math.floor((newValue * (1 - ratio)) / 10) * 10
                      )
                    } else if (arableArea > 0) {
                      setValue('arableArea', newValue)
                    } else if (vegetationArea > 0) {
                      setValue('vegetationArea', newValue)
                    }
                  }
                }}
              />
            )}
          />

          <Controller
            name="arableArea"
            control={control}
            render={({ field }) => {
              const maxArableArea =
                totalArea > 0 ? totalArea - vegetationArea : 2000
              return (
                <Slider
                  label="Área Agricultável"
                  min={0}
                  max={maxArableArea}
                  step={10}
                  unit="hectares"
                  showValue
                  error={errors.arableArea?.message}
                  value={field.value || 0}
                  onChange={(e) => {
                    const newValue = Number(e.target.value)
                    field.onChange(newValue)
                    if (newValue + vegetationArea > totalArea) {
                      setValue(
                        'vegetationArea',
                        Math.max(0, totalArea - newValue)
                      )
                    }
                  }}
                  disabled={totalArea === 0}
                />
              )
            }}
          />

          <Controller
            name="vegetationArea"
            control={control}
            render={({ field }) => {
              const maxVegetationArea =
                totalArea > 0 ? totalArea - arableArea : 2000
              return (
                <Slider
                  label="Área de Vegetação"
                  min={0}
                  max={maxVegetationArea}
                  step={10}
                  unit="hectares"
                  showValue
                  error={errors.vegetationArea?.message}
                  value={field.value || 0}
                  onChange={(e) => {
                    const newValue = Number(e.target.value)
                    field.onChange(newValue)
                    if (newValue + arableArea > totalArea) {
                      setValue('arableArea', Math.max(0, totalArea - newValue))
                    }
                  }}
                  disabled={totalArea === 0}
                />
              )
            }}
          />

          <FormActions
            onCancel={handleCloseModal}
            isLoading={isSubmitting}
            isDisabled={!isValid}
            submitText={editingFarm ? 'Salvar' : 'Criar'}
          />
        </FormWrapper>
      </Modal>
    </>
  )
}
