import { Model, DataTypes, Sequelize } from 'sequelize';
import { Reply } from '../interfaces/reply.interface';

export class ReplyModel extends Model<Reply> implements Reply {
  public id!: number;
  public message!: string;
  public ticketId!: number;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function defineReplyModel(sequelize: Sequelize): void {
  ReplyModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      ticketId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Reply',
      tableName: 'replies',
    }
  );
} 