import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import {
    appleAuth,
    appleAuthCallback,
    appleMobileAuth,
    checkVerificationStatus,
    getCurrentUser,
    googleAuth,
    googleAuthCallback,
    googleMobileAuth,
    login,
    logout,
    refreshToken,
    requestPasswordReset,
    resendVerificationEmail,
    resetPassword,
    signup,
    verify,
} from '../controllers/authController.js';

const authRoute = Router();

// Stricter rate limit for auth endpoints (5 attempts per 15 minutes)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        success: false,
        message: 'Too many authentication attempts, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Authentication routes
authRoute.post('/login', authLimiter, login);
authRoute.post('/signup', authLimiter, signup);
authRoute.post('/logout', logout);
authRoute.post('/refresh-token', refreshToken);
authRoute.get('/me', getCurrentUser);

// Password reset routes
authRoute.post('/request-password-reset', requestPasswordReset);
authRoute.post('/reset-password', resetPassword);

// Verification route
authRoute.post('/resend-verification', resendVerificationEmail)
authRoute.post('/verify', verify)
authRoute.get('/check-verification', checkVerificationStatus)

// OAuth routes
authRoute.get('/google', googleAuth);
authRoute.get('/google/callback', googleAuthCallback);
authRoute.post('/google/mobile', googleMobileAuth); // Mobile Google authentication
authRoute.get('/apple', appleAuth);
authRoute.post('/apple/callback', appleAuthCallback);
authRoute.post('/apple/mobile', appleMobileAuth); // Mobile Apple authentication

export default authRoute;
