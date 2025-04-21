import { Params } from '@feathersjs/feathers';
import { User } from './user.interface';

export interface CustomParams extends Params {
  user?: User;
} 