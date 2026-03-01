import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '@/services/authService';
import type { LoginCredentials, AuthUserData } from '@/services/authService';

type AuthStore = {
  user: AuthUserData | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ loading: true, error: null });
        try {
          const response = await authService.login(credentials);
          if (response.success) {
            const { user, accessToken } = response.data;
            localStorage.setItem('token', accessToken);
            set({
              user,
              token: accessToken,
              isAuthenticated: true,
              loading: false,
              error: null,
            });
          } else {
            set({ loading: false, error: response.message || 'Login failed' });
          }
        } catch (err: any) {
          const message =
            err.response?.data?.message || err.message || 'Login failed';
          set({ loading: false, error: message });
        }
      },

      logout: async () => {
        set({ loading: true });
        try {
          await authService.logout();
        } catch {
          // Clear local state even if API call fails
        } finally {
          localStorage.removeItem('token');
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false,
            error: null,
          });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'admin-auth-store',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
