import { Sequelize } from 'sequelize';
import { getSequelizeInstance } from '../database';
import { up as initialUp, down as initialDown } from './001_initial_schema';

export async function runMigrations(): Promise<void> {
  const sequelize = getSequelizeInstance();
  
  try {
    // Create migrations table if it doesn't exist
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Check if initial migration has been run
    const [results] = await sequelize.query(
      'SELECT * FROM migrations WHERE name = ?',
      { replacements: ['001_initial_schema'] }
    );

    if (!results || (results as any[]).length === 0) {
      console.log('Running initial migration...');
      await initialUp(sequelize.getQueryInterface());
      await sequelize.query(
        'INSERT INTO migrations (name) VALUES (?)',
        { replacements: ['001_initial_schema'] }
      );
      console.log('Initial migration completed successfully');
    } else {
      console.log('Initial migration already applied');
    }
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
}

export async function rollbackMigrations(): Promise<void> {
  const sequelize = getSequelizeInstance();
  
  try {
    const [results] = await sequelize.query(
      'SELECT * FROM migrations WHERE name = ?',
      { replacements: ['001_initial_schema'] }
    );

    if (results && (results as any[]).length > 0) {
      console.log('Rolling back initial migration...');
      await initialDown(sequelize.getQueryInterface());
      await sequelize.query(
        'DELETE FROM migrations WHERE name = ?',
        { replacements: ['001_initial_schema'] }
      );
      console.log('Initial migration rolled back successfully');
    } else {
      console.log('No migrations to roll back');
    }
  } catch (error) {
    console.error('Rollback failed:', error);
    throw error;
  }
} 