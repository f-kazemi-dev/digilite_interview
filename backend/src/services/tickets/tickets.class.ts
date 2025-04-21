import { Service, ServiceMethods, Params, Id, NullableId } from '@feathersjs/feathers';
import { TicketModel } from '../../models/ticket.model';
import { ReplyModel } from '../../models/reply.model';
import { Ticket, TicketData } from '../../interfaces/ticket.interface';
import { NotFound, BadRequest, Forbidden } from '@feathersjs/errors';
import { Op } from 'sequelize';

interface CustomParams extends Params {
  user?: {
    id: number;
    role: 'admin' | 'agent';
  };
}

export class TicketService implements ServiceMethods<TicketModel> {
  async find(params?: CustomParams): Promise<TicketModel[]> {
    const { query = {} } = params || {};
    const {
      status,
      search,
      $sort = { field: 'createdAt', direction: 'DESC' },
      $limit = 10,
      $skip = 0
    } = query;

    const where: any = {};

    // Status filter
    if (status) {
      where.status = status;
    }

    // Search filter
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    // // User filter (if authenticated)
    // if (params?.user?.role === 'agent') {
    //   where.userId = params.user.id;
    // }

    return TicketModel.findAll({
      where,
      order: [[$sort.field, $sort.direction]],
      limit: $limit,
      offset: $skip,
      include: [
        {
          model: ReplyModel,
          as: 'replies',
          order: [['createdAt', 'ASC']]
        }
      ]
    });
  }

  async get(id: Id, params?: CustomParams): Promise<TicketModel> {
    const ticket = await TicketModel.findByPk(id as number, {
      include: [
        {
          model: ReplyModel,
          as: 'replies',
          order: [['createdAt', 'ASC']]
        }
      ]
    });

    if (!ticket) {
      throw new NotFound('Ticket not found');
    }

    // Check if agent is trying to access someone else's ticket
    // if (params?.user?.role === 'agent' && ticket.userId !== params.user.id) {
    //   throw new Forbidden('Access denied');
    // }

    return ticket;
  }

  async create(data: Omit<Partial<Ticket>, 'userId'>, params?: CustomParams): Promise<TicketModel> {
    if (!data.title || !data.description) {
      throw new BadRequest('Title and description are required');
    }

    console.log("Creating ticket with userId:", params?.user?.id);
    return TicketModel.create({
      title: data.title,
      description: data.description,
      userId: params?.user?.id,
      status: 'open'
    });
  }

  async update(id: NullableId, data: Partial<Ticket>, params?: CustomParams): Promise<TicketModel> {
    const ticket = await this.get(id as number, params);
    
    // Only allow status update for agents
    if (params?.user?.role === 'agent') {
      if (Object.keys(data).length > 1 || !data.status) {
        throw new BadRequest('Agents can only update ticket status');
      }
    }

    return ticket.update(data);
  }

  async patch(id: NullableId, data: Partial<Partial<Ticket>>, params?: CustomParams): Promise<TicketModel> {
    return this.update(id, data, params);
  }

  async remove(id: NullableId, params?: CustomParams): Promise<TicketModel> {
    const ticket = await this.get(id as number, params);
    await ticket.destroy();
    return ticket;
  }
} 