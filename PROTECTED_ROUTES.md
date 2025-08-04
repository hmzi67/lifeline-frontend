# Protected Routes Implementation

This document explains the protected routes system implemented in the LifeLine frontend application.

## Overview

The protected routes system ensures that certain pages are only accessible to authenticated users. When a user tries to access a protected route without being logged in, they are automatically redirected to the login page.

## Components Created

### 1. AuthContext (`src/contexts/AuthContext.tsx`)

- Manages global authentication state
- Provides authentication functions (login, signup, logout)
- Handles token storage and verification
- Automatically initializes auth state from localStorage

### 2. ProtectedRoute (`src/components/ProtectedRoute.tsx`)

- Wrapper component for protected routes
- Redirects unauthenticated users to login page
- Preserves intended destination for post-login redirect
- Shows loading spinner during auth verification

### 3. PublicRoute (`src/components/PublicRoute.tsx`)

- Wrapper component for auth pages (login/signup)
- Redirects authenticated users away from auth pages
- Prevents logged-in users from accessing login/signup

## Routes Configuration

### Protected Routes (require authentication):

- `/dashboard` - User dashboard
- `/goals` - Fitness goals page
- `/analytics` - User analytics (if converted to protected)
- `/checkout` - Payment/checkout flow

### Public Routes (accessible to everyone):

- `/` - Landing page
- `/business` - Business page
- `/blog` - Blog listing
- `/blog/:id` - Individual blog posts
- `/pricing` - Pricing page
- `/affiliate` - Affiliate program
- `/contact` - Contact page
- `/questions` - Questions page
- `/privacy` - Privacy policy
- `/terms-and-conditions` - Terms and conditions

### Auth Routes (only accessible when not logged in):

- `/login` - Login page
- `/signup` - Signup page
- `/verify` - Email verification
- `/reset-password` - Password reset
- `/auth/callback` - OAuth callback

## Authentication Flow

### Login Flow:

1. User visits protected route (e.g., `/dashboard`)
2. If not authenticated, redirected to `/login` with return URL
3. User enters credentials and submits form
4. `AuthContext.login()` makes API call to `/auth/login`
5. On success, user and token stored in state and localStorage
6. User redirected to originally intended route

### Signup Flow:

1. User visits `/signup`
2. User fills out signup form
3. `AuthContext.signup()` makes API call to `/auth/signup`
4. On success, user is automatically logged in
5. User redirected to dashboard or intended destination

### Logout Flow:

1. User clicks logout button (in header or dashboard)
2. `AuthContext.logout()` clears user state and localStorage
3. User redirected to home page

## API Integration

The auth system expects your backend API to provide these endpoints:

### Required API Endpoints:

```typescript
POST /auth/login
{
  email: string,
  password: string
}
Response: {
  success: boolean,
  user: { id: string, email: string, name: string },
  token: string
}

POST /auth/signup
{
  name: string,
  email: string,
  password: string
}
Response: {
  success: boolean,
  user: { id: string, email: string, name: string },
  token: string
}

GET /auth/verify
Headers: { Authorization: "Bearer <token>" }
Response: {
  success: boolean,
  user: { id: string, email: string, name: string }
}
```

## Usage Examples

### Adding a New Protected Route:

```tsx
// In App.tsx
<Route
  path="/new-protected-page"
  element={
    <ProtectedRoute>
      <NewProtectedPage />
    </ProtectedRoute>
  }
/>
```

### Using Auth State in Components:

```tsx
import { useAuth } from "../contexts/AuthContext";

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>Welcome {user.name}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Checking Auth Status:

```tsx
import { useAuth } from "../contexts/AuthContext";

function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header>
      {isAuthenticated ? (
        <div>
          <span>Hello, {user.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </header>
  );
}
```

## Security Features

1. **Token Verification**: On app load, stored tokens are verified with the backend
2. **Automatic Logout**: Invalid tokens trigger automatic logout
3. **Route Protection**: Protected routes check auth status before rendering
4. **Intent Preservation**: Users are redirected to their originally intended destination after login
5. **API Interceptors**: Automatic token attachment and 401 error handling

## Environment Variables

Make sure these environment variables are set:

```bash
VITE_API_URL=http://localhost:3000  # Your backend API URL
```

## Testing the Implementation

### Test Authentication Flow:

1. Start your backend API server
2. Start the frontend: `npm run dev`
3. Try accessing `/dashboard` without logging in
4. Verify redirect to `/login`
5. Login with valid credentials
6. Verify redirect back to `/dashboard`
7. Test logout functionality

### Test Route Protection:

1. While logged out, try accessing protected routes
2. Verify all redirect to login
3. While logged in, try accessing `/login` or `/signup`
4. Verify redirect to dashboard

## Troubleshooting

### Common Issues:

1. **"useAuth must be used within an AuthProvider"**

   - Ensure `AuthProvider` wraps your entire app in `App.tsx`

2. **Infinite redirect loops**

   - Check that `/login` and `/signup` are wrapped in `PublicRoute`
   - Verify API endpoints return expected response format

3. **Token not persisting**

   - Check localStorage in browser dev tools
   - Verify API interceptors are properly configured

4. **API calls failing**
   - Check CORS configuration on backend
   - Verify `VITE_API_URL` environment variable is set correctly

## Next Steps

1. **Enhanced Security**: Add token refresh functionality
2. **Role-Based Access**: Extend auth context to handle user roles
3. **Loading States**: Add better loading indicators during auth operations
4. **Error Handling**: Implement toast notifications for auth errors
5. **Remember Me**: Add persistent login option
6. **Social Auth**: Integrate OAuth providers (Google, Facebook, etc.)

## Backend Requirements

Your backend should:

1. Implement JWT token authentication
2. Provide the required auth endpoints listed above
3. Include proper CORS configuration
4. Validate tokens on protected API routes
5. Return user data in the expected format

The protected routes system is now fully implemented and ready for use!
