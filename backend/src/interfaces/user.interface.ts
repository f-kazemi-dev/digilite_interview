export interface User {
  id?: number;
  email: string;
  password?: string;
  role: 'admin' | 'agent';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserData {
  email: string;
  password: string;
  role: 'admin' | 'agent';
}

export interface UserResponse {
  id: number;
  email: string;
  role: 'admin' | 'agent';
  createdAt?: Date;
  updatedAt?: Date;
} 