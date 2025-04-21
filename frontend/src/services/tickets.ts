import api from './api'

export interface Ticket {
  id: number
  title: string
  description: string
  status: 'open' | 'closed'
  createdAt: string
  updatedAt: string
  userId: number
  user?: {
    id: number
    email: string
    role: string
  }
  replies?: Reply[]
}

export interface Reply {
  id: number
  ticketId: number
  message: string
  createdAt: string
  updatedAt: string
  userId: number
  user?: {
    id: number
    email: string
    role: string
  }
}

export interface CreateTicketData {
  title: string
  description: string
}

export interface CreateReplyData {
  ticketId: number
  message: string
}

// Get all tickets with optional filter
export const getTickets = async (status?: 'all' | 'open' | 'closed'): Promise<Ticket[]> => {
  try {
    const query = status && status !== 'all' ? { status } : {}
    const response = await api.get<Ticket[]>('/tickets', { params: query })
    console.log('Tickets:', response.data)
    return response.data
  } catch (error) {
    throw error
  }
}

// Get a single ticket by ID
export const getTicket = async (id: number): Promise<Ticket> => {
  try {
    const response = await api.get<Ticket>(`/tickets/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

// Create a new ticket
export const createTicket = async (data: CreateTicketData): Promise<Ticket> => {
  try {
    const response = await api.post<Ticket>('/tickets', data)
    return response.data
  } catch (error) {
    throw error
  }
}

// Update a ticket (e.g., change status)
export const updateTicket = async (id: number, data: Partial<Ticket>): Promise<Ticket> => {
  try {
    const response = await api.patch<Ticket>(`/tickets/${id}`, data)
    return response.data
  } catch (error) {
    throw error
  }
}

// Get replies for a ticket
export const getReplies = async (ticketId: number): Promise<Reply[]> => {
  try {
    const response = await api.get<{ data: Reply[] }>('/replies', {
      params: { ticketId },
    })
    return response.data.data
  } catch (error) {
    throw error
  }
}

// Create a reply for a ticket
export const createReply = async (data: CreateReplyData): Promise<Reply> => {
  try {
    const response = await api.post<Reply>('/replies', data)
    return response.data
  } catch (error) {
    throw error
  }
}
