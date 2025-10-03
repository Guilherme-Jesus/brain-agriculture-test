import type { ReactNode } from 'react'
import * as S from './entity-card.styles'

interface EntityCardProps {
  children: ReactNode
  className?: string
}

export function EntityCard({ children, className }: EntityCardProps) {
  return <S.Card className={className}>{children}</S.Card>
}

interface EntityCardHeaderProps {
  icon: ReactNode
  title: string | ReactNode
  subtitle?: string | ReactNode
  children?: ReactNode
}

export function EntityCardHeader({
  icon,
  title,
  subtitle,
  children,
}: EntityCardHeaderProps) {
  return (
    <S.CardHeader>
      <S.CardTitle>
        <S.TitleIcon>{icon}</S.TitleIcon>
        <S.TitleText>
          {typeof title === 'string' ? (
            <S.TitleTextContent>{title}</S.TitleTextContent>
          ) : (
            title
          )}
          {subtitle &&
            (typeof subtitle === 'string' ? (
              <S.SubtitleTextContent>{subtitle}</S.SubtitleTextContent>
            ) : (
              subtitle
            ))}
        </S.TitleText>
      </S.CardTitle>
      {children && <S.CardActions>{children}</S.CardActions>}
    </S.CardHeader>
  )
}

interface EntityCardContentProps {
  children: ReactNode
}

export function EntityCardContent({ children }: EntityCardContentProps) {
  return <S.CardContent>{children}</S.CardContent>
}

interface EntityCardActionsProps {
  children: ReactNode
}

export function EntityCardActions({ children }: EntityCardActionsProps) {
  return <S.ActionsContainer>{children}</S.ActionsContainer>
}

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'danger'
  children: ReactNode
}

export function IconButton({
  variant = 'default',
  children,
  ...props
}: IconButtonProps) {
  return (
    <S.IconButton $variant={variant} {...props}>
      {children}
    </S.IconButton>
  )
}
