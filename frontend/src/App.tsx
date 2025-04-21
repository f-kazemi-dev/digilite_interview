import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ConfigProvider, Spin } from 'antd'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { TicketProvider } from './contexts/TicketContext'
import { UIProvider } from './contexts/UIContext'

// Lazy-loaded components for better performance
const LoginPage = lazy(() => import('./pages/LoginPage'))
const TicketsListPage = lazy(() => import('./pages/TicketsListPage'))
const CreateTicketPage = lazy(() => import('./pages/CreateTicketPage'))
const TicketDetailPage = lazy(() => import('./pages/TicketDetailPage'))

// Loading component for suspense fallback
const LoadingFallback = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <Spin size='large' tip='Loading...' />
  </div>
)

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <LoadingFallback />
  }

  return isAuthenticated ? <>{children}</> : <Navigate to='/login' />
}

const AppRoutes = () => {
  const { isAuthenticated } = useAuth()

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route
          path='/login'
          element={isAuthenticated ? <Navigate to='/tickets' /> : <LoginPage />}
        />
        <Route
          path='/tickets'
          element={
            <ProtectedRoute>
              <TicketsListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/tickets/create'
          element={
            <ProtectedRoute>
              <CreateTicketPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/tickets/:id'
          element={
            <ProtectedRoute>
              <TicketDetailPage />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<Navigate to='/tickets' />} />
      </Routes>
    </Suspense>
  )
}

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 4,
        },
      }}
    >
      <BrowserRouter>
        <AuthProvider>
          <UIProvider>
            <TicketProvider>
              <AppRoutes />
            </TicketProvider>
          </UIProvider>
        </AuthProvider>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
