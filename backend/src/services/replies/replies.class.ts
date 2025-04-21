import { Service, ServiceMethods, Params, Id, NullableId } from '@feathersjs/feathers';
import { ReplyModel } from '../../models/reply.model';
import { TicketModel } from '../../models/ticket.model';
import { Reply, ReplyData } from '../../interfaces/reply.interface';
import { NotFound, BadRequest, Forbidden } from '@feathersjs/errors';

interface CustomParams extends Params {
  user: {
    id: number;
    role: 'admin' | 'agent';
  };
}

export class ReplyService implements ServiceMethods<ReplyModel> {
  async find(params?: CustomParams): Promise<ReplyModel[]> {
    const { query = {} } = params || {};
    const { ticketId, $sort = { field: 'createdAt', direction: 'ASC' } } = query;

    if (!ticketId) {
      throw new BadRequest('Ticket ID is required');
    }

    // Verify ticket exists and user has access
    const ticket = await TicketModel.findByPk(ticketId);
    if (!ticket) {
      throw new NotFound('Ticket not found');
    }

    // if (params?.user?.role === 'agent' && ticket.userId !== params.user.id) {
    //   throw new Forbidden('Access denied');
    // }

    return ReplyModel.findAll({
      where: { ticketId },
      order: [[$sort.field, $sort.direction]],
      include: [
        {
          model: TicketModel,
          as: 'ticket',
          attributes: ['id', 'title', 'status']
        }
      ]
    });
  }

  async get(id: Id, params?: CustomParams): Promise<ReplyModel> {
    const reply = await ReplyModel.findByPk(id as number, {
      include: [
        {
          model: TicketModel,
          as: 'ticket',
          attributes: ['id', 'title', 'status', 'userId']
        }
      ]
    });

    if (!reply) {
      throw new NotFound('Reply not found');
    }

    // Get the associated ticket
    const ticket = await TicketModel.findByPk(reply.ticketId);
    if (!ticket) {
      throw new NotFound('Associated ticket not found');
    }

    // Verify user has access to the ticket
    if (params?.user?.role === 'agent' && ticket.userId !== params.user.id) {
      throw new Forbidden('Access denied');
    }

    return reply;
  }

  async create(data: Omit<Partial<Reply>, 'userId'>, params: CustomParams): Promise<ReplyModel> {
    if (!data.message || !data.ticketId) {
      console.log('\n\n\n >>>>>>>>>>>>>>>>>>>> Data:', data);
      throw new BadRequest('Message and ticket ID are required');
    }

    // Verify ticket exists and user has access
    const ticket = await TicketModel.findByPk(data.ticketId);
    if (!ticket) {
      throw new NotFound('Ticket not found');
    }

    // if (params?.user?.role === 'agent' && ticket.userId !== params.user.id) {
    //   throw new Forbidden('Access denied');
    // }

    return ReplyModel.create({
      message: data.message,
      ticketId: data.ticketId,
      userId: params.user.id
    });
  }

  async update(id: NullableId, data: Partial<Reply>, params?: CustomParams): Promise<ReplyModel> {
    const reply = await this.get(id as number, params);
    return reply.update(data);
  }

  async patch(id: NullableId, data: Partial<Partial<Reply>>, params?: CustomParams): Promise<ReplyModel> {
    return this.update(id, data, params);
  }

  async remove(id: NullableId, params?: CustomParams): Promise<ReplyModel> {
    const reply = await this.get(id as number, params);
    await reply.destroy();
    return reply;
  }
} 