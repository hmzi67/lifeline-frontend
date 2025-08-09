import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "../services/api";
import type { AuthUser } from "../types/auth.types";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthActions {
  login: (
    email: string,
    password: string,
    rememberMe: boolean
  ) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: AuthUser | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  checkAuthStatus: () => Promise<void>;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: true,
      isAuthenticated: false,
      setUser: (user: AuthUser | null) =>
        set((state: AuthStore) => ({
          user,
          isAuthenticated: !!user && !!state.token,
        })),
      setToken: (token: string | null) =>
        set((state: AuthStore) => ({
          token,
          isAuthenticated: !!state.user && !!token,
        })),
      setLoading: (isLoading: boolean) => set({ isLoading }),
      login: async (email: string, password: string, rememberMe: boolean) => {
        set({ isLoading: true });
        try {
          const response = await api.post("/auth/login", { email, password });
          if (response.data.success) {
            const { user, accessToken } = response.data.data;
            localStorage.setItem("token", accessToken);
            if (rememberMe) {
              set({
                user,
                token: accessToken,
                isAuthenticated: true,
                isLoading: false,
              });
            } else {
              sessionStorage.setItem("token", accessToken);
              sessionStorage.setItem("user", JSON.stringify(user));
              set({
                user,
                token: accessToken,
                isAuthenticated: true,
                isLoading: false,
              });
            }
          } else {
            throw new Error(response.data.message || "Login failed");
          }
        } catch (error: any) {
          set({ isLoading: false });
          const errorMessage =
            error?.response?.data?.message || error?.message || "Login failed";
          throw new Error(errorMessage);
        }
      },
      signup: async (name: string, email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await api.post("/auth/signup", {
            name,
            email,
            password,
          });
          if (response.data.success) {
            const { user: userData, token: userToken } = response.data;
            set({
              user: userData,
              token: userToken,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            throw new Error(response.data.message || "Signup failed");
          }
        } catch (error: any) {
          set({ isLoading: false });
          const errorMessage =
            error?.response?.data?.message || error?.message || "Signup failed";
          throw new Error(errorMessage);
        }
      },
      logout: (): void => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        window.location.href = "/";
      },
      checkAuthStatus: async (): Promise<void> => {
        const { token } = get() as AuthStore;
        if (!token) {
          set({ isLoading: false });
          return;
        }
        try {
          const response = await api.get("/user/profile");
          if (response.data.success) {
            set({
              user: response.data.data.user,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            (get() as AuthStore).logout();
          }
        } catch {
          (get() as AuthStore).logout();
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state: AuthStore) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);
