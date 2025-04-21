import { HookContext } from '@feathersjs/feathers';

import { Request, Response, NextFunction } from 'express';
import { Forbidden, NotFound } from '@feathersjs/errors';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const authenticate = async (context: HookContext) => {
  console.log('=== Auth Middleware Debug ===');
  
  const authHeader = context.params.headers?.authorization;
  console.log('Request authHeader:', authHeader);

  if (!authHeader) {
    throw new Forbidden('Access denied');
  }

  console.log('Auth header found:', authHeader);
  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new Forbidden('Access denied');
  }

  try {
    console.log('Attempting to verify token...');
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: 'admin' | 'agent'; email: string };
    console.log('Token decoded successfully:', decoded);
    
    context.params.user = {
      id: parseInt(decoded.userId, 10),
      role: decoded.role,
      email: decoded.email
    };
    return context;
  } catch (error) {
    throw new Forbidden('Access denied');
  }
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log('=== Authorization Debug ===');
    console.log('Required roles:', roles);
    console.log('User:', req.user);
    
    if (!req.user) {
    throw new Forbidden('Access denied');
    }

    const userRole = req.user.role;
    console.log('User role:', userRole);
    
    if (!roles.includes(userRole)) {
    throw new Forbidden('Access denied');
    }

    console.log('Authorization successful');
    next();
  };
}; 