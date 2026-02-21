/**
 * Response types for Progress APIs
 */

export interface CaloriesIntake {
  today: number;
  target: number;
  percentage: number;
}

export interface ExerciseDay {
  day: string;
  count: number;
}

export interface ExerciseActiveDays {
  week: string;
  totalDaysActive: number;
  days: ExerciseDay[];
}

export interface MedicationStat {
  id: string;
  medicationName: string;
  adherencePercentage: number;
}

export interface MedicationStats {
  period: string;
  overallAdherence: number;
  medications: MedicationStat[];
}

export interface UserChallenge {
  id: string;
  challengeName: string;
  description: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  progress?: number;
  startDate?: string;
  endDate?: string;
}

export interface ChallengeProgress {
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  challenges: UserChallenge[];
}

export interface ProgressSummary {
  caloriesIntake: CaloriesIntake;
  exerciseActiveDays: ExerciseActiveDays;
  medicationStats: MedicationStats;
  challengeProgress: ChallengeProgress;
  lastUpdated: string;
}

// Response wrappers
export interface CaloriesIntakeResponse {
  success: boolean;
  message: string;
  data: CaloriesIntake & {
    date?: string;
  };
}

export interface ExerciseActiveDaysResponse {
  success: boolean;
  message: string;
  data: ExerciseActiveDays;
}

export interface MedicationStatsResponse {
  success: boolean;
  message: string;
  data: MedicationStats;
}

export interface ChallengeProgressResponse {
  success: boolean;
  message: string;
  data: ChallengeProgress;
}

export interface ProgressSummaryResponse {
  success: boolean;
  message: string;
  data: ProgressSummary;
}

// AppSettings types
export interface AppSetting {
  id: string;
  key: string;
  value: string;
  scope?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AppSettingCreatePayload {
  key: string;
  value: string;
  scope?: string;
}

export interface AppSettingUpdatePayload {
  key?: string;
  value?: string;
  scope?: string;
}

export interface AppSettingsListResponse {
  success: boolean;
  message: string;
  data: AppSetting[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface AppSettingResponse {
  success: boolean;
  message: string;
  data: AppSetting;
}
