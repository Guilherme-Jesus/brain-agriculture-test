import Button from '@/components/atoms/Button'
import Modal from '@/components/atoms/Modal'
import { Select } from '@/components/atoms/Select'
import { Slider } from '@/components/atoms/Slider/Slider'
import Text from '@/components/atoms/Text'
import { DataTable } from '@/components/molecules/DataTable'
import FormActions from '@/components/molecules/FormActions'
import {
  plantedCropSchema,
  type PlantedCropFormData,
} from '@/schemas/planted-crop.schema'
import { useGetAllCulturesQuery } from '@/store/api/cultures-api'
import { useGetAllFarmsQuery } from '@/store/api/farms-api'
import { useGetAllHarvestsQuery } from '@/store/api/harvests-api'
import {
  useCreatePlantedCropMutation,
  useDeletePlantedCropMutation,
  useGetAllPlantedCropsQuery,
  useUpdatePlantedCropMutation,
} from '@/store/api/planted-crop-api'
import type { PlantedCropResponse } from '@/types/planted-crop'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as S from './planted-crops.styles'

export default function PlantedCropsPage() {
  const { farms } = useGetAllFarmsQuery(undefined, {
    selectFromResult: ({ ...result }) => ({
      farms: result.data || [],
      isLoading: result.isLoading,
    }),
  })
  const { cultures } = useGetAllCulturesQuery(undefined, {
    selectFromResult: ({ ...result }) => ({
      cultures: result.data || [],
      isLoading: result.isLoading,
    }),
  })
  const { harvests } = useGetAllHarvestsQuery(undefined, {
    selectFromResult: ({ ...result }) => ({
      harvests: result.data || [],
      isLoading: result.isLoading,
    }),
  })
  const { plantedCrops } = useGetAllPlantedCropsQuery(undefined, {
    selectFromResult: ({ ...result }) => ({
      plantedCrops: result.data || [],
      isLoading: result.isLoading,
    }),
  })

  const [createPlantedCrop] = useCreatePlantedCropMutation()
  const [updatePlantedCrop] = useUpdatePlantedCropMutation()
  const [deletePlantedCrop] = useDeletePlantedCropMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCrop, setEditingCrop] = useState<PlantedCropResponse | null>(
    null
  )

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<PlantedCropFormData>({
    resolver: zodResolver(plantedCropSchema),
    mode: 'onChange',
    defaultValues: {
      plantedArea: 0,
    },
  })

  const selectedFarmId = watch('farmId')
  const selectedFarm = farms.find((farm) => farm.id === selectedFarmId)

  const onSubmit = (data: PlantedCropFormData) => {
    if (editingCrop) {
      updatePlantedCrop({
        id: editingCrop.id,
        plantedArea: Number(data.plantedArea),
      }).unwrap()
    } else {
      createPlantedCrop({
        farmId: data.farmId,
        cultureId: data.cultureId,
        harvestId: data.harvestId,
        plantedArea: Number(data.plantedArea),
      }).unwrap()
    }
    handleCloseModal()
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingCrop(null)
    reset()
  }

  const handleEdit = (crop: PlantedCropResponse) => {
    setEditingCrop(crop)
    reset({
      plantedArea: Number(crop.plantedArea),
      farmId: crop.farm.id,
      cultureId: crop.culture.id,
      harvestId: crop.harvest.id,
    })
    setIsModalOpen(true)
  }

  const handleDelete = (crop: PlantedCropResponse) => {
    if (confirm(`Deseja realmente excluir este plantio?`)) {
      deletePlantedCrop(crop.id).unwrap()
    }
  }

  const columns = [
    {
      key: 'farm',
      label: 'Fazenda',
      render: (crop: PlantedCropResponse) => crop.farm.name,
    },
    {
      key: 'culture',
      label: 'Cultura',
      render: (crop: PlantedCropResponse) => crop.culture.name,
    },
    {
      key: 'harvest',
      label: 'Safra',
      render: (crop: PlantedCropResponse) => crop.harvest.name,
    },
    {
      key: 'totalArea',
      label: 'Área Total (ha)',
      render: (crop: PlantedCropResponse) => `${crop.farm.totalArea} ha`,
    },
    {
      key: 'arableArea',
      label: 'Área Agricultável (ha)',
      render: (crop: PlantedCropResponse) => `${crop.farm.arableArea} ha`,
    },
    {
      key: 'vegetationArea',
      label: 'Área Vegetal (ha)',
      render: (crop: PlantedCropResponse) => `${crop.farm.vegetationArea} ha`,
    },
    {
      key: 'plantedArea',
      label: 'Área Plantada (ha)',
      render: (crop: PlantedCropResponse) => `${crop.plantedArea} ha`,
    },
  ]

  return (
    <>
      <S.PageHeader>
        <Text variant="h1" weight="bold">
          Culturas Plantadas
        </Text>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          + Novo Plantio
        </Button>
      </S.PageHeader>

      <DataTable
        data={plantedCrops}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingCrop ? 'Editar Plantio' : 'Novo Plantio'}
      >
        <S.FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <Select
            label="Fazenda"
            {...register('farmId')}
            error={errors.farmId?.message}
            disabled={!!editingCrop}
            options={farms.map((farm) => ({
              value: farm.id,
              label: farm.name,
            }))}
          />

          <Select
            label="Cultura"
            {...register('cultureId')}
            error={errors.cultureId?.message}
            disabled={!!editingCrop}
            options={cultures.map((culture) => ({
              value: culture.id,
              label: culture.name,
            }))}
          />

          <Select
            label="Safra"
            {...register('harvestId')}
            error={errors.harvestId?.message}
            disabled={!!editingCrop}
            options={harvests.map((harvest) => ({
              value: harvest.id,
              label: harvest.name,
            }))}
          />

          {selectedFarm && (
            <S.FarmInfoBox>
              <S.FarmInfoItem>
                <S.FarmInfoLabel>Área Total</S.FarmInfoLabel>
                <S.FarmInfoValue>{selectedFarm.totalArea} ha</S.FarmInfoValue>
              </S.FarmInfoItem>
              <S.FarmInfoItem>
                <S.FarmInfoLabel>Área Agricultável</S.FarmInfoLabel>
                <S.FarmInfoValue>{selectedFarm.arableArea} ha</S.FarmInfoValue>
              </S.FarmInfoItem>
              <S.FarmInfoItem>
                <S.FarmInfoLabel>Área de Vegetação</S.FarmInfoLabel>
                <S.FarmInfoValue>
                  {selectedFarm.vegetationArea} ha
                </S.FarmInfoValue>
              </S.FarmInfoItem>
            </S.FarmInfoBox>
          )}

          <Controller
            name="plantedArea"
            control={control}
            render={({ field }) => {
              const maxPlantedArea = selectedFarm
                ? Number(selectedFarm.arableArea)
                : 2000
              return (
                <Slider
                  label="Área Plantada"
                  min={0}
                  max={maxPlantedArea}
                  step={10}
                  unit="hectares"
                  showValue
                  error={errors.plantedArea?.message}
                  value={field.value || 0}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  disabled={!selectedFarm}
                />
              )
            }}
          />

          <FormActions
            onCancel={handleCloseModal}
            isLoading={isSubmitting}
            isDisabled={!isValid}
            submitText={editingCrop ? 'Salvar' : 'Criar'}
          />
        </S.FormWrapper>
      </Modal>
    </>
  )
}
