import {
    Home,
    Users,
    Package,
    Dumbbell,
    BookOpen,
    FileText,
    DollarSign,
    ShoppingCart,
    CreditCard,
    Shield,
    FolderOpen,
    Utensils,
    Target,
    Waves,
    Music,
    Ticket,
    Link2
} from 'lucide-react';
import type { NavigationItem, StatData } from '@/types';

export const navigationItems: NavigationItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'roles', label: 'Roles', icon: Shield },
    { id: 'diet', label: 'Diet Plans', icon: Package },
    { id: 'mealTypes', label: 'Meal Types', icon: Utensils },
    { id: 'exercise', label: 'Exercises', icon: Dumbbell },
    { id: 'challenges', label: 'Challenges', icon: Target },
    { id: 'mindMeditation', label: 'Meditation', icon: Music },
    { id: 'sleepStories', label: 'Sleep Stories', icon: BookOpen },
    { id: 'sleepSounds', label: 'Sleep Sounds', icon: Waves },
    { id: 'blogCategories', label: 'Blog Categories', icon: FolderOpen },
    { id: 'blog', label: 'Blogs', icon: FileText },
    { id: 'coupons', label: 'Coupon Codes', icon: Ticket },
    { id: 'referralCodes', label: 'Referral Codes', icon: Link2 },
];

export const getStatsData = (animatedValues: Record<string, number>): StatData[] => [
    {
        title: 'Total Balance',
        value: `${animatedValues.totalBalance || 0}.10`,
        unit: 'USD',
        icon: DollarSign,
        gradient: 'from-emerald-400 to-teal-500',
        bgGradient: 'from-emerald-50 to-teal-50',
        iconBg: 'from-emerald-100 to-teal-100',
        chart: [40, 60, 30, 80, 45, 70, 35, 90, 25, 55, 75, 40],
        trend: '+42.9%',
        trendDirection: 'up'
    },
    {
        title: 'Total Sales',
        value: `${(animatedValues.totalSales || 0) / 1000}k`,
        unit: 'Sales',
        icon: ShoppingCart,
        gradient: 'from-orange-400 to-red-500',
        bgGradient: 'from-orange-50 to-red-50',
        iconBg: 'from-orange-100 to-red-100',
        chart: [60, 80, 45, 70, 55, 85, 40, 65, 50, 75, 35, 60],
        trend: '+18.2%',
        trendDirection: 'up'
    },
    {
        title: 'Total Orders',
        value: animatedValues.totalOrders || 0,
        unit: 'Orders',
        icon: Package,
        gradient: 'from-blue-400 to-purple-500',
        bgGradient: 'from-blue-50 to-purple-50',
        iconBg: 'from-blue-100 to-purple-100',
        chart: [30, 45, 60, 40, 70, 55, 80, 45, 65, 50, 75, 40],
        trend: '+25.4%',
        trendDirection: 'up'
    },
    {
        title: 'Expenses This Week',
        value: `${animatedValues.expenses || 0}`,
        unit: 'USD',
        icon: CreditCard,
        gradient: 'from-cyan-400 to-blue-500',
        bgGradient: 'from-cyan-50 to-blue-50',
        iconBg: 'from-cyan-100 to-blue-100',
        percentage: 85,
        trend: '$39 less',
        trendDirection: 'down'
    }
];