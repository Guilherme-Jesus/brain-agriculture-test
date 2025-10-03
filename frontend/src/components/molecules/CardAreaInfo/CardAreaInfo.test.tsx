import { render } from '@/test/test-utils'
import { screen } from '@testing-library/react'
import { MapPin } from 'lucide-react'
import { describe, expect, it } from 'vitest'
import { CardAreaInfo, CardAreaItem } from './index'

describe('CardAreaInfo', () => {
  it('deve renderizar o container com children', () => {
    render(
      <CardAreaInfo>
        <div>Informações de área</div>
      </CardAreaInfo>
    )
    expect(screen.getByText('Informações de área')).toBeInTheDocument()
  })
})

describe('CardAreaItem', () => {
  it('deve renderizar com ícone, label e value', () => {
    render(
      <CardAreaItem
        icon={<MapPin data-testid="icon" />}
        label="Área Total"
        value="1.000 ha"
      />
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
    expect(screen.getByText('Área Total')).toBeInTheDocument()
    expect(screen.getByText('1.000 ha')).toBeInTheDocument()
  })

  it('deve renderizar com label como ReactNode', () => {
    render(
      <CardAreaItem
        icon={<MapPin />}
        label={<strong>Área Plantada</strong>}
        value="500 ha"
      />
    )
    expect(screen.getByText('Área Plantada')).toBeInTheDocument()
    const labelElement = screen.getByText('Área Plantada')
    expect(labelElement.tagName).toBe('STRONG')
  })

  it('deve renderizar com value como ReactNode', () => {
    render(
      <CardAreaItem
        icon={<MapPin />}
        label="Área"
        value={<span data-testid="custom-value">1.000 hectares</span>}
      />
    )
    expect(screen.getByTestId('custom-value')).toBeInTheDocument()
  })

  it('deve renderizar com iconColor padrão quando não especificado', () => {
    render(
      <CardAreaItem
        icon={<MapPin data-testid="icon" />}
        label="Área"
        value="1.000 ha"
      />
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('deve aceitar diferentes cores de ícone', () => {
    const { rerender } = render(
      <CardAreaItem
        icon={<MapPin data-testid="icon" />}
        label="Área"
        value="1.000 ha"
        iconColor="success"
      />
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()

    rerender(
      <CardAreaItem
        icon={<MapPin data-testid="icon" />}
        label="Área"
        value="1.000 ha"
        iconColor="vegetation"
      />
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()

    rerender(
      <CardAreaItem
        icon={<MapPin data-testid="icon" />}
        label="Área"
        value="1.000 ha"
        iconColor="warning"
      />
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })
})
