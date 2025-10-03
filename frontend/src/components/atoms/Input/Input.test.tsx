import { render } from '@/test/test-utils'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Input from './index'

describe('Input', () => {
  it('deve renderizar o input com label', () => {
    render(<Input label="Nome" />)
    expect(screen.getByLabelText('Nome')).toBeInTheDocument()
  })

  it('deve mostrar placeholder', () => {
    render(<Input placeholder="Digite seu nome" />)
    expect(screen.getByPlaceholderText('Digite seu nome')).toBeInTheDocument()
  })

  it('deve mostrar mensagem de erro', () => {
    render(<Input label="Email" error="Email inválido" />)
    expect(screen.getByText('Email inválido')).toBeInTheDocument()
  })

  it('deve chamar onChange quando o usuário digita', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(<Input label="Nome" onChange={handleChange} />)

    const input = screen.getByLabelText('Nome')
    await user.type(input, 'João')

    expect(handleChange).toHaveBeenCalled()
  })

  it('deve aceitar value como prop', () => {
    render(<Input label="Nome" value="Maria" readOnly />)
    expect(screen.getByLabelText('Nome')).toHaveValue('Maria')
  })

  it('deve estar desabilitado quando disabled é true', () => {
    render(<Input label="Nome" disabled />)
    expect(screen.getByLabelText('Nome')).toBeDisabled()
  })

  it('deve aceitar diferentes tipos de input', () => {
    render(<Input label="Senha" type="password" />)
    expect(screen.getByLabelText('Senha')).toHaveAttribute('type', 'password')
  })
})
