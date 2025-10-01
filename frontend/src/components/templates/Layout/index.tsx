import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../organisms/Header'
import Sidebar from '../../organisms/Sidebar'
import { Content, ContentWrapper, LayoutContainer, Overlay } from './styles'

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
    <LayoutContainer>
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
      />
      <Overlay $isOpen={isSidebarOpen} onClick={toggleMobileSidebar} />
      <ContentWrapper $isSidebarCollapsed={isSidebarCollapsed}>
        <Header onMenuToggle={toggleMobileSidebar} />
        <Content>
          <Outlet />
        </Content>
      </ContentWrapper>
    </LayoutContainer>
  )
}
