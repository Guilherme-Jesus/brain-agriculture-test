import Modal from '@/components/atoms/Modal'
import Text from '@/components/atoms/Text'
import FormActions from '../FormActions'
import * as S from './confirm-dialog.styles'

export interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void | Promise<void>
  title?: string
  message: string
  description?: string
  confirmText?: string
  cancelText?: string
  confirmVariant?: 'primary' | 'danger' | 'outline'
  isLoading?: boolean
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmar Ação',
  message,
  description,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  confirmVariant = 'primary',
  isLoading = false,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <S.Content>
        <Text variant="body">{message}</Text>
        {description && (
          <Text variant="caption" color="secondary">
            {description}
          </Text>
        )}
        <FormActions
          onCancel={onClose}
          onSubmit={onConfirm}
          submitText={confirmText}
          cancelText={cancelText}
          submitVariant={confirmVariant}
          isLoading={isLoading}
        />
      </S.Content>
    </Modal>
  )
}
