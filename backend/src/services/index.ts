import { Application } from '@feathersjs/feathers';
import { setupTicketService } from './tickets/tickets.service';
import { setupReplyService } from './replies/replies.service';
import { setupAuthService } from './auth/auth.service';

export const services = (app: Application) => {
  app.configure(setupAuthService);
  app.configure(setupTicketService);
  app.configure(setupReplyService);
}; 