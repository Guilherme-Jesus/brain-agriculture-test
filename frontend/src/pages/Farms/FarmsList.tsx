import Text from '@/components/atoms/Text'
import { CardAreaInfo, CardAreaItem } from '@/components/molecules/CardAreaInfo'
import { CardDivider, CardInfoRow } from '@/components/molecules/CardInfoRow'
import {
  EntityCard,
  EntityCardContent,
  EntityCardHeader,
  IconButton,
} from '@/components/molecules/EntityCard'
import type { FarmsResponse } from '@/types/farms'
import {
  Edit,
  MapPin,
  Maximize,
  Sprout,
  Trash2,
  Trees,
  User,
} from 'lucide-react'
import * as S from './farms.styles'

interface FarmsListProps {
  farms: FarmsResponse[]
  onEdit: (farm: FarmsResponse) => void
  onDelete: (farm: FarmsResponse) => void
}

export function FarmsList({ farms, onEdit, onDelete }: FarmsListProps) {
  return (
    <S.CardsGrid>
      {farms.map((farm) => (
        <EntityCard key={farm.id}>
          <EntityCardHeader
            icon={<Sprout size={20} />}
            title={
              <Text variant="h3" weight="bold">
                {farm.name}
              </Text>
            }
          >
            <IconButton onClick={() => onEdit(farm)} title="Editar">
              <Edit size={16} />
            </IconButton>
            <IconButton
              onClick={() => onDelete(farm)}
              title="Excluir"
              variant="danger"
            >
              <Trash2 size={16} />
            </IconButton>
          </EntityCardHeader>

          <EntityCardContent>
            <CardInfoRow icon={<MapPin size={16} />}>
              <Text variant="caption" color="secondary">
                Cidade
              </Text>
              <Text variant="body" weight="medium">
                {farm.city}, {farm.state}
              </Text>
            </CardInfoRow>

            <CardInfoRow icon={<User size={16} />}>
              <Text variant="caption" color="secondary">
                Produtor
              </Text>
              <Text variant="body" weight="medium">
                {farm.producer.producerName}
              </Text>
            </CardInfoRow>

            <CardDivider />

            <CardAreaInfo>
              <CardAreaItem
                icon={<Maximize size={20} />}
                label="Área Total"
                value={`${farm.totalArea} ha`}
              />
              <CardAreaItem
                icon={<Sprout size={20} />}
                iconColor="success"
                label="Agricultável"
                value={`${farm.arableArea} ha`}
              />
              <CardAreaItem
                icon={<Trees size={20} />}
                iconColor="vegetation"
                label="Vegetação"
                value={`${farm.vegetationArea} ha`}
              />
            </CardAreaInfo>
          </EntityCardContent>
        </EntityCard>
      ))}
    </S.CardsGrid>
  )
}
