import { render } from '@/test/test-utils'
import { screen } from '@testing-library/react'
import { Building } from 'lucide-react'
import { describe, expect, it, vi } from 'vitest'
import PageHeader from './index'

describe('PageHeader', () => {
  it('deve renderizar com título e subtítulo', () => {
    render(
      <PageHeader
        icon={Building}
        title="Fazendas"
        subtitle="Gerenciamento de fazendas"
      />
    )
    expect(screen.getByText('Fazendas')).toBeInTheDocument()
    expect(screen.getByText('Gerenciamento de fazendas')).toBeInTheDocument()
  })

  it('deve renderizar o ícone', () => {
    const { container } = render(
      <PageHeader
        icon={Building}
        title="Fazendas"
        subtitle="Gerenciamento de fazendas"
      />
    )
    const icon = container.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('deve renderizar botão de ação quando actionLabel e onActionClick são fornecidos', () => {
    const handleClick = vi.fn()
    render(
      <PageHeader
        icon={Building}
        title="Fazendas"
        subtitle="Gerenciamento de fazendas"
        actionLabel="+ Nova Fazenda"
        onActionClick={handleClick}
      />
    )
    expect(screen.getByText('+ Nova Fazenda')).toBeInTheDocument()
  })

  it('deve chamar onActionClick quando o botão é clicado', () => {
    const handleClick = vi.fn()
    render(
      <PageHeader
        icon={Building}
        title="Fazendas"
        subtitle="Gerenciamento"
        actionLabel="+ Novo"
        onActionClick={handleClick}
      />
    )
    const button = screen.getByText('+ Novo')
    button.click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('não deve renderizar botão se apenas actionLabel for fornecido', () => {
    render(
      <PageHeader
        icon={Building}
        title="Fazendas"
        subtitle="Gerenciamento"
        actionLabel="+ Novo"
      />
    )
    expect(screen.queryByText('+ Novo')).not.toBeInTheDocument()
  })

  it('não deve renderizar botão se apenas onActionClick for fornecido', () => {
    const handleClick = vi.fn()
    render(
      <PageHeader
        icon={Building}
        title="Fazendas"
        subtitle="Gerenciamento"
        onActionClick={handleClick}
      />
    )
    const buttons = screen.queryAllByRole('button')
    expect(buttons).toHaveLength(0)
  })

  it('deve renderizar children quando fornecidos', () => {
    render(
      <PageHeader icon={Building} title="Fazendas" subtitle="Gerenciamento">
        <div>Conteúdo adicional</div>
      </PageHeader>
    )
    expect(screen.getByText('Conteúdo adicional')).toBeInTheDocument()
  })
})
