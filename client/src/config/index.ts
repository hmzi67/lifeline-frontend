export const config = {
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:3000",
  environment: import.meta.env.MODE,
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV,
  stripePublishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "",
  // Lemon Squeezy configuration (optional - used for client-side features if needed)
  lemonSqueezyStoreId: import.meta.env.VITE_LEMONSQUEEZY_STORE_ID || "",
};
