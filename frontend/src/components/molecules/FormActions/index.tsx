import Button from '@/components/atoms/Button'
import styled from 'styled-components'

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.lg};
`

interface FormActionsProps {
  onCancel: () => void
  onSubmit?: () => void | Promise<void>
  isLoading?: boolean
  isDisabled?: boolean
  cancelText?: string
  submitText?: string
  submitVariant?: 'primary' | 'danger' | 'outline'
}

export default function FormActions({
  onCancel,
  onSubmit,
  isLoading = false,
  isDisabled = false,
  cancelText = 'Cancelar',
  submitText = 'Salvar',
  submitVariant = 'primary',
}: FormActionsProps) {
  return (
    <ButtonGroup>
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isLoading}
      >
        {cancelText}
      </Button>
      <Button
        type={onSubmit ? 'button' : 'submit'}
        variant={submitVariant}
        onClick={onSubmit}
        disabled={isDisabled || isLoading}
      >
        {isLoading ? 'Salvando...' : submitText}
      </Button>
    </ButtonGroup>
  )
}
