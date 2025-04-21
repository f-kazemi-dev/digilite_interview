# Ticket System Backend

A FeathersJS backend for a ticket management system with authentication and role-based access control.

## Features

- JWT-based authentication
- Role-based access control (Admin/Agent)
- Ticket management
- Reply management
- PostgreSQL/SQLite database support
- RESTful API
- WebSocket support

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (optional, SQLite can be used in development)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment file:
   ```bash
   cp .env.example .env
   ```
4. Update the `.env` file with your configuration

## Database Setup

### PostgreSQL (Production)
1. Create a PostgreSQL database
2. Update the database configuration in `.env`
3. Run migrations:
   ```bash
   npm run migrate
   ```

### SQLite (Development)
If no PostgreSQL configuration is provided, the application will automatically use SQLite in development mode.

## Running the Application

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /auth` - Authenticate user
- `POST /authentication` - Get JWT token

### Tickets
- `GET /tickets` - List tickets
- `POST /tickets` - Create ticket
- `GET /tickets/:id` - Get ticket
- `PATCH /tickets/:id` - Update ticket
- `DELETE /tickets/:id` - Delete ticket

### Replies
- `GET /replies` - List replies
- `POST /replies` - Create reply
- `GET /replies/:id` - Get reply
- `PATCH /replies/:id` - Update reply
- `DELETE /replies/:id` - Delete reply

## Authentication

The system uses JWT for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <token>
```

### User Roles

- **Admin**: Full access to all tickets and replies
- **Agent**: Access only to assigned tickets and their replies

## Testing

```bash
npm test
```

## License

MIT

## Project Structure

```
backend/
├── src/
│   ├── app.ts              # Main application setup
│   ├── authentication.ts   # Authentication configuration
│   ├── database.ts         # Database configuration
│   ├── interfaces/         # TypeScript interfaces
│   ├── models/            # Sequelize models
│   ├── services/          # FeathersJS services
│   └── utils/             # Utility functions
├── .env                   # Environment variables
├── package.json           # Project dependencies
└── tsconfig.json          # TypeScript configuration
``` 