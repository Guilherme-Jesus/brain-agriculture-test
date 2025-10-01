import styled from 'styled-components'
import type { Theme } from '../../../styles/theme'

export const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  margin: 0;
  padding: 0;
  overflow: hidden;
`

export const ContentWrapper = styled.div<{ $isSidebarCollapsed: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin-left: ${({
    $isSidebarCollapsed,
    theme,
  }: {
    $isSidebarCollapsed: boolean
    theme: Theme
  }) =>
    $isSidebarCollapsed ? theme.sidebar.collapsedWidth : theme.sidebar.width};
  transition: margin-left 0.3s ease;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-left: 0;
  }
`

export const Content = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background};
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0;
  min-height: 0;
`

export const Overlay = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 150;
  }
`
