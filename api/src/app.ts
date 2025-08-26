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
import questionnaireRoutes from './routes/questionnaireRoutes.js';
import subscriptionPaymentRoutes from './routes/subscriptionPaymentRoutes.js';
import dietPlanRoutes from './routes/dietPlanRoutes.js';
import userDietPlanRoutes from './routes/userDietPlanRoutes.js';
import exerciseRoutes from './routes/exerciseRoutes.js';
import userExerciseRoutes from './routes/userExerciseRoutes.js';
import challengeRoutes from './routes/challengeRoutes.js';
import challengeExerciseRouter from './routes/challengeExerciseRoutes.js';
import fastingRoutes from './routes/fastingLogRoutes.js';
import sleepRoutes from './routes/sleepLogRoutes.js';
import waterIntakeRoutes from './routes/waterIntakeRoutes.js';
import medicationRoutes from './routes/medicationRoutes.js';
import meditationRoutes from './routes/meditationRoutes.js';
import userDailyRoutes from './routes/userDailyRoutineRoutes.js';
import appSetttingsRoutes from './routes/appSettingRoutes.js';

const app = express();

app.use(cors);

// Security middlewares (should be first)
app.use(helmet);

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

// questionnaire route
app.use('/api/questionnaire', questionnaireRoutes);

// subscription payment routes
app.use('/api/subscription-payments', subscriptionPaymentRoutes);

// diet plan routes
app.use('/api/diet-plans', dietPlanRoutes);
app.use('/api/user-diet-plans', userDietPlanRoutes);

// Exercise routes
app.use('/api/exercises', exerciseRoutes);
app.use('/api/user-exercises', userExerciseRoutes);

// Challenge routes
app.use('/api/challenges', challengeRoutes);
app.use('/api/challenge-exercises', challengeExerciseRouter); // exercises for a challenge to user

// fasting routes
app.use('/api/fasting-logs', fastingRoutes);

// sleeping routes
app.use('/api/sleep-logs', sleepRoutes);

// Water intake routes
app.use('/api/water-intake', waterIntakeRoutes);

// Medication routes
app.use('/api/medications', medicationRoutes);

// Meditation routes
app.use('/api/meditations', meditationRoutes);

// app settings routes
app.use('/api/app-settings', appSetttingsRoutes);

// user daily routines routes
app.use('/api/user-daily-routines', userDailyRoutes);

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
