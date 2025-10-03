import { render } from '@/test/test-utils'
import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import DashboardPage from './index'

vi.mock('@/store/api/dashboard-api', () => ({
  useGetDashboardDataQuery: vi.fn(() => ({
    dashboardData: {
      totalFarms: 10,
      totalAreaInHectares: 5000,
      farmsByState: [
        { name: 'SP', value: 5 },
        { name: 'MG', value: 3 },
      ],
      farmsByCulture: [
        { name: 'Soja', value: 4 },
        { name: 'Milho', value: 3 },
      ],
      landUse: [
        { name: 'Área Agricultável', value: 3000 },
        { name: 'Área de Vegetação', value: 2000 },
      ],
    },
    isFetching: false,
    isError: false,
  })),
}))

describe('DashboardPage', () => {
  it('deve renderizar o título do dashboard', () => {
    render(<DashboardPage />)

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(
      screen.getByText('Visão geral das operações agrícolas')
    ).toBeInTheDocument()
  })

  it('deve renderizar os cards de estatísticas', () => {
    render(<DashboardPage />)

    expect(screen.getByText('Total de Fazendas')).toBeInTheDocument()
    expect(screen.getByText('Total de Hectares')).toBeInTheDocument()
    expect(screen.getByText('Produtores Cadastrados')).toBeInTheDocument()
    expect(screen.getByText('Culturas Ativas')).toBeInTheDocument()
  })

  it('deve renderizar os gráficos', () => {
    render(<DashboardPage />)

    expect(screen.getByText('Fazendas por Estado')).toBeInTheDocument()
    expect(screen.getByText('Culturas Plantadas')).toBeInTheDocument()
    expect(screen.getByText('Uso do Solo')).toBeInTheDocument()
  })

  it('deve mostrar valores corretos nos cards', () => {
    render(<DashboardPage />)

    expect(screen.getByText('5000')).toBeInTheDocument()
    const values10 = screen.getAllByText('10')
    expect(values10.length).toBe(2)
  })
})
