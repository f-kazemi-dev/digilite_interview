import api, { connectSocket, disconnectSocket } from './api'

interface LoginCredentials {
  email: string
  password: string
}

interface LoginResponse {
  accessToken: string
  user: {
    id: number
    email: string
    role: string
  }
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth', {
      ...credentials,
      strategy: 'local',
    })

    // Store token in localStorage
    localStorage.setItem('token', response.data.accessToken)
    localStorage.setItem('user', JSON.stringify(response.data.user))

    // Connect socket for real-time updates
    connectSocket()

    return response.data
  } catch (error) {
    throw error
  }
}

export const logout = (): void => {
  // Clear token and user from localStorage
  localStorage.removeItem('token')
  localStorage.removeItem('user')

  // Disconnect socket
  disconnectSocket()
}

export const getCurrentUser = (): { id: number; email: string; role: string } | null => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token')
}
