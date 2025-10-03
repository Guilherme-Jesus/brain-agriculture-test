import { render } from '@/test/test-utils'
import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Text from './index'

describe('Text', () => {
  it('deve renderizar o texto corretamente', () => {
    render(<Text>Olá Mundo</Text>)
    expect(screen.getByText('Olá Mundo')).toBeInTheDocument()
  })

  it('deve renderizar com variante h1', () => {
    render(<Text variant="h1">Título</Text>)
    expect(screen.getByText('Título')).toBeInTheDocument()
  })

  it('deve renderizar com variante body', () => {
    render(<Text variant="body">Corpo do texto</Text>)
    expect(screen.getByText('Corpo do texto')).toBeInTheDocument()
  })

  it('deve renderizar com variante caption', () => {
    render(<Text variant="caption">Legenda</Text>)
    expect(screen.getByText('Legenda')).toBeInTheDocument()
  })

  it('deve renderizar com peso bold', () => {
    render(<Text weight="bold">Texto em negrito</Text>)
    expect(screen.getByText('Texto em negrito')).toBeInTheDocument()
  })

  it('deve renderizar com peso medium', () => {
    render(<Text weight="medium">Texto médio</Text>)
    expect(screen.getByText('Texto médio')).toBeInTheDocument()
  })

  it('deve renderizar com cor secundária', () => {
    render(<Text color="secondary">Texto secundário</Text>)
    expect(screen.getByText('Texto secundário')).toBeInTheDocument()
  })
})
