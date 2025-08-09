// Export all stores
export { useAuthStore } from "./auth.store";
export { useUserStore } from "./user.store";
export { useUIStore } from "./ui.store";
export { useFitnessStore } from "./fitness.store";

// Export combined hooks
export { useAppAuth, useFitnessApp, useAppUI } from "./hooks";

// Store types (for TypeScript)
export type { AuthUser } from "../types/auth.types";
export type { UserProfile } from "../types/user.types";
