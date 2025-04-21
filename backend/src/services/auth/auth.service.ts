import { Application } from '@feathersjs/feathers';
import { AuthService } from './auth.class';
import { authHooks } from './auth.hooks';
import { AuthCredentials } from './auth.class';

export const setupAuthService = (app: Application) => {
  const service = new AuthService(app);
  app.use('auth', {
    create: (data: AuthCredentials) => service.authenticate(data)
  });
  
  const serviceInstance = app.service('auth');
  serviceInstance.hooks(authHooks);
}; 