/**
 * Simple test script to verify the signup functionality
 * Run this after setting up your environment and database
 */

// Example request body for signup
const signupData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: 'securePassword123',
};

// Example request body for login
const loginData = {
  email: 'john.doe@example.com',
  password: 'securePassword123',
};

console.log('📝 Signup Request Body:');
console.log(JSON.stringify(signupData, null, 2));

console.log('\n📝 Login Request Body:');
console.log(JSON.stringify(loginData, null, 2));

console.log('\n🚀 Test with curl commands:');
console.log('\n1. Signup:');
console.log(`curl -X POST http://localhost:3001/api/auth/signup \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(signupData)}'`);

console.log('\n2. Login:');
console.log(`curl -X POST http://localhost:3001/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(loginData)}'`);

console.log('\n3. Get Current User (replace YOUR_ACCESS_TOKEN with the token from login):');
console.log(`curl -X GET http://localhost:3001/api/auth/me \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"`);
