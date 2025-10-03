import Text from '@/components/atoms/Text'
import { CardAreaInfo, CardAreaItem } from '@/components/molecules/CardAreaInfo'
import { CardDivider, CardInfoRow } from '@/components/molecules/CardInfoRow'
import {
  EntityCard,
  EntityCardContent,
  EntityCardHeader,
  IconButton,
} from '@/components/molecules/EntityCard'
import type { PlantedCropResponse } from '@/types/planted-crop'
import {
  Calendar,
  Edit,
  Leaf,
  MapPin,
  Maximize,
  Sprout,
  Trash2,
  Trees,
} from 'lucide-react'
import * as S from './planted-crops.styles'

interface PlantedCropsListProps {
  crops: PlantedCropResponse[]
  onEdit: (crop: PlantedCropResponse) => void
  onDelete: (crop: PlantedCropResponse) => void
}

export function PlantedCropsList({
  crops,
  onEdit,
  onDelete,
}: PlantedCropsListProps) {
  return (
    <S.CardsGrid>
      {crops.map((crop) => (
        <EntityCard key={crop.id}>
          <EntityCardHeader
            icon={<Sprout size={20} />}
            title={
              <Text variant="h3" weight="bold">
                {crop.culture.name}
              </Text>
            }
            subtitle={
              <Text variant="caption" color="secondary">
                {crop.farm.name}
              </Text>
            }
          >
            <IconButton onClick={() => onEdit(crop)} title="Editar">
              <Edit size={16} />
            </IconButton>
            <IconButton
              variant="danger"
              onClick={() => onDelete(crop)}
              title="Excluir"
            >
              <Trash2 size={16} />
            </IconButton>
          </EntityCardHeader>

          <EntityCardContent>
            <CardInfoRow icon={<MapPin size={16} />}>
              <Text variant="caption" color="secondary">
                Fazenda
              </Text>
              <Text variant="body" weight="medium">
                {crop.farm.name}
              </Text>
            </CardInfoRow>

            <CardInfoRow icon={<Calendar size={16} />}>
              <Text variant="caption" color="secondary">
                Safra
              </Text>
              <Text variant="body" weight="medium">
                {crop.harvest.name}
              </Text>
            </CardInfoRow>

            <CardDivider />

            <CardAreaInfo>
              <CardAreaItem
                icon={<Maximize size={20} />}
                label="Área Total"
                value={`${crop.farm.totalArea} ha`}
              />
              <CardAreaItem
                icon={<Leaf size={20} />}
                iconColor="success"
                label="Agricultável"
                value={`${crop.farm.arableArea} ha`}
              />
              <CardAreaItem
                icon={<Trees size={20} />}
                iconColor="vegetation"
                label="Vegetação"
                value={`${crop.farm.vegetationArea} ha`}
              />
              <CardAreaItem
                icon={<Sprout size={20} />}
                iconColor="success"
                label="Área Plantada"
                value={`${crop.plantedArea} ha`}
              />
            </CardAreaInfo>
          </EntityCardContent>
        </EntityCard>
      ))}
    </S.CardsGrid>
  )
}
