# Google OAuth Integration Setup Guide

## ✅ What's Already Implemented

I've successfully integrated Google OAuth into your LifeLine application with the following components:

### Backend (API)

- ✅ Installed Passport.js with Google OAuth strategy
- ✅ Updated Prisma schema to support OAuth users (added `googleId` field, made `password` optional)
- ✅ Created Passport configuration (`/api/src/config/passport.ts`)
- ✅ Updated auth controller with Google OAuth endpoints
- ✅ Added session middleware to Express app
- ✅ Created database migration for OAuth support

### Frontend (Client)

- ✅ Created `GoogleOAuthButton` component
- ✅ Updated `SocialAuthButtons` to use functional Google OAuth
- ✅ Created `OAuthCallback` page to handle OAuth redirects
- ✅ Added OAuth callback route to App.tsx

## 🔧 Required Setup Steps

To complete the Google OAuth integration, you need to:

### 1. Create Google OAuth Application

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Configure the OAuth consent screen
6. Set up OAuth 2.0 Client ID with these settings:
   - **Application type**: Web application
   - **Authorized JavaScript origins**: `http://localhost:5174` (for dev)
   - **Authorized redirect URIs**: `http://localhost:3000/api/auth/google/callback`

### 2. Update Environment Variables

Update your `/api/.env` file with your Google OAuth credentials:

```bash
# Google OAuth (replace with your actual values)
GOOGLE_CLIENT_ID=your_actual_google_client_id_here
GOOGLE_CLIENT_SECRET=your_actual_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

# Session (generate a strong secret)
SESSION_SECRET=your_strong_session_secret_here
```

### 3. Update Frontend Environment

Create or update `/client/.env.local`:

```bash
VITE_API_URL=http://localhost:3000/api
```

## 🚀 How It Works

### OAuth Flow:

1. User clicks "Continue with Google" button
2. Redirects to Google OAuth consent screen
3. User authorizes the application
4. Google redirects back to `/api/auth/google/callback`
5. Backend creates/updates user account
6. Generates JWT tokens
7. Redirects to frontend `/auth/callback?token=xxx`
8. Frontend stores token and redirects to dashboard

### Key Features:

- **Automatic account creation**: New users are automatically created
- **Account linking**: Existing users with same email get Google ID added
- **Secure token handling**: JWT tokens with refresh token rotation
- **Error handling**: Proper error messages and fallback flows

## 🧪 Testing

1. Make sure both servers are running:

   - Backend: `http://localhost:3000`
   - Frontend: `http://localhost:5174`

2. Go to login page and click "Google" button
3. Complete OAuth flow
4. Verify user is created in database
5. Check that user is redirected to dashboard

## 🔒 Security Features

- **Password optional**: OAuth users don't need passwords
- **Email verification bypass**: Google emails are trusted
- **Session management**: Secure session handling with Passport
- **Token rotation**: Refresh tokens are rotated on use
- **CORS protection**: Proper CORS configuration

## 📁 File Structure

### Backend Files:

- `/api/src/config/passport.ts` - Passport Google strategy
- `/api/src/controllers/authController.ts` - OAuth endpoints
- `/api/src/app.ts` - Express app with Passport middleware
- `/api/prisma/schema.prisma` - Updated User model

### Frontend Files:

- `/client/src/components/auth/GoogleOAuthButton.tsx` - OAuth button
- `/client/src/components/auth/SocialAuthButtons.tsx` - Updated social buttons
- `/client/src/pages/auth/OAuthCallback.tsx` - OAuth callback handler
- `/client/src/App.tsx` - Added OAuth route

## 🐛 Troubleshooting

### Common Issues:

1. **"Invalid client ID"**: Check your Google OAuth credentials
2. **"Redirect URI mismatch"**: Verify callback URL in Google Console
3. **CORS errors**: Ensure frontend origin is allowed in backend
4. **Database errors**: Run `npx prisma generate` after schema changes

### Debug Tips:

- Check browser network tab for OAuth redirect flows
- Monitor backend logs for Passport errors
- Verify environment variables are loaded correctly

## 🎉 Next Steps

Once Google OAuth is working:

1. Add production environment variables
2. Update Google OAuth settings for production URLs
3. Consider adding Apple OAuth (placeholder already exists)
4. Add user profile picture support from Google
5. Implement account linking for existing users

The integration is now complete and ready for testing once you add your Google OAuth credentials!
