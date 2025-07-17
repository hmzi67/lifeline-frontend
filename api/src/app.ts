import express from 'express';
import 'express-async-errors';
import {
    errorHandler,
    requestLogger,
    rateLimiter,
    cors,
    helmet,
    compression,
    notFound,
    timeout,
} from '@/middleware';
import authRoute from "@routes/authRoute";
import {healthCheck} from "@config/database";

const app = express();

// Security middlewares (should be first)
app.use(helmet);
app.use(cors);

// Request processing middlewares
app.use(compression);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use(requestLogger);

// Rate limiting
app.use(rateLimiter);

// Request timeout
app.use(timeout(30000)); // 30-second timeout

// Health check route (should be before authentication)
app.get('/health', healthCheck);

// route for authentication
app.use('/api/auth/', authRoute)

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