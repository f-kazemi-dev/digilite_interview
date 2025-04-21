import { HookContext } from '@feathersjs/feathers';
import { authenticate } from '../../middleware/auth.middleware';
      
export const replyHooks = {
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
        console.error(`Error in replies service:`, context.error);
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

// import { HookContext } from '@feathersjs/feathers';
// import { NotAuthenticated, Forbidden } from '@feathersjs/errors';
// import { TicketModel } from '../../models/ticket.model';

// export const replyHooks = {
//   before: {
//     all: [],
//     find: [
//       async (context: HookContext) => {
//         // Verify ticket exists and user has access
//         const { ticketId } = context.params.query;
//         if (!ticketId) {
//           throw new NotAuthenticated('Ticket ID is required');
//         }

//         const ticket = await TicketModel.findByPk(ticketId);
//         if (!ticket) {
//           throw new NotAuthenticated('Ticket not found');
//         }

//         if (context.params.user?.role === 'agent' && ticket.userId !== context.params.user.id) {
//           throw new Forbidden('Access denied');
//         }

//         return context;
//       }
//     ],
//     get: [
//       async (context: HookContext) => {
//         // Verify reply access
//         const reply = await context.service.get(context.id);
//         const ticket = await TicketModel.findByPk(reply.ticketId);

//         if (context.params.user?.role === 'agent' && ticket?.userId !== context.params.user.id) {
//           throw new Forbidden('Access denied');
//         }

//         return context;
//       }
//     ],
//     create: [
//       async (context: HookContext) => {
//         // Verify ticket exists and user has access
//         const { ticketId } = context.data;
//         if (!ticketId) {
//           throw new NotAuthenticated('Ticket ID is required');
//         }

//         const ticket = await TicketModel.findByPk(ticketId);
//         if (!ticket) {
//           throw new NotAuthenticated('Ticket not found');
//         }

//         if (context.params.user?.role === 'agent' && ticket.userId !== context.params.user.id) {
//           throw new Forbidden('Access denied');
//         }

//         // Set user ID for new replies
//         context.data.userId = context.params.user?.id;
//         return context;
//       }
//     ],
//     update: [
//       async (context: HookContext) => {
//         // Verify reply access
//         const reply = await context.service.get(context.id);
//         const ticket = await TicketModel.findByPk(reply.ticketId);

//         if (context.params.user?.role === 'agent' && ticket?.userId !== context.params.user.id) {
//           throw new Forbidden('Access denied');
//         }

//         return context;
//       }
//     ],
//     patch: [
//       async (context: HookContext) => {
//         // Verify reply access
//         const reply = await context.service.get(context.id);
//         const ticket = await TicketModel.findByPk(reply.ticketId);

//         if (context.params.user?.role === 'agent' && ticket?.userId !== context.params.user.id) {
//           throw new Forbidden('Access denied');
//         }

//         return context;
//       }
//     ],
//     remove: [
//       async (context: HookContext) => {
//         // Verify reply access
//         const reply = await context.service.get(context.id);
//         const ticket = await TicketModel.findByPk(reply.ticketId);

//         if (context.params.user?.role === 'agent' && ticket?.userId !== context.params.user.id) {
//           throw new Forbidden('Access denied');
//         }

//         return context;
//       }
//     ]
//   },
//   after: {
//     all: [],
//     find: [],
//     get: [],
//     create: [],
//     update: [],
//     patch: [],
//     remove: []
//   },
//   error: {
//     all: [
//       async (context: HookContext) => {
//         console.error(`Error in replies service:`, context.error);
//         return context;
//       }
//     ],
//     find: [],
//     get: [],
//     create: [],
//     update: [],
//     patch: [],
//     remove: []
//   }
// }; 