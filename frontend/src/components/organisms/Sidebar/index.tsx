import Text from '@/components/atoms/Text'
import {
  BarChart,
  Building,
  Calendar,
  LayoutDashboard,
  Leaf,
  Users,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import {
  Logo,
  LogoIcon,
  LogoText,
  Nav,
  NavIcon,
  NavItem,
  NavLabel,
  SidebarWrapper,
  ToggleButton,
} from './sidebar.styles'

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
    path: '/seasons',
  },
  {
    icon: <BarChart />,
    label: 'Relatórios',
    path: '/reports',
  },
]

export default function Sidebar({
  isCollapsed = false,
  isOpen = false,
  onToggle,
}: SidebarProps) {
  return (
    <SidebarWrapper $isOpen={isOpen} $isCollapsed={isCollapsed}>
      <Logo $isCollapsed={isCollapsed}>
        <LogoIcon>
          <Leaf />
        </LogoIcon>
        <LogoText $isCollapsed={isCollapsed}>
          <Text variant="h3" weight="semibold">
            AgroManager
          </Text>
        </LogoText>
      </Logo>
      <Nav>
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            style={{ textDecoration: 'none' }}
          >
            {({ isActive }) => (
              <NavItem $active={isActive} $isCollapsed={isCollapsed}>
                <NavIcon>{item.icon}</NavIcon>
                <NavLabel $isCollapsed={isCollapsed}>{item.label}</NavLabel>
              </NavItem>
            )}
          </NavLink>
        ))}
      </Nav>
      <ToggleButton onClick={onToggle} $isCollapsed={isCollapsed}>
        {isCollapsed ? '→' : '←'}
      </ToggleButton>
    </SidebarWrapper>
  )
}
