import type { ReactNode } from 'react'
import * as S from './card-area-info.styles'

interface CardAreaInfoProps {
  children: ReactNode
}

export function CardAreaInfo({ children }: CardAreaInfoProps) {
  return <S.AreaInfo>{children}</S.AreaInfo>
}

interface CardAreaItemProps {
  icon: ReactNode
  label: string | ReactNode
  value: string | ReactNode
  iconColor?: 'default' | 'success' | 'vegetation' | 'warning'
}

export function CardAreaItem({
  icon,
  label,
  value,
  iconColor = 'default',
}: CardAreaItemProps) {
  return (
    <S.AreaItem>
      <S.AreaIcon $color={iconColor}>{icon}</S.AreaIcon>
      <S.AreaDetails>
        {typeof label === 'string' ? <S.AreaLabel>{label}</S.AreaLabel> : label}
        {typeof value === 'string' ? <S.AreaValue>{value}</S.AreaValue> : value}
      </S.AreaDetails>
    </S.AreaItem>
  )
}
