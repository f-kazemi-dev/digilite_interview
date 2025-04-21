# Ticket System Backend

A FeathersJS backend for a ticket management system with authentication and role-based access control.

## Quick Start

To quickly set up and run the backend, follow these steps:

1. **Docker Compose:** Use Docker Compose to start the necessary services. Run the command:

   ```bash
   docker-compose up
   ```
2. **Database Configuration:** The database connection details are configured using environment variables defined in the `.env` file. Ensure that the `.env` file includes the correct values for `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD`. Refer to the "Database Configuration" section below for more details.

   The `config/default.json` file is used to configure other application settings, such as the server host and port.
3. **Database Migrations:** After configuring the database, apply the migrations to set up the database schema. Run the command:

   ```bash
   yarn run migrate:up
   ```
4. **Start Backend Development Server:** Once the migrations are complete, start the backend development server using the following command:

   ```bash
   yarn run dev
   ```

The backend API will be accessible at `http://localhost:3030` by default. You can use the provided Postman collection to interact with the API endpoints. Ensure you use the database username and password specified in the `config/default.json` file for authentication where required.

## Database Configuration

The backend application uses environment variables to configure the database connection. These variables are defined in a `.env` file located in the root directory of the project. Below are the required environment variables:

- `DB_HOST`: The hostname of the database server (default: `localhost`)
- `DB_PORT`: The port number for the database server (default: `5432`)
- `DB_NAME`: The name of the database (default: `support_tickets`)
- `DB_USER`: The username for the database (default: `postgres`)
- `DB_PASSWORD`: The password for the database (default: `postgres`)

Ensure that the `.env` file is properly configured before running the application. For example:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=support_tickets
DB_USER=your_username
DB_PASSWORD=your_password
```

The application reads these variables to establish a connection to the database. If the `.env` file is not present, the application will fall back to the default values specified in the code.

## Project Structure

The backend project is organized as follows:

```
backend/
├── config/                # Configuration files for different environments
│   ├── default.json       # Default configuration
│   └── production.json    # Production-specific configuration
├── public/                # Public assets like favicon and index.html
│   ├── favicon.ico
│   └── index.html
├── src/                   # Main source code
│   ├── app.hooks.ts       # Application-level hooks
│   ├── app.ts             # Main application setup
│   ├── database.ts        # Database connection setup
│   ├── declarations.ts    # TypeScript declarations
│   ├── index.ts           # Entry point of the application
│   ├── hooks/             # Custom hooks
│   │   └── log.ts         # Logging hook
│   ├── interfaces/        # TypeScript interfaces for data models
│   │   ├── custom.interface.ts
│   │   ├── reply.interface.ts
│   │   ├── ticket.interface.ts
│   │   └── user.interface.ts
│   ├── middleware/        # Custom middleware for request handling
│   │   ├── auth.middleware.ts
│   │   ├── index.ts
│   │   └── request-id.ts
│   ├── migrations/        # Database migration scripts
│   │   ├── 001_initial_schema.ts
│   │   ├── 20240101000000-create-users.js
│   │   ├── 20240101000001-create-tickets.js
│   │   ├── 20240101000002-create-replies.js
│   │   └── index.ts
│   ├── models/            # Sequelize models and associations
│   │   ├── associations.ts
│   │   ├── reply.model.ts
│   │   ├── ticket.model.ts
│   │   └── users.ts
│   ├── scripts/           # Utility scripts
│   │   └── migrate.ts
│   ├── services/          # FeathersJS services for business logic
│   │   ├── index.ts
│   │   ├── auth/
│   │   │   ├── auth.class.ts
│   │   │   ├── auth.hooks.ts
│   │   │   └── auth.service.ts
│   │   ├── replies/
│   │   │   ├── replies.class.ts
│   │   │   ├── replies.hooks.ts
│   │   │   └── replies.service.ts
│   │   └── tickets/
│   │       ├── tickets.channels.ts
│   │       ├── tickets.class.ts
│   │       ├── tickets.hooks.ts
│   │       └── tickets.service.ts
│   ├── types/             # TypeScript type definitions
│   │   └── express.d.ts
│   └── utils/             # Utility functions
│       └── logger.ts
├── combined.log           # Combined log file for application logs
├── error.log              # Error-specific log file
├── jest.config.js         # Jest configuration for testing
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
```

This structure ensures a clean separation of concerns, making the codebase maintainable and scalable.

## Key Features

- **Custom Middleware:** Includes middleware for authentication, request ID generation, and logging.
- **Automatic Transaction Management:** Ensures data consistency during multi-step database operations.
- **Comprehensive API:** Provides endpoints for managing tickets, replies, and user authentication.
- **PostgreSQL Integration:** Uses Sequelize ORM for database interactions.
- **TypeScript Support:** Ensures type safety and reduces runtime errors.
- **Logging:** Centralized logging using a custom logger utility.

## Development and Testing

- **Database Migrations:**
  Run the following command to apply migrations:

  ```bash
  yarn run migrate:up
  ```
- **Testing:**
  Execute tests using:

  ```bash
  yarn test
  ```
- **Development Server:**
  Start the development server with:

  ```bash
  yarn run dev
  ```

## Backend Development Details

The backend application is built using Node.js and PostgreSQL. It provides a comprehensive set of API endpoints for managing tickets and replies, including functionalities for creating, reading, updating, and deleting records. Additionally, the API supports advanced features such as filtering and sorting of tickets based on various criteria, allowing for flexible data retrieval.

The project is structured to ensure maintainability and scalability, with a focus on modularity. The codebase is organized to separate concerns effectively, leveraging FeathersJS conventions. Services, models, and other components are centralized to align with the framework's simplicity and ease of use.

One notable customization implemented was the addition of a **custom context** to the request objects. This enhancement allows for more streamlined management of cross-cutting concerns such as logging and access to the database instance within the request lifecycle. By embedding relevant services and configurations directly within the request context, we aim to simplify the implementation of features that require these functionalities.

Furthermore, **automatic transaction management** was implemented for database operations that occur within a parent scope. This feature ensures data consistency and simplifies the handling of complex, multi-step database interactions by automatically managing the lifecycle of transactions.

## Advanced Features and Recommendations

- **FeathersJS Framework**: The backend leverages FeathersJS, which simplifies the creation of RESTful APIs and WebSocket support. This framework is ideal for rapid development and scalability.
- **Centralized Logging**: A custom logger utility is implemented to provide centralized logging, which is essential for debugging and monitoring.
- **TypeScript Integration**: The use of TypeScript ensures type safety and reduces runtime errors, making the codebase more robust.
- **Database Migrations**: The project uses Sequelize for database migrations, ensuring schema consistency across environments.

### Recommendations for Improvement

1. **Feature-Based Organization**: To improve maintainability, consider restructuring the codebase to group related files (e.g., services, models, migrations) by feature.
2. **Testing Coverage**: Expand unit and integration tests to cover all critical functionalities.
3. **Error Handling**: Implement more robust error handling mechanisms to ensure graceful degradation in case of failures.
4. **Documentation**: Enhance inline documentation to improve developer onboarding and code readability.

## API Endpoints

Refer to the provided Postman collection (`postman_collection.json`) for detailed examples of API usage, including authentication, ticket management, and reply management.

## License

MIT
