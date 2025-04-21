import React from 'react'
import { Layout, Space, Typography } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { Button } from '../../atoms/Button'

const { Text, Title } = Typography
const { Header: AntHeader } = Layout

interface HeaderProps {
  currentUser?: {
    id: number
    email: string
    role: string
  } | null
  style?: React.CSSProperties
  onLogout?: () => void
  label: string
  children?: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({
  currentUser,
  onLogout,
  style,
  label,
  children,
  ...props
}) => {
  return (
    <AntHeader style={style}>
      <div style={{ display: 'flex', alignItems: 'top', padding: '0 23px 13px 33px' }}>
        <Title level={3} style={{ margin: 0 }}>
          Support Ticket Manager
        </Title>
      </div>
      {children}
      
      {currentUser && (
        <Space>
          <Text type='secondary'>
            {currentUser.email} ({currentUser.role})
          </Text>
          {onLogout && (
            <Button icon={<LogoutOutlined />} onClick={onLogout}>
              Logout
            </Button>
          )}
        </Space>
      )}
    </AntHeader>
  )
}

// For a mid-level project, this simple formatting doesn't need useMemo
// unless it's proven to be a performance bottleneck
// export default React.memo(Header);
export { Header }
