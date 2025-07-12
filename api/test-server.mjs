#!/usr/bin/env node
import { createApp } from './src/app.js';
import config from './src/config/index.js';

async function testServer() {
  try {
    console.log('Testing server startup...');
    const app = await createApp();

    const server = app.listen(config.port, config.host, () => {
      console.log(`✅ Server started successfully on ${config.host}:${config.port}`);
      console.log(`🌐 API available at: http://${config.host}:${config.port}/api`);
      console.log('🔍 Health check: http://localhost:3001/api/health');
      console.log('📚 API docs: http://localhost:3001/api');

      // Close the server after successful test
      setTimeout(() => {
        server.close(() => {
          console.log('✅ Test completed successfully');
          process.exit(0);
        });
      }, 1000);
    });

    server.on('error', error => {
      console.error('❌ Server failed to start:', error.message);
      process.exit(1);
    });
  } catch (error) {
    console.error('❌ Application failed to initialize:', error.message);
    process.exit(1);
  }
}

testServer();
