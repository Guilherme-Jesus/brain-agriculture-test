import Card from '@/components/atoms/Card'
import Text from '@/components/atoms/Text'

import * as S from './data-table.styles'
export interface TableRow {
  id: string
  name: string
  status: 'active' | 'inactive' | 'pending'
  date: string
  amount: number
}

interface DataTableProps {
  title: string
  data: TableRow[]
}

export default function DataTable({ title, data }: DataTableProps) {
  return (
    <Card padding="md">
      <S.TableTitle>
        <Text variant="h3" weight="semibold">
          {title}
        </Text>
      </S.TableTitle>
      <S.TableWrapper>
        <S.Table>
          <S.TableHead>
            <tr>
              <S.TableHeader>Nome</S.TableHeader>
              <S.TableHeader>Status</S.TableHeader>
              <S.TableHeader>Data</S.TableHeader>
              <S.TableHeader>Valor</S.TableHeader>
            </tr>
          </S.TableHead>
          <S.TableBody>
            {data.map((row) => (
              <S.TableRowStyled key={row.id}>
                <S.TableCell>
                  <Text weight="medium">{row.name}</Text>
                </S.TableCell>
                <S.TableCell>
                  <S.StatusBadge $status={row.status}>
                    {row.status}
                  </S.StatusBadge>
                </S.TableCell>
                <S.TableCell>
                  <Text color="secondary">{row.date}</Text>
                </S.TableCell>
                <S.TableCell>
                  <Text weight="semibold">
                    R$ {row.amount.toLocaleString('pt-BR')}
                  </Text>
                </S.TableCell>
              </S.TableRowStyled>
            ))}
          </S.TableBody>
        </S.Table>
      </S.TableWrapper>
    </Card>
  )
}
