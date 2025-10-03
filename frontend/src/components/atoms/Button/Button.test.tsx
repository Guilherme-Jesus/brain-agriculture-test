import { render } from '@/test/test-utils'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Button from './index'

describe('Button', () => {
  it('deve renderizar o botão com o texto correto', () => {
    render(<Button>Clique aqui</Button>)
    expect(screen.getByText('Clique aqui')).toBeInTheDocument()
  })

  it('deve chamar onClick quando clicado', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<Button onClick={handleClick}>Clique aqui</Button>)

    await user.click(screen.getByText('Clique aqui'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('deve renderizar com variante primary por padrão', () => {
    render(<Button>Botão</Button>)
    const button = screen.getByText('Botão')
    expect(button).toBeInTheDocument()
  })

  it('deve renderizar com variante danger', () => {
    render(<Button variant="danger">Excluir</Button>)
    const button = screen.getByText('Excluir')
    expect(button).toBeInTheDocument()
  })

  it('deve renderizar com variante outline', () => {
    render(<Button variant="outline">Cancelar</Button>)
    const button = screen.getByText('Cancelar')
    expect(button).toBeInTheDocument()
  })

  it('não deve chamar onClick quando desabilitado', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(
      <Button onClick={handleClick} disabled>
        Desabilitado
      </Button>
    )

    await user.click(screen.getByText('Desabilitado'))

    expect(handleClick).not.toHaveBeenCalled()
  })

  it('deve estar desabilitado quando a prop disabled é true', () => {
    render(<Button disabled>Desabilitado</Button>)
    expect(screen.getByText('Desabilitado')).toBeDisabled()
  })

  it('deve aceitar type como prop', () => {
    render(<Button type="submit">Enviar</Button>)
    const button = screen.getByText('Enviar')
    expect(button).toHaveAttribute('type', 'submit')
  })
})
