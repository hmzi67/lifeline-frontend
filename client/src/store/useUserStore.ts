import api from "@/lib/axios";
import type { UserProfile } from "@/types/user.types";
import { create } from "zustand";


type UserStore = {
  users: UserProfile[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
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
      const response = await api.get("/user/admin/users");
      set({ users: response.data.data.users, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  deleteUser: async (id: string) => {
    try {
      await api.delete(`/user/admin/users/${id}`);
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
      }));
    } catch (err: any) {
      set({ error: err.message });
    }
  },
}));
