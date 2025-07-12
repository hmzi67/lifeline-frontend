export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  height?: number; // in cm
  weight?: number; // in kg
  activityLevel?:
    | 'SEDENTARY'
    | 'LIGHTLY_ACTIVE'
    | 'MODERATELY_ACTIVE'
    | 'VERY_ACTIVE'
    | 'EXTREMELY_ACTIVE';
  role: 'USER' | 'ADMIN' | 'COACH';
  isEmailVerified: boolean;
  profileImage?: string;
  preferences?: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  id: string;
  userId: string;
  dietaryRestrictions: string; // JSON string array
  allergies: string; // JSON string array
  fitnessGoals: string; // JSON string array
  notificationsEnabled: boolean;
  units: 'METRIC' | 'IMPERIAL';
  privacy: 'PUBLIC' | 'FRIENDS' | 'PRIVATE';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  height?: number;
  weight?: number;
  activityLevel?:
    | 'SEDENTARY'
    | 'LIGHTLY_ACTIVE'
    | 'MODERATELY_ACTIVE'
    | 'VERY_ACTIVE'
    | 'EXTREMELY_ACTIVE';
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  height?: number;
  weight?: number;
  activityLevel?:
    | 'SEDENTARY'
    | 'LIGHTLY_ACTIVE'
    | 'MODERATELY_ACTIVE'
    | 'VERY_ACTIVE'
    | 'EXTREMELY_ACTIVE';
  preferences?: Partial<UserPreferences>;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<User, 'password'>;
  accessToken: string;
  refreshToken: string;
}

// Client-friendly interface with parsed arrays
export interface UserPreferencesClient {
  id: string;
  userId: string;
  dietaryRestrictions: string[];
  allergies: string[];
  fitnessGoals: string[];
  notificationsEnabled: boolean;
  units: 'METRIC' | 'IMPERIAL';
  privacy: 'PUBLIC' | 'FRIENDS' | 'PRIVATE';
  createdAt: Date;
  updatedAt: Date;
}

// User interface with client-friendly preferences
export interface UserClient extends Omit<User, 'preferences'> {
  preferences?: UserPreferencesClient;
}

// Utility functions for array conversion
export const PreferencesUtils = {
  parseArrayField: (field: string): string[] => {
    try {
      return JSON.parse(field) || [];
    } catch {
      return [];
    }
  },

  stringifyArrayField: (field: string[]): string => {
    return JSON.stringify(field || []);
  },

  toClient: (prefs: UserPreferences): UserPreferencesClient => ({
    ...prefs,
    dietaryRestrictions: PreferencesUtils.parseArrayField(prefs.dietaryRestrictions),
    allergies: PreferencesUtils.parseArrayField(prefs.allergies),
    fitnessGoals: PreferencesUtils.parseArrayField(prefs.fitnessGoals),
  }),

  fromClient: (prefs: Partial<UserPreferencesClient>): Partial<UserPreferences> => ({
    ...prefs,
    dietaryRestrictions: prefs.dietaryRestrictions
      ? PreferencesUtils.stringifyArrayField(prefs.dietaryRestrictions)
      : undefined,
    allergies: prefs.allergies ? PreferencesUtils.stringifyArrayField(prefs.allergies) : undefined,
    fitnessGoals: prefs.fitnessGoals
      ? PreferencesUtils.stringifyArrayField(prefs.fitnessGoals)
      : undefined,
  }),
};
