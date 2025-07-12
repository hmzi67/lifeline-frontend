import { prisma } from '../config/database.js';
import { AppError } from '../middleware/errorHandler.js';

interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
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
  preferences?: any;
}

export class UserService {
  async getUserById(userId: string): Promise<any> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        preferences: true,
      },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateUser(userId: string, updateData: UpdateUserDto): Promise<any> {
    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      include: {
        preferences: true,
      },
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async deleteUser(userId: string): Promise<void> {
    await prisma.user.delete({
      where: { id: userId },
    });
  }

  async updateAvatar(userId: string, file: any): Promise<any> {
    // In a real implementation, you would:
    // 1. Process the image (resize, compress)
    // 2. Upload to cloud storage (AWS S3, Cloudinary, etc.)
    // 3. Save the URL to the database

    const profileImageUrl = `/uploads/avatars/${file.filename}`;

    const user = await prisma.user.update({
      where: { id: userId },
      data: { profileImage: profileImageUrl },
      include: {
        preferences: true,
      },
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
