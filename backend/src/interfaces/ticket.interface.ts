// requirments: title , description , status , createdAt , updatedAt
export interface Ticket {
  id?: number;
  title: string;
  description: string;
  status: 'open' | 'closed';
  priority: 'low' | 'medium' | 'high';
  userId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TicketData extends Partial<Ticket> {
  title: string;
  description: string;
}

export interface TicketResponse {
  id: number;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  userId: number;
  createdAt: Date;
  updatedAt: Date;
} 