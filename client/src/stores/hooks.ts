import {
  useAuthStore,
  useUserStore,
  useFitnessStore,
  useUIStore,
} from "./index";

// Combined hook for authentication and user data
export const useAppAuth = () => {
  const auth = useAuthStore();
  const userStore = useUserStore();

  return {
    // Auth state
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,

    // User profile
    profile: userStore.profile,
    userLoading: userStore.isLoading,
    userError: userStore.error,

    // Auth actions
    login: auth.login,
    signup: auth.signup,
    logout: auth.logout,

    // User actions
    fetchProfile: userStore.fetchProfile,
    updateProfile: userStore.updateProfile,

    // Combined user data (profile takes precedence over auth user)
    currentUser: userStore.profile || auth.user,
  };
};

// Combined hook for fitness data and UI state
export const useFitnessApp = () => {
  const fitness = useFitnessStore();
  const ui = useUIStore() as any; // Replace 'any' with the correct type if available

  return {
    // Fitness state
    ...fitness,

    // UI state
    notifications: ui.notifications,
    sidebarOpen: ui.sidebarOpen,
    theme: ui.theme,

    // UI actions
    addNotification: ui.addNotification,
    removeNotification: ui.removeNotification,
    toggleSidebar: ui.toggleSidebar,
    setSidebarOpen: ui.setSidebarOpen,
    setTheme: ui.setTheme,
  };
};

// Hook for global UI state
export const useAppUI = () => {
  return useUIStore();
};
