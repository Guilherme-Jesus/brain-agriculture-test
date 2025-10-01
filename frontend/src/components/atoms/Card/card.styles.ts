import styled from 'styled-components'

const StyledCard = styled.div<{ $padding: string; $hover: boolean }>`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ $padding, theme }) => {
    switch ($padding) {
      case 'sm':
        return theme.spacing.md
      case 'lg':
        return theme.spacing.xl
      default:
        return theme.spacing.lg
    }
  }};
  transition: all 0.2s ease;

  ${({ $hover }) =>
    $hover &&
    `
    &:hover {
      border-color: #d4d4d8;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
    }
  `}
`

export { StyledCard }
