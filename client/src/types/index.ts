// Export all types and interfaces
// export * from './auth.types';
// export * from './user.types';
// export * from './api.types';

import type { LucideIcon } from "lucide-react";


export interface StatData {
  title: string;
  value: number | string;
  unit: string;
  icon: LucideIcon;
  gradient: string;
  bgGradient: string;
  iconBg: string;
  chart?: number[];
  percentage?: number;
  trend: string;
  trendDirection: "up" | "down";
}

export interface WeekData {
  day: string;
  value: number;
  label: string;
  active: boolean;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface OrderStats {
  category: string;
  value: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export interface TransactionData {
  id: string;
  type: string;
  method: string;
  amount: number;
  icon: LucideIcon;
  color: string;
}

export interface RevenueData {
  month: string;
  current: number;
  previous: number;
}


