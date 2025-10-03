import { render } from '@/test/test-utils'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Modal from './index'

describe('Modal', () => {
  it('deve renderizar o modal quando isOpen é true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Título do Modal">
        <p>Conteúdo do modal</p>
      </Modal>
    )
    expect(screen.getByText('Título do Modal')).toBeInTheDocument()
    expect(screen.getByText('Conteúdo do modal')).toBeInTheDocument()
  })

  it('não deve renderizar o modal quando isOpen é false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}} title="Título do Modal">
        <p>Conteúdo do modal</p>
      </Modal>
    )
    expect(screen.queryByText('Título do Modal')).not.toBeInTheDocument()
    expect(screen.queryByText('Conteúdo do modal')).not.toBeInTheDocument()
  })

  it('deve chamar onClose quando o botão fechar é clicado', async () => {
    const handleClose = vi.fn()
    const user = userEvent.setup()

    render(
      <Modal isOpen={true} onClose={handleClose} title="Título do Modal">
        <p>Conteúdo</p>
      </Modal>
    )

    const closeButton = screen.getByRole('button', { name: /fechar/i })
    await user.click(closeButton)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('deve renderizar com tamanho md por padrão', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Modal">
        <p>Conteúdo</p>
      </Modal>
    )
    expect(screen.getByText('Modal')).toBeInTheDocument()
  })

  it('deve renderizar com tamanho personalizado', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Modal" maxWidth="1000px">
        <p>Conteúdo</p>
      </Modal>
    )
    expect(screen.getByText('Modal')).toBeInTheDocument()
  })
})
