# Authentication System

This authentication system provides secure user registration, login, and session management for the Lifeline API.

## Features

- **User Registration (Signup)**: Create new user accounts with email and password
- **User Login**: Authenticate users with email and password
- **JWT Tokens**: Secure authentication using JSON Web Tokens
  - Access tokens (15 minutes expiry)
  - Refresh tokens (7 days expiry, stored as httpOnly cookies)
- **Password Security**: Passwords are hashed using bcrypt with 12 salt rounds
- **Token Management**: Automatic cleanup of old refresh tokens
- **Password Reset**: Secure password reset functionality
- **User Profile**: Get current authenticated user information
- **Input Validation**: Comprehensive validation using Zod schemas

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh-token` - Refresh access token
- `GET /api/auth/me` - Get current user (requires authentication)

### Password Reset

- `POST /api/auth/request-password-reset` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

### OAuth (Placeholder)

- `GET /api/auth/google` - Google OAuth
- `GET /api/auth/google/callback` - Google OAuth callback
- `GET /api/auth/apple` - Apple OAuth
- `POST /api/auth/apple/callback` - Apple OAuth callback

## Request Examples

### Signup

```json
POST /api/auth/signup
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "securePassword123"
}
```

### Login

```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

### Password Reset Request

```json
POST /api/auth/request-password-reset
{
  "email": "user@example.com"
}
```

### Password Reset

```json
POST /api/auth/reset-password
{
  "token": "reset-token-here",
  "newPassword": "newSecurePassword123"
}
```

## Response Format

All endpoints return responses in the following format:

```json
{
  "success": true|false,
  "message": "Description of the result",
  "data": { /* Response data */ },
  "errors": [ /* Validation errors if any */ ]
}
```

## Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt
2. **JWT Security**: Tokens are signed and verified securely
3. **HttpOnly Cookies**: Refresh tokens are stored in secure httpOnly cookies
4. **Token Cleanup**: Old refresh tokens are automatically cleaned up
5. **Input Validation**: All inputs are validated using Zod schemas
6. **Error Handling**: Secure error messages that don't leak sensitive information

## Environment Variables

Make sure to set the following environment variables:

```env
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-super-secret-refresh-jwt-key-here
DATABASE_URL=postgresql://username:password@localhost:5432/lifeline
NODE_ENV=development|production
```

## Middleware

### Authentication Middleware

Use the `authenticate` middleware to protect routes that require authentication:

```typescript
import authenticate from '../middleware/authenticate.js';

// Protected route example
router.get('/protected', authenticate, (req, res) => {
  // req.user will contain the authenticated user information
  res.json({ user: req.user });
});
```

## Database Schema

The system uses the following database models:

- `User`: Main user account information
- `UserPreferences`: User preferences and settings
- `RefreshToken`: Stored refresh tokens
- `PasswordReset`: Password reset tokens
- `EmailVerification`: Email verification tokens (for future use)

## Next Steps

1. Implement email verification system
2. Add OAuth providers (Google, Apple)
3. Implement rate limiting for auth endpoints
4. Add two-factor authentication (2FA)
5. Implement session management dashboard
