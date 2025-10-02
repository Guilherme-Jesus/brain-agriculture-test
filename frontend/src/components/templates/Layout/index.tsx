import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../organisms/Header'
import Sidebar from '../../organisms/Sidebar'
import * as S from './styles'

export default function Layout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const toggleMobileSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <S.LayoutContainer>
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
      />
      <S.Overlay $isOpen={isSidebarOpen} onClick={toggleMobileSidebar} />
      <S.ContentWrapper $isSidebarCollapsed={isSidebarCollapsed}>
        <Header onMenuToggle={toggleMobileSidebar} />
        <S.Content>
          <Outlet />
        </S.Content>
      </S.ContentWrapper>
    </S.LayoutContainer>
  )
}
