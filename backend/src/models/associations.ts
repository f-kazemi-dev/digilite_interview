import { TicketModel } from './ticket.model';
import { ReplyModel } from './reply.model';

export function setupAssociations() {
  // Define associations
  TicketModel.hasMany(ReplyModel, {
    foreignKey: 'ticketId',
    as: 'replies',
  });

  ReplyModel.belongsTo(TicketModel, {
    foreignKey: 'ticketId',
    as: 'ticket',
  });
} 