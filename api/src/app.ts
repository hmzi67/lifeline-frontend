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
import paymentRoutes from './routes/paymentRoutes.js';
import dietPlanRoutes from './routes/dietPlanRoutes.js';
import userDietPlanRoutes from './routes/userDietPlanRoutes.js';
import exerciseRoutes from './routes/exerciseRoutes.js';
import userExerciseRoutes from './routes/userExerciseRoutes.js';
import challengeRoutes from './routes/challengeRoutes.js';
import challengeExerciseRouter from './routes/challengeExerciseRoutes.js';
import fastingRoutes from './routes/fastingLogRoutes.js';
import sleepRoutes from './routes/sleepLogRoutes.js';
import sleepStoryRoutes from './routes/sleepStoryRoutes.js';
import sleepSoundRoutes from './routes/sleepSoundRoutes.js';
import waterIntakeRoutes from './routes/waterIntakeRoutes.js';
import medicationRoutes from './routes/medicationRoutes.js';
import meditationRoutes from './routes/meditationRoutes.js';
import userDailyRoutes from './routes/userDailyRoutineRoutes.js';
import appSetttingsRoutes from './routes/appSettingRoutes.js';
import blogsRoutes from './routes/blogRoutes.js';
import mealTypeRoutes from './routes/mealTypeRoutes.js';
import dietPlanDayRoutes from './routes/dietPlanDayRoutes.js';
import dietPlanMealRoutes from './routes/dietPlanMealRoutes.js';
import exercisePlanRoutes from './routes/exercisePlanRoutes.js';
import exercisePlanWeekRoutes from './routes/exercisePlanWeekRoutes.js';
import exercisePlanScheduleRoutes from './routes/exercisePlanScheduleRoutes.js';
import exerciseDetailRoutes from './routes/exerciseDetailRoutes.js';
import userActiveDietPlanRoutes from './routes/userActiveDietPlanRoutes.js';
import userActiveExercisePlanRoutes from './routes/userActiveExercisePlanRoutes.js';
import meditationSessionRoutes from './routes/meditationSessionRoutes.js';
import userFavoriteMeditationRoutes from './routes/userFavoriteMeditationRoutes.js';
import userWaterGoalRoutes from './routes/userWaterGoalRoutes.js';
import medicationReminderRoutes from './routes/medicationReminderRoutes.js';
import cheatDayRoutes from './routes/cheatDayRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import couponRoutes from './routes/couponRoutes.js';
import referralRoutes from './routes/referralRoutes.js';

const app = express();

app.use(cors);
app.set('trust proxy', 1);
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

// payment routes (Stripe)
app.use('/api/payments', paymentRoutes);

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
app.use('/api/sleep-stories', sleepStoryRoutes);
app.use('/api/sleep-sounds', sleepSoundRoutes);

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

// adding blogs routes
app.use('/api/blogs', blogsRoutes);

// Diet plan structure routes
app.use('/api/meal-types', mealTypeRoutes);
app.use('/api/diet-plan-days', dietPlanDayRoutes);
app.use('/api/diet-plan-meals', dietPlanMealRoutes);

// Exercise plan structure routes
app.use('/api/exercise-plans', exercisePlanRoutes);
app.use('/api/exercise-plan-weeks', exercisePlanWeekRoutes);
app.use('/api/exercise-plan-schedules', exercisePlanScheduleRoutes);
app.use('/api/exercise-details', exerciseDetailRoutes);

// Active plan routes
app.use('/api/active-diet-plans', userActiveDietPlanRoutes);
app.use('/api/active-exercise-plans', userActiveExercisePlanRoutes);

// Meditation session routes
app.use('/api/meditation-sessions', meditationSessionRoutes);
app.use('/api/favorite-meditations', userFavoriteMeditationRoutes);

// Water goal routes
app.use('/api/water-goals', userWaterGoalRoutes);

// Medication reminder routes
app.use('/api/medication-reminders', medicationReminderRoutes);

// Cheat day routes
app.use('/api/cheat-days', cheatDayRoutes);

// Role routes
app.use('/api/roles', roleRoutes);

// Progress / Stats routes (aggregation endpoints)
app.use('/api/progress', progressRoutes);

// Coupon routes (admin CRUD + user validate)
app.use('/api/coupons', couponRoutes);

// Referral code routes (admin CRUD + user validate)
app.use('/api/referral-codes', referralRoutes);

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
