import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/database.js';
import { config } from '../config/index.js';
import { AppError } from '../middleware/errorHandler.js';

interface CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  height?: number;
  weight?: number;
  activityLevel?:
    | 'SEDENTARY'
    | 'LIGHTLY_ACTIVE'
    | 'MODERATELY_ACTIVE'
    | 'VERY_ACTIVE'
    | 'EXTREMELY_ACTIVE';
}

interface LoginDto {
  email: string;
  password: string;
}

interface AuthResponse {
  user: any;
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  async register(userData: CreateUserDto): Promise<AuthResponse> {
    const { email, password, ...rest } = userData;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new AppError('User already exists', 409);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, config.bcryptRounds);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        ...rest,
      },
      include: {
        preferences: true,
      },
    });

    // Generate tokens
    const { accessToken, refreshToken } = this.generateTokens(user.id, user.email, user.role);

    // Save refresh token
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  }

  async login(loginData: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginData;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        preferences: true,
      },
    });

    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new AppError('Invalid credentials', 401);
    }

    // Generate tokens
    const { accessToken, refreshToken } = this.generateTokens(user.id, user.email, user.role);

    // Save refresh token
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    // Find refresh token
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      throw new AppError('Invalid refresh token', 401);
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { id: storedToken.userId },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Generate new access token
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      config.jwt.secret as string,
      { expiresIn: config.jwt.expiresIn }
    );

    return { accessToken };
  }

  async logout(refreshToken: string): Promise<void> {
    try {
      await prisma.refreshToken.delete({
        where: { token: refreshToken },
      });
    } catch (error) {
      // Token might not exist, which is fine for logout
    }
  }

  async forgotPassword(email: string): Promise<void> {
    // Implementation for password reset email
    // This would typically send an email with a reset token
    throw new AppError('Not implemented yet', 501);
  }

  async resetPassword(token: string, password: string): Promise<void> {
    // Implementation for password reset
    throw new AppError('Not implemented yet', 501);
  }

  async verifyEmail(token: string): Promise<void> {
    // Implementation for email verification
    throw new AppError('Not implemented yet', 501);
  }

  async resendVerification(email: string): Promise<void> {
    // Implementation for resending verification email
    throw new AppError('Not implemented yet', 501);
  }

  private generateTokens(userId: string, email: string, role: string) {
    const payload = { id: userId, email, role };

    const accessToken = jwt.sign(payload, config.jwt.secret as string, {
      expiresIn: config.jwt.expiresIn,
    });

    const refreshToken = jwt.sign(payload, config.jwt.refreshSecret as string, {
      expiresIn: config.jwt.refreshExpiresIn,
    });

    return { accessToken, refreshToken };
  }
}
