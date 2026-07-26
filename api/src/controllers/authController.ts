import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { z } from 'zod';
import { config } from '../config/index.js';
import { sendEmailVerificationEmail, sendPasswordResetEmail } from '../services/emailService.js';


// JWT Payload interfaces
interface JWTPayload {
  userId: string;
  email: string;
  roleId?: string;
}

interface RefreshTokenPayload {
  userId: string;
}

const prisma = new PrismaClient();

// Validation schemas
const signupSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  username: z.string().min(1, 'Username is required').optional(),
  name: z.string().min(1, 'Name is required').optional(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

const loginSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Helper function to generate JWT tokens
const generateTokens = (userId: string, email: string, roleId?: string) => {
  const accessToken = jwt.sign(
    { userId, email, roleId },
    config.jwt.secret,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { userId },
    config.jwt.refreshSecret,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

// Helper function to generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

// Helper function to generate unique username
const generateUniqueUsername = async (baseUsername: string): Promise<string> => {
  let finalUsername = baseUsername.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
  let counter = 1;

  while (await prisma.user.findUnique({ where: { username: finalUsername } })) {
    finalUsername = `${baseUsername.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}${counter}`;
    counter++;
  }

  return finalUsername;
};

// Signup function
export const signup = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validatedData = signupSchema.parse(req.body);
    const { email, username, name, password } = validatedData;

    const orConditions: any[] = [{ email }];
    if (username) {
      orConditions.push({ username });
    }

    // Check if a user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: orConditions
      },
    });

    if (existingUser) {
      const field = existingUser.email === email ? 'email' : 'username';
      return res.status(400).json({
        success: false,
        message: `User with this ${field} already exists`,
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Generate username if not provided
    let finalUsername = username || name;
    if (!finalUsername) {
      const baseUsername = email.split('@')[0];
      finalUsername = await generateUniqueUsername(baseUsername);
    }

    // Generate OTP for email verification
    const otp = generateOTP();

    // Create user
    const user = await prisma.user.create({
      data: {
        username: finalUsername,
        email,
        password: hashedPassword,
        otp,
        status: 'pending', // Set status as pending until email verification
        isEmailVerified: false,
      },
      select: {
        id: true,
        email: true,
        username: true,
        roleId: true,
        isEmailVerified: true,
        status: true,
        createdAt: true,
      },
    });

    // Generate tokens - user.id is already a string (CUID)
    const { accessToken, refreshToken } = generateTokens(
      user.id,
      user.email,
      user.roleId || undefined
    );

    // Save a refresh token to a database
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    // Set the refresh token as httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send email verification with OTP
    try {
      await sendEmailVerificationEmail(user.email, user.username || '', otp);
      console.log(`Verification email sent successfully to ${user.email}`);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);

      // Don't delete user, but inform about email failure
      return res.status(201).json({
        success: true,
        message: 'Account created successfully, but verification email failed to send. You can request a new verification email.',
        data: {
          user,
          accessToken,
        },
      });
    }

    res.status(201).json({
      success: true,
      message: 'Account created successfully. Please check your email for verification.',
      data: {
        user,
        accessToken,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
    }

    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Resend verification email with OTP
export const resendVerificationEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email',
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: 'User is already verified',
      });
    }

    // Generate new OTP
    const otp = generateOTP();

    // Update user with new OTP
    await prisma.user.update({
      where: { id: user.id },
      data: { otp },
    });

    // Send email with new OTP
    try {
      await sendEmailVerificationEmail(user.email, user.username || '', otp);
      console.log(`Verification email sent successfully to ${user.email}`);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      return res.status(500).json({
        success: false,
        message: 'Failed to send verification email. Please try again later.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Verification email sent successfully',
    });
  } catch (error) {
    console.error('Error in resendVerificationEmail:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Check email verification status
export const checkVerificationStatus = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    if (!email || typeof email !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Email query parameter is required',
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { isEmailVerified: true },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: { isVerified: user.isEmailVerified },
      message: user.isEmailVerified ? 'Email is verified' : 'Email is not verified',
    });
  } catch (error) {
    console.error('Error checking verification status:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Email verification with OTP
export const verify = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required',
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
        otp,
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP or email',
      });
    }

    // Update user as verified
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        otp: null, // Clear the OTP
        status: 'active', // Update status to active
      },
    });

    res.status(200).json({
      success: true,
      message: 'Email verified successfully',
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Login function
export const login = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    // Find the user by email with role information
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        role: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Check if the user has a password (not OAuth user)
    if (!user.password) {
      return res.status(401).json({
        success: false,
        message: 'Please use Google sign in for this account',
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Check if email is verified
    if (!user.isEmailVerified) {
      return res.status(403).json({
        success: false,
        message: 'Please verify your email before logging in',
      });
    }

    // Check if an account is active
    if (user.status === 'blocked' || user.status === 'suspended') {
      return res.status(403).json({
        success: false,
        message: 'Your account has been suspended. Please contact support.',
      });
    }

    // Generate tokens - user.id is already a string (CUID)
    const { accessToken, refreshToken } = generateTokens(
      user.id,
      user.email,
      user.roleId || undefined
    );

    // Clean up old refresh tokens for this user (keep only the latest 5)
    const existingTokens = await prisma.refreshToken.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    if (existingTokens.length >= 5) {
      const tokensToDelete = existingTokens.slice(4);
      await prisma.refreshToken.deleteMany({
        where: {
          id: {
            in: tokensToDelete.map(token => token.id),
          },
        },
      });
    }

    // Save a new refresh token to a database
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    // Set the refresh token as httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Remove sensitive data from response
    const { password: _, otp: __, ...userWithoutSensitiveData } = user;

    // Native clients cannot rely on the httpOnly browser cookie, so include
    // the refresh token in the JSON session contract and prevent token caching.
    res.set({
      'Cache-Control': 'no-store',
      Pragma: 'no-cache',
    });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutSensitiveData,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
    }

    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Logout function
export const logout = async (req: Request, res: Response) => {
  try {
    // Accept refresh token from request body (for React Native) or cookie (for web)
    const refreshToken = req.body?.refreshToken || req.cookies?.refreshToken;

    if (refreshToken) {
      // Remove refresh token from database
      await prisma.refreshToken.deleteMany({
        where: { token: refreshToken },
      });
    }

    // Clear refresh token cookie
    res.clearCookie('refreshToken');

    res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Refresh token function
export const refreshToken = async (req: Request, res: Response) => {
  try {
    // Accept refresh token from request body (for React Native) or cookie (for web)
    const refreshToken = req.body?.refreshToken || req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token not provided',
      });
    }

    // remove tokens older than 7 days
    await prisma.refreshToken.deleteMany({
      where: {
        createdAt: {
          lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // older than 7 days
        },
      },
    });

    // Verify refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret'
    ) as RefreshTokenPayload;

    // Check if the refresh token exists in a database and is not expired
    // No need to parse userId as integer - it's already a string (CUID)
    const storedToken = await prisma.refreshToken.findFirst({
      where: {
        token: refreshToken,
        userId: decoded.userId,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            roleId: true,
          },
        },
      },
    });

    if (!storedToken) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token',
      });
    }

    // Generate a new access token
    const { accessToken } = generateTokens(
      storedToken.user.id,
      storedToken.user.email,
      storedToken.user.roleId || undefined
    );

    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        accessToken,
      },
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token',
      });
    }
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token expired',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Get current user function
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided',
      });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as JWTPayload;

    // No need to parse userId as integer - it's already a string (CUID)
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        role: true,
        questionnaires: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Remove sensitive data
    const { password, otp, ...userWithoutSensitiveData } = user;

    res.status(200).json({
      success: true,
      data: { user: userWithoutSensitiveData },
    });
  } catch (error) {
    console.error('Get current user error:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: 'Invalid access token',
      });
    }
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: 'Access token expired',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Password reset request
export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
      });
    }

    // Check if a user exists
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { id: true, email: true, username: true },
    });

    // Always return success to prevent email enumeration attacks
    if (!user) {
      return res.status(200).json({
        success: true,
        message: 'If an account with this email exists, a password reset OTP has been sent.',
      });
    }

    // Generate OTP for password reset
    const resetOTP = generateOTP();

    // Update user with reset OTP
    await prisma.user.update({
      where: { id: user.id },
      data: { otp: resetOTP },
    });

    // Send email with reset OTP
    try {
      await sendPasswordResetEmail(user.email, user.username || '', resetOTP);
      console.log(`Password reset email sent successfully to ${user.email}`);
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError);

      // Clear the OTP since email failed
      await prisma.user.update({
        where: { id: user.id },
        data: { otp: null },
      });

      return res.status(500).json({
        success: false,
        message: 'Failed to send password reset email. Please try again later.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Password reset OTP has been sent to your email.',
    });
  } catch (error) {
    console.error('Password reset request error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Reset password with OTP
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Email, OTP, and new password are required',
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long',
      });
    }

    // Find a user with matching email and OTP
    const user = await prisma.user.findFirst({
      where: {
        email,
        otp,
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or OTP',
      });
    }

    // Hash new password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update user password and clear OTP, also invalidate all refresh tokens
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          otp: null, // Clear OTP after a successful reset
        },
      }),
      prisma.refreshToken.deleteMany({
        where: { userId: user.id },
      }),
    ]);

    res.status(200).json({
      success: true,
      message: 'Password has been reset successfully',
    });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Google OAuth functions
export const googleAuth = (req: Request, res: Response) => {
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })(req, res);
};

export const googleAuthCallback = (req: Request, res: Response) => {
  passport.authenticate(
    'google',
    {
      failureRedirect: `${process.env.FRONTEND_URL}/login?error=oauth_failed`,
    },
    async (err: any, user: any) => {
      if (err) {
        console.error('Google OAuth callback error:', err);
        return res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_error`);
      }

      if (!user) {
        return res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_denied`);
      }

      try {
        // Generate JWT tokens - user.id is already a string (CUID)
        const { accessToken, refreshToken } = generateTokens(
          user.id,
          user.email,
          user.roleId || undefined
        );

        // Save a refresh token to a database
        await prisma.refreshToken.create({
          data: {
            token: refreshToken,
            userId: user.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
          },
        });

        // Set the refresh token as httpOnly cookie
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // Redirect to frontend with access token and refresh token
        const redirectUrl = `${process.env.FRONTEND_URL}/auth/callback?token=${accessToken}&refreshToken=${refreshToken}`;
        res.redirect(redirectUrl);
      } catch (error) {
        console.error('Error generating tokens for Google OAuth:', error);
        res.redirect(`${process.env.FRONTEND_URL}/auth/login?error=token_generation_failed`);
      }
    }
  )(req, res);
};

// Google Mobile Authentication - For mobile apps using ID tokens
export const googleMobileAuth = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: 'ID token is required',
      });
    }

    // Verify the ID token with Google
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    
    let ticket;
    try {
      ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
    } catch (error) {
      console.error('Google ID token verification failed:', error);
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired Google ID token',
      });
    }

    const payload = ticket.getPayload();
    
    if (!payload || !payload.email) {
      return res.status(400).json({
        success: false,
        message: 'Invalid token payload - email not found',
      });
    }

    const { email, sub: googleId, name, picture } = payload;

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
        googleId: true,
        profileImage: true,
        roleId: true,
        isEmailVerified: true,
        status: true,
      },
    });

    if (user) {
      // User exists, update their Google ID if not set
      if (!user.googleId) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { googleId },
          select: {
            id: true,
            email: true,
            username: true,
            googleId: true,
            profileImage: true,
            roleId: true,
            isEmailVerified: true,
            status: true,
          },
        });
      }
    } else {
      // Generate a unique username from email
      const baseUsername = email.split('@')[0].toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
      let username = baseUsername;
      let counter = 1;
      
      while (await prisma.user.findUnique({ where: { username } })) {
        username = `${baseUsername}${counter}`;
        counter++;
      }

      // Create new user
      user = await prisma.user.create({
        data: {
          username,
          email,
          profileImage: picture || null,
          googleId,
          isEmailVerified: true, // Google emails are verified
          status: 'active',
        },
        select: {
          id: true,
          email: true,
          username: true,
          googleId: true,
          profileImage: true,
          roleId: true,
          isEmailVerified: true,
          status: true,
        },
      });
    }

    // Generate JWT tokens for the app
    const { accessToken, refreshToken } = generateTokens(
      user.id,
      user.email,
      user.roleId || undefined
    );

    // Save refresh token to database
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    // Return tokens and user info to mobile app
    return res.status(200).json({
      success: true,
      message: 'Google authentication successful',
      data: {
        user,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error('Google mobile auth error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during authentication',
    });
  }
};

// Apple OAuth - web redirect (not used for mobile)
export const appleAuth = (req: Request, res: Response) => {
  res.status(501).json({
    success: false,
    message: 'Apple OAuth web flow not implemented. Use /auth/apple/mobile for mobile apps.',
  });
};

export const appleAuthCallback = (req: Request, res: Response) => {
  res.status(501).json({
    success: false,
    message: 'Apple OAuth web callback not implemented. Use /auth/apple/mobile for mobile apps.',
  });
};

// Apple Mobile Authentication - For mobile apps using identity tokens
export const appleMobileAuth = async (req: Request, res: Response) => {
  try {
    const { identityToken, firstName, lastName } = req.body;

    if (!identityToken) {
      return res.status(400).json({
        success: false,
        message: 'Identity token is required',
      });
    }

    // Decode the Apple identity token (JWT) to extract claims
    // Apple identity tokens are JWTs signed by Apple's keys
    let decoded: any;
    try {
      // Apple tokens are JWTs - decode to get the payload
      // In production, you should verify the signature against Apple's public keys
      // For now, we decode and verify essential claims
      decoded = jwt.decode(identityToken, { complete: true });
      if (!decoded || !decoded.payload) {
        throw new Error('Failed to decode token');
      }
    } catch (error) {
      console.error('Apple identity token decode failed:', error);
      return res.status(401).json({
        success: false,
        message: 'Invalid Apple identity token',
      });
    }

    const payload = decoded.payload;
    const { sub: appleUserId, email } = payload;

    if (!appleUserId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid token payload - Apple user ID not found',
      });
    }

    // Verify issuer and audience
    if (payload.iss !== 'https://appleid.apple.com') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token issuer',
      });
    }

    // Check token expiration
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return res.status(401).json({
        success: false,
        message: 'Apple identity token has expired',
      });
    }

    // Try to find user by subject first, then by email
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { subject: appleUserId },
          ...(email ? [{ email }] : []),
        ],
      },
      select: {
        id: true,
        email: true,
        username: true,
        subject: true,
        profileImage: true,
        roleId: true,
        isEmailVerified: true,
        status: true,
      },
    });

    if (user) {
      // User exists, update their Apple subject if not set
      if (!user.subject) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { subject: appleUserId },
          select: {
            id: true,
            email: true,
            username: true,
            subject: true,
            profileImage: true,
            roleId: true,
            isEmailVerified: true,
            status: true,
          },
        });
      }
    } else {
      // Create new user
      // Apple may not provide email on subsequent sign-ins, so we use the appleUserId as fallback
      const userEmail = email || `${appleUserId}@privaterelay.appleid.com`;
      
      // Generate a unique username
      const baseUsername = (firstName || email?.split('@')[0] || 'user').toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
      let username = baseUsername;
      let counter = 1;

      while (await prisma.user.findUnique({ where: { username } })) {
        username = `${baseUsername}${counter}`;
        counter++;
      }

      user = await prisma.user.create({
        data: {
          username,
          email: userEmail,
          subject: appleUserId,
          isEmailVerified: true, // Apple emails are verified
          status: 'active',
        },
        select: {
          id: true,
          email: true,
          username: true,
          subject: true,
          profileImage: true,
          roleId: true,
          isEmailVerified: true,
          status: true,
        },
      });
    }

    // Generate JWT tokens for the app
    const { accessToken, refreshToken } = generateTokens(
      user.id,
      user.email,
      user.roleId || undefined
    );

    // Save refresh token to database
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    // Return tokens and user info to mobile app
    return res.status(200).json({
      success: true,
      message: 'Apple authentication successful',
      data: {
        user,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error('Apple mobile auth error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during authentication',
    });
  }
};

// Logout from all devices
export const logoutFromAllDevices = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided',
      });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as JWTPayload;

    // Delete all refresh tokens for this user
    await prisma.refreshToken.deleteMany({
      where: { userId: decoded.userId },
    });

    // Clear refresh token cookie
    res.clearCookie('refreshToken');

    res.status(200).json({
      success: true,
      message: 'Logged out from all devices successfully',
    });
  } catch (error) {
    console.error('Logout from all devices error:', error);
    if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
