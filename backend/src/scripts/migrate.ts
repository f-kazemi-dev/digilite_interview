import { Sequelize } from 'sequelize';
import { logger } from '../utils/logger';
import * as path from 'path';
import * as fs from 'fs';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'support_tickets',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  logging: (msg) => logger.debug(msg),
});

async function runMigrations() {
  try {
    // Create migrations table if it doesn't exist
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS "SequelizeMeta" (
        "name" VARCHAR(255) NOT NULL,
        PRIMARY KEY ("name")
      );
    `);

    // Get all migration files
    const migrationsDir = path.join(__dirname, '../migrations');
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.js'))
      .sort();

    // Get executed migrations
    const [executedMigrations] = await sequelize.query(
      'SELECT "name" FROM "SequelizeMeta"'
    );
    const executedNames = (executedMigrations as any[]).map(m => m.name);

    // Run pending migrations
    for (const file of migrationFiles) {
      if (!executedNames.includes(file)) {
        console.log(`Running migration: ${file}`);
        const migration = require(path.join(migrationsDir, file));
        await migration.up(sequelize.getQueryInterface(), Sequelize);
        await sequelize.query(
          'INSERT INTO "SequelizeMeta" ("name") VALUES (?)',
          { replacements: [file] }
        );
        console.log(`Completed migration: ${file}`);
      }
    }

    console.log('All migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  } finally {
    await sequelize.close();
  }
}

async function rollbackMigrations() {
  try {
    // Get last executed migration
    const [executedMigrations] = await sequelize.query(
      'SELECT "name" FROM "SequelizeMeta" ORDER BY "name" DESC LIMIT 1'
    );

    if (executedMigrations.length > 0) {
      const lastMigration = (executedMigrations as any[])[0].name;
      console.log(`Rolling back migration: ${lastMigration}`);

      const migration = require(path.join(__dirname, '../migrations', lastMigration));
      await migration.down(sequelize.getQueryInterface(), Sequelize);
      await sequelize.query(
        'DELETE FROM "SequelizeMeta" WHERE "name" = ?',
        { replacements: [lastMigration] }
      );

      console.log(`Rolled back migration: ${lastMigration}`);
    } else {
      console.log('No migrations to roll back');
    }
  } catch (error) {
    console.error('Rollback failed:', error);
    throw error;
  } finally {
    await sequelize.close();
  }
}

async function main() {
  const command = process.argv[2];

  try {
    if (command === 'up') {
      await runMigrations();
    } else if (command === 'down') {
      await rollbackMigrations();
    } else {
      console.error('Usage: npm run migrate <up|down>');
      process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main(); 