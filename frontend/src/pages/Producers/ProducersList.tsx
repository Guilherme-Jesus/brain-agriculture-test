import Text from '@/components/atoms/Text'
import { CardAreaInfo, CardAreaItem } from '@/components/molecules/CardAreaInfo'
import {
  EntityCard,
  EntityCardContent,
  EntityCardHeader,
  IconButton,
} from '@/components/molecules/EntityCard'
import type { FarmsResponse } from '@/types/farms'
import type { ProducersResponse } from '@/types/producers'
import { formatarCNPJ, formatarCPF } from '@/utils/validators'
import { CreditCard, Edit, MapPin, Sprout, Trash2, User } from 'lucide-react'
import * as S from './producers.styles'

interface ProducerWithStats extends ProducersResponse {
  farmsCount: number
  farms: FarmsResponse[]
  totalArea: number
  arableArea: number
  vegetationArea: number
}

interface ProducersListProps {
  producers: ProducerWithStats[]
  onEdit: (producer: ProducersResponse) => void
  onDelete: (producer: ProducersResponse) => void
}

const formatDocument = (doc: string) => {
  const clean = doc.replace(/\D/g, '')
  if (clean.length === 11) {
    return formatarCPF(doc)
  }
  return formatarCNPJ(doc)
}

export function ProducersList({
  producers,
  onEdit,
  onDelete,
}: ProducersListProps) {
  return (
    <S.CardsGrid>
      {producers.map((producer) => (
        <EntityCard key={producer.id}>
          <EntityCardHeader
            icon={<User size={20} />}
            title={
              <Text variant="h3" weight="bold">
                {producer.producerName}
              </Text>
            }
            subtitle={
              <Text variant="caption" color="secondary">
                {producer.farmsCount}{' '}
                {producer.farmsCount > 1 ? 'Fazendas' : 'Fazenda'}
              </Text>
            }
          >
            <IconButton onClick={() => onEdit(producer)} title="Editar">
              <Edit size={16} />
            </IconButton>
            <IconButton
              onClick={() => onDelete(producer)}
              title="Excluir"
              variant="danger"
            >
              <Trash2 size={16} />
            </IconButton>
          </EntityCardHeader>

          <EntityCardContent>
            <CardAreaInfo>
              <CardAreaItem
                icon={<CreditCard size={20} />}
                label="CPF/CNPJ"
                value={`${formatDocument(producer.document)}`}
              />
            </CardAreaInfo>
            {producer.farms.length > 0 ? (
              <S.FarmsList>
                <S.FarmsListHeader>
                  <Sprout size={16} />
                  <Text variant="caption" color="secondary" weight="bold">
                    Fazendas ({producer.farmsCount})
                  </Text>
                </S.FarmsListHeader>
                {producer.farms.map((farm) => (
                  <S.FarmItem key={farm.id}>
                    <MapPin size={14} />
                    <Text variant="body" weight="medium">
                      {farm.name}
                    </Text>
                  </S.FarmItem>
                ))}
              </S.FarmsList>
            ) : (
              <S.FarmsList>
                <S.FarmsListHeader>
                  <Sprout size={16} />
                  <Text variant="caption" color="secondary" weight="bold">
                    Fazendas ({producer.farmsCount})
                  </Text>
                </S.FarmsListHeader>
                <Text variant="caption" color="secondary">
                  Nenhuma fazenda cadastrada
                </Text>
              </S.FarmsList>
            )}
          </EntityCardContent>
        </EntityCard>
      ))}
    </S.CardsGrid>
  )
}
