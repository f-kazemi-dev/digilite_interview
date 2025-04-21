import { HookContext } from '@feathersjs/feathers';
import log from './hooks/log';

export const appHooks = {
  before: {
    all: [log()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  after: {
    all: [log()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  error: {
    all: [
      // log(),
      async (context: HookContext) => {
        console.error(`Error in ${context.path} service:`, context.error);
        return context;
      }
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}; 