import styled from 'styled-components'

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const TableHead = styled.thead`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const TableHeader = styled.th`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  text-align: left;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.xs};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const TableBody = styled.tbody``

const TableRowStyled = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.muted};
  }

  &:last-child {
    border-bottom: none;
  }
`

const TableCell = styled.td`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSize.sm};
`

const StatusBadge = styled.span<{ $status: string }>`
  padding: ${({ theme }) => `2px ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  text-transform: capitalize;

  ${({ $status, theme }) => {
    switch ($status) {
      case 'active':
        return `
          background-color: ${theme.colors.success}15;
          color: ${theme.colors.success};
        `
      case 'inactive':
        return `
          background-color: ${theme.colors.error}15;
          color: ${theme.colors.error};
        `
      case 'pending':
        return `
          background-color: ${theme.colors.warning}15;
          color: ${theme.colors.warning};
        `
      default:
        return ''
    }
  }}
`

const TableTitle = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

export {
  StatusBadge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRowStyled,
  TableTitle,
  TableWrapper,
}
