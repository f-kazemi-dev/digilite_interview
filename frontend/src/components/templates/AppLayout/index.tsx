import React , { useMemo } from 'react'
import { Layout, Menu, theme } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import {
  DashboardOutlined,
  PlusCircleOutlined
} from '@ant-design/icons'
import { useUI } from '../../../contexts/UIContext'
import { useAuth } from '../../../contexts/AuthContext'
import { Header } from '../../organisms/Header'

const { Content, Footer } = Layout

interface AppLayoutProps {
  children: React.ReactNode
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation()
  const {  /*sidebarCollapsed, toggleSidebar,*/ themeMode } = useUI()
  const { user, logout } = useAuth()
  const { token } = theme.useToken()

  const selectedKeys = useMemo(() => {
    if (location.pathname.includes('/tickets/create')) return ['2']
    if (location.pathname.includes('/tickets/')) return ['1']
    if (location.pathname === '/tickets') return ['1']
    return []
  }, [location.pathname])

  // Memoize the styles to avoid unnecessary recalculations
  const styles = {
      layout: {
        minHeight: '100vh',
        display: 'flex',
        width: '100%',
      },
      logo: {
        height: 32,
        margin: 16,
        color: token.colorPrimary,
        fontWeight: 'bold',
        textAlign: 'center' as const,
        overflow: 'hidden',
      },
      header: {
        padding: '0 16px',
        background: token.colorBgContainer,
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 4px rgba(5, 37, 66, 0.3)',
      },
      content: {
        margin: '10px 16px',
        padding: 10,
        width: '100%',
        borderRadius: token.borderRadiusLG,
      },
      footer: {
        width: '100%',
        textAlign: 'center' as const,
        color: token.colorTextSecondary,
        backgroundColor: 'transparent',
      },
      trigger: {
        fontSize: 18,
        padding: '0 24px',
        cursor: 'pointer',
        transition: 'color 0.3s',
        color: token.colorTextSecondary,
      },
      userInfo: {
        marginRight: 16,
      },
    };
  return (
    <Layout style={styles.layout}>
      <Header
        style={styles.header}
        onLogout={logout}
        currentUser={user}
        label='Support Ticket Manager'
      >
        <Menu
          theme={themeMode}
          mode='horizontal'
          style={{ border: 'none', flexGrow: 1 }}
          selectedKeys={selectedKeys}
          items={[
            {
              key: '1',
              icon: <DashboardOutlined />,
              label: <Link to='/tickets'>Tickets</Link>,
            },
            {
              key: '2',
              label: <Link to='/tickets/create'>...</Link>,
              children: [
                {
                  key: '2-1',
                  icon: <PlusCircleOutlined />,
                  label: <Link to='/tickets/create'>Create Ticket</Link>,
                },
              ],
            },
          ]}
        />
      </Header>

      {/* 
      
        {user && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={styles.userInfo}>
              <Text strong>{user.email}</Text>
              <Text type="secondary" style={{ marginLeft: 8 }}>({user.role})</Text>
            </div>
            <Button 
              icon={<LogoutOutlined />} 
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        )}
      </Header> */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', minHeight: '777px' }}>
        <Content style={{ ...styles.content, maxWidth: 1200 }}>{children}</Content>
      </div>

      <Footer style={styles.footer}>Support Ticket Manager ©{new Date().getFullYear()}</Footer>
    </Layout>
  )
}
