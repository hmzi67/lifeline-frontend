import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const useUIStore = create(
  subscribeWithSelector((set, get) => ({
    isGlobalLoading: false,
    sidebarOpen: true,
    activeModal: null,
    notifications: [],
    theme: "light",
    setGlobalLoading: (isGlobalLoading: boolean) => set({ isGlobalLoading }),
    toggleSidebar: () =>
      set((state: { sidebarOpen: boolean }) => ({
        sidebarOpen: !state.sidebarOpen,
      })),
    setSidebarOpen: (sidebarOpen: boolean) => set({ sidebarOpen }),
    openModal: (activeModal: string | null) => set({ activeModal }),
    closeModal: () => set({ activeModal: null }),
    addNotification: (notification: {
      type: string;
      title: string;
      message: string;
      duration?: number;
    }) => {
      const newNotification = {
        ...notification,
        id: Math.random().toString(36).substring(2, 9),
        timestamp: Date.now(),
      };
      set((state: { notifications: any[] }) => ({
        notifications: [...state.notifications, newNotification],
      }));
      const duration = notification.duration || 5000;
      if (duration > 0) {
        setTimeout(() => {
          (get() as any).removeNotification(newNotification.id);
        }, duration);
      }
    },
    removeNotification: (id: string) =>
      set((state: { notifications: any[] }) => ({
        notifications: state.notifications.filter((n: any) => n.id !== id),
      })),
    clearNotifications: () => set({ notifications: [] }),
    setTheme: (theme: "light" | "dark" | "system") => {
      set({ theme });
      const root = document.documentElement;
      if (theme === "system") {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        root.classList.toggle("dark", prefersDark);
      } else {
        root.classList.toggle("dark", theme === "dark");
      }
      localStorage.setItem("theme", theme);
    },
  }))
);
