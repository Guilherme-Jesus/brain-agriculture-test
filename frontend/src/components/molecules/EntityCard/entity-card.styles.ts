import styled from 'styled-components'

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`

export const CardTitle = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

export const TitleIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.primary}15;
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
`

export const TitleText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
`

export const TitleTextContent = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`

export const SubtitleTextContent = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`

export const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
`

export const CardContent = styled.div`
  padding: 1.5rem;
`

export const ActionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`

export const IconButton = styled.button<{ $variant?: 'default' | 'danger' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: auto;
  border: none;
  border-radius: 6px;
  background: ${({ theme, $variant }) =>
    $variant === 'danger' ? theme.colors.error + '15' : theme.colors.muted};
  color: ${({ theme, $variant }) =>
    $variant === 'danger' ? theme.colors.error : theme.colors.text.primary};
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    stroke: currentColor;
    color: currentColor;
  }

  &:hover {
    background: ${({ theme, $variant }) =>
      $variant === 'danger' ? theme.colors.error + '25' : theme.colors.border};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
