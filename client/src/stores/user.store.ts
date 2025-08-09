import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { api } from "../services/api";
import type { UserProfile } from "../types/user.types";

// Define the store state and actions type
type UserStore = {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  setProfile: (profile: UserProfile | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  fetchProfile: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<UserProfile>;
};

export const useUserStore = create<UserStore>()(
  subscribeWithSelector((set, get) => ({
    profile: null,
    isLoading: false,
    error: null,
    setProfile: (profile: UserProfile | null) => set({ profile }),
    setLoading: (isLoading: boolean) => set({ isLoading }),
    setError: (error: string | null) => set({ error }),
    clearError: () => set({ error: null }),
    fetchProfile: async (): Promise<void> => {
      set({ isLoading: true, error: null });
      try {
        const response = await api.get("/user/profile");
        if (response.data.success) {
          set({
            profile: response.data.data.user,
            isLoading: false,
            error: null,
          });
        } else {
          throw new Error(response.data.message || "Failed to fetch profile");
        }
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch profile";
        set({ error: errorMessage, isLoading: false });
        throw new Error(errorMessage);
      }
    },
    updateProfile: async (
      updates: Partial<UserProfile>
    ): Promise<UserProfile> => {
      const { profile } = get();
      if (!profile?.id) throw new Error("No profile ID available for update");
      set({ isLoading: true, error: null });
      try {
        const cleanedUpdates = Object.entries(updates).reduce(
          (acc: Record<string, any>, [key, value]) => {
            if (value !== undefined && value !== "") acc[key] = value;
            return acc;
          },
          {}
        );
        const response = await api.put(
          `/user/profile/${profile.id}`,
          cleanedUpdates
        );
        if (response.data.success) {
          set({
            profile: response.data.data.user,
            isLoading: false,
            error: null,
          });
          return response.data.data.user;
        } else {
          throw new Error(response.data.message || "Failed to update profile");
        }
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Failed to update profile";
        set({ error: errorMessage, isLoading: false });
        throw new Error(errorMessage);
      }
    },
  }))
);
