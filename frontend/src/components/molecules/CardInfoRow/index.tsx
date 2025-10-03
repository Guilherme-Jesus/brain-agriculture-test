import type { ReactNode } from 'react'
import * as S from './card-info-row.styles'

interface CardInfoRowProps {
  icon: ReactNode
  children: ReactNode
}

export function CardInfoRow({ icon, children }: CardInfoRowProps) {
  return (
    <S.InfoRow>
      <S.InfoIcon>{icon}</S.InfoIcon>
      <S.InfoContent>{children}</S.InfoContent>
    </S.InfoRow>
  )
}

interface CardDividerProps {
  className?: string
}

export function CardDivider({ className }: CardDividerProps) {
  return <S.Divider className={className} />
}
