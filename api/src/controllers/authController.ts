import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import crypto from 'crypto';
import { sendEmailVerificationEmail, sendPasswordResetEmail } from '@services/emailService';

const prisma = new PrismaClient();

// Validation schemas
const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please provide a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

const loginSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Helper function to generate JWT tokens
const generateTokens = (userId: string, email: string, role: string) => {
  const accessToken = jwt.sign(
    { userId, email, role },
    process.env.JWT_SECRET || 'fallback-secret',
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret',
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

// Signup function
export const signup = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validatedData = signupSchema.parse(req.body);
    const { name, email, password } = validatedData;

    // Check if a user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists',
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Split the name into firstName and lastName (assuming single space)
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    // Generate a unique username from email (take part before @)
    const baseUsername = email.split('@')[0].toLowerCase();

    // Check if a username already exists and create a unique one
    let username = baseUsername;
    let counter = 1;
    while (await prisma.user.findUnique({ where: { username } })) {
      username = `${baseUsername}${counter}`;
      counter++;
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        preferences: {
          create: {
            // Create default preferences
          },
        },
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isEmailVerified: true,
        createdAt: true,
      },
    });

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id, user.email, user.role);

    // Save refresh token to database
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

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Save reset token to database
    await prisma.emailVerification.create({
      data: {
        email: user.email,
        token: resetToken,
        expiresAt: resetTokenExpiry,
      },
    });

    // Send email with a reset link
    try {
      const resetUrl = `${process.env.FRONTEND_URL}/verify?token=${resetToken}`;
      await sendEmailVerificationEmail(user.email, user.firstName, resetUrl)

      console.log(`Verification email sent successfully to ${user.email}`);
    } catch (emailError) {
      console.error('Failed to send verififaction email:', emailError);

      // Clean up the token since email failed
      await prisma.emailVerification.delete({
        where: {
          token: resetToken,
        },
      });

      return res.status(500).json({
        success: false,
        message: 'Failed to send verification email. Please try again later.',
      });
    }

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
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

// Login function
export const login = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true,
        role: true,
        isEmailVerified: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
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

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id, user.email, user.role);

    // Clean up old refresh tokens for this user (optional - keep only the latest 5)
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

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
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
    const refreshToken = req.cookies.refreshToken;

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
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token not provided',
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret'
    ) as { userId: string };

    // Check if refresh token exists in a database and is not expired
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
            role: true,
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
      storedToken.user.role
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
    res.status(401).json({
      success: false,
      message: 'Invalid refresh token',
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as {
      userId: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isEmailVerified: true,
        profileImage: true,
        dateOfBirth: true,
        gender: true,
        height: true,
        weight: true,
        activityLevel: true,
        createdAt: true,
        updatedAt: true,
        preferences: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }
};

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
      select: { id: true, email: true, firstName: true },
    });

    // Always return success to prevent email enumeration attacks
    if (!user) {
      return res.status(200).json({
        success: true,
        message: 'No User Found',//'If an account with this email exists, a password reset link has been sent.',
      });
    }

    // Check for existing reset tokens and clean up expired ones
    await prisma.passwordReset.deleteMany({
      where: {
        email: user.email,
        expiresAt: {
          lt: new Date(),
        },
      },
    });

    // Check if there's a recent reset request (prevent spam)
    const recentReset = await prisma.passwordReset.findFirst({
      where: {
        email: user.email,
        createdAt: {
          gt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        },
      },
    });

    if (recentReset) {
      return res.status(200).json({
        success: true,
        message: 'If an account with this email exists, a password reset link has been sent.',
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Save reset token to database
    await prisma.passwordReset.create({
      data: {
        email: user.email,
        token: resetToken,
        expiresAt: resetTokenExpiry,
      },
    });

    // Send email with a reset link
    try {
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
      await sendPasswordResetEmail(user.email, user.firstName, resetUrl);

      console.log(`Password reset email sent successfully to ${user.email}`);
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError);

      // Clean up the token since email failed
      await prisma.passwordReset.delete({
        where: {
          token: resetToken,
        },
      });

      return res.status(500).json({
        success: false,
        message: 'Failed to send password reset email. Please try again later.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'If an account with this email exists, a password reset link has been sent.',
    });
  } catch (error) {
    console.error('Password reset request error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Reset password
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Token and new password are required',
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long',
      });
    }

    // Find valid reset token
    const resetRecord = await prisma.passwordReset.findFirst({
      where: {
        token,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!resetRecord) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token',
      });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: resetRecord.email },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Hash new password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update user password and delete reset token
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      }),
      prisma.passwordReset.delete({
        where: { id: resetRecord.id },
      }),
      // Also invalidate all refresh tokens for security
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

// Google and Apple auth functions
export const googleAuth = () => {};
export const googleAuthCallback = () => {};
export const appleAuth = () => {};
export const appleAuthCallback = () => {};