# Lifeline API

A production-ready Express.js API for the Lifeline Health & Wellness platform.

## Features

- **Authentication & Authorization**: JWT-based auth with refresh tokens
- **Database**: PostgreSQL with Prisma ORM
- **Validation**: Request validation with express-validator
- **Security**: Helmet, CORS, rate limiting
- **Logging**: Winston logger with file and console output
- **File Upload**: Multer for image uploads
- **Error Handling**: Centralized error handling
- **Health Checks**: Database and service health endpoints
- **TypeScript**: Full TypeScript support with strict types

## Getting Started

### Prerequisites

- Node.js 18+
- A managed PostgreSQL database, such as Neon, Supabase, Railway, or AWS RDS
- Redis (optional, for caching)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Point `DATABASE_URL` at your cloud PostgreSQL instance.

For Neon, use the pooled connection string from the dashboard and keep `sslmode=require` enabled.

4. Set up the database:

```bash
# Generate Prisma client
npm run generate

# Apply database migrations to the cloud database
npm run migrate:deploy
```

5. Start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/verify-email` - Verify email address
- `POST /api/auth/resend-verification` - Resend verification email

### Users

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `DELETE /api/users/profile` - Delete user account
- `POST /api/users/upload-avatar` - Upload profile image

### Health

- `GET /api/health` - Service health check
- `GET /api/health/database` - Database health check

## Environment Variables

See `.env.example` for all available environment variables.

For production, set the same variables in your deployment platform and use a managed PostgreSQL connection string for `DATABASE_URL`.

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run migrate` - Run database migrations
- `npm run generate` - Generate Prisma client
- `npm run studio` - Open Prisma Studio

## Project Structure

```
src/
├── config/           # Configuration files
├── controllers/      # Route controllers
├── middleware/       # Express middleware
├── routes/          # API routes
├── services/        # Business logic
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── validators/      # Request validation schemas
├── app.ts           # Express app setup
└── server.ts        # Server entry point
```

## License

MIT
