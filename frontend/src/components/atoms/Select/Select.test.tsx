import { render } from '@/test/test-utils'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Select } from './index'

describe('Select', () => {
  it('deve renderizar o select com label', () => {
    render(
      <Select label="Estado">
        <option value="">Selecione</option>
        <option value="SP">São Paulo</option>
      </Select>
    )
    expect(screen.getByLabelText('Estado')).toBeInTheDocument()
  })

  it('deve renderizar as options', () => {
    render(
      <Select label="Estado">
        <option value="">Selecione</option>
        <option value="SP">São Paulo</option>
        <option value="RJ">Rio de Janeiro</option>
      </Select>
    )
    expect(screen.getByText('São Paulo')).toBeInTheDocument()
    expect(screen.getByText('Rio de Janeiro')).toBeInTheDocument()
  })

  it('deve mostrar mensagem de erro', () => {
    render(
      <Select label="Estado" error="Campo obrigatório">
        <option value="">Selecione</option>
      </Select>
    )
    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument()
  })

  it('deve chamar onChange quando uma opção é selecionada', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(
      <Select label="Estado" onChange={handleChange}>
        <option value="">Selecione</option>
        <option value="SP">São Paulo</option>
      </Select>
    )

    const select = screen.getByLabelText('Estado')
    await user.selectOptions(select, 'SP')

    expect(handleChange).toHaveBeenCalled()
  })

  it('deve estar desabilitado quando disabled é true', () => {
    render(
      <Select label="Estado" disabled>
        <option value="">Selecione</option>
      </Select>
    )
    expect(screen.getByLabelText('Estado')).toBeDisabled()
  })

  it('deve aceitar value como prop', () => {
    render(
      <Select label="Estado" value="SP">
        <option value="">Selecione</option>
        <option value="SP">São Paulo</option>
      </Select>
    )
    expect(screen.getByLabelText('Estado')).toHaveValue('SP')
  })
})
