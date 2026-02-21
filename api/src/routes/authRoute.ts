import { Router } from 'express';
import {
  login,
  signup,
  logout,
  refreshToken,
  getCurrentUser,
  requestPasswordReset,
  resetPassword,
  googleAuth,
  googleAuthCallback,
  googleMobileAuth,
  appleAuth,
  appleAuthCallback, verify, resendVerificationEmail,
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

// OAuth routes
authRoute.get('/google', googleAuth);
authRoute.get('/google/callback', googleAuthCallback);
authRoute.post('/google/mobile', googleMobileAuth); // Mobile Google authentication
authRoute.get('/apple', appleAuth);
authRoute.post('/apple/callback', appleAuthCallback);

export default authRoute;
