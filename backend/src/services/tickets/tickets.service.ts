import { Application } from '@feathersjs/feathers';
import { TicketService } from './tickets.class';
import { ticketsHooks } from './tickets.hooks';
import { setupTicketChannels } from './tickets.channels';
import { defineTicketModel } from '../../models/ticket.model';

export const setupTicketService = (app: Application) => {
  // const ticketModel = defineTicketModel(app);
  // app.use('tickets', new TicketService({ Model: ticketModel }));
  
  app.use('tickets', new TicketService());
  
  const service = app.service('tickets');
  service.hooks(ticketsHooks);

  // Set up real-time events
  setupTicketChannels(app);
  
}; 
