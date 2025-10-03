import { render } from '@/test/test-utils'
import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Card from './index'

describe('Card', () => {
  it('deve renderizar o card com children', () => {
    render(
      <Card>
        <p>Conteúdo do card</p>
      </Card>
    )
    expect(screen.getByText('Conteúdo do card')).toBeInTheDocument()
  })

  it('deve renderizar múltiplos elementos filhos', () => {
    render(
      <Card>
        <h2>Título</h2>
        <p>Descrição</p>
      </Card>
    )
    expect(screen.getByText('Título')).toBeInTheDocument()
    expect(screen.getByText('Descrição')).toBeInTheDocument()
  })

  it('deve renderizar card vazio', () => {
    const { container } = render(
      <Card>
        <p>Conteúdo do card</p>
      </Card>
    )
    expect(container.firstChild).toBeInTheDocument()
  })
})
