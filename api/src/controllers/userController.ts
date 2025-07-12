import { Response, NextFunction } from 'express';
import { UserService } from '../services/userService.js';

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
  body: any;
  file?: any;
}

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

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.id;
      const user = await this.userService.getUserById(userId);

      const response: ApiResponse = {
        success: true,
        data: user,
        message: 'Profile retrieved successfully',
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  updateProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.id;
      const updateData = req.body;
      const user = await this.userService.updateUser(userId, updateData);

      const response: ApiResponse = {
        success: true,
        data: user,
        message: 'Profile updated successfully',
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  deleteProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.id;
      await this.userService.deleteUser(userId);

      const response: ApiResponse = {
        success: true,
        message: 'Profile deleted successfully',
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  uploadAvatar = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.id;
      const file = req.file;

      if (!file) {
        res.status(400).json({
          success: false,
          error: { message: 'No file uploaded' },
        });
        return;
      }

      const user = await this.userService.updateAvatar(userId, file);

      const response: ApiResponse = {
        success: true,
        data: user,
        message: 'Avatar uploaded successfully',
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
