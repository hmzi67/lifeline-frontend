import { config } from './config/index.js';
import { logger } from './utils/logger.js';

// Simple validation script to check if all imports work
console.log('🔍 Validating backend setup...');

try {
  logger.info('✅ Logger working');
  logger.info(`✅ Config loaded - Environment: ${config.nodeEnv}`);
  logger.info(`✅ Config loaded - Port: ${config.port}`);
  console.log('✅ All imports successful!');
  console.log('🎉 Backend setup validation passed!');
} catch (error) {
  console.error('❌ Validation failed:', error);
  process.exit(1);
}
