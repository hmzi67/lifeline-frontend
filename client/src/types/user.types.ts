export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthUser extends User {
  token: string;
}



export interface UserProfile {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: string;
  gender?: string;
  height?: number;
  weight?: number;
  activityLevel: string;
  role?: string;
  isEmailVerified?: boolean;
  profileImage?: string;
  createdAt?: string;
}

export interface UserPreferences {
  dietaryRestrictions?: string[];
  allergies?: string[];
  fitnessGoals?: string[];
  notificationsEnabled?: boolean;
  privacy?: string;
}

export interface Plan {
  id: string;
  title: string;
  description: string;
  category: string;
  progress: number;
  participants?: number;
  endDate?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  reward?: string;
  deadline?: string;
  participants?: number;
  completed?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon?: string;
  earned?: string;
}
