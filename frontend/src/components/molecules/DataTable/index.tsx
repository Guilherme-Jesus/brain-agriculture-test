/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/atoms/Button'
import type React from 'react'
import {
  ActionsCell,
  EmptyState,
  Table,
  TableWrapper,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from './data-table.styles'

interface Column<T> {
  key: string
  label: string
  render?: (item: T) => React.ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <TableWrapper>
        <EmptyState>Nenhum registro encontrado</EmptyState>
      </TableWrapper>
    )
  }

  return (
    <TableWrapper>
      <Table>
        <Thead>
          <tr>
            {columns.map((column) => (
              <Th key={column.key}>{column.label}</Th>
            ))}
            {(onEdit || onDelete) && (
              <Th style={{ textAlign: 'right' }}>Ações</Th>
            )}
          </tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item.id}>
              {columns.map((column) => (
                <Td key={column.key}>
                  {column.render
                    ? column.render(item)
                    : (item as any)[column.key]}
                </Td>
              ))}
              {(onEdit || onDelete) && (
                <ActionsCell>
                  {onEdit && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(item)}
                    >
                      Editar
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(item)}
                    >
                      Excluir
                    </Button>
                  )}
                </ActionsCell>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableWrapper>
  )
}
