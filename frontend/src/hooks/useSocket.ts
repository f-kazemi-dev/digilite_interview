import { useEffect, useRef } from 'react'
import { connectSocket } from '../services/api'

/**
 * Custom hook for socket management in components
 * Handles connection and ensures proper lifecycle management
 */
export const useSocket = () => {
  const socketRef = useRef<any>(null)

  useEffect(() => {
    // Connect socket when component mounts
    socketRef.current = connectSocket()

    // Disconnect socket when component unmounts
    return () => {
      // We don't call disconnectSocket here to avoid
      // disconnecting if other components are still using it
      // The socket will be fully disconnected on logout
    }
  }, [])

  return socketRef.current
}
