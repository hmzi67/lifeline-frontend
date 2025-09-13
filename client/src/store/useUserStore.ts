import { userService } from "@/services/userService";
import type { UserProfile } from "@/types/user.types";
import type { CreateUserData } from "@/services/userService";
import { create } from "zustand";

type UserStore = {
  users: UserProfile[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  createUser: (userData: CreateUserData) => Promise<void>;
  updateUser: (id: string, userData: Partial<CreateUserData>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
};

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    // Prevent duplicate calls
    if (get().loading) return;
    if (get().users.length > 0) return;

    set({ loading: true, error: null });
    try {
      const response = await userService.getAllUsers();
      set({ users: response.data.users, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  createUser: async (userData: CreateUserData) => {
    set({ loading: true, error: null });
    try {
      const response = await userService.createUser(userData);
      const newUser = response.data.user;
      set((state) => ({
        users: [newUser, ...state.users],
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  updateUser: async (id: string, userData: Partial<CreateUserData>) => {
    set({ loading: true, error: null });
    try {
      const response = await userService.updateUser(id, userData);
      const updatedUser = response.data.user;
      set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? updatedUser : user
        ),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  deleteUser: async (id: string) => {
    try {
      await userService.deleteUser(id);
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
      }));
    } catch (err: any) {
      set({ error: err.message });
    }
  },
}));
