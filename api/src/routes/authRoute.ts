import { Router } from 'express';
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

// Authentication routes
authRoute.post('/login', login);
authRoute.post('/signup', signup);
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
