import { Channel } from '@feathersjs/transport-commons';
import { Application } from '@feathersjs/feathers';

export const setupTicketChannels = (app: Application) => {
  app.on('connection', (connection: any) => {
    app.channel('authenticated').join(connection);
  });

  app.service('tickets').publish('created', (data: any, context: any) => {
    return app.channel('authenticated');
  });

  app.service('tickets').publish('updated', (data: any, context: any) => {
    return app.channel('authenticated');
  });

  app.service('tickets').publish('patched', (data: any, context: any) => {
    return app.channel('authenticated');
  });

  app.service('tickets').publish('removed', (data: any, context: any) => {
    return app.channel('authenticated');
  });
}; 