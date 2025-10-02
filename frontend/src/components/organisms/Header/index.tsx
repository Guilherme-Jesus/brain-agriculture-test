import { Menu } from 'lucide-react'
import * as S from './header.styles'

interface HeaderProps {
  onMenuToggle?: () => void
}

export default function Header({ onMenuToggle }: HeaderProps) {
  return (
    <S.HeaderWrapper>
      <S.LeftSection>
        <S.MenuButton onClick={onMenuToggle}>
          <Menu />
        </S.MenuButton>
      </S.LeftSection>
    </S.HeaderWrapper>
  )
}
