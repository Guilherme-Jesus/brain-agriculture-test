import Button from '@/components/atoms/Button'
import Text from '@/components/atoms/Text'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import * as S from './page-header.styles'

interface PageHeaderProps {
  icon: LucideIcon
  title: string
  subtitle: string
  actionLabel?: string
  onActionClick?: () => void
  children?: ReactNode
}

export default function PageHeader({
  icon: Icon,
  title,
  subtitle,
  actionLabel,
  onActionClick,
  children,
}: PageHeaderProps) {
  return (
    <S.PageHeader>
      <S.PageTitleWrapper>
        <S.IconWrapper>
          <Icon size={32} />
        </S.IconWrapper>
        <S.PageTitle>
          <Text variant="h1" weight="bold">
            {title}
          </Text>
          <Text variant="body" color="secondary">
            {subtitle}
          </Text>
        </S.PageTitle>
      </S.PageTitleWrapper>
      {actionLabel && onActionClick && (
        <Button variant="primary" onClick={onActionClick}>
          {actionLabel}
        </Button>
      )}
      {children}
    </S.PageHeader>
  )
}
