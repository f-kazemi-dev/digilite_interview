export enum UserRole {
  ADMIN = 'admin',
  AGENT = 'agent'
}

export interface User {
  id: number;
  email: string;
  password: string;
  role: UserRole;
}

export const users: User[] = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'admin123',
    role: UserRole.ADMIN
  },
  {
    id: 2,
    email: 'agent@example.com',
    password: 'agent123',
    role: UserRole.AGENT
  }
];

export const findUser = (email: string): User | undefined => {
  return users.find(user => user.email === email);
}; 