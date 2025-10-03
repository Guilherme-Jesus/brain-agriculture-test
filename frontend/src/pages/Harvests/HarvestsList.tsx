import Text from '@/components/atoms/Text'
import {
  EntityCard,
  EntityCardHeader,
  IconButton,
} from '@/components/molecules/EntityCard'
import type { HarvestsResponse } from '@/types/harvests'
import { Calendar, Edit, Trash2 } from 'lucide-react'
import * as S from './harvests.styles'

interface HarvestsListProps {
  harvests: HarvestsResponse[]
  onEdit: (harvest: HarvestsResponse) => void
  onDelete: (harvest: HarvestsResponse) => void
}

export function HarvestsList({
  harvests,
  onEdit,
  onDelete,
}: HarvestsListProps) {
  return (
    <S.CardsGrid>
      {harvests.map((harvest) => (
        <EntityCard key={harvest.id}>
          <EntityCardHeader
            icon={<Calendar size={20} />}
            title={
              <Text variant="h3" weight="bold">
                {harvest.name}
              </Text>
            }
          >
            <IconButton onClick={() => onEdit(harvest)} title="Editar">
              <Edit size={16} />
            </IconButton>
            <IconButton
              onClick={() => onDelete(harvest)}
              title="Excluir"
              variant="danger"
            >
              <Trash2 size={16} />
            </IconButton>
          </EntityCardHeader>
        </EntityCard>
      ))}
    </S.CardsGrid>
  )
}
