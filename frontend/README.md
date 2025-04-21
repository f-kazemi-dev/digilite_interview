# Ticket System Frontend

A React-based frontend for the Ticket System, designed to provide a user-friendly interface for managing tickets and replies.

## Quick Start

To run the frontend application, navigate to the `frontend` directory in your terminal and follow these steps:

1. **Install Dependencies:** Install the necessary Node.js modules and libraries by running:

   ```bash
   yarn install
   ```

   or

   ```bash
   npm install
   ```
2. **Start Frontend Development Server:** Once the dependencies are installed, start the frontend development server with the command:

   ```bash
   yarn start
   ```

   or

   ```bash
   npm start
   ```

The frontend application will be accessible in your web browser at `http://localhost:3000` by default.

## Frontend Development Details

The frontend includes a **login functionality**, and the user credentials for logging in are typically provided within the login form itself. Please refer to the application's user interface for the specific username and password to use during the login process.

The development of the frontend considered the principles of **Atomic Design**. This methodology involves breaking down the user interface into its smallest reusable components (atoms) and progressively combining them into more complex structures (molecules, organisms, templates, and pages). The goal of using Atomic Design is to create a highly modular, flexible, and maintainable UI system.

While the initial plan was to fully implement the UI using the **Ant Design** component library, the limited timeframe made it challenging to adopt every component and pattern provided by Ant Design. However, the project incorporates the core concepts of Atomic Design, and where full Ant Design components were not immediately feasible, the implementation aims to reflect similar principles of modularity and reusability.

## API Integration

The frontend interacts with the backend API for ticket and reply management. Refer to the provided Postman collection (`postman_collection.json`) for details on API endpoints and usage.

## Frontend Contexts and Hooks

The frontend application leverages React's `useContext`, `useCallback`, and other hooks to manage state and provide reusable logic across components. The following contexts are implemented:

- **AuthContext:** Manages authentication state and provides methods for login and logout.
- **TicketContext:** Handles ticket-related state and operations, such as fetching and updating tickets.
- **UIContext:** Manages UI-related state, such as loading indicators and modals.

These contexts are designed to simplify state management and improve code modularity by encapsulating related logic and state in a single place.

## Frontend Directory Structure

The `src` directory of the frontend is organized as follows:

```
src/
├── App.tsx
├── index.css
├── index.tsx
├── logo.svg
├── reportWebVitals.ts
├── components/
│   ├── atoms/
│   │   ├── Alert/
│   │   │   └── index.tsx
│   │   ├── Button/
│   │   │   └── index.tsx
│   │   ├── Card/
│   │   │   └── index.tsx
│   │   ├── FormItem/
│   │   │   └── index.tsx
│   │   ├── Input/
│   │   │   └── index.tsx
│   │   ├── Tag/
│   │   │   └── index.tsx
│   │   ├── Text/
│   │   ├── TextArea/
│   │   └── Title/
│   ├── molecules/
│   │   ├── ButtonGroup/
│   │   │   └── index.tsx
│   │   ├── FormGroup/
│   │   │   └── index.tsx
│   │   ├── ReplyItem/
│   │   │   └── index.tsx
│   │   ├── TicketCard/
│   │   │   └── index.tsx
│   │   └── TicketForm/
│   │       └── index.tsx
│   ├── organisms/
│   │   ├── GirdCard/
│   │   │   └── index.tsx
│   │   ├── Header/
│   │   │   └── index.tsx
│   │   ├── LoginForm/
│   │   │   └── index.tsx
│   │   ├── ReplyForm/
│   │   │   └── index.tsx
│   │   ├── ReplyList/
│   │   │   └── index.tsx
│   │   └── TicketsList/
│   │       └── index.tsx
│   └── templates/
│       ├── AppLayout/
│       │   └── index.tsx
│       └── LoginLayout/
│           └── index.tsx
├── contexts/
│   ├── AuthContext.tsx
│   ├── TicketContext.tsx
│   └── UIContext.tsx
├── hooks/
│   └── useSocket.ts
├── pages/
│   ├── CreateTicketPage.tsx
│   ├── LoginPage.tsx
│   ├── TicketDetailPage.tsx
│   └── TicketsListPage.tsx
├── services/
│   ├── api.ts
│   ├── auth.ts
│   └── tickets.ts
├── types/
└── utils/
```

This structure ensures a clean separation of concerns, making the codebase maintainable and scalable.

## License

MIT
