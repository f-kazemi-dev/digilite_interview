# Digilite Interview Project

This project is a full-stack application designed for managing tickets and replies. It consists of two main parts:

- **Backend**: A Node.js application using FeathersJS and PostgreSQL for managing the API and database.
- **Frontend**: A React-based application for the user interface.

## Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js (v20 or higher)
- Yarn or npm
- PostgreSQL (if not using Docker)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/f-kazemi-dev/digilite_interview.git
   cd digilite_interview
   ```

2. Use Docker Compose to start the services:
   ```bash
   docker-compose up
   ```

   This will start the backend, frontend, and a PostgreSQL database. Ensure that the database environment variables in the `docker-compose.yml` file match the `.env` file located in the `backend` directory. Key variables include:

   - `DB_HOST`: Database host (default: `localhost`)
   - `DB_PORT`: Database port (default: `5432`)
   - `DB_NAME`: Database name (default: `support_tickets`)
   - `DB_USER`: Database username (default: `postgres`)
   - `DB_PASSWORD`: Database password (default: `postgres`)

   For more details, refer to the `README.md` file in the `backend` directory.

3. Alternatively, you can set up the backend and frontend manually. Refer to the respective `README.md` files in the `backend` and `frontend` directories for detailed instructions.

## Project Structure

```
.
├── docker-compose.yml      # Docker Compose configuration for the project
├── Makefile                # Makefile for common tasks
├── postman_collection.json # Postman collection for API testing
├── README.md               # Main project documentation
├── backend/                # Backend application
└── frontend/               # Frontend application
```

## Makefile

The `Makefile` provides shortcuts for common tasks. Below are the available commands:

- **Run All Services**:
  ```bash
  make all
  ```
  Installs dependencies, applies migrations, and starts the backend, frontend, and database.

- **Start Database**:
  ```bash
  make db-up
  ```
  Starts the database and other services using Docker Compose in detached mode.

- **Install Backend Dependencies**:
  ```bash
  make inst-back
  ```
  Installs backend dependencies using `npm install`.

- **Install Frontend Dependencies**:
  ```bash
  make inst-front
  ```
  Installs frontend dependencies using `npm install`.

- **Apply Migrations**:
  ```bash
  make mig-up
  ```
  Applies database migrations for the backend.

- **Rollback Migrations**:
  ```bash
  make mig-down
  ```
  Rolls back database migrations for the backend.

- **Start Backend**:
  ```bash
  make run-back
  ```
  Starts the backend development server.

- **Start Frontend**:
  ```bash
  make run-front
  ```
  Starts the frontend development server.

Refer to the `Makefile` for additional commands and details.

## Database Configuration

The database is configured using environment variables defined in the `.env` file located in the `backend` directory. Key variables include:

- `DB_HOST`: Database host (default: `localhost`)
- `DB_PORT`: Database port (default: `5432`)
- `DB_NAME`: Database name (default: `support_tickets`)
- `DB_USER`: Database username (default: `postgres`)
- `DB_PASSWORD`: Database password (default: `postgres`)

For more details, refer to the `README.md` file in the `backend` directory.

## Backend

The backend is a FeathersJS application that provides a RESTful API and WebSocket support. It includes features like:

- JWT-based authentication
- Role-based access control
- Database migrations

The project is structured to ensure maintainability and scalability, with a focus on modularity. While it does not fully adhere to the **Feature-Sliced Design (FSD)** architectural pattern, the codebase is organized to separate concerns effectively within the FeathersJS framework.

For detailed setup and usage instructions, refer to the `backend/README.md` file.

## Frontend

The frontend is a React application designed with Atomic Design principles. It includes:

- Login functionality
- Ticket and reply management
- Integration with the backend API

For detailed setup and usage instructions, refer to the `frontend/README.md` file.

## Postman Collection

A Postman collection (`postman_collection.json`) is included in the root directory. Use it to test the backend API endpoints.

## License

MIT

