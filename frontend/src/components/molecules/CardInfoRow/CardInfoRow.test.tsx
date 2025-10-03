import { render } from '@/test/test-utils'
import { screen } from '@testing-library/react'
import { MapPin } from 'lucide-react'
import { describe, expect, it } from 'vitest'
import { CardDivider, CardInfoRow } from './index'

describe('CardInfoRow', () => {
  it('deve renderizar com ícone e conteúdo', () => {
    render(
      <CardInfoRow icon={<MapPin data-testid="map-icon" />}>
        <span>São Paulo - SP</span>
      </CardInfoRow>
    )
    expect(screen.getByTestId('map-icon')).toBeInTheDocument()
    expect(screen.getByText('São Paulo - SP')).toBeInTheDocument()
  })

  it('deve renderizar múltiplos elementos como children', () => {
    render(
      <CardInfoRow icon={<MapPin />}>
        <div>
          <strong>Localização:</strong>
          <span>São Paulo</span>
        </div>
      </CardInfoRow>
    )
    expect(screen.getByText('Localização:')).toBeInTheDocument()
    expect(screen.getByText('São Paulo')).toBeInTheDocument()
  })
})

describe('CardDivider', () => {
  it('deve renderizar o divisor', () => {
    const { container } = render(<CardDivider />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
