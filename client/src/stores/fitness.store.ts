import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "../services/api";

// Define types for challenge, plan, and fitness data
interface Challenge {
  id: string;
  [key: string]: any;
}
interface Plan {
  id: string;
  [key: string]: any;
}
interface FitnessData {
  date: string;
  [key: string]: any;
}

interface FitnessState {
  todayData: FitnessData | null;
  weekData: FitnessData[];
  monthData: FitnessData[];
  dailyStepsGoal: number;
  dailyCaloriesGoal: number;
  weeklyWorkoutGoal: number;
  activePlans: Plan[];
  availableChallenge: Challenge[];
  completedChallenges: Challenge[];
  isLoading: boolean;
  error: string | null;
  setTodayData: (todayData: FitnessData) => void;
  updateTodayData: (updates: Partial<FitnessData>) => void;
  addDailyData: (data: FitnessData) => void;
  fetchFitnessData: (period: "today" | "week" | "month") => Promise<void>;
  setDailyStepsGoal: (dailyStepsGoal: number) => void;
  setDailyCaloriesGoal: (dailyCaloriesGoal: number) => void;
  setWeeklyWorkoutGoal: (weeklyWorkoutGoal: number) => void;
  fetchActivePlans: () => Promise<void>;
  fetchAvailableChallenges: () => Promise<void>;
  joinChallenge: (challengeId: string) => Promise<void>;
  completeChallenge: (challengeId: string) => Promise<void>;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useFitnessStore = create<FitnessState>()(
  persist<FitnessState>(
    (set, get) => ({
      todayData: null,
      weekData: [],
      monthData: [],
      dailyStepsGoal: 10000,
      dailyCaloriesGoal: 2000,
      weeklyWorkoutGoal: 5,
      activePlans: [],
      availableChallenge: [],
      completedChallenges: [],
      isLoading: false,
      error: null,
      setTodayData: (todayData: FitnessData) => set({ todayData }),
      updateTodayData: (updates: Partial<FitnessData>) =>
        set((state: FitnessState) => ({
          todayData: state.todayData
            ? { ...state.todayData, ...updates }
            : null,
        })),
      addDailyData: (data: FitnessData) =>
        set((state: FitnessState) => {
          const newWeekData = [...state.weekData];
          const existingIndex = newWeekData.findIndex(
            (d: FitnessData) => d.date === data.date
          );
          if (existingIndex >= 0) newWeekData[existingIndex] = data;
          else newWeekData.push(data);
          const sortedWeekData = newWeekData
            .sort(
              (a: FitnessData, b: FitnessData) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .slice(0, 7);
          const newMonthData = [...state.monthData];
          const monthExistingIndex = newMonthData.findIndex(
            (d: FitnessData) => d.date === data.date
          );
          if (monthExistingIndex >= 0) newMonthData[monthExistingIndex] = data;
          else newMonthData.push(data);
          const sortedMonthData = newMonthData
            .sort(
              (a: FitnessData, b: FitnessData) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .slice(0, 30);
          return { weekData: sortedWeekData, monthData: sortedMonthData };
        }),
      fetchFitnessData: async (period: "today" | "week" | "month") => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.get(`/fitness/data?period=${period}`);
          if (response.data.success) {
            const data = response.data.data;
            if (period === "today") set({ todayData: data, isLoading: false });
            else if (period === "week")
              set({ weekData: data, isLoading: false });
            else if (period === "month")
              set({ monthData: data, isLoading: false });
          } else {
            throw new Error(
              response.data.message || "Failed to fetch fitness data"
            );
          }
        } catch (error: any) {
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to fetch fitness data";
          set({ error: errorMessage, isLoading: false });
        }
      },
      setDailyStepsGoal: (dailyStepsGoal: number) => set({ dailyStepsGoal }),
      setDailyCaloriesGoal: (dailyCaloriesGoal: number) =>
        set({ dailyCaloriesGoal }),
      setWeeklyWorkoutGoal: (weeklyWorkoutGoal: number) =>
        set({ weeklyWorkoutGoal }),
      fetchActivePlans: async (): Promise<void> => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.get("/fitness/plans/active");
          if (response.data.success)
            set({ activePlans: response.data.data, isLoading: false });
          else
            throw new Error(
              response.data.message || "Failed to fetch active plans"
            );
        } catch (error: any) {
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to fetch active plans";
          set({ error: errorMessage, isLoading: false });
        }
      },
      fetchAvailableChallenges: async (): Promise<void> => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.get("/fitness/challenges/available");
          if (response.data.success)
            set({ availableChallenge: response.data.data, isLoading: false });
          else
            throw new Error(
              response.data.message || "Failed to fetch available challenges"
            );
        } catch (error: any) {
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to fetch available challenges";
          set({ error: errorMessage, isLoading: false });
        }
      },
      joinChallenge: async (challengeId: string): Promise<void> => {
        set({ isLoading: true, error: null });
        try {
          const availableChallenge = get().availableChallenge as Challenge[];
          const challenge = availableChallenge.find(
            (c: Challenge) => c.id === challengeId
          );
          const response = await api.post(
            `/fitness/challenges/${challengeId}/join`
          );
          if (response.data.success && challenge) {
            set((state: FitnessState) => ({
              availableChallenge: state.availableChallenge.filter(
                (c: Challenge) => c.id !== challengeId
              ),
              activePlans: [...state.activePlans, challenge],
              isLoading: false,
            }));
          } else if (!response.data.success) {
            throw new Error(
              response.data.message || "Failed to join challenge"
            );
          }
        } catch (error: any) {
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to join challenge";
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },
      completeChallenge: async (challengeId: string): Promise<void> => {
        set({ isLoading: true, error: null });
        try {
          const activePlans = get().activePlans as Plan[];
          const challenge = activePlans.find((p: Plan) => p.id === challengeId);
          const response = await api.post(
            `/fitness/challenges/${challengeId}/complete`
          );
          if (response.data.success && challenge) {
            set((state: FitnessState) => ({
              activePlans: state.activePlans.filter(
                (p: Plan) => p.id !== challengeId
              ),
              completedChallenges: [...state.completedChallenges, challenge],
              isLoading: false,
            }));
          } else if (!response.data.success) {
            throw new Error(
              response.data.message || "Failed to complete challenge"
            );
          }
        } catch (error: any) {
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to complete challenge";
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },
      setLoading: (isLoading: boolean) => set({ isLoading }),
      setError: (error: string | null) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    {
      name: "fitness-storage",
      partialize: (state): Partial<FitnessState> => ({
        dailyStepsGoal: state.dailyStepsGoal,
        dailyCaloriesGoal: state.dailyCaloriesGoal,
        weeklyWorkoutGoal: state.weeklyWorkoutGoal,
        todayData: state.todayData !== undefined ? state.todayData : null,
      }),
    }
  )
);
