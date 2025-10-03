import styled from 'styled-components'

const StyledText = styled.p<{
  $variant: string
  $color: string
  $weight: string
}>`
  font-size: ${({ $variant, theme }) => {
    switch ($variant) {
      case 'h1':
        return theme.fontSize.xxxl
      case 'h2':
        return theme.fontSize.xxl
      case 'h3':
        return theme.fontSize.xl
      case 'h4':
        return theme.fontSize.lg
      case 'caption':
        return theme.fontSize.sm
      default:
        return theme.fontSize.md
    }
  }};
  font-weight: ${({ $weight, theme }) =>
    theme.fontWeight[$weight as keyof typeof theme.fontWeight]};
  color: ${({ $color, theme }) =>
    theme.colors.text[$color as keyof typeof theme.colors.text]};
  margin: 0;
`

export { StyledText }
