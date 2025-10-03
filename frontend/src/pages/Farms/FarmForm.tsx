import Input from '@/components/atoms/Input'
import { Select } from '@/components/atoms/Select'
import { Slider } from '@/components/atoms/Slider/Slider'
import Text from '@/components/atoms/Text'
import FormActions from '@/components/molecules/FormActions'
import FormWrapper from '@/components/molecules/FormWrapper'
import { farmFormSchema, type FarmFormData } from '@/schemas/farm.schema'
import {
  useCreateFarmMutation,
  useGetFarmByIdQuery,
  useUpdateFarmMutation,
} from '@/store/api/farms-api'
import {
  useGetAllPlantedCropsQuery,
  useUpdatePlantedCropMutation,
} from '@/store/api/planted-crop-api'
import { useGetAllProducersQuery } from '@/store/api/producers-api'
import type { UpdateFarmDto } from '@/types/farms'
import { BRAZILIAN_STATES } from '@/utils/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as S from './farms.styles'

interface FarmFormProps {
  id?: string
  onSuccess: () => void
  onCancel: () => void
}

export function FarmForm({ id, onSuccess, onCancel }: FarmFormProps) {
  const { data: editingFarm } = useGetFarmByIdQuery(id!, { skip: !id })
  const { data: producersData = [] } = useGetAllProducersQuery()
  const { data: allPlantedCrops = [] } = useGetAllPlantedCropsQuery()

  const [createFarm, { isLoading: isCreating }] = useCreateFarmMutation()
  const [updateFarm, { isLoading: isUpdating }] = useUpdateFarmMutation()
  const [updatePlantedCrop] = useUpdatePlantedCropMutation()

  const [plantedCropsAreas, setPlantedCropsAreas] = useState<
    Record<string, number>
  >({})

  const producers = producersData.map((producer) => ({
    value: producer.id,
    label: producer.producerName,
  }))

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isValid },
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

  const farmPlantedCrops = useMemo(() => {
    if (!editingFarm) return []
    return allPlantedCrops.filter((crop) => crop.farm.id === editingFarm.id)
  }, [editingFarm, allPlantedCrops])

  useEffect(() => {
    if (editingFarm) {
      const cropsInFarm = allPlantedCrops.filter(
        (crop) => crop.farm.id === editingFarm.id
      )
      const initialAreas: Record<string, number> = {}
      cropsInFarm.forEach((crop) => {
        initialAreas[crop.id] = Number(crop.plantedArea)
      })
      setPlantedCropsAreas(initialAreas)

      reset({
        name: editingFarm.name,
        city: editingFarm.city,
        state: editingFarm.state,
        totalArea: Number(editingFarm.totalArea),
        arableArea: Number(editingFarm.arableArea),
        vegetationArea: Number(editingFarm.vegetationArea),
        producerId: editingFarm.producer.id,
      })
    }
  }, [editingFarm, allPlantedCrops, reset])

  useEffect(() => {
    if (!editingFarm || farmPlantedCrops.length === 0) return

    const totalPlantedArea = farmPlantedCrops.reduce((sum, crop) => {
      const area =
        plantedCropsAreas[crop.id] !== undefined
          ? plantedCropsAreas[crop.id]
          : Number(crop.plantedArea)
      return sum + area
    }, 0)

    if (totalPlantedArea > arableArea && arableArea > 0) {
      const ratio = arableArea / totalPlantedArea
      const newAreas: Record<string, number> = {}

      farmPlantedCrops.forEach((crop) => {
        const currentArea =
          plantedCropsAreas[crop.id] !== undefined
            ? plantedCropsAreas[crop.id]
            : Number(crop.plantedArea)
        newAreas[crop.id] = Math.floor((currentArea * ratio) / 10) * 10
      })

      setPlantedCropsAreas(newAreas)
    }
  }, [arableArea, editingFarm, farmPlantedCrops, plantedCropsAreas])

  const onSubmit = async (data: FarmFormData) => {
    try {
      if (editingFarm) {
        const updateData: Partial<UpdateFarmDto> & { id: string } = {
          id: editingFarm.id,
        }

        if (data.name !== editingFarm.name) {
          updateData.name = data.name
        }
        if (data.city !== editingFarm.city) {
          updateData.city = data.city
        }
        if (data.state !== editingFarm.state) {
          updateData.state = data.state
        }
        if (Number(data.totalArea) !== Number(editingFarm.totalArea)) {
          updateData.totalArea = Number(data.totalArea)
        }
        if (Number(data.arableArea) !== Number(editingFarm.arableArea)) {
          updateData.arableArea = Number(data.arableArea)
        }
        if (
          Number(data.vegetationArea) !== Number(editingFarm.vegetationArea)
        ) {
          updateData.vegetationArea = Number(data.vegetationArea)
        }

        if (Object.keys(updateData).length > 1) {
          await updateFarm(updateData as UpdateFarmDto).unwrap()
        }

        const updatePromises = Object.entries(plantedCropsAreas)
          .filter(([cropId, newArea]) => {
            const originalCrop = farmPlantedCrops.find((c) => c.id === cropId)
            return originalCrop && Number(originalCrop.plantedArea) !== newArea
          })
          .map(([cropId, newArea]) => {
            return updatePlantedCrop({
              id: cropId,
              plantedArea: newArea,
            }).unwrap()
          })

        if (updatePromises.length > 0) {
          await Promise.all(updatePromises)
        }

        toast.success('Fazenda atualizada com sucesso!')
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
        toast.success('Fazenda criada com sucesso!')
      }
      onSuccess()
    } catch {
      toast.error('Erro ao salvar fazenda.')
    }
  }

  const isLoading = isCreating || isUpdating

  return (
    <FormWrapper key={id || 'new'} onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Nome da Fazenda"
        placeholder="Digite o nome da propriedade"
        {...register('name')}
        error={errors.name?.message}
      />

      <Select
        label="Produtor"
        {...register('producerId')}
        error={errors.producerId?.message}
        options={producers}
      />

      <S.Row>
        <Input
          label="Cidade"
          placeholder="Digite a cidade"
          {...register('city')}
          error={errors.city?.message}
        />
        <Select
          label="Estado"
          {...register('state')}
          error={errors.state?.message}
          options={BRAZILIAN_STATES}
        />
      </S.Row>

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
                  setValue('vegetationArea', Math.max(0, totalArea - newValue))
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

      {editingFarm && farmPlantedCrops.length > 0 && (
        <S.PlantedCropsSection>
          <S.SectionTitle>Culturas Plantadas Nesta Fazenda</S.SectionTitle>
          <Text
            variant="caption"
            color="secondary"
            style={{ marginBottom: '1rem' }}
          >
            Ajuste as áreas plantadas se necessário. A soma total não pode
            ultrapassar a área agricultável.
          </Text>
          {farmPlantedCrops.map((crop) => {
            const otherCropsTotal = farmPlantedCrops
              .filter((c) => c.id !== crop.id)
              .reduce((sum, c) => {
                const area =
                  plantedCropsAreas[c.id] !== undefined
                    ? plantedCropsAreas[c.id]
                    : Number(c.plantedArea)
                return sum + area
              }, 0)

            const maxAllowed = Math.max(0, Number(arableArea) - otherCropsTotal)

            const currentPlantedArea =
              plantedCropsAreas[crop.id] !== undefined
                ? plantedCropsAreas[crop.id]
                : Number(crop.plantedArea)

            return (
              <S.PlantedCropItem key={crop.id}>
                <Slider
                  label={`${crop.culture.name} - Safra: ${crop.harvest.name}`}
                  min={0}
                  max={maxAllowed}
                  step={10}
                  unit="hectares"
                  showValue
                  value={currentPlantedArea}
                  onChange={(e) => {
                    const newValue = Number(e.target.value)
                    setPlantedCropsAreas((prev) => ({
                      ...prev,
                      [crop.id]: newValue,
                    }))
                  }}
                  disabled={maxAllowed === 0}
                />
              </S.PlantedCropItem>
            )
          })}
        </S.PlantedCropsSection>
      )}

      <FormActions
        onCancel={onCancel}
        isLoading={isLoading}
        isDisabled={!isValid}
        submitText={editingFarm ? 'Salvar' : 'Criar'}
      />
    </FormWrapper>
  )
}
