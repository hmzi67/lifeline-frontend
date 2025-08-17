import React, { useState, useEffect } from 'react';
import {
    Flame,
    Footprints,
    Droplets,
    MapPin,
    Plus,
    Zap,
    Home,
    Timer,
    Calendar,
    LogOut,
    Bell,
    Users,
    Package,
    Dumbbell,
    BookOpen,
    Ticket,
    FileText,
    ClipboardList,
    Layers,
    ListTodo,
    Box,
    Menu,
    X,
    TrendingUp,
    Activity,
    Target,
    Award,
    User as UserIcon,
    DollarSign,
    ShoppingCart,
    CreditCard,
    BarChart3,
    PieChart,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import type { User, UserProfile } from '@/types/user.types';
import api from '@/lib/axios';

// Type definitions
interface StatData {
    title: string;
    value: number | string;
    unit: string;
    icon: React.ElementType;
    gradient: string;
    bgGradient: string;
    iconBg: string;
    chart?: number[];
    percentage?: number;
    trend: string;
    trendDirection: 'up' | 'down';
}

interface WeekData {
    day: string;
    value: number;
    label: string;
    active: boolean;
}

interface NavigationItem {
    id: string;
    label: string;
    icon: React.ElementType;
}

interface OrderStats {
    category: string;
    value: string;
    description: string;
    icon: React.ElementType;
    color: string;
}

interface TransactionData {
    id: string;
    type: string;
    method: string;
    amount: number;
    icon: React.ElementType;
    color: string;
}

interface RevenueData {
    month: string;
    current: number;
    previous: number;
}

// Users Component
const UsersComponent: React.FC = () => {
    const [users, setUsers] = useState<UserProfile[]>([]);


    useEffect(() => {
        const fetchUser = async () => {
            const response = await api.get('user/admin/users');
            console.log(response.data.data.users);
            setUsers(response.data.data.users);
        };
        fetchUser();
    }, []);

    console.log(users);

    return (
        <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Users Management</h2>
                            <p className="text-gray-500">Manage and monitor user activities</p>
                        </div>
                    </div>
                    <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl 
                                         flex items-center gap-2 hover:from-blue-600 hover:to-purple-600 
                                         transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                        <Plus className="w-5 h-5" />
                        <span className="font-medium">Add User</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users?.map((user) => (
                        <div key={user.id} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 p-0.5">
                                    <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                                        <UserIcon className="w-6 h-6 text-gray-600" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{user.username}</h3>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Activity Level</span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium`}>
                                        {user.activityLevel}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Last Active</span>
                                    <span className="font-medium text-gray-900">{user.createdAt}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Component for Diet section
const DietComponent: React.FC = () => {

    


    return (
        <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl">
                            <Package className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Diet Management</h2>
                            <p className="text-gray-500">Track nutrition and meal plans</p>
                        </div>
                    </div>
                    <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl 
                                 flex items-center gap-2 hover:from-green-600 hover:to-emerald-600 
                                 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                        <Plus className="w-5 h-5" />
                        <span className="font-medium">Add Meal Plan</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { title: 'Total Calories', value: '2,450', unit: 'kcal', color: 'from-orange-100 to-red-100' },
                        { title: 'Protein', value: '125', unit: 'g', color: 'from-blue-100 to-cyan-100' },
                        { title: 'Carbs', value: '280', unit: 'g', color: 'from-yellow-100 to-orange-100' },
                        { title: 'Fats', value: '85', unit: 'g', color: 'from-purple-100 to-pink-100' }
                    ].map((item, index) => (
                        <div key={index} className={`bg-gradient-to-br ${item.color} rounded-xl p-6`}>
                            <h3 className="text-sm font-medium text-gray-600 mb-2">{item.title}</h3>
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-bold text-gray-900">{item.value}</span>
                                <span className="text-sm text-gray-600 mb-1">{item.unit}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Today's Meal Plan</h3>
                    <div className="space-y-4">
                        {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map((meal, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg">
                                <div>
                                    <h4 className="font-semibold text-gray-900">{meal}</h4>
                                    <p className="text-sm text-gray-500">Planned meal for today</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-lg font-bold text-gray-900">450</span>
                                    <span className="text-sm text-gray-500 ml-1">kcal</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Component for Exercise section
const ExerciseComponent: React.FC = () => (
    <div className="space-y-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-red-100 to-orange-100 rounded-xl">
                        <Dumbbell className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Exercise Tracking</h2>
                        <p className="text-gray-500">Monitor workouts and fitness progress</p>
                    </div>
                </div>
                <button className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-xl 
                                 flex items-center gap-2 hover:from-red-600 hover:to-orange-600 
                                 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    <Plus className="w-5 h-5" />
                    <span className="font-medium">Add Workout</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                    { title: 'Workouts This Week', value: '12', icon: Dumbbell, color: 'from-red-100 to-orange-100' },
                    { title: 'Average Duration', value: '45', unit: 'min', icon: Timer, color: 'from-blue-100 to-cyan-100' },
                    { title: 'Calories Burned', value: '3,250', unit: 'kcal', icon: Flame, color: 'from-yellow-100 to-orange-100' }
                ].map((item, index) => (
                    <div key={index} className={`bg-gradient-to-br ${item.color} rounded-xl p-6`}>
                        <div className="flex items-center gap-3 mb-4">
                            <item.icon className="w-6 h-6 text-gray-700" />
                            <h3 className="text-sm font-medium text-gray-600">{item.title}</h3>
                        </div>
                        <div className="flex items-end gap-2">
                            <span className="text-3xl font-bold text-gray-900">{item.value}</span>
                            {item.unit && <span className="text-sm text-gray-600 mb-1">{item.unit}</span>}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Workouts</h3>
                <div className="space-y-4">
                    {[
                        { name: 'Upper Body Strength', duration: '45 min', calories: '320 kcal', date: 'Today' },
                        { name: 'Cardio HIIT', duration: '30 min', calories: '280 kcal', date: 'Yesterday' },
                        { name: 'Leg Day', duration: '50 min', calories: '380 kcal', date: '2 days ago' }
                    ].map((workout, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg">
                            <div>
                                <h4 className="font-semibold text-gray-900">{workout.name}</h4>
                                <p className="text-sm text-gray-500">{workout.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium text-gray-900">{workout.duration}</p>
                                <p className="text-sm text-gray-500">{workout.calories}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

// Generic component for other sections
const GenericComponent: React.FC<{ title: string; icon: React.ElementType; description: string }> = ({ title, icon: Icon, description }) => (
    <div className="space-y-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl">
                        <Icon className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
                        <p className="text-gray-500">{description}</p>
                    </div>
                </div>
                <button className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl 
                                 flex items-center gap-2 hover:from-gray-600 hover:to-gray-700 
                                 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    <Plus className="w-5 h-5" />
                    <span className="font-medium">Add New</span>
                </button>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-12 text-center">
                <Icon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">{title} Management</h3>
                <p className="text-gray-500">This section is under development. More features coming soon!</p>
            </div>
        </div>
    </div>
);

// Animated Line Chart Component
const AnimatedLineChart: React.FC<{ data: number[]; gradient: string | number }> = ({ data, gradient }) => (
    <div className="mt-4 h-12 relative">
        <svg className="w-full h-full" viewBox="0 0 200 50" aria-label="Activity chart">
            <defs>
                <linearGradient id={`gradient-${gradient}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3EC6C9" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.3" />
                </linearGradient>
            </defs>
            <polyline
                fill="none"
                stroke={`url(#gradient-${gradient})`}
                strokeWidth="3"
                strokeLinecap="round"
                points={data.map((value, index) =>
                    `${(index / (data.length - 1)) * 200},${50 - (value / Math.max(...data)) * 40}`
                ).join(' ')}
                className="animate-pulse"
            />
            {data.map((value, index) => (
                <circle
                    key={index}
                    cx={(index / (data.length - 1)) * 200}
                    cy={50 - (value / Math.max(...data)) * 40}
                    r="3"
                    fill="#3EC6C9"
                    className="animate-pulse"
                    style={{ animationDelay: `${index * 100}ms` }}
                />
            ))}
        </svg>
    </div>
);

// Circular Progress Component
const CircularProgress: React.FC<{
    percentage: number;
    size?: number;
    showAnimation?: boolean
}> = ({ percentage, size = 120, showAnimation = true }) => {
    const radius = (size - 10) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg
                width={size}
                height={size}
                className={showAnimation ? "animate-spin" : ""}
                style={showAnimation ? { animationDuration: '8s', animationDirection: 'reverse' } : {}}
                aria-label={`Progress: ${percentage}%`}
            >
                <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3EC6C9" />
                        <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                </defs>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#f1f5f9"
                    strokeWidth="12"
                    fill="transparent"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="url(#progressGradient)"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    className="transition-all duration-1000 ease-out"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(62, 198, 201, 0.3))' }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                    {percentage}%
                </span>
                <span className="text-xs text-gray-500">Growth</span>
            </div>
        </div>
    );
};

// Glowing Card Component
const GlowingCard: React.FC<{
    children: React.ReactNode;
    className?: string;
    glowColor?: string
}> = ({ children, className = "", glowColor = "rgba(62, 198, 201, 0.1)" }) => (
    <div
        className={`bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 ${className}`}
        style={{
            boxShadow: `0 4px 20px ${glowColor}, 0 1px 3px rgba(0, 0, 0, 0.1)`,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
    >
        {children}
    </div>
);

// Sidebar Component
const Sidebar: React.FC<{
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    activeNav: string;
    setActiveNav: (nav: string) => void;
    navigationItems: NavigationItem[];
}> = ({ sidebarOpen, setSidebarOpen, activeNav, setActiveNav, navigationItems }) => (
    <aside
        className={`${sidebarOpen ? 'w-72' : 'w-20'} 
            bg-white border-r border-gray-200 
            transition-all duration-500 ease-in-out 
            shadow-xl sticky top-0 left-0 h-screen 
            flex flex-col z-30`}
    >
        <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-teal-400 to-cyan-500 opacity-20" />

        <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute top-8 -right-4 z-40 w-8 h-8 flex items-center justify-center 
                       rounded-full bg-white border border-gray-300 shadow-md 
                       hover:shadow-lg hover:scale-105 transition-all duration-300"
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>

        <div className="p-6 flex-shrink-0">
            <div className={`flex items-center gap-3 transition-all duration-300 ${!sidebarOpen && 'justify-center'}`}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                </div>
                {sidebarOpen && (
                    <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                        FitTrack
                    </span>
                )}
            </div>
        </div>

        <nav className="flex-1 px-2 pb-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="space-y-2 px-2">
                {navigationItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveNav(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left 
                                   transition-all duration-300 relative overflow-hidden group 
                                   ${activeNav === item.id
                                ? 'text-white shadow-lg transform scale-105'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:transform hover:scale-105'
                            }`}
                        style={activeNav === item.id ? {
                            background: 'linear-gradient(135deg, #3EC6C9 0%, #22d3ee 100%)',
                            boxShadow: '0 8px 25px rgba(62, 198, 201, 0.3)'
                        } : {}}
                        aria-current={activeNav === item.id ? 'page' : undefined}
                    >
                        <item.icon className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${!sidebarOpen && 'mx-auto'}`} />
                        {sidebarOpen && (
                            <span className="font-medium transition-all duration-300">{item.label}</span>
                        )}
                        {activeNav === item.id && (
                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl" />
                        )}
                    </button>
                ))}
            </div>
        </nav>

        <div className="p-6 border-t border-gray-200 flex-shrink-0">
            <button
                className={`w-full flex items-center gap-3 px-4 py-3 text-gray-600 
                           hover:bg-red-50 hover:text-red-600 rounded-xl 
                           transition-all duration-300 ${!sidebarOpen && 'justify-center'}`}
                aria-label="Log out"
            >
                <LogOut className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">Log Out</span>}
            </button>
        </div>
    </aside>
);

// Header Component
const Header: React.FC<{ activeNav: string }> = ({ activeNav }) => {
    const getPageTitle = () => {
        switch (activeNav) {
            case 'dashboard':
                return 'Business Dashboard';
            case 'users':
                return 'Users Management';
            case 'diet':
                return 'Diet & Nutrition';
            case 'exercise':
                return 'Exercise Tracking';
            default:
                return activeNav.charAt(0).toUpperCase() + activeNav.slice(1);
        }
    };

    return (
        <header className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-500">Seattle, United States</span>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-label="Active" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                        {getPageTitle()}
                    </h1>
                    <p className="text-gray-500 mt-1 flex items-center gap-2">
                        Thursday, 22 Sep
                        <span className="px-2 py-1 bg-teal-100 text-teal-600 rounded-full text-xs font-medium">Live</span>
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-6">
                <button className="relative" aria-label="Notifications">
                    <Bell className="w-6 h-6 text-gray-400 hover:text-teal-500 transition-colors" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" aria-label="New notifications" />
                </button>
                <div className="text-right">
                    <p className="font-semibold text-gray-900">Maksym K.</p>
                    <p className="text-sm text-gray-500">example@mail.com</p>
                </div>
                <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 p-0.5">
                        <div className="w-full h-full rounded-full overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                                alt="User profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full" aria-label="Online" />
                </div>
                <button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-xl 
                                 flex items-center gap-2 hover:from-teal-600 hover:to-cyan-600 
                                 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    <Plus className="w-5 h-5" />
                    <span className="font-medium">Add Activity</span>
                </button>
            </div>
        </header>
    );
};

// Stats Card Component
const StatsCard: React.FC<{ stat: StatData; index: number }> = ({ stat, index }) => (
    <GlowingCard
        className={`p-6 relative overflow-hidden bg-gradient-to-br ${stat.bgGradient} hover:scale-105 transform transition-all duration-500`}
        glowColor={index === 0 ? "rgba(16, 185, 129, 0.15)" :
            index === 1 ? "rgba(239, 68, 68, 0.15)" :
                index === 2 ? "rgba(59, 130, 246, 0.15)" : "rgba(6, 182, 212, 0.15)"}
    >
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-10 translate-x-10" />

        <div className="flex items-center justify-between mb-4 relative z-10">
            <div className={`p-3 bg-gradient-to-br ${stat.iconBg} rounded-xl shadow-sm`}>
                <stat.icon className="w-6 h-6 text-gray-700" />
            </div>
            <div className="flex items-center gap-1">
                {stat.trendDirection === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${stat.trendDirection === 'up' ? 'text-green-600' : 'text-red-600'}`}>{stat.trend}</span>
            </div>
        </div>

        <div className="relative z-10">
            <p className="text-gray-600 text-sm font-medium mb-2">{stat.title}</p>
            <div className="flex items-end gap-2 mb-3">
                <span className="text-3xl font-bold text-gray-900">
                    {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                </span>
                <span className="text-sm text-gray-600 mb-1">{stat.unit}</span>
            </div>
        </div>

        {stat.chart && (
            <AnimatedLineChart data={stat.chart} gradient={index} />
        )}
        {stat.percentage && (
            <div className="mt-4 flex items-center justify-center">
                <CircularProgress percentage={stat.percentage} size={80} showAnimation={false} />
            </div>
        )}
    </GlowingCard>
);

// Revenue Chart Component
const RevenueChart: React.FC<{ data: RevenueData[] }> = ({ data }) => (
    <GlowingCard className="p-8 mb-8" glowColor="rgba(62, 198, 201, 0.1)">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Total Revenue</h3>
                    <p className="text-gray-500">Monthly revenue comparison</p>
                </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl">
                <span className="text-sm font-medium text-gray-600">2022</span>
            </div>
        </div>

        <div className="relative h-64 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
            <div className="flex items-end justify-between h-full relative z-10 gap-4">
                {data.map((item, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                        <div className="flex items-end gap-2 mb-4 w-full">
                            <div
                                className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-1000 ease-out"
                                style={{
                                    height: `${(item.current / Math.max(...data.map(d => d.current))) * 150}px`,
                                    width: '20px'
                                }}
                            />
                            <div
                                className="bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-lg transition-all duration-1000 ease-out"
                                style={{
                                    height: `${(item.previous / Math.max(...data.map(d => Math.max(d.current, d.previous)))) * 150}px`,
                                    width: '20px'
                                }}
                            />
                        </div>
                        <span className="text-sm font-medium text-gray-600">{item.month}</span>
                    </div>
                ))}
            </div>
            <div className="absolute bottom-4 right-6 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="font-medium text-gray-700">2021</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full" />
                    <span className="font-medium text-gray-700">2020</span>
                </div>
            </div>
        </div>
    </GlowingCard>
);

// Company Growth Component
const CompanyGrowthCard: React.FC = () => (
    <GlowingCard className="p-8" glowColor="rgba(62, 198, 201, 0.1)">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-teal-100 to-cyan-100 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Company Growth</h3>
                    <p className="text-gray-500">Overall business performance</p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center">
                <CircularProgress percentage={78} size={180} showAnimation={true} />
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                    <div className="flex items-center gap-3">
                        <DollarSign className="w-5 h-5 text-blue-600" />
                        <div>
                            <p className="font-semibold text-gray-900">2022</p>
                            <p className="text-sm text-gray-500">Current Year</p>
                        </div>
                    </div>
                    <span className="text-xl font-bold text-gray-900">$32.5k</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl">
                    <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-teal-600" />
                        <div>
                            <p className="font-semibold text-gray-900">2021</p>
                            <p className="text-sm text-gray-500">Previous Year</p>
                        </div>
                    </div>
                    <span className="text-xl font-bold text-gray-900">$41.2k</span>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-2">Company Growth Rate</p>
                    <p className="text-2xl font-bold text-green-600">62%</p>
                </div>
            </div>
        </div>
    </GlowingCard>
);

// Order Statistics Component
const OrderStatsCard: React.FC<{ orderStats: OrderStats[] }> = ({ orderStats }) => (
    <GlowingCard className="p-8" glowColor="rgba(62, 198, 201, 0.1)">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
                    <ShoppingCart className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Order Statistics</h3>
                    <p className="text-gray-500">42.82k Total Sales</p>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="relative w-24 h-24">
                    <CircularProgress percentage={38} size={96} showAnimation={false} />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <span className="text-lg font-bold text-gray-900">38%</span>
                            <p className="text-xs text-gray-500">Weekly</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-gray-900">8,258</span>
                <span className="text-sm text-gray-500">Total Orders</span>
            </div>
        </div>

        <div className="space-y-4">
            {orderStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 ${stat.color} rounded-lg`}>
                            <stat.icon className="w-4 h-4 text-gray-700" />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">{stat.category}</p>
                            <p className="text-sm text-gray-500">{stat.description}</p>
                        </div>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{stat.value}</span>
                </div>
            ))}
        </div>
    </GlowingCard>
);

// Transactions Component
const TransactionsCard: React.FC<{ transactions: TransactionData[] }> = ({ transactions }) => (
    <GlowingCard className="p-8" glowColor="rgba(62, 198, 201, 0.1)">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl">
                    <CreditCard className="w-6 h-6 text-green-600" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Transactions</h3>
                    <p className="text-gray-500">Recent payment activities</p>
                </div>
            </div>
        </div>

        <div className="space-y-4">
            {transactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 ${transaction.color} rounded-lg`}>
                            <transaction.icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">{transaction.method}</p>
                            <p className="text-sm text-gray-500">{transaction.type}</p>
                        </div>
                    </div>
                    <span className={`text-lg font-bold ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)} USD
                    </span>
                </div>
            ))}
        </div>
    </GlowingCard>
);

// Profit Report Component
const ProfitReportCard: React.FC = () => (
    <GlowingCard className="p-8" glowColor="rgba(62, 198, 201, 0.1)">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl">
                    <PieChart className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Profit Report</h3>
                    <p className="text-gray-500">YEAR 2021</p>
                </div>
            </div>
            <div className="flex items-center gap-1">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-600">68.2%</span>
            </div>
        </div>

        <div className="mb-6">
            <span className="text-4xl font-bold text-gray-900">$84,686k</span>
        </div>

        <div className="relative h-32 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 350 100" aria-label="Profit trend chart">
                <defs>
                    <linearGradient id="profitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#ea580c" stopOpacity="0.6" />
                    </linearGradient>
                </defs>
                <polyline
                    fill="none"
                    stroke="url(#profitGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    points="20,70 70,50 120,60 170,40 220,45 270,30 320,35"
                />
                {[20, 70, 120, 170, 220, 270, 320].map((x, index) => {
                    const y = [70, 50, 60, 40, 45, 30, 35][index];
                    return (
                        <circle
                            key={index}
                            cx={x}
                            cy={y}
                            r="4"
                            fill="#f59e0b"
                            className="drop-shadow-sm"
                        />
                    );
                })}
            </svg>
        </div>
    </GlowingCard>
);

// App Usage Stats Component
const AppUsageStats: React.FC = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlowingCard className="p-6" glowColor="rgba(239, 68, 68, 0.1)">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                    <ArrowDownRight className="w-5 h-5 text-red-600" />
                </div>
                <div>
                    <h4 className="font-semibold text-gray-900">Uninstalls</h4>
                    <p className="text-sm text-gray-500">App removals</p>
                </div>
            </div>
            <div className="flex items-end gap-2 mb-2">
                <span className="text-3xl font-bold text-gray-900">2,456</span>
            </div>
            <div className="flex items-center gap-1">
                <ArrowDownRight className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-red-600">-14.82%</span>
            </div>
        </GlowingCard>

        <GlowingCard className="p-6" glowColor="rgba(16, 185, 129, 0.1)">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                    <h4 className="font-semibold text-gray-900">Exercises</h4>
                    <p className="text-sm text-gray-500">Completed workouts</p>
                </div>
            </div>
            <div className="flex items-end gap-2 mb-2">
                <span className="text-3xl font-bold text-gray-900">3645</span>
            </div>
            <div className="flex items-center gap-1">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-600">+28.14%</span>
            </div>
        </GlowingCard>
    </div>
);

// Dashboard Component (Updated with business data)
const DashboardComponent: React.FC<{
    statsData: StatData[];
    animatedValues: Record<string, number>
}> = ({ statsData }) => {
    const revenueData: RevenueData[] = [
        { month: 'Jan', current: 16, previous: -15 },
        { month: 'Feb', current: 4, previous: -8 },
        { month: 'Mar', current: 12, previous: -10 },
        { month: 'Apr', current: 27, previous: -15 },
        { month: 'May', current: 17, previous: -5 },
        { month: 'Jun', current: 10, previous: -18 },
        { month: 'Jul', current: 6, previous: -16 }
    ];

    const orderStats: OrderStats[] = [
        { category: 'Electronic', value: '82.5k', description: 'Mobile, Earbuds, TV', icon: Zap, color: 'bg-purple-100' },
        { category: 'Fashion', value: '23.8k', description: 'T-shirt, Jeans, Shoes', icon: Users, color: 'bg-green-100' },
        { category: 'Decor', value: '849k', description: 'Fine Art, Dining', icon: Home, color: 'bg-cyan-100' },
        { category: 'Sports', value: '99', description: 'Football, Cricket Kit', icon: Target, color: 'bg-gray-100' }
    ];

    const transactions: TransactionData[] = [
        { id: '1', type: 'Send money', method: 'Paypal', amount: 82.6, icon: CreditCard, color: 'bg-red-500' },
        { id: '2', type: "Mac'D", method: 'Wallet', amount: 270.69, icon: Droplets, color: 'bg-purple-500' },
        { id: '3', type: 'Refund', method: 'Transfer', amount: 637.91, icon: Timer, color: 'bg-cyan-500' },
        { id: '4', type: 'Ordered Food', method: 'Credit Card', amount: -838.71, icon: CreditCard, color: 'bg-green-500' },
        { id: '5', type: 'Starbucks', method: 'Wallet', amount: 203.33, icon: Droplets, color: 'bg-purple-500' },
        { id: '6', type: 'Ordered Food', method: 'Mastercard', amount: -92.45, icon: CreditCard, color: 'bg-yellow-500' }
    ];

    return (
        <div className="space-y-8">
            {/* Main Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {statsData.map((stat, index) => (
                    <StatsCard key={index} stat={stat} index={index} />
                ))}
            </div>

            {/* Revenue Chart and Company Growth */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <RevenueChart data={revenueData} />
                <CompanyGrowthCard />
            </div>

            {/* Order Stats and Profit Report */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <OrderStatsCard orderStats={orderStats} />
                <ProfitReportCard />
            </div>

            {/* App Usage Stats */}
            <AppUsageStats />

            {/* Transactions */}
            <TransactionsCard transactions={transactions} />
        </div>
    );
};

// Main Dashboard Component
const FitnessActivityDashboard: React.FC = () => {
    const [activeNav, setActiveNav] = useState<string>('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});

    // Animation for counters
    useEffect(() => {
        const animateValue = (key: string, start: number, end: number, duration: number): void => {
            const startTime = performance.now();
            const animate = (currentTime: number): void => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const current = Math.floor(start + (end - start) * progress);
                setAnimatedValues(prev => ({ ...prev, [key]: current }));
                if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
        };

        const timeoutId = setTimeout(() => {
            animateValue('totalBalance', 0, 459, 2000);
            animateValue('totalSales', 0, 42820, 1800);
            animateValue('totalOrders', 0, 8258, 1500);
            animateValue('expenses', 0, 65, 1200);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, []);

    // Data configurations
    const navigationItems: NavigationItem[] = [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'diet', label: 'Diet', icon: Package },
        { id: 'exercise', label: 'Exercise', icon: Dumbbell },
        { id: 'mindMeditation', label: 'Mind / Meditation', icon: BookOpen },
        { id: 'cbt', label: 'CBT', icon: BookOpen },
        { id: 'story', label: 'Story', icon: BookOpen },
        { id: 'coupon', label: 'Coupon', icon: Ticket },
        { id: 'blog', label: 'Blog', icon: FileText },
        { id: 'foodPlans', label: 'Food Plans', icon: ClipboardList },
        { id: 'packages', label: 'Packages', icon: Layers },
        { id: 'todos', label: 'Todos', icon: ListTodo },
        { id: 'category', label: 'Category', icon: Layers },
        { id: 'plans', label: 'Plans', icon: ClipboardList },
        { id: 'deleteFood', label: 'Delete Food', icon: Box },
        { id: 'leftUsers', label: 'Left Users', icon: LogOut },
    ];

    const statsData: StatData[] = [
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

    // Render content based on active navigation
    const renderContent = () => {
        switch (activeNav) {
            case 'dashboard':
                return <DashboardComponent statsData={statsData} animatedValues={animatedValues} />;
            case 'users':
                return <UsersComponent />;
            case 'diet':
                return <DietComponent />;
            case 'exercise':
                return <ExerciseComponent />;
            case 'mindMeditation':
                return <GenericComponent title="Mind / Meditation" icon={BookOpen} description="Mindfulness and meditation practices" />;
            case 'cbt':
                return <GenericComponent title="CBT (Cognitive Behavioral Therapy)" icon={BookOpen} description="Therapeutic exercises and resources" />;
            case 'story':
                return <GenericComponent title="Stories" icon={BookOpen} description="Motivational stories and content" />;
            case 'coupon':
                return <GenericComponent title="Coupons" icon={Ticket} description="Discount codes and promotions" />;
            case 'blog':
                return <GenericComponent title="Blog" icon={FileText} description="Articles and blog posts" />;
            case 'foodPlans':
                return <GenericComponent title="Food Plans" icon={ClipboardList} description="Meal planning and nutrition guides" />;
            case 'packages':
                return <GenericComponent title="Packages" icon={Layers} description="Subscription packages and plans" />;
            case 'todos':
                return <GenericComponent title="Todos" icon={ListTodo} description="Task management and reminders" />;
            case 'category':
                return <GenericComponent title="Categories" icon={Layers} description="Content categorization and organization" />;
            case 'plans':
                return <GenericComponent title="Plans" icon={ClipboardList} description="Workout and diet plans" />;
            case 'deleteFood':
                return <GenericComponent title="Delete Food" icon={Box} description="Remove food items from database" />;
            case 'leftUsers':
                return <GenericComponent title="Left Users" icon={LogOut} description="Users who have left the platform" />;
            default:
                return <DashboardComponent statsData={statsData} animatedValues={animatedValues} />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 flex relative">
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                activeNav={activeNav}
                setActiveNav={setActiveNav}
                navigationItems={navigationItems}
            />

            <main className="flex-1 overflow-x-hidden">
                <div className="p-8">
                    <Header activeNav={activeNav} />
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default FitnessActivityDashboard;