import { HookContext } from '@feathersjs/feathers';
import { authenticate } from '../../middleware/auth.middleware';
      
export const ticketsHooks = {
  before: {
    all: [authenticate],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
  error: {
    all: [
      async (context: HookContext) => {
        console.error(`Error in tickets service:`, context.error);
        return context;
      }
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
