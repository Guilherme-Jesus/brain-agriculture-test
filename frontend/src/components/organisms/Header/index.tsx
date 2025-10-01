import SearchBar from '@/components/molecules/SearchBar'
import { Menu, Siren } from 'lucide-react'
import {
  HeaderWrapper,
  LeftSection,
  MenuButton,
  NotificationBadge,
  NotificationButton,
  RightSection,
} from './header.styles'

interface HeaderProps {
  onMenuToggle?: () => void
}

export default function Header({ onMenuToggle }: HeaderProps) {
  return (
    <HeaderWrapper>
      <LeftSection>
        <MenuButton onClick={onMenuToggle}>
          <Menu />
        </MenuButton>
        <SearchBar placeholder="Buscar..." />
      </LeftSection>
      <RightSection>
        <NotificationButton>
          <Siren />
          <NotificationBadge />
        </NotificationButton>
      </RightSection>
    </HeaderWrapper>
  )
}
