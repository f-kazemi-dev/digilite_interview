import axios from 'axios'
import io from 'socket.io-client'

const API_URL = 'http://localhost:3030'

// Axios instance for REST API
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Socket.io instance for real-time functionality
let socket: any = null

export const connectSocket = () => {
  if (socket) return socket

  const token = localStorage.getItem('token')

  socket = io(API_URL, {
    transports: ['websocket', 'polling'], // Try WebSocket first, fallback to long-polling
    query: token ? { token } : undefined,
  })

  socket.on('connect_error', () => {
    console.log('WebSocket connection error, falling back to long-polling')
  })

  socket.on('reconnect_attempt', () => {
    console.log('Attempting to reconnect...')
  })

  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

export default api
