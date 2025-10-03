import { render } from '@/test/test-utils'
import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Slider } from './Slider'

describe('Slider', () => {
  it('deve renderizar o slider com label', () => {
    render(<Slider label="Área Plantada" />)
    expect(screen.getByText('Área Plantada')).toBeInTheDocument()
  })

  it('deve mostrar o valor atual com unidade', () => {
    render(<Slider label="Área" value={100} />)
    expect(screen.getByText('100 ha')).toBeInTheDocument()
  })

  it('deve ocultar o valor quando showValue é false', () => {
    render(<Slider label="Área" value={100} showValue={false} />)
    expect(screen.queryByText('100 ha')).not.toBeInTheDocument()
  })

  it('deve mostrar labels de min e max', () => {
    render(<Slider min={0} max={500} unit="ha" />)
    expect(screen.getByText('0 ha')).toBeInTheDocument()
    expect(screen.getByText('500 ha')).toBeInTheDocument()
  })

  it('deve mostrar mensagem de erro', () => {
    render(<Slider label="Área" error="Valor inválido" />)
    expect(screen.getByText('Valor inválido')).toBeInTheDocument()
  })

  it('deve usar valores padrão (min=0, max=1000, step=10)', () => {
    render(<Slider />)
    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('min', '0')
    expect(slider).toHaveAttribute('max', '1000')
    expect(slider).toHaveAttribute('step', '10')
  })

  it('deve aceitar min, max e step customizados', () => {
    render(<Slider min={100} max={500} step={50} />)
    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('min', '100')
    expect(slider).toHaveAttribute('max', '500')
    expect(slider).toHaveAttribute('step', '50')
  })

  it('deve chamar onChange quando o valor muda', () => {
    const handleChange = vi.fn()

    render(<Slider label="Área" value={100} onChange={handleChange} />)

    const slider = screen.getByRole('slider')
    fireEvent.change(slider, { target: { value: '200' } })

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('deve aceitar value como prop', () => {
    render(<Slider value={250} readOnly />)
    const slider = screen.getByRole('slider')
    expect(slider).toHaveValue('250')
  })

  it('deve usar min como valor padrão quando value não é fornecido', () => {
    render(<Slider min={50} />)
    expect(screen.getByText('50 ha')).toBeInTheDocument()
  })

  it('deve estar desabilitado quando disabled é true', () => {
    render(<Slider label="Área" disabled />)
    const slider = screen.getByRole('slider')
    expect(slider).toBeDisabled()
  })
})
