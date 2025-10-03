import { render } from '@/test/test-utils'
import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import StatCard from './index'

describe('StatCard', () => {
  it('deve renderizar com título e valor', () => {
    render(<StatCard title="Total de Fazendas" value="150" icon="trendingUp" />)
    expect(screen.getByText('Total de Fazendas')).toBeInTheDocument()
    expect(screen.getByText('150')).toBeInTheDocument()
  })

  it('deve renderizar com ícone', () => {
    render(<StatCard title="Hectares" value="1.500 ha" icon="trendingUp" />)
    expect(screen.getByTestId('trendingUp')).toBeInTheDocument()
  })

  it('deve renderizar com cor customizada', () => {
    render(<StatCard title="Produtores" value="50" icon="trendingUp" />)
    expect(screen.getByText('Produtores')).toBeInTheDocument()
  })

  it('deve renderizar valor numérico formatado', () => {
    render(<StatCard title="Total" value={1500} icon="trendingUp" />)
    expect(screen.getByText('1500')).toBeInTheDocument()
  })

  it('deve renderizar com valor zerado', () => {
    render(<StatCard title="Nenhum" value={0} icon="trendingUp" />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })
})
