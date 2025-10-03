import { render } from '@/test/test-utils'
import type { CulturesResponse } from '@/types/cultures'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CulturesList } from './CulturesList'

const mockCultures: CulturesResponse[] = [
  {
    id: 'culture-1',
    name: 'Soja',
  },
  {
    id: 'culture-2',
    name: 'Milho',
  },
  {
    id: 'culture-3',
    name: 'Café',
  },
]

const mockOnEdit = vi.fn()
const mockOnDelete = vi.fn()

describe('CulturesList', () => {
  beforeEach(() => {
    mockOnEdit.mockClear()
    mockOnDelete.mockClear()
  })

  it('deve renderizar a lista de culturas', () => {
    render(
      <CulturesList
        cultures={mockCultures}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('Soja')).toBeInTheDocument()
    expect(screen.getByText('Milho')).toBeInTheDocument()
    expect(screen.getByText('Café')).toBeInTheDocument()
  })

  it('deve chamar onEdit ao clicar no botão de editar', async () => {
    const user = userEvent.setup()

    render(
      <CulturesList
        cultures={mockCultures}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    const editButtons = screen.getAllByTitle('Editar')
    await user.click(editButtons[0])

    expect(mockOnEdit).toHaveBeenCalledTimes(1)
    expect(mockOnEdit).toHaveBeenCalledWith(mockCultures[0])
  })

  it('deve chamar onDelete ao clicar no botão de excluir', async () => {
    const user = userEvent.setup()

    render(
      <CulturesList
        cultures={mockCultures}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    const deleteButtons = screen.getAllByTitle('Excluir')
    await user.click(deleteButtons[2])

    expect(mockOnDelete).toHaveBeenCalledTimes(1)
    expect(mockOnDelete).toHaveBeenCalledWith(mockCultures[2])
  })

  it('não deve renderizar nenhum card quando a lista está vazia', () => {
    render(
      <CulturesList cultures={[]} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    )

    expect(screen.queryByText('Soja')).not.toBeInTheDocument()
    expect(screen.queryByText('Milho')).not.toBeInTheDocument()
    expect(screen.queryByText('Café')).not.toBeInTheDocument()
  })
})
