import React from 'react'
import { Layout } from 'antd'
import { Card } from '../../atoms/Card'
const { Content } = Layout

interface LoginLayoutProps {
  children: React.ReactNode
}

export const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '50px 0',
        }}
      >
        <Card style={{ width: 400, padding: '20px 0' }} bordered={false}>
          {children}
        </Card>
      </Content>
    </Layout>
  )
}
