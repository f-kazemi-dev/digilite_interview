import { Application } from '@feathersjs/feathers';
import { ReplyService } from './replies.class';
import { replyHooks } from './replies.hooks';

export const setupReplyService = (app: Application) => {
  app.use('replies', new ReplyService());
  
  const service = app.service('replies');
  service.hooks(replyHooks);
}; 