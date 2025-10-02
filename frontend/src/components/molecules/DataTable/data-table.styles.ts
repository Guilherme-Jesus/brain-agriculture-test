import styled from 'styled-components'

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: 768px) {
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;

  @media (max-width: 768px) {
    min-width: 100%;
    font-size: 0.875rem;
  }
`

export const Thead = styled.thead`
  background: ${({ theme }) => theme.colors.muted};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`

export const Th = styled.th`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: left;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`

export const Tbody = styled.tbody``

export const Tr = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.muted};
  }

  &:last-child {
    border-bottom: none;
  }
`

export const Td = styled.td`
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`

export const ActionsCell = styled.td`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: right;
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: flex-end;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm};
    flex-direction: column;
    align-items: stretch;
  }
`

export const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1rem;
`
