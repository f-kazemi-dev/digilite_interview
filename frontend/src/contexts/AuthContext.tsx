import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  login as apiLogin,
  logout as apiLogout,
  getCurrentUser,
  isAuthenticated,
} from '../services/auth'

type User = {
  id: number
  email: string
  role: string
} | null

interface AuthContextType {
  user: User
  loading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<any>
  logout: () => void
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is already logged in
    const checkAuthStatus = () => {
      if (isAuthenticated()) {
        const currentUser = getCurrentUser()
        setUser(currentUser)
      }
      setLoading(false)
    }

    checkAuthStatus()
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await apiLogin({ email, password })
      setUser(response.user)
      return response
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    apiLogout()
    setUser(null)
    navigate('/login')
  }, [navigate])

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      login,
      logout,
      error,
    }),
    [user, loading, login, logout, error],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
