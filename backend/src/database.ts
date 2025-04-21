import { Sequelize } from 'sequelize';
import { logger } from './utils/logger';
import { setupAssociations } from './models/associations';
import { defineTicketModel } from './models/ticket.model';
import { defineReplyModel } from './models/reply.model';

let sequelizeInstance: Sequelize;

export const initializeDatabase = async (): Promise<Sequelize> => {
  if (!sequelizeInstance) {
    // if (process.env.NODE_ENV === 'development' && !process.env.DB_HOST) {
    //   // Use SQLite in development if no PostgreSQL config is provided
    //   sequelizeInstance = new Sequelize({
    //     dialect: 'sqlite',
    //     storage: './database.sqlite',
    //     logging: (msg) => logger.debug(msg),
    //   });
    // } else {
      // Use PostgreSQL in production or if config is provided
      sequelizeInstance = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        database: process.env.DB_NAME || 'support_tickets',
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        logging: (msg) => logger.debug(msg),
      });
    // }

    try {
      // Test the connection
      await sequelizeInstance.authenticate();
      logger.info('Database connection has been established successfully.');
      
      // Init & Define models
      defineTicketModel(sequelizeInstance);
      defineReplyModel(sequelizeInstance);
      
      // Set up model associations
      setupAssociations();

      // Sync database
      // if (process.env.NODE_ENV === 'development') {
      //   await sequelizeInstance.sync({ force: true });
      //   logger.info('Database synced successfully');
      // }
    } catch (error) {
      logger.error('Unable to connect to the database:', error);
      throw error;
    }
  }

  return sequelizeInstance;
};

// export const getSequelize = (): Sequelize => {
//   if (!sequelizeInstance) {
//     throw new Error('Database not initialized. Call initializeDatabase first.');
//   }
//   return sequelizeInstance;
// }; 