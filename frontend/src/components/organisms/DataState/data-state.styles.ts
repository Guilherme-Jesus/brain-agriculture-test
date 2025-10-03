import { Loader2 } from 'lucide-react'
import { styled } from 'styled-components'

export const StateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3rem 1.5rem;
  min-height: 20rem;
  text-align: center;
`

export const ErrorContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.error[50]};
  border: 1px solid ${({ theme }) => theme.colors.error};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.error[700]};
  max-width: 400px;
`

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  background-color: ${({ theme }) => theme.colors.muted};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.secondary};
`

export const Spinner = styled(Loader2)`
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const ActionsContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
`
