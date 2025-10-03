import * as S from './text.styles'

interface TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption'
  color?: 'primary' | 'secondary' | 'light' | 'error'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  children: React.ReactNode
  style?: React.CSSProperties
}

export default function Text({
  variant = 'body',
  color = 'primary',
  weight = 'normal',
  children,
  style,
}: TextProps) {
  return (
    <S.StyledText
      $variant={variant}
      $color={color}
      $weight={weight}
      style={style}
    >
      {children}
    </S.StyledText>
  )
}
