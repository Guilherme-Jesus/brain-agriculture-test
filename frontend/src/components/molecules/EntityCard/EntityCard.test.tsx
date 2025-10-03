import { render } from '@/test/test-utils'
import { screen } from '@testing-library/react'
import { Building } from 'lucide-react'
import { describe, expect, it, vi } from 'vitest'
import {
  EntityCard,
  EntityCardActions,
  EntityCardContent,
  EntityCardHeader,
  IconButton,
} from './index'

describe('EntityCard', () => {
  it('deve renderizar o card com conteúdo', () => {
    render(
      <EntityCard>
        <div>Conteúdo do card</div>
      </EntityCard>
    )
    expect(screen.getByText('Conteúdo do card')).toBeInTheDocument()
  })
})

describe('EntityCardHeader', () => {
  it('deve renderizar com ícone e título', () => {
    render(
      <EntityCardHeader
        icon={<Building data-testid="building-icon" />}
        title="Fazenda"
      />
    )
    expect(screen.getByTestId('building-icon')).toBeInTheDocument()
    expect(screen.getByText('Fazenda')).toBeInTheDocument()
  })

  it('deve renderizar com subtítulo', () => {
    render(
      <EntityCardHeader
        icon={<Building />}
        title="Fazenda Santa Maria"
        subtitle="São Paulo - SP"
      />
    )
    expect(screen.getByText('Fazenda Santa Maria')).toBeInTheDocument()
    expect(screen.getByText('São Paulo - SP')).toBeInTheDocument()
  })
})

describe('EntityCardContent', () => {
  it('deve renderizar o conteúdo', () => {
    render(
      <EntityCardContent>
        <p>Informações da fazenda</p>
      </EntityCardContent>
    )
    expect(screen.getByText('Informações da fazenda')).toBeInTheDocument()
  })
})

describe('EntityCardActions', () => {
  it('deve renderizar as ações', () => {
    render(
      <EntityCardActions>
        <button>Editar</button>
        <button>Excluir</button>
      </EntityCardActions>
    )
    expect(screen.getByText('Editar')).toBeInTheDocument()
    expect(screen.getByText('Excluir')).toBeInTheDocument()
  })
})

describe('IconButton', () => {
  it('deve renderizar o botão com ícone', () => {
    render(
      <IconButton>
        <Building data-testid="icon" />
      </IconButton>
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('deve chamar onClick quando clicado', () => {
    const handleClick = vi.fn()
    render(
      <IconButton onClick={handleClick}>
        <Building />
      </IconButton>
    )
    const button = screen.getByRole('button')
    button.click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('deve estar desabilitado quando disabled é true', () => {
    render(
      <IconButton disabled>
        <Building />
      </IconButton>
    )
    expect(screen.getByRole('button')).toBeDisabled()
  })
})

describe('EntityCard - Composição', () => {
  it('deve renderizar um card completo', () => {
    render(
      <EntityCard>
        <EntityCardHeader
          icon={<Building data-testid="header-icon" />}
          title="Fazenda Boa Vista"
          subtitle="Minas Gerais"
        />
        <EntityCardContent>
          <p>1.000 hectares</p>
        </EntityCardContent>
      </EntityCard>
    )

    expect(screen.getByTestId('header-icon')).toBeInTheDocument()
    expect(screen.getByText('Fazenda Boa Vista')).toBeInTheDocument()
    expect(screen.getByText('Minas Gerais')).toBeInTheDocument()
    expect(screen.getByText('1.000 hectares')).toBeInTheDocument()
  })
})
