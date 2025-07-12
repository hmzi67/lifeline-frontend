# Lifeline Health & Wellness Platform

A comprehensive full-stack health and wellness platform built with React (frontend) and Express.js (backend).

## 🏗️ Project Structure

```
lifeline-frontend/
├── api/              # Express.js Backend API
│   ├── src/
│   │   ├── config/      # Configuration files
│   │   ├── controllers/ # Route controllers
│   │   ├── middleware/  # Express middleware
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic
│   │   ├── types/       # TypeScript types
│   │   ├── utils/       # Utility functions
│   │   └── validators/  # Request validation
│   ├── prisma/          # Database schema & migrations
│   └── package.json
├── client/           # React Frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   ├── types/       # TypeScript types
│   │   └── utils/       # Utility functions
│   └── package.json
└── package.json      # Root package.json
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd lifeline-frontend
   ```

2. **Install dependencies**

   ```bash
   npm run setup
   ```

3. **Set up environment variables**

   **Backend (.env in /api folder):**

   ```bash
   cd api
   cp .env.example .env
   # Edit .env with your database URL and other settings
   ```

   **Frontend (.env in /client folder):**

   ```bash
   cd client
   cp .env.example .env
   # Edit .env if needed (defaults should work for development)
   ```

4. **Set up the database**

   ```bash
   npm run setup:db
   ```

5. **Start development servers**

   ```bash
   npm run dev
   ```

   This will start:
   - Backend API on `http://localhost:3000`
   - Frontend on `http://localhost:5173`

## 🛠️ Available Scripts

### Root Level Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both projects for production
- `npm run test` - Run tests for both projects
- `npm run lint` - Lint both projects
- `npm run format` - Format code in both projects
- `npm run setup` - Install dependencies and set up database
- `npm run clean` - Clean build artifacts in both projects

### Backend Scripts (in /api folder)

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run migrate` - Run database migrations
- `npm run generate` - Generate Prisma client
- `npm run studio` - Open Prisma Studio

### Frontend Scripts (in /client folder)

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔧 Technology Stack

### Backend (API)

- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with refresh tokens
- **Validation**: express-validator + Zod
- **Security**: Helmet, CORS, rate limiting
- **Logging**: Winston
- **File Upload**: Multer

### Frontend (Client)

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Routing**: React Router
- **HTTP Client**: Axios
- **Icons**: Lucide React, React Icons

## 📱 Features

- **Authentication & Authorization**
  - User registration and login
  - JWT-based authentication
  - Email verification
  - Password reset

- **User Management**
  - User profiles with preferences
  - Avatar upload
  - Account settings

- **Health & Wellness**
  - Fitness tracking
  - Nutrition monitoring
  - Goal setting
  - Progress tracking

- **Admin Features**
  - User management
  - Content management
  - Analytics dashboard

## 🔒 Security Features

- Password hashing with bcrypt
- JWT tokens with refresh mechanism
- Rate limiting
- CORS protection
- Input validation and sanitization
- Security headers with Helmet

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run backend tests only
npm run test:api

# Run frontend tests only
npm run test:client
```

## 📦 Deployment

### Backend Deployment

1. Build the project:

   ```bash
   cd api && npm run build
   ```

2. Set production environment variables

3. Run database migrations:

   ```bash
   npm run migrate
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Deployment

1. Build the project:

   ```bash
   cd client && npm run build
   ```

2. Deploy the `dist` folder to your hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, please contact the development team or create an issue in the repository.
