import styled from 'styled-components'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  fullWidth?: boolean
}

const StyledButton = styled.button<{
  $variant: string
  $size: string
  $fullWidth: boolean
}>`
  padding: ${({ $size, theme }) => {
    switch ($size) {
      case 'sm':
        return `${theme.spacing.xs} ${theme.spacing.sm}`
      case 'lg':
        return `${theme.spacing.md} ${theme.spacing.lg}`
      default:
        return `${theme.spacing.sm} ${theme.spacing.md}`
    }
  }};
  font-size: ${({ $size, theme }) => {
    switch ($size) {
      case 'sm':
        return theme.fontSize.xs
      case 'lg':
        return theme.fontSize.md
      default:
        return theme.fontSize.sm
    }
  }};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.2s ease;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  border: 1px solid transparent;

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'secondary':
        return `
          background-color: ${theme.colors.secondary};
          color: white;
          &:hover {
            background-color: ${theme.colors.text.primary};
          }
        `
      case 'outline':
        return `
          background-color: transparent;
          color: ${theme.colors.text.primary};
          border: 1px solid ${theme.colors.border};
          &:hover {
            background-color: ${theme.colors.muted};
          }
        `
      case 'ghost':
        return `
          background-color: transparent;
          color: ${theme.colors.text.primary};
          &:hover {
            background-color: ${theme.colors.muted};
          }
        `
      default:
        return `
          background-color: ${theme.colors.primary};
          color: white;
          &:hover {
            background-color: ${theme.colors.primaryDark};
          }
        `
    }
  }}

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      {...props}
    >
      {children}
    </StyledButton>
  )
}
