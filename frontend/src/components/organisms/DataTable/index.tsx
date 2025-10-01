import Card from '@/components/atoms/Card'
import Text from '@/components/atoms/Text'
import {
  StatusBadge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRowStyled,
  TableTitle,
  TableWrapper,
} from './data-table.styles'

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
      <TableTitle>
        <Text variant="h3" weight="semibold">
          {title}
        </Text>
      </TableTitle>
      <TableWrapper>
        <Table>
          <TableHead>
            <tr>
              <TableHeader>Nome</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Data</TableHeader>
              <TableHeader>Valor</TableHeader>
            </tr>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRowStyled key={row.id}>
                <TableCell>
                  <Text weight="medium">{row.name}</Text>
                </TableCell>
                <TableCell>
                  <StatusBadge $status={row.status}>{row.status}</StatusBadge>
                </TableCell>
                <TableCell>
                  <Text color="secondary">{row.date}</Text>
                </TableCell>
                <TableCell>
                  <Text weight="semibold">
                    R$ {row.amount.toLocaleString('pt-BR')}
                  </Text>
                </TableCell>
              </TableRowStyled>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
    </Card>
  )
}
