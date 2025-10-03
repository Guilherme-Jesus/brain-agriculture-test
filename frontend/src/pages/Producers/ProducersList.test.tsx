import { render } from '@/test/test-utils'
import type { FarmsResponse } from '@/types/farms'
import type { ProducersResponse } from '@/types/producers'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ProducersList } from './ProducersList'

interface ProducerWithStats extends ProducersResponse {
  farmsCount: number
  farms: FarmsResponse[]
  totalArea: number
  arableArea: number
  vegetationArea: number
}

const mockProducers: ProducerWithStats[] = [
  {
    id: 'producer-1',
    document: '12345678909',
    producerName: 'João Silva',
    farmsCount: 2,
    totalArea: 1000,
    arableArea: 600,
    vegetationArea: 400,
    farms: [
      {
        id: 'farm-1',
        name: 'Fazenda Sol Nascente',
        city: 'São Paulo',
        state: 'SP',
        totalArea: '500',
        arableArea: '300',
        vegetationArea: '200',
        producer: {} as ProducersResponse,
      },
      {
        id: 'farm-2',
        name: 'Fazenda Boa Vista',
        city: 'Campinas',
        state: 'SP',
        totalArea: '500',
        arableArea: '300',
        vegetationArea: '200',
        producer: {} as ProducersResponse,
      },
    ],
  },
  {
    id: 'producer-2',
    document: '11222333000181',
    producerName: 'Maria Santos',
    farmsCount: 0,
    totalArea: 0,
    arableArea: 0,
    vegetationArea: 0,
    farms: [],
  },
]

const mockOnEdit = vi.fn()
const mockOnDelete = vi.fn()

describe('ProducersList', () => {
  beforeEach(() => {
    mockOnEdit.mockClear()
    mockOnDelete.mockClear()
  })

  it('deve renderizar a lista de produtores', () => {
    render(
      <ProducersList
        producers={mockProducers}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('João Silva')).toBeInTheDocument()
    expect(screen.getByText('Maria Santos')).toBeInTheDocument()
  })

  it('deve formatar CPF corretamente', () => {
    render(
      <ProducersList
        producers={mockProducers}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('123.456.789-09')).toBeInTheDocument()
  })

  it('deve formatar CNPJ corretamente', () => {
    render(
      <ProducersList
        producers={mockProducers}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('11.222.333/0001-81')).toBeInTheDocument()
  })

  it('deve exibir quantidade de fazendas', () => {
    render(
      <ProducersList
        producers={mockProducers}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('2 Fazendas')).toBeInTheDocument()
    expect(screen.getByText('0 Fazenda')).toBeInTheDocument()
  })

  it('deve listar fazendas do produtor', () => {
    render(
      <ProducersList
        producers={mockProducers}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('Fazenda Sol Nascente')).toBeInTheDocument()
    expect(screen.getByText('Fazenda Boa Vista')).toBeInTheDocument()
  })

  it('deve exibir mensagem quando produtor não tem fazendas', () => {
    render(
      <ProducersList
        producers={mockProducers}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('Nenhuma fazenda cadastrada')).toBeInTheDocument()
  })

  it('deve chamar onEdit ao clicar no botão de editar', async () => {
    const user = userEvent.setup()

    render(
      <ProducersList
        producers={mockProducers}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    const editButtons = screen.getAllByTitle('Editar')
    await user.click(editButtons[0])

    expect(mockOnEdit).toHaveBeenCalledTimes(1)
    expect(mockOnEdit).toHaveBeenCalledWith(mockProducers[0])
  })

  it('deve chamar onDelete ao clicar no botão de excluir', async () => {
    const user = userEvent.setup()

    render(
      <ProducersList
        producers={mockProducers}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    const deleteButtons = screen.getAllByTitle('Excluir')
    await user.click(deleteButtons[1])

    expect(mockOnDelete).toHaveBeenCalledTimes(1)
    expect(mockOnDelete).toHaveBeenCalledWith(mockProducers[1])
  })

  it('não deve renderizar nenhum card quando a lista está vazia', () => {
    render(
      <ProducersList
        producers={[]}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.queryByText('João Silva')).not.toBeInTheDocument()
    expect(screen.queryByText('Maria Santos')).not.toBeInTheDocument()
  })
})
