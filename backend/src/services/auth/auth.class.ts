import { Service, Application } from '@feathersjs/feathers';
import { NotAuthenticated } from '@feathersjs/errors';
import jwt from 'jsonwebtoken';
import { findUser, User, UserRole } from '../../models/users';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResult {
  accessToken: string;
  user: Omit<User, 'password'>;
}

interface JWTPayload {
  userId: number;
  role: UserRole;
  email: string;
  iat?: number;
  exp?: number;
}

export class AuthService {
  app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  async authenticate(data: AuthCredentials): Promise<AuthResult> {
    const user = findUser(data.email);
    
    if (!user || user.password !== data.password) {
      throw new NotAuthenticated('Invalid email or password');
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    const { password: _, ...userWithoutPassword } = user;

    return {
      accessToken: token,
      user: userWithoutPassword
    };
  }

  verifyToken(token: string): JWTPayload {
    try {
      console.log('Decoded JWT:', token); // Debugging line

      const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
      return decoded;
    } catch (error) {
      throw new NotAuthenticated('Invalid token');
    }
  }

  isAdmin(token: string): boolean {
    const payload = this.verifyToken(token);
    return payload.role === UserRole.ADMIN;
  }

  isAgent(token: string): boolean {
    const payload = this.verifyToken(token);
    return payload.role === UserRole.AGENT;
  }

  setup(app: Application, path: string): void {
    // No setup needed for hardcoded auth
  }
} 