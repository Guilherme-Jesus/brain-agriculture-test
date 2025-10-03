import { Select } from '@/components/atoms/Select'
import { Slider } from '@/components/atoms/Slider/Slider'
import Text from '@/components/atoms/Text'
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
  useGetAllPlantedCropsQuery,
  useGetPlantedCropByIdQuery,
  useUpdatePlantedCropMutation,
} from '@/store/api/planted-crop-api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as S from './planted-crops.styles'

interface PlantedCropFormProps {
  id?: string // ID para modo de edição
  onSuccess: () => void
  onCancel: () => void
}

export function PlantedCropForm({
  id,
  onSuccess,
  onCancel,
}: PlantedCropFormProps) {
  const { data: farms = [] } = useGetAllFarmsQuery()
  const { data: cultures = [] } = useGetAllCulturesQuery()
  const { data: harvests = [] } = useGetAllHarvestsQuery()
  const { data: allPlantedCrops = [] } = useGetAllPlantedCropsQuery()

  const { data: editingCrop } = useGetPlantedCropByIdQuery(id!, { skip: !id })

  const [createPlantedCrop] = useCreatePlantedCropMutation()
  const [updatePlantedCrop] = useUpdatePlantedCropMutation()

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PlantedCropFormData>({
    resolver: zodResolver(plantedCropSchema),
  })

  const selectedFarmId = watch('farmId')
  const selectedHarvestId = watch('harvestId')
  const selectedFarm = farms.find((f) => f.id === selectedFarmId)

  useEffect(() => {
    if (editingCrop) {
      reset({
        plantedArea: editingCrop.plantedArea,
        farmId: editingCrop.farm.id,
        cultureId: editingCrop.culture.id,
        harvestId: editingCrop.harvest.id,
      })
    } else {
      reset({ plantedArea: 0, farmId: '', cultureId: '', harvestId: '' })
    }
  }, [editingCrop, reset])

  const occupiedArea = useMemo(() => {
    if (!selectedFarmId || !selectedHarvestId) return 0
    return allPlantedCrops
      .filter(
        (crop) =>
          crop.farm.id === selectedFarmId &&
          crop.harvest.id === selectedHarvestId &&
          crop.id !== editingCrop?.id
      )
      .reduce((sum, crop) => sum + Number(crop.plantedArea), 0)
  }, [selectedFarmId, selectedHarvestId, allPlantedCrops, editingCrop])

  const availableArea = useMemo(() => {
    if (!selectedFarm) return 0
    const maxArea = Number(selectedFarm.arableArea) - occupiedArea
    return maxArea > 0 ? maxArea : 0
  }, [selectedFarm, occupiedArea])

  const onSubmit = async (data: PlantedCropFormData) => {
    try {
      if (editingCrop) {
        await updatePlantedCrop({
          id: editingCrop.id,
          plantedArea: Number(data.plantedArea),
        }).unwrap()
      } else {
        await createPlantedCrop({
          ...data,
          plantedArea: Number(data.plantedArea),
        }).unwrap()
      }
      onSuccess()
    } catch {
      toast.error('Erro ao salvar plantio')
    }
  }

  return (
    <S.FormWrapper key={id || 'new'} onSubmit={handleSubmit(onSubmit)}>
      <Select
        label="Fazenda"
        {...register('farmId')}
        error={errors.farmId?.message}
        disabled={!!editingCrop}
      >
        <option value="">Selecione uma fazenda</option>
        {farms.map((farm) => (
          <option key={farm.id} value={farm.id}>
            {farm.name}
          </option>
        ))}
      </Select>

      <Select
        label="Cultura"
        {...register('cultureId')}
        error={errors.cultureId?.message}
        disabled={!!editingCrop}
      >
        <option value="">Selecione uma cultura</option>
        {cultures.map((culture) => (
          <option key={culture.id} value={culture.id}>
            {culture.name}
          </option>
        ))}
      </Select>

      <Select
        label="Safra"
        {...register('harvestId')}
        error={errors.harvestId?.message}
        disabled={!!editingCrop}
      >
        <option value="">Selecione uma safra</option>
        {harvests.map((harvest) => (
          <option key={harvest.id} value={harvest.id}>
            {harvest.name}
          </option>
        ))}
      </Select>

      {selectedFarm && (
        <S.FarmInfoBox>
          <S.FarmInfoItem>
            <Text variant="caption" color="secondary">
              Área Agricultável
            </Text>
            <Text variant="body" weight="semibold">
              {selectedFarm.arableArea} ha
            </Text>
          </S.FarmInfoItem>
          <S.FarmInfoItem>
            <Text variant="caption" color="secondary">
              Área Já Ocupada
            </Text>
            <Text variant="body" weight="semibold">
              {occupiedArea} ha
            </Text>
          </S.FarmInfoItem>
          <S.FarmInfoItem>
            <Text variant="caption" color="secondary" weight="bold">
              Área Disponível
            </Text>
            <Text variant="body" weight="bold">
              {availableArea} ha
            </Text>
          </S.FarmInfoItem>
        </S.FarmInfoBox>
      )}

      <Controller
        name="plantedArea"
        control={control}
        render={({ field }) => (
          <>
            <Slider
              label="Área Plantada"
              min={0}
              max={availableArea}
              step={10}
              unit="hectares"
              showValue
              error={errors.plantedArea?.message}
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
              disabled={!selectedFarm || availableArea <= 0}
            />
            {selectedFarm && (
              <S.AvailableAreaWarning $hasSpace={availableArea > 0}>
                <Text variant="caption">
                  {availableArea > 0
                    ? `Você pode plantar até ${availableArea} ha nesta safra`
                    : 'Não há área disponível para plantio nesta fazenda/safra'}
                </Text>
              </S.AvailableAreaWarning>
            )}
          </>
        )}
      />

      <FormActions
        onCancel={onCancel}
        isLoading={isSubmitting}
        submitText={editingCrop ? 'Salvar Alterações' : 'Cadastrar Plantio'}
      />
    </S.FormWrapper>
  )
}
