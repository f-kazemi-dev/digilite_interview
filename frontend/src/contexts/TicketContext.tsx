import React, { createContext, useContext, useCallback, useState, useEffect, useMemo } from 'react'
import {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  createReply,
  Ticket,
  Reply,
  CreateTicketData,
  CreateReplyData,
} from '../services/tickets'
import { useSocket } from '../hooks/useSocket'

interface TicketContextType {
  tickets: Ticket[]
  loading: boolean
  error: string | null
  currentTicket: Ticket | null
  ticketLoading: boolean
  fetchTickets: (status?: 'all' | 'open' | 'closed') => Promise<void>
  fetchTicket: (id: number) => Promise<void>
  addTicket: (ticket: CreateTicketData) => Promise<Ticket>
  changeTicketStatus: (id: number, status: 'open' | 'closed') => Promise<void>
  addReply: (data: CreateReplyData) => Promise<Reply>
  replies: Reply[]
}

const TicketContext = createContext<TicketContextType | undefined>(undefined)

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null)
  const [replies, setReplies] = useState<Reply[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [ticketLoading, setTicketLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Use the socket hook
  const socket = useSocket()

  const fetchTickets = useCallback(async (status?: 'all' | 'open' | 'closed') => {
    setLoading(true)
    setError(null)
    try {
      const data = await getTickets(status)
      setTickets(data)
    } catch (err: any) {
      setError('Failed to fetch tickets')
      console.error('Error fetching tickets:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchTicket = useCallback(async (id: number) => {
    setTicketLoading(true)
    setError(null)
    try {
      const data = await getTicket(id)
      setCurrentTicket(data)
      if (data.replies) {
        setReplies(data.replies)
      } else {
        setReplies([])
      }
    } catch (err: any) {
      setError('Failed to fetch ticket details')
      console.error('Error fetching ticket:', err)
    } finally {
      setTicketLoading(false)
    }
  }, [])

  const addTicket = useCallback(async (ticketData: CreateTicketData) => {
    setError(null)
    try {
      const newTicket = await createTicket(ticketData)
      setTickets((prev) => [newTicket, ...prev])
      return newTicket
    } catch (err: any) {
      setError('Failed to create ticket')
      console.error('Error creating ticket:', err)
      throw err
    }
  }, [])

  const changeTicketStatus = useCallback(async (id: number, status: 'open' | 'closed') => {
    setError(null)
    try {
      const updatedTicket = await updateTicket(id, { status })
      setCurrentTicket(updatedTicket)
      setTickets((prev) =>
        prev.map((ticket) => (ticket.id === id ? { ...ticket, status } : ticket)),
      )
    } catch (err: any) {
      setError('Failed to update ticket status')
      console.error('Error updating ticket:', err)
    }
  }, [])

  const addReply = useCallback(async (replyData: CreateReplyData) => {
    setError(null)
    try {
      const newReply = await createReply(replyData)
      setReplies((prev) => [...prev, newReply])
      return newReply
    } catch (err: any) {
      setError('Failed to add reply')
      console.error('Error adding reply:', err)
      throw err
    }
  }, [])

  useEffect(() => {
    if (!socket) return

    // Define event handlers
    const handleNewTicket = (newTicket: Ticket) => {
      setTickets((prev) => [newTicket, ...prev])
    }

    const handleUpdatedTicket = (updatedTicket: Ticket) => {
      setTickets((prev) =>
        prev.map((ticket) => (ticket.id === updatedTicket.id ? updatedTicket : ticket)),
      )

      if (currentTicket && currentTicket.id === updatedTicket.id) {
        setCurrentTicket(updatedTicket)
      }
    }

    const handleNewReply = (newReply: Reply) => {
      if (currentTicket && currentTicket.id === newReply.ticketId) {
        setReplies((prev) => [...prev, newReply])
      }
    }

    // Register socket event listeners
    socket.on('tickets created', handleNewTicket)
    socket.on('tickets patched', handleUpdatedTicket)
    socket.on('replies created', handleNewReply)

    // Cleanup on unmount
    return () => {
      socket.off('tickets created', handleNewTicket)
      socket.off('tickets patched', handleUpdatedTicket)
      socket.off('replies created', handleNewReply)
    }
  }, [socket, currentTicket])

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      tickets,
      loading,
      error,
      currentTicket,
      ticketLoading,
      fetchTickets,
      fetchTicket,
      addTicket,
      changeTicketStatus,
      addReply,
      replies,
    }),
    [
      tickets,
      loading,
      error,
      currentTicket,
      ticketLoading,
      fetchTickets,
      fetchTicket,
      addTicket,
      changeTicketStatus,
      addReply,
      replies,
    ],
  )

  return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>
}

export const useTickets = (): TicketContextType => {
  const context = useContext(TicketContext)
  if (context === undefined) {
    throw new Error('useTickets must be used within a TicketProvider')
  }
  return context
}
