import { PrismaClient } from '@prisma/client';
import { config } from './index.js';
import { logger } from '@utils/logger.js';

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

// Create Prisma client instance
export const prisma =
  globalThis.__prisma ??
  new PrismaClient({
    log: config.isDevelopment ? ['query', 'info', 'warn', 'error'] : ['error'],
  });

if (config.isDevelopment) {
  globalThis.__prisma = prisma;
}

// Database connection function
export const connectDatabase = async (): Promise<void> => {
  try {
    await prisma.$connect();
    logger.info('✅ Database connected successfully');
  } catch (error) {
    logger.error('❌ Database connection failed:', error);
    throw error;
  }
};

// Graceful disconnect
export const disconnectDatabase = async (): Promise<void> => {
  try {
    await prisma.$disconnect();
    logger.info('📴 Database disconnected successfully');
  } catch (error) {
    logger.error('❌ Database disconnection failed:', error);
    throw error;
  }
};

// Health check function
export const checkDatabaseHealth = async (): Promise<boolean> => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    logger.error('❌ Database health check failed:', error);
    return false;
  }
};
