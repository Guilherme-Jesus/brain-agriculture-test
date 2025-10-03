import { render } from '@/test/test-utils'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import ConfirmDialog from './index'

describe('ConfirmDialog', () => {
  it('deve renderizar quando isOpen é true', () => {
    render(
      <ConfirmDialog
        isOpen={true}
        onClose={() => {}}
        onConfirm={() => {}}
        message="Tem certeza que deseja excluir?"
      />
    )
    expect(
      screen.getByText('Tem certeza que deseja excluir?')
    ).toBeInTheDocument()
  })

  it('não deve renderizar quando isOpen é false', () => {
    render(
      <ConfirmDialog
        isOpen={false}
        onClose={() => {}}
        onConfirm={() => {}}
        message="Tem certeza?"
      />
    )
    expect(screen.queryByText('Tem certeza?')).not.toBeInTheDocument()
  })

  it('deve chamar onConfirm quando botão confirmar é clicado', async () => {
    const handleConfirm = vi.fn()
    const user = userEvent.setup()

    render(
      <ConfirmDialog
        isOpen={true}
        onClose={() => {}}
        onConfirm={handleConfirm}
        message="Confirmar ação?"
        confirmText="Sim"
      />
    )

    await user.click(screen.getByText('Sim'))
    expect(handleConfirm).toHaveBeenCalledTimes(1)
  })

  it('deve chamar onClose quando botão cancelar é clicado', async () => {
    const handleClose = vi.fn()
    const user = userEvent.setup()

    render(
      <ConfirmDialog
        isOpen={true}
        onClose={handleClose}
        onConfirm={() => {}}
        message="Confirmar?"
        cancelText="Não"
      />
    )

    await user.click(screen.getByText('Não'))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('deve renderizar título customizado', () => {
    render(
      <ConfirmDialog
        isOpen={true}
        onClose={() => {}}
        onConfirm={() => {}}
        title="Atenção!"
        message="Esta é uma ação irreversível"
      />
    )
    expect(screen.getByText('Atenção!')).toBeInTheDocument()
  })

  it('deve renderizar descrição quando fornecida', () => {
    render(
      <ConfirmDialog
        isOpen={true}
        onClose={() => {}}
        onConfirm={() => {}}
        message="Excluir item?"
        description="Esta ação não pode ser desfeita."
      />
    )
    expect(
      screen.getByText('Esta ação não pode ser desfeita.')
    ).toBeInTheDocument()
  })

  it('deve desabilitar botões quando isLoading é true', () => {
    render(
      <ConfirmDialog
        isOpen={true}
        onClose={() => {}}
        onConfirm={() => {}}
        message="Confirmar?"
        confirmText="Confirmar"
        cancelText="Cancelar"
        isLoading={true}
      />
    )
    expect(screen.getByText('Cancelar')).toBeDisabled()
  })

  it('deve renderizar com variante danger', () => {
    render(
      <ConfirmDialog
        isOpen={true}
        onClose={() => {}}
        onConfirm={() => {}}
        message="Excluir?"
        confirmText="Excluir"
        confirmVariant="danger"
      />
    )
    expect(screen.getByText('Excluir')).toBeInTheDocument()
  })
})
