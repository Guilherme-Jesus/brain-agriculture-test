import { render } from '@/test/test-utils'
import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import FormWrapper from './index'

describe('FormWrapper', () => {
  it('deve renderizar os filhos corretamente', () => {
    render(
      <FormWrapper>
        <input placeholder="Campo de teste" />
      </FormWrapper>
    )
    expect(screen.getByPlaceholderText('Campo de teste')).toBeInTheDocument()
  })

  it('deve renderizar como um elemento form', () => {
    render(
      <FormWrapper>
        <div>Conteúdo</div>
      </FormWrapper>
    )
    const form = screen.getByText('Conteúdo').closest('form')
    expect(form).toBeInTheDocument()
  })

  it('deve chamar onSubmit quando o formulário é enviado', () => {
    const handleSubmit = vi.fn((e) => e.preventDefault())

    render(
      <FormWrapper onSubmit={handleSubmit}>
        <button type="submit">Enviar</button>
      </FormWrapper>
    )

    const button = screen.getByText('Enviar')
    button.click()

    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })

  it('deve aceitar props de formulário HTML', () => {
    render(
      <FormWrapper data-testid="test-form" noValidate>
        <div>Conteúdo</div>
      </FormWrapper>
    )

    const form = screen.getByTestId('test-form')
    expect(form).toHaveAttribute('noValidate')
  })

  it('deve aceitar className customizada', () => {
    render(
      <FormWrapper className="custom-form">
        <div>Conteúdo</div>
      </FormWrapper>
    )

    const form = screen.getByText('Conteúdo').closest('form')
    expect(form).toHaveClass('custom-form')
  })

  it('deve renderizar múltiplos filhos', () => {
    render(
      <FormWrapper>
        <input placeholder="Campo 1" />
        <input placeholder="Campo 2" />
        <button>Enviar</button>
      </FormWrapper>
    )

    expect(screen.getByPlaceholderText('Campo 1')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Campo 2')).toBeInTheDocument()
    expect(screen.getByText('Enviar')).toBeInTheDocument()
  })
})
