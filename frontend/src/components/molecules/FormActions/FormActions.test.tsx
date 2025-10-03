import { render } from '@/test/test-utils'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import FormActions from './index'

describe('FormActions', () => {
  it('deve renderizar botões de cancelar e salvar', () => {
    const handleCancel = vi.fn()

    render(<FormActions onCancel={handleCancel} />)

    expect(screen.getByText('Cancelar')).toBeInTheDocument()
    expect(screen.getByText('Salvar')).toBeInTheDocument()
  })

  it('deve chamar onCancel quando botão cancelar é clicado', async () => {
    const handleCancel = vi.fn()
    const user = userEvent.setup()

    render(<FormActions onCancel={handleCancel} />)

    await user.click(screen.getByText('Cancelar'))

    expect(handleCancel).toHaveBeenCalledTimes(1)
  })

  it('deve renderizar com textos customizados', () => {
    const handleCancel = vi.fn()

    render(
      <FormActions
        onCancel={handleCancel}
        cancelText="Voltar"
        submitText="Confirmar"
      />
    )

    expect(screen.getByText('Voltar')).toBeInTheDocument()
    expect(screen.getByText('Confirmar')).toBeInTheDocument()
  })

  it('deve desabilitar botões quando isLoading é true', () => {
    const handleCancel = vi.fn()

    render(<FormActions onCancel={handleCancel} isLoading />)

    expect(screen.getByText('Cancelar')).toBeDisabled()
    expect(screen.getByText('Salvando...')).toBeDisabled()
  })

  it('deve desabilitar botão submit quando isDisabled é true', () => {
    const handleCancel = vi.fn()

    render(<FormActions onCancel={handleCancel} isDisabled />)

    expect(screen.getByText('Cancelar')).not.toBeDisabled()
    expect(screen.getByText('Salvar')).toBeDisabled()
  })

  it('deve renderizar com variante danger', () => {
    const handleCancel = vi.fn()

    render(
      <FormActions
        onCancel={handleCancel}
        submitVariant="danger"
        submitText="Excluir"
      />
    )

    expect(screen.getByText('Excluir')).toBeInTheDocument()
  })

  it('deve chamar onSubmit quando fornecido', async () => {
    const handleCancel = vi.fn()
    const handleSubmit = vi.fn()
    const user = userEvent.setup()

    render(<FormActions onCancel={handleCancel} onSubmit={handleSubmit} />)

    await user.click(screen.getByText('Salvar'))

    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })

  it('deve renderizar botão submit com type="submit" quando onSubmit não é fornecido', () => {
    const handleCancel = vi.fn()

    render(<FormActions onCancel={handleCancel} />)

    const submitButton = screen.getByText('Salvar')
    expect(submitButton).toHaveAttribute('type', 'submit')
  })

  it('deve renderizar botão submit com type="button" quando onSubmit é fornecido', () => {
    const handleCancel = vi.fn()
    const handleSubmit = vi.fn()

    render(<FormActions onCancel={handleCancel} onSubmit={handleSubmit} />)

    const submitButton = screen.getByText('Salvar')
    expect(submitButton).toHaveAttribute('type', 'button')
  })
})
