import Text from '@/components/atoms/Text'
import { Building, Calendar, LayoutDashboard, Leaf, Users } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import * as S from './sidebar.styles'
interface SidebarProps {
  isCollapsed?: boolean
  isOpen?: boolean
  onToggle?: () => void
}

const menuItems = [
  {
    icon: <LayoutDashboard />,
    label: 'Dashboard',
    path: '/',
  },
  {
    icon: <Users />,
    label: 'Produtores',
    path: '/producers',
  },
  {
    icon: <Building />,
    label: 'Fazendas',
    path: '/farms',
  },
  {
    icon: <Leaf />,
    label: 'Culturas',
    path: '/cultures',
  },
  {
    icon: <Calendar />,
    label: 'Safras',
    path: '/harvests',
  },
  {
    icon: <Leaf />,
    label: 'Culturas Plantadas',
    path: '/planted-crops',
  },
]

export default function Sidebar({
  isCollapsed = false,
  isOpen = false,
  onToggle,
}: SidebarProps) {
  return (
    <S.SidebarWrapper $isOpen={isOpen} $isCollapsed={isCollapsed}>
      <S.Logo $isCollapsed={isCollapsed}>
        <S.LogoIcon>
          <Leaf />
        </S.LogoIcon>
        <S.LogoText $isCollapsed={isCollapsed}>
          <Text variant="h3" weight="semibold">
            Brain Agriculture
          </Text>
        </S.LogoText>
      </S.Logo>
      <S.Nav>
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            style={{ textDecoration: 'none' }}
          >
            {({ isActive }) => (
              <S.NavItem $active={isActive} $isCollapsed={isCollapsed}>
                <S.NavIcon>{item.icon}</S.NavIcon>
                <S.NavLabel $isCollapsed={isCollapsed}>{item.label}</S.NavLabel>
              </S.NavItem>
            )}
          </NavLink>
        ))}
      </S.Nav>
      <S.ToggleButton onClick={onToggle} $isCollapsed={isCollapsed}>
        {isCollapsed ? '→' : '←'}
      </S.ToggleButton>
    </S.SidebarWrapper>
  )
}
