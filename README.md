## Quick Start Guide

This guide provides minimal instructions for common development tasks.

### Database

* **Docker (Recommended):** Ensure Docker and Docker Compose are installed. Use `db-up` to start the database defined in `docker-compose.yml`.
* **Local Database:** If using a local database setup, ensure it is running independently before proceeding.

### Dependencies

* **Backend:** Navigate to the `backend` directory and run `npm install` to install dependencies. You might use `yarn install` if preferred.
* **Frontend:** Navigate to the `frontend` directory and run `npm install` or `yarn install` to install dependencies.

### Migrations (Backend)

* **Apply Migrations:** Navigate to the `backend` directory and run `yarn run migrate:up`.
* **Revert Last Migration:** Navigate to the `backend` directory and run `yarn run migrate:down`.

### Running the Applications

* **Backend:** Navigate to the `backend` directory and run `yarn run dev` to start the development server.
* **Frontend:** Navigate to the `frontend` directory and run `yarn run start` to start the development application (usually opens in a browser).





# Project Architecture

This document outlines the architecture of the project, separating the backend and frontend components.

## Backend (`./backend`)

The backend directory contains the server-side logic and API endpoints built with FeathersJS.

```bash
backend
├── index.ts
├── services/
│   ├── index.ts
│   ├── replies/
│   │   ├── replies.service.ts
│   │   ├── replies.hooks.ts
│   │   └── replies.class.ts
│   ├── tickets/
│   │   ├── tickets.hooks.ts
│   │   ├── tickets.class.ts
│   │   ├── tickets.service.ts
│   │   └── tickets.channels.ts
│   └── auth/
│       ├── auth.service.ts
│       ├── auth.class.ts
│       └── auth.hooks.ts
├── app.hooks.ts
├── database.ts
├── app.ts
├── hooks/
│   └── log.ts
├── declarations.ts
├── scripts/
│   └── migrate.ts
├── types/
│   └── express.d.ts
├── migrations/
│   ├── index.ts
│   ├── 20240101000000-create-users.js
│   ├── 20240101000002-create-replies.js
│   ├── 001_initial_schema.ts
│   └── 20240101000001-create-tickets.js
├── interfaces/
│   ├── user.interface.ts
│   ├── ticket.interface.ts
│   ├── custom.interface.ts
│   └── reply.interface.ts
├── middleware/
│   ├── index.ts
│   ├── auth.middleware.ts
│   └── request-id.ts
├── models/
│   ├── reply.model.ts
│   ├── associations.ts
│   ├── users.ts
│   └── ticket.model.ts
├── utils/
│   └── logger.ts
│
└─config
    └── default.json

```



## Frontend (`./frontend/src`)

The frontend directory contains the client-side application logic, likely built with React or a similar framework.


```bash
├frontend/src/
├── services/
│   ├── api.ts
│   ├── tickets.ts
│   └── auth.ts
├── components/
│   ├── templates/
│   │   ├── LoginLayout/
│   │   │   └── index.tsx
│   │   └── AppLayout/
│   │       └── index.tsx
│   ├── atoms/
│   │   ├── Text/
│   │   │   └── index.tsx
│   │   ├── TextArea/
│   │   │   └── index.tsx
│   │   ├── Input/
│   │   │   └── index.tsx
│   │   ├── Tag/
│   │   │   └── index.tsx
│   │   ├── Alert/
│   │   │   └── index.tsx
│   │   ├── Title/
│   │   │   └── index.tsx
│   │   ├── Card/
│   │   │   └── index.tsx
│   │   ├── FormItem/
│   │   │   └── index.tsx
│   │   └── Button/
│   │       └── index.tsx
│   ├── molecules/
│   │   ├── ReplyItem/
│   │   │   └── index.tsx
│   │   ├── ButtonGroup/
│   │   │   └── index.tsx
│   │   ├── TicketCard/
│   │   │   └── index.tsx
│   │   ├── FormGroup/
│   │   │   └── index.tsx
│   │   └── TicketForm/
│   │       └── index.tsx
│   └── organisms/
│       ├── TicketsList/
│       │   └── index.tsx
│       ├── LoginForm/
│       │   └── index.tsx
│       ├── Header/
│       │   └── index.tsx
│       ├── ReplyList/
│       │   └── index.tsx
│       ├── GirdCard/
│       └── ReplyForm/
│           └── index.tsx
├── hooks/
│   └── useSocket.ts
├── pages/
│   ├── LoginPage.tsx
│   ├── TicketDetailPage.tsx
│   ├── CreateTicketPage.tsx
│   └── TicketsListPage.tsx
├── contexts/
│   ├── UIContext.tsx
│   ├── TicketContext.tsx
│   └── AuthContext.tsx
├── utils/
├── types/
├── index.tsx
├── App.tsx
├── reportWebVitals.ts
├── logo.svg
└── index.css
```



### Backend Notes

The backend application, located in the `./backend` directory, is built using FeathersJS. It provides the API endpoints and server-side logic for the application. The `run-back` command starts a development server, often with hot-reloading. Database interactions and model definitions are located within the `./backend/src/models` directory, and the database connection is configured in `./backend/src/database.ts`. API logic is organized into services within the `./backend/src/services` directory, with hooks (`.hooks.ts`) providing middleware functionality for service methods. Database migrations are managed within the `./backend/src/migrations` directory.

### Frontend Notes

The frontend application, located in the `./frontend` directory, is built using React (or a similar framework). The `run-front` command starts a development server that typically provides hot-reloading for a smoother development experience. API interactions are handled within the `./frontend/src/services` directory. UI components are organized within `./frontend/src/components` into `atoms`, `molecules`, `organisms`, and `templates` for better maintainability and scalability. State management is likely handled using React Context API within the `./frontend/src/contexts` directory.

**More detailed documentation will be available soon.**



**Note:** Adjust commands (e.g., `npm` vs. `yarn`) based on your project's dependency management. Ensure your database configuration in `backend/database.ts` matches your chosen database setup (Docker or local).

