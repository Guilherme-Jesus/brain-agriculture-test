import styled from 'styled-components'

const SidebarWrapper = styled.aside<{
  $isOpen: boolean
  $isCollapsed: boolean
}>`
  width: ${({ $isCollapsed }) => ($isCollapsed ? '5rem' : '17rem')};
  background-color: ${({ theme }) => theme.colors.surface};
  border-right: 0.0625rem solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  transition: width 0.3s ease;
  z-index: 100;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: fixed;
    left: ${({ $isOpen }) => ($isOpen ? '0' : '-17rem')};
    top: 0;
    z-index: 200;
    transition: left 0.3s ease;
    box-shadow: ${({ $isOpen, theme }) =>
      $isOpen ? theme.shadows.xl : 'none'};
    width: 17rem;
  }
`

const Logo = styled.div<{ $isCollapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 0.0625rem solid ${({ theme }) => theme.colors.border};
  justify-content: ${({ $isCollapsed }) =>
    $isCollapsed ? 'center' : 'flex-start'};
  min-width: 0;
  overflow: hidden;
`

const LogoIcon = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.125rem;
  flex-shrink: 0;
`

const LogoText = styled.div<{ $isCollapsed: boolean }>`
  display: ${({ $isCollapsed }) => ($isCollapsed ? 'none' : 'block')};
  transition: opacity 0.2s;
`

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
`

const NavItem = styled.button<{ $active?: boolean; $isCollapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.muted : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ $active, theme }) =>
    $active ? theme.fontWeight.medium : theme.fontWeight.normal};
  text-align: left;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  width: 100%;
  justify-content: ${({ $isCollapsed }) =>
    $isCollapsed ? 'center' : 'flex-start'};

  &:hover {
    background-color: ${({ theme }) => theme.colors.muted};
    color: ${({ theme }) => theme.colors.text};
  }
`

const NavIcon = styled.span`
  font-size: 1rem;
  flex-shrink: 0;
`

const NavLabel = styled.span<{ $isCollapsed: boolean }>`
  display: ${({ $isCollapsed }) => ($isCollapsed ? 'none' : 'block')};
  transition: opacity 0.2s;
`

const ToggleButton = styled.button<{ $isCollapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.secondary};
  border: 0.0625rem solid ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: auto;
  min-width: 2rem; /* rem 2 */
  min-height: 2rem; /* rem 2 */

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    border: 0.0625rem solid ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`

export {
  Logo,
  LogoIcon,
  LogoText,
  Nav,
  NavIcon,
  NavItem,
  NavLabel,
  SidebarWrapper,
  ToggleButton,
}
