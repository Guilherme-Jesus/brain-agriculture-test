import { render } from '@/test/test-utils'
import type { HarvestsResponse } from '@/types/harvests'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { HarvestsList } from './HarvestsList'

const mockHarvests: HarvestsResponse[] = [
  {
    id: 'harvest-1',
    name: 'Safra 2023/2024',
  },
  {
    id: 'harvest-2',
    name: 'Safra 2024/2025',
  },
]

const mockOnEdit = vi.fn()
const mockOnDelete = vi.fn()

describe('HarvestsList', () => {
  beforeEach(() => {
    mockOnEdit.mockClear()
    mockOnDelete.mockClear()
  })

  it('deve renderizar a lista de safras', () => {
    render(
      <HarvestsList
        harvests={mockHarvests}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('Safra 2023/2024')).toBeInTheDocument()
    expect(screen.getByText('Safra 2024/2025')).toBeInTheDocument()
  })

  it('deve chamar onEdit ao clicar no botão de editar', async () => {
    const user = userEvent.setup()

    render(
      <HarvestsList
        harvests={mockHarvests}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    const editButtons = screen.getAllByTitle('Editar')
    await user.click(editButtons[0])

    expect(mockOnEdit).toHaveBeenCalledTimes(1)
    expect(mockOnEdit).toHaveBeenCalledWith(mockHarvests[0])
  })

  it('deve chamar onDelete ao clicar no botão de excluir', async () => {
    const user = userEvent.setup()

    render(
      <HarvestsList
        harvests={mockHarvests}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    const deleteButtons = screen.getAllByTitle('Excluir')
    await user.click(deleteButtons[1])

    expect(mockOnDelete).toHaveBeenCalledTimes(1)
    expect(mockOnDelete).toHaveBeenCalledWith(mockHarvests[1])
  })

  it('não deve renderizar nenhum card quando a lista está vazia', () => {
    render(
      <HarvestsList harvests={[]} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    )

    expect(screen.queryByText('Safra 2023/2024')).not.toBeInTheDocument()
    expect(screen.queryByText('Safra 2024/2025')).not.toBeInTheDocument()
  })
})
