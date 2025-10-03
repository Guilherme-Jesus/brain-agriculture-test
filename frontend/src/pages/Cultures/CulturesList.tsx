import Text from '@/components/atoms/Text'
import {
  EntityCard,
  EntityCardHeader,
  IconButton,
} from '@/components/molecules/EntityCard'
import CardsGrid from '@/components/templates/CardsGrid'
import type { CulturesResponse } from '@/types/cultures'
import { Edit, Leaf, Trash2 } from 'lucide-react'

interface CulturesListProps {
  cultures: CulturesResponse[]
  onEdit: (culture: CulturesResponse) => void
  onDelete: (culture: CulturesResponse) => void
}

export function CulturesList({
  cultures,
  onEdit,
  onDelete,
}: CulturesListProps) {
  return (
    <CardsGrid>
      {cultures.map((culture) => (
        <EntityCard key={culture.id}>
          <EntityCardHeader
            icon={<Leaf size={20} />}
            title={
              <Text variant="h3" weight="bold">
                {culture.name}
              </Text>
            }
          >
            <IconButton onClick={() => onEdit(culture)} title="Editar">
              <Edit size={16} />
            </IconButton>
            <IconButton
              onClick={() => onDelete(culture)}
              title="Excluir"
              variant="danger"
            >
              <Trash2 size={16} />
            </IconButton>
          </EntityCardHeader>
        </EntityCard>
      ))}
    </CardsGrid>
  )
}
