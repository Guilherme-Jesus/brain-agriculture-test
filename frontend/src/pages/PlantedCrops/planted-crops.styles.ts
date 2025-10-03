import styled from 'styled-components'

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const PlantedAreaHighlight = styled.div`
  background: ${({ theme }) => theme.colors.primary}10;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const FarmInfoBox = styled.div`
  background: ${({ theme }) => theme.colors.muted};
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export const FarmInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const AvailableAreaWarning = styled.div<{ $hasSpace: boolean }>`
  background: ${({ theme, $hasSpace }) =>
    $hasSpace ? theme.colors.primary + '15' : theme.colors.danger + '15'};
  border: 1px solid
    ${({ theme, $hasSpace }) =>
      $hasSpace ? theme.colors.primary : theme.colors.danger};
  border-radius: 8px;
  padding: 0.75rem;
  margin-top: 0.5rem;
`
