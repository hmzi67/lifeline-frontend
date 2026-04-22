const defaultApiUrl = import.meta.env.PROD
  ? `${window.location.origin}/api`
  : 'http://localhost:3000/api';

export const config = {
  apiUrl: import.meta.env.VITE_API_URL || defaultApiUrl,
  environment: import.meta.env.MODE,
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV,
  stripePublishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "",
};
