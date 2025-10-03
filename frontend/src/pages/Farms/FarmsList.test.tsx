import { render } from '@/test/test-utils'
import type { FarmsResponse } from '@/types/farms'
import type { ProducersResponse } from '@/types/producers'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { FarmsList } from './FarmsList'

const mockProducer: ProducersResponse = {
  id: 'producer-1',
  document: '12345678909',
  producerName: 'João Silva',
}

const mockFarms: FarmsResponse[] = [
  {
    id: 'farm-1',
    name: 'Fazenda Sol Nascente',
    city: 'São Paulo',
    state: 'SP',
    totalArea: '1000',
    arableArea: '600',
    vegetationArea: '400',
    producer: mockProducer,
  },
  {
    id: 'farm-2',
    name: 'Fazenda Boa Vista',
    city: 'Campinas',
    state: 'SP',
    totalArea: '500',
    arableArea: '300',
    vegetationArea: '200',
    producer: mockProducer,
  },
]

const mockOnEdit = vi.fn()
const mockOnDelete = vi.fn()

describe('FarmsList', () => {
  beforeEach(() => {
    mockOnEdit.mockClear()
    mockOnDelete.mockClear()
  })

  it('deve renderizar a lista de fazendas', () => {
    render(
      <FarmsList
        farms={mockFarms}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('Fazenda Sol Nascente')).toBeInTheDocument()
    expect(screen.getByText('Fazenda Boa Vista')).toBeInTheDocument()
  })

  it('deve exibir cidade e estado', () => {
    render(
      <FarmsList
        farms={mockFarms}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('São Paulo, SP')).toBeInTheDocument()
    expect(screen.getByText('Campinas, SP')).toBeInTheDocument()
  })

  it('deve exibir nome do produtor', () => {
    render(
      <FarmsList
        farms={mockFarms}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    const producers = screen.getAllByText('João Silva')
    expect(producers.length).toBe(2)
  })

  it('deve exibir áreas corretamente', () => {
    render(
      <FarmsList
        farms={mockFarms}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('1000 ha')).toBeInTheDocument()
    expect(screen.getByText('600 ha')).toBeInTheDocument()
    expect(screen.getByText('400 ha')).toBeInTheDocument()
  })

  it('deve chamar onEdit ao clicar no botão de editar', async () => {
    const user = userEvent.setup()

    render(
      <FarmsList
        farms={mockFarms}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    const editButtons = screen.getAllByTitle('Editar')
    await user.click(editButtons[0])

    expect(mockOnEdit).toHaveBeenCalledTimes(1)
    expect(mockOnEdit).toHaveBeenCalledWith(mockFarms[0])
  })

  it('deve chamar onDelete ao clicar no botão de excluir', async () => {
    const user = userEvent.setup()

    render(
      <FarmsList
        farms={mockFarms}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    const deleteButtons = screen.getAllByTitle('Excluir')
    await user.click(deleteButtons[1])

    expect(mockOnDelete).toHaveBeenCalledTimes(1)
    expect(mockOnDelete).toHaveBeenCalledWith(mockFarms[1])
  })

  it('não deve renderizar nenhum card quando a lista está vazia', () => {
    render(<FarmsList farms={[]} onEdit={mockOnEdit} onDelete={mockOnDelete} />)

    expect(screen.queryByText('Fazenda Sol Nascente')).not.toBeInTheDocument()
    expect(screen.queryByText('Fazenda Boa Vista')).not.toBeInTheDocument()
  })
})
