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
  isLoading?: boolean
  isDisabled?: boolean
  cancelText?: string
  submitText?: string
}

export default function FormActions({
  onCancel,
  isLoading = false,
  isDisabled = false,
  cancelText = 'Cancelar',
  submitText = 'Salvar',
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
      <Button type="submit" disabled={isDisabled || isLoading}>
        {isLoading ? 'Salvando...' : submitText}
      </Button>
    </ButtonGroup>
  )
}
