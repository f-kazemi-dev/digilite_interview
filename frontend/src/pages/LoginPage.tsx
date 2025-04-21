import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useUI } from '../contexts/UIContext'
import { LoginLayout } from '../components/templates/LoginLayout'
import { LoginForm } from '../components/organisms/LoginForm'
import { Titlee } from '../components/atoms/Title'
import { Textt } from '../components/atoms/Text'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { login, error: authError, loading } = useAuth()
  const { showSuccessMessage, showErrorMessage } = useUI()

  const handleLogin = useCallback(
    async (values: { email: string; password: string }) => {
      try {
        await login(values.email, values.password)
        showSuccessMessage('Login successful')
        navigate('/tickets')
      } catch (error: any) {
        showErrorMessage(error.response?.data?.message || 'Login failed')
      }
    },
    [login, navigate, showSuccessMessage, showErrorMessage],
  )

  return (
    <LoginLayout>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Titlee level={2}>Support Ticket Manager</Titlee>
        <Titlee level={4}>Login</Titlee>
      </div>
      <LoginForm
        layout='vertical'
        name='login'
        onFinish={handleLogin}
        style={{ padding: '0 24px' }}
        loading={loading}
        authError={authError}
      >
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Textt type='secondary'>admin@example.com / admin123</Textt>
          <br />
          <Textt type='secondary'>agent@example.com / agent123</Textt>
        </div>
      </LoginForm>
    </LoginLayout>
  )
}

export default LoginPage
