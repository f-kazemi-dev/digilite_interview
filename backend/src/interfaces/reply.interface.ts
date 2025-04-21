// requirments: ticketId , message , createdAt
export interface Reply {
  id?: number;
  // content: string;
  message: string;
  ticketId: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ReplyData {
  // content: string;
  message: string;
  ticketId: number;
  userId: number;
}

export interface ReplyResponse extends Reply {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}