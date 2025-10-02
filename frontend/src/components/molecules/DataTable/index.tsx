/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/atoms/Button'
import * as S from './data-table.styles'

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
      <S.TableWrapper>
        <S.EmptyState>Nenhum registro encontrado</S.EmptyState>
      </S.TableWrapper>
    )
  }

  return (
    <S.TableWrapper>
      <S.Table>
        <S.Thead>
          <tr>
            {columns.map((column) => (
              <S.Th key={column.key}>{column.label}</S.Th>
            ))}
            {(onEdit || onDelete) && (
              <S.Th style={{ textAlign: 'right' }}>Ações</S.Th>
            )}
          </tr>
        </S.Thead>
        <S.Tbody>
          {data.map((item) => (
            <S.Tr key={item.id}>
              {columns.map((column) => (
                <S.Td key={column.key}>
                  {column.render
                    ? column.render(item)
                    : (item as any)[column.key]}
                </S.Td>
              ))}
              {(onEdit || onDelete) && (
                <S.ActionsCell>
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
                </S.ActionsCell>
              )}
            </S.Tr>
          ))}
        </S.Tbody>
      </S.Table>
    </S.TableWrapper>
  )
}
