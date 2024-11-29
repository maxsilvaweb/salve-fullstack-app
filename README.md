# Salve Fullstack App by Max Silva

A full-stack application built with React Typescript utilising vite, GraphQL, Prisma ORM, PostgreSQL, and Docker.

I spent more than two hours on this projet but I felt necessary to showcase the full stack skills that Caroline,
kindly expressed in the interview. So I created a fullstack app with React Typescript, GraphQL, Prisma ORM, PostgreSQL,
and containerization with Docker for the backend. The frontend was built with Vite and TailwindCSS for styling, and
Cypress was used for testing and jest for unit testing. I was going to add authentication at the start and maybe going overkill by using NextJS and NextAuth but I opted to keep it simple and light for this project. I am aware that there are a few typescript errors, but I ran out of time to fix them.

- To improve the project:-
  - I would have used a monorepo setup and would have used a CI/CD pipeline for continuous integration and continuous delivery to deploy the app to the cloud.
  - I would create a login interface so a patient can login and see their data. I would use useContext to manage global state as its light weight.
  - I would fix the typescript errors.
  - Improve the UI/UX of the app.
  - I would do more unit testing for the app.
  - Add storybook to the app.
  - Add more features to the app.
  - Use terraform to deploy the app to the cloud.
  - Create a tailwind theme for the app theme eg.: {
    screens: {
    sm: '500px',
    md: '800px',
    lg: '1191px',
    xl: '1400px',
    xxl: '2800px',
    },
    extend: {
    colors: {
    primaryColor: 'var(--primaryColor)',
    secondaryColor: 'var(--secondaryColor)',
    },
    },
    },
  - Implement Sentry.io for error tracking.
  - Create a pagination component for when there are many patients.
  - Create a global Prisma client for the app.
  - Use git flow for version control maybe with github actions for CI/CD.
  - Create .env.local, env.development and env.production files for the app.

## Requirements

- Docker and Docker Compose
- Node.js (v18 or later)
- bun or npm or yarn or pnpm

## Project Structure

```
salve-fullstack-app/
├── client/          # React frontend
├── server/          # Server backend
│   ├── prisma/      # Prisma schema and migrations
│   └── src/         # Server source code
└── docker-compose.yml
```

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd salve-fullstack-app
```

2. Install dependencies:

```bash
# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

3. Set up environment variables:

   - Provided in repo

   ```
   - The default configuration should work out of the box with Docker

   ```

4. Start the application:

```bash
# From the root directory
docker-compose build
docker-compose up
```

This will start:

- PostgreSQL database on port 5432
- GraphQL server on port 4000

## Database Setup and Seeding

1. Generate Prisma Client and push schema:

```bash
# From the server directory
npx prisma generate
npx prisma db push
```

2. Seed the database:

# Before seeding change this goes for any time you need to use prisma due to Dockerized environment.

Go to - prisma/schema.prisma and change line 7

```bash

url = env("DATABASE_URL") to ""postgresql://admin:password123@localhost:5432/health_clinic_db"
npx prisma generate
```

# From the server directory

npm run seed

# or using prisma directly

npx prisma db seed

````

# Once finished revert back line 7 to env("DATABASE_URL") for the app to work.

This will:

- Create necessary database tables
- Seed initial clinic data

## Available Scripts

In the server directory:

- `npm run dev`: Start the development server
- `npm run build`: Build the server
- `npm start`: Start the production server
- `npm run seed`: Seed the database

In the client directory:

- `npm start`: Start the development server
- `npm run build`: Build the client for production
- `npm test`: Run Jest tests
- `npm run cypress:open`: Open Cypress test runner
- `npm run lint`: Run linting

## GraphQL API

The GraphQL Sandbox API is available at `http://localhost:4000/graphql`. You can use this endpoint to:

- Query patients and clinics
- Create, update, and delete records - "would be done by writing a mutations"
- Manage authentication "was going to add this but ran out of time"

Example query:

```graphql
query {
  patients(page: 1, limit: 10) {
    patients {
      id
      firstName
      lastName
      clinic {
        name
      }
    }
    totalPages
  }
}
````

## Development

1. The server uses Prisma as ORM with PostgreSQL
2. Hot reloading is enabled for both client and server
3. Docker Compose manages the development environment

## Running Tests

### Jest

To run the Jest tests, execute the following command in the `client` directory:

```bash
npm run test
```

### Cypress

To open the Cypress test runner, use:

```bash
npm run cypress:open
```

To run Cypress tests in headless mode, use:

```bash
npm run cypress:run
```

## Troubleshooting

1. If you can't connect to the database:

   - Ensure Docker containers are running: `docker-compose ps`
   - Check logs: `docker-compose logs`
   - Verify database connection: `npx prisma db push`

2. If the GraphQL server isn't starting:
   - Check the logs: `docker-compose logs graphql-server`
   - Verify environment variables
   - Ensure database is healthy: `docker-compose ps`
