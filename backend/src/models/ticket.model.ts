import { Model, DataTypes, Sequelize } from 'sequelize';
import { Ticket } from '../interfaces/ticket.interface';

export class TicketModel extends Model implements Ticket {
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: 'open' | 'closed';
  public priority!: 'low' | 'medium' | 'high';
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const defineTicketModel = (sequelize: Sequelize) => {
  TicketModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('open', 'closed'),
        allowNull: false,
        defaultValue: 'open',
      },
      priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        allowNull: false,
        defaultValue: 'medium',
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Ticket',
      tableName: 'tickets',
    }
  );

  return TicketModel;
}; 