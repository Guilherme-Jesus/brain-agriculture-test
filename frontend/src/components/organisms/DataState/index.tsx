import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Text from '@/components/atoms/Text'
import { AlertCircle, Plus, RefreshCw } from 'lucide-react'
import type { ReactNode } from 'react'
import * as S from './data-state.styles'

interface DataStateProps {
  isLoading: boolean
  isError: boolean
  data: unknown[]
  loadingMessage?: string
  errorTitle?: string
  errorDescription?: string
  emptyTitle?: string
  emptyDescription?: string
  emptyActionLabel?: string
  onRetry?: () => void
  onEmptyAction?: () => void
  children: ReactNode
}

export function DataState({
  isLoading,
  isError,
  data,
  loadingMessage = 'Carregando dados...',
  errorTitle = 'Erro ao carregar dados',
  errorDescription = 'Ocorreu um erro inesperado. Tente novamente.',
  emptyTitle = 'Nenhum item encontrado',
  emptyDescription = 'Não há dados para exibir no momento.',
  emptyActionLabel,
  onRetry,
  onEmptyAction,
  children,
}: DataStateProps) {
  // Estado de loading
  if (isLoading) {
    return (
      <Card>
        <S.StateContainer>
          <S.Spinner size={32} />
          <Text variant="body" color="secondary" weight="medium">
            {loadingMessage}
          </Text>
        </S.StateContainer>
      </Card>
    )
  }

  // Estado de erro
  if (isError) {
    return (
      <Card>
        <S.StateContainer>
          <S.ErrorContainer>
            <AlertCircle size={20} />
            <S.ContentContainer>
              <Text variant="body" weight="medium" color="error">
                {errorTitle}
              </Text>
              <Text variant="caption" color="secondary">
                {errorDescription}
              </Text>
            </S.ContentContainer>
          </S.ErrorContainer>
          {onRetry && (
            <S.ActionsContainer>
              <Button variant="outline" size="md" onClick={onRetry}>
                <RefreshCw size={16} style={{ marginRight: '8px' }} />
                Tentar novamente
              </Button>
            </S.ActionsContainer>
          )}
        </S.StateContainer>
      </Card>
    )
  }

  // Estado vazio
  if (data.length === 0) {
    return (
      <Card>
        <S.StateContainer>
          <S.IconContainer>
            <Plus size={32} />
          </S.IconContainer>
          <S.ContentContainer>
            <Text variant="h3" weight="medium" color="secondary">
              {emptyTitle}
            </Text>
            <Text variant="body" color="secondary">
              {emptyDescription}
            </Text>
          </S.ContentContainer>
          {emptyActionLabel && onEmptyAction && (
            <S.ActionsContainer>
              <Button variant="primary" size="md" onClick={onEmptyAction}>
                <Plus size={16} style={{ marginRight: '8px' }} />
                {emptyActionLabel}
              </Button>
            </S.ActionsContainer>
          )}
        </S.StateContainer>
      </Card>
    )
  }

  // Estado com dados - renderiza o conteúdo
  return <>{children}</>
}
