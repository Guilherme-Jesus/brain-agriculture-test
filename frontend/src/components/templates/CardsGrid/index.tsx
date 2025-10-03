import type { ReactNode } from 'react'
import * as S from './cards-grid.styles'

interface CardsGridProps {
  children: ReactNode
  minCardWidth?: string
}

export default function CardsGrid({
  children,
  minCardWidth = '320px',
}: CardsGridProps) {
  return <S.CardsGrid $minCardWidth={minCardWidth}>{children}</S.CardsGrid>
}
