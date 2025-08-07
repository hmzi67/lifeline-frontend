import express from 'express';
import 'express-async-errors';
import session from 'express-session';
import passport from './config/passport.js';
import {
  errorHandler,
  requestLogger,
  rateLimiter,
  cors,
  helmet,
  compression,
  notFound,
  timeout,
} from './middleware/index.js';
import authRoute from './routes/authRoute.js';
import { healthCheck } from './config/database.js';
import userRoute from './routes/userRoutes.js';

const app = express();

// Security middlewares (should be first)
app.use(helmet);
app.use(cors);

// Request processing middlewares
app.use(compression);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Session middleware for Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'fallback-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Logging middleware
app.use(requestLogger);

// Rate limiting
app.use(rateLimiter);

// Request timeout
app.use(timeout(30000)); // 30-second timeout

// Health check route (should be before authentication)
app.get('/health', healthCheck);

// route for authentication
app.use('/api/auth/', authRoute);

// User routes
app.use('/api/user/', userRoute);

// Example protected route
// app.get('/api/protected', authenticate, (req, res) => {
//     res.json({ message: 'This is a protected route', user: req });
// });

// Example role-based route
// app.get('/api/admin', authenticate, authorize(['admin']), (req, res) => {
//     res.json({ message: 'Admin only content' });
// });

// Handler 404 (should be after all routes)
app.use(notFound);

// Error handling middleware (should be last)
app.use(errorHandler);

export default app;
