import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService.js';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
}

interface CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  height?: number;
  weight?: number;
  activityLevel?: string;
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

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const result = await this.authService.register(userData);

      const response: ApiResponse<AuthResponse> = {
        success: true,
        data: result,
        message: 'User registered successfully',
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const loginData: LoginDto = req.body;
      const result = await this.authService.login(loginData);

      const response: ApiResponse<AuthResponse> = {
        success: true,
        data: result,
        message: 'Login successful',
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { refreshToken } = req.body;
      const result = await this.authService.refreshToken(refreshToken);

      const response: ApiResponse<{ accessToken: string }> = {
        success: true,
        data: result,
        message: 'Token refreshed successfully',
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { refreshToken } = req.body;
      await this.authService.logout(refreshToken);

      const response: ApiResponse = {
        success: true,
        message: 'Logout successful',
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email } = req.body;
      await this.authService.forgotPassword(email);

      const response: ApiResponse = {
        success: true,
        message: 'Password reset email sent',
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { token, password } = req.body;
      await this.authService.resetPassword(token, password);

      const response: ApiResponse = {
        success: true,
        message: 'Password reset successful',
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  verifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { token } = req.body;
      await this.authService.verifyEmail(token);

      const response: ApiResponse = {
        success: true,
        message: 'Email verified successfully',
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  resendVerification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email } = req.body;
      await this.authService.resendVerification(email);

      const response: ApiResponse = {
        success: true,
        message: 'Verification email sent',
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
