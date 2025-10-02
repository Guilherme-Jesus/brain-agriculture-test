import * as S from './card.styles'

interface CardProps {
  children: React.ReactNode
  padding?: 'sm' | 'md' | 'lg'
  hover?: boolean
}

export default function Card({
  children,
  padding = 'md',
  hover = false,
}: CardProps) {
  return (
    <S.StyledCard $padding={padding} $hover={hover}>
      {children}
    </S.StyledCard>
  )
}
