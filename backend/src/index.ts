import { app } from './app';
import { logger } from './utils/logger';
import { initializeDatabase } from './database';

async function start() {
  try {
    const port = app.get('port');
    const host = app.get('host');
    
    // Initialize database
    const dbWrapper = await initializeDatabase();

    // Start the server
    const server = app.listen(port, host);
    app.setup(server);

    logger.info(`Server started on http://localhost:${port}`);
  } catch (error) {
    logger.error('Error starting server:', error);
    process.exit(1);
  }
}

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason),
);
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception thrown:', err);
  process.exit(1);
});

start(); 