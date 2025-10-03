import { render } from '@/test/test-utils'
import type { PlantedCropResponse } from '@/types/planted-crop'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { PlantedCropsList } from './PlantedCropsList'

const mockCrops: PlantedCropResponse[] = [
  {
    id: 'crop-1',
    plantedArea: 100,
    farm: {
      id: 'farm-1',
      name: 'Fazenda Sol Nascente',
      city: 'São Paulo',
      state: 'SP',
      totalArea: '1000',
      arableArea: '500',
      vegetationArea: '500',
      producer: {
        id: 'producer-1',
        document: '1234567890',
        producerName: 'João da Silva',
      },
    },
    culture: { id: 'culture-1', name: 'Soja' },
    harvest: { id: 'harvest-1', name: 'Safra 2024' },
  },
  {
    id: 'crop-2',
    plantedArea: 50,
    farm: {
      id: 'farm-2',
      name: 'Fazenda Boa Esperança',
      city: 'São Paulo',
      state: 'SP',
      totalArea: '1000',
      arableArea: '500',
      vegetationArea: '500',
      producer: {
        id: 'producer-2',
        document: '1234567890',
        producerName: 'Maria da Silva',
      },
    },
    culture: { id: 'culture-2', name: 'Milho' },
    harvest: { id: 'harvest-2', name: 'Safra 2024' },
  },
]

const mockOnEdit = vi.fn()
const mockOnDelete = vi.fn()

describe('PlantedCropsList', () => {
  beforeEach(() => {
    mockOnEdit.mockClear()
    mockOnDelete.mockClear()
  })

  it('deve renderizar a lista de plantios corretamente', () => {
    render(
      <PlantedCropsList
        crops={mockCrops}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('Soja')).toBeInTheDocument()
    expect(screen.getByText('Milho')).toBeInTheDocument()
    expect(screen.getAllByText(/Fazenda/)).toHaveLength(6)
  })

  it('deve chamar a função onEdit com o plantio correto ao clicar no botão de editar', async () => {
    render(
      <PlantedCropsList
        crops={mockCrops}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    const editButtons = screen.getAllByTitle('Editar')
    await userEvent.click(editButtons[0])

    expect(mockOnEdit).toHaveBeenCalledTimes(1)
    expect(mockOnEdit).toHaveBeenCalledWith(mockCrops[0])
  })

  it('deve chamar a função onDelete com o plantio correto ao clicar no botão de excluir', async () => {
    render(
      <PlantedCropsList
        crops={mockCrops}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    const deleteButtons = screen.getAllByTitle('Excluir')
    await userEvent.click(deleteButtons[1])

    expect(mockOnDelete).toHaveBeenCalledTimes(1)
    expect(mockOnDelete).toHaveBeenCalledWith(mockCrops[1])
  })

  it('não deve renderizar nenhum card quando a lista de plantios estiver vazia', () => {
    render(
      <PlantedCropsList
        crops={[]}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.queryByText('Soja')).not.toBeInTheDocument()
    expect(screen.queryByText('Milho')).not.toBeInTheDocument()
  })
})
