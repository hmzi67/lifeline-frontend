import React, { useState, useEffect } from 'react';
import {
    Heart,
    Flame,
    Footprints,
    Droplets,
    MapPin,
    Plus,
    Settings,
    User,
    Play,
    Pause,
    SkipForward,
    SkipBack,
    Shuffle,
    Music,
    ExternalLink,
    Zap,
    Home,
    Trophy,
    Timer,
    Calendar,
    BarChart3,
    UserCircle,
    LogOut,
    Bell,
    ChevronUp,
    ChevronDown,
    Menu,
    X,
    TrendingUp,
    Activity,
    Target,
    Award
} from 'lucide-react';

const FitnessActivityDashboard: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const [activeNav, setActiveNav] = useState<string>('overview');
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});

    // Animation for counters with proper typing
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
            animateValue('steps', 0, 11222, 2000);
            animateValue('calories', 0, 1345, 1800);
            animateValue('minutes', 0, 125, 1500);
            animateValue('water', 0, 3, 1200);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, []);

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

    const statsData: StatData[] = [
        {
            title: 'Active Minutes',
            value: animatedValues.minutes || 0,
            unit: 'Min',
            icon: Timer,
            gradient: 'from-emerald-400 to-teal-500',
            bgGradient: 'from-emerald-50 to-teal-50',
            iconBg: 'from-emerald-100 to-teal-100',
            chart: [40, 60, 30, 80, 45, 70, 35, 90, 25, 55, 75, 40],
            trend: '+12%'
        },
        {
            title: 'Calories Burned',
            value: animatedValues.calories || 0,
            unit: 'Kcal',
            icon: Flame,
            gradient: 'from-orange-400 to-red-500',
            bgGradient: 'from-orange-50 to-red-50',
            iconBg: 'from-orange-100 to-red-100',
            chart: [60, 80, 45, 70, 55, 85, 40, 65, 50, 75, 35, 60],
            trend: '+8%'
        },
        {
            title: 'Steps Taken',
            value: animatedValues.steps || 0,
            unit: 'Steps',
            icon: Footprints,
            gradient: 'from-blue-400 to-purple-500',
            bgGradient: 'from-blue-50 to-purple-50',
            iconBg: 'from-blue-100 to-purple-100',
            chart: [30, 45, 60, 40, 70, 55, 80, 45, 65, 50, 75, 40],
            trend: '+15%'
        },
        {
            title: 'Water Intake',
            value: `${animatedValues.water || 0}/10`,
            unit: 'Glasses',
            icon: Droplets,
            gradient: 'from-cyan-400 to-blue-500',
            bgGradient: 'from-cyan-50 to-blue-50',
            iconBg: 'from-cyan-100 to-blue-100',
            percentage: 75,
            trend: '+5%'
        }
    ];

    const navigationItems: NavigationItem[] = [
        { id: 'overview', label: 'Overview', icon: Home },
        { id: 'competition', label: 'Competition', icon: Trophy },
        { id: 'timer', label: 'Timer', icon: Timer },
        { id: 'energy', label: 'Energy', icon: Zap },
        { id: 'calendar', label: 'Calendar', icon: Calendar },
        { id: 'distances', label: 'Distances', icon: BarChart3 },
        { id: 'profile', label: 'Profile', icon: UserCircle },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    const weekData: WeekData[] = [
        { day: 'Mon', value: 60, label: '18', active: false },
        { day: 'Tue', value: 80, label: '19', active: false },
        { day: 'Wed', value: 40, label: '20', active: false },
        { day: 'Thu', value: 90, label: '21', active: true },
        { day: 'Fri', value: 70, label: '22', active: false },
        { day: 'Sat', value: 50, label: '23', active: false },
        { day: 'Sun', value: 85, label: '24', active: false }
    ];

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

    const CircularProgress: React.FC<{ percentage: number; size?: number; showAnimation?: boolean }> = ({
        percentage,
        size = 120,
        showAnimation = true
    }) => {
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
                    <span className="text-xs text-gray-500">Complete</span>
                </div>
            </div>
        );
    };

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 flex relative">
            {/* Enhanced Fixed Sidebar */}
            <aside
                className={`${sidebarOpen ? 'w-72' : 'w-20'} 
                    bg-white border-r border-gray-200 
                    transition-all duration-500 ease-in-out 
                    shadow-xl sticky top-0 left-0 h-screen 
                    flex flex-col z-30`}
            >
                {/* Decorative gradient line */}
                <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-teal-400 to-cyan-500 opacity-20" />

                {/* Toggle Button */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="absolute top-8 -right-4 z-40 w-8 h-8 flex items-center justify-center 
                               rounded-full bg-white border border-gray-300 shadow-md 
                               hover:shadow-lg hover:scale-105 transition-all duration-300"
                    aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                >
                    {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>

                {/* Logo */}
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

                {/* Navigation */}
                <nav className="flex-1 px-2 pb-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    <div className="space-y-2">
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

                {/* Logout */}
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

            {/* Main Content Area */}
            <main className="flex-1 overflow-x-hidden">
                <div className="p-8">
                    {/* Header */}
                    <header className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-6">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <MapPin className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm text-gray-500">Seattle, United States</span>
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-label="Active" />
                                </div>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                                    Activity Tracking
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

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Stats Grid */}
                        <div className="lg:col-span-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                                {statsData.map((stat, index) => (
                                    <GlowingCard
                                        key={index}
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
                                                <TrendingUp className="w-4 h-4 text-green-500" />
                                                <span className="text-sm font-medium text-green-600">{stat.trend}</span>
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
                                ))}
                            </div>

                            {/* Activity Calendar */}
                            <GlowingCard className="p-8 mb-8" glowColor="rgba(62, 198, 201, 0.1)">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-gradient-to-r from-teal-100 to-cyan-100 rounded-xl">
                                            <Calendar className="w-6 h-6 text-teal-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">Weekly Progress</h3>
                                            <p className="text-gray-500">Track your daily achievements</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl">
                                        <span className="text-sm font-medium text-gray-600">Sep 18 - Sep 24</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-7 gap-4 mb-8">
                                    {weekData.map((data, index) => (
                                        <div key={index} className="text-center">
                                            <div className="text-sm font-medium text-gray-500 mb-3">{data.day}</div>
                                            <button className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold 
                                                              transition-all duration-300 transform hover:scale-110 
                                                              ${data.active
                                                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
                                                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                                }`}
                                                aria-label={`${data.day} ${data.label}`}
                                                aria-pressed={data.active}
                                            >
                                                {data.label}
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {/* Enhanced Progress Chart */}
                                <div className="relative h-40 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-cyan-500/5" />
                                    <svg className="w-full h-full relative z-10" viewBox="0 0 350 120" aria-label="Weekly progress chart">
                                        <defs>
                                            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#3EC6C9" stopOpacity="0.8" />
                                                <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.6" />
                                                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
                                            </linearGradient>
                                            <filter id="glow">
                                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                                <feMerge>
                                                    <feMergeNode in="coloredBlur" />
                                                    <feMergeNode in="SourceGraphic" />
                                                </feMerge>
                                            </filter>
                                        </defs>
                                        <polyline
                                            fill="none"
                                            stroke="url(#chartGradient)"
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                            points={weekData.map((data, index) =>
                                                `${(index / (weekData.length - 1)) * 320 + 15},${100 - (data.value / 100) * 70}`
                                            ).join(' ')}
                                            filter="url(#glow)"
                                        />
                                        {weekData.map((data, index) => (
                                            <circle
                                                key={index}
                                                cx={(index / (weekData.length - 1)) * 320 + 15}
                                                cy={100 - (data.value / 100) * 70}
                                                r="6"
                                                fill={data.active ? "#3EC6C9" : "#94a3b8"}
                                                className="drop-shadow-lg"
                                            />
                                        ))}
                                    </svg>
                                    <div className="absolute bottom-4 left-6 flex items-center gap-6 text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-red-400 rounded-full" />
                                            <span className="font-medium text-gray-700">-5.6 Done</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-teal-400 rounded-full" />
                                            <span className="font-medium text-gray-700">4.4 Left</span>
                                        </div>
                                    </div>
                                </div>
                            </GlowingCard>

                            {/* Enhanced Running Activity */}
                            <GlowingCard className="p-8" glowColor="rgba(62, 198, 201, 0.1)">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
                                            <Activity className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">Running with Kate</h3>
                                            <p className="text-gray-500">9 July, 2022 • Morning Session</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-xl">
                                        <Award className="w-4 h-4 text-green-600" />
                                        <span className="text-sm font-medium text-green-600">Personal Best</span>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl h-64 relative overflow-hidden mb-8">
                                    <img
                                        src="https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=800&h=400&fit=crop"
                                        alt="Running route map"
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3">
                                        <p className="font-semibold text-gray-900">Interval Running</p>
                                        <p className="text-sm text-gray-600">High Intensity</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-8">
                                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
                                        <Target className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                                        <p className="text-sm text-gray-600 mb-2">Double Walking Time</p>
                                        <p className="text-3xl font-bold text-gray-900">34 min</p>
                                    </div>
                                    <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                                        <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                                        <p className="text-sm text-gray-600 mb-2">Total Distance</p>
                                        <p className="text-3xl font-bold text-gray-900">10 km</p>
                                    </div>
                                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl">
                                        <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
                                        <p className="text-sm text-gray-600 mb-2">Average Speed</p>
                                        <p className="text-3xl font-bold text-gray-900">6.1 p/km</p>
                                    </div>
                                </div>
                            </GlowingCard>
                        </div>

                        {/* Enhanced Right Sidebar */}
                        <div className="space-y-8">
                            {/* Total Time with Enhanced Animation */}
                            <GlowingCard className="p-6" glowColor="rgba(62, 198, 201, 0.15)">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <Timer className="w-5 h-5 text-teal-600" />
                                        <span className="font-medium text-gray-900">Total Time</span>
                                    </div>
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-label="Active" />
                                </div>
                                <div className="text-center mb-6">
                                    <span className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                                        2h 45m
                                    </span>
                                    <p className="text-sm text-gray-500 mt-1">Active Today</p>
                                </div>
                                <div className="flex justify-between items-end h-20 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4">
                                    {weekData.map((data, index) => (
                                        <div key={index} className="flex flex-col items-center gap-2">
                                            <div
                                                className={`w-5 rounded-sm transition-all duration-500 hover:scale-110 
                                                           ${data.active ? 'bg-gradient-to-t from-teal-500 to-cyan-400' : 'bg-gray-300'}`}
                                                style={{
                                                    height: `${(data.value / 100) * 50}px`,
                                                    animationDelay: `${index * 100}ms`
                                                }}
                                                aria-label={`${data.day}: ${data.value}%`}
                                            />
                                            <span className="text-xs text-gray-500">{data.day.slice(0, 3)}</span>
                                        </div>
                                    ))}
                                </div>
                            </GlowingCard>

                            {/* Enhanced Activity Progress */}
                            <GlowingCard className="p-6" glowColor="rgba(139, 69, 19, 0.1)">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-gray-900">Activity Progress</h3>
                                    <div className="px-3 py-1 bg-teal-100 text-teal-600 rounded-full text-xs font-medium">
                                        75% Complete
                                    </div>
                                </div>
                                <div className="flex items-center justify-center mb-8">
                                    <CircularProgress percentage={75} size={160} />
                                </div>
                                <div className="space-y-4 mb-6">
                                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-4 h-4 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full shadow-sm" />
                                            <span className="text-sm font-medium text-gray-700">Daily Goals</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-gray-900">55%</span>
                                            <TrendingUp className="w-4 h-4 text-green-500" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full shadow-sm" />
                                            <span className="text-sm font-medium text-gray-700">Weekly Target</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-gray-900">20%</span>
                                            <TrendingUp className="w-4 h-4 text-green-500" />
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl 
                                                 flex items-center justify-center gap-2 hover:border-teal-300 
                                                 hover:bg-teal-50 transition-all duration-300 group">
                                    <Plus className="w-5 h-5 text-gray-400 group-hover:text-teal-500" />
                                    <span className="font-medium text-gray-600 group-hover:text-teal-600">Create Activity</span>
                                </button>
                            </GlowingCard>

                            {/* Enhanced Music Player */}
                            <GlowingCard className="p-6" glowColor="rgba(236, 72, 153, 0.1)">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg">
                                        <Music className="w-5 h-5 text-pink-600" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-pulse" />
                                        <span className="text-sm font-medium text-gray-600">Now Playing</span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2 font-semibold">PARTY PLAYLIST</p>
                                    <h4 className="text-xl font-bold text-gray-900 mb-1">Great and Marvelous</h4>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">TODAY • 24 TRACKS</p>
                                </div>

                                <div className="space-y-3 mb-8">
                                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 
                                                  rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all duration-300 
                                                  cursor-pointer group">
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl 
                                                      flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <Music className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-gray-900">Pink Rabbits</p>
                                            <p className="text-xs text-gray-500">The National • 3:42</p>
                                        </div>
                                        <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center 
                                                         shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110"
                                            aria-label="Play Pink Rabbits">
                                            <Play className="w-4 h-4 text-gray-600" />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 
                                                  rounded-xl border-2 border-teal-100">
                                        <div className="w-12 h-12 bg-gradient-to-r from-pink-100 to-pink-200 rounded-xl 
                                                      flex items-center justify-center animate-pulse">
                                            <Music className="w-6 h-6 text-pink-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-gray-900">Guilty Party</p>
                                            <p className="text-xs text-gray-500">Currently Playing • 2:15</p>
                                        </div>
                                        <button className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full 
                                                         flex items-center justify-center shadow-lg"
                                            aria-label="Pause current track">
                                            <Pause className="w-4 h-4 text-white" />
                                        </button>
                                    </div>
                                </div>

                                {/* Enhanced Music Controls */}
                                <div className="flex items-center justify-center gap-6">
                                    <button className="text-gray-400 hover:text-teal-500 transition-all duration-300 hover:scale-110"
                                        aria-label="Shuffle">
                                        <Shuffle className="w-5 h-5" />
                                    </button>
                                    <button className="text-gray-400 hover:text-teal-500 transition-all duration-300 hover:scale-110"
                                        aria-label="Previous track">
                                        <SkipBack className="w-6 h-6" />
                                    </button>
                                    <button
                                        className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-4 rounded-full 
                                                 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        aria-label={isPlaying ? "Pause" : "Play"}
                                    >
                                        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                                    </button>
                                    <button className="text-gray-400 hover:text-teal-500 transition-all duration-300 hover:scale-110"
                                        aria-label="Next track">
                                        <SkipForward className="w-6 h-6" />
                                    </button>
                                    <button className="text-gray-400 hover:text-teal-500 transition-all duration-300 hover:scale-110"
                                        aria-label="Repeat">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M4 2a1 1 0 011 1v1.1l12 5.4c.6.3 1 .9 1 1.5s-.4 1.2-1 1.5L5 17.9V19a1 1 0 11-2 0V3a1 1 0 011-1z" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Progress Bar */}
                                <div className="mt-6 space-y-2">
                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full animate-pulse"
                                            style={{ width: '45%' }}
                                            role="progressbar"
                                            aria-valuenow={45}
                                            aria-valuemin={0}
                                            aria-valuemax={100} />
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>1:05</span>
                                        <span>2:42</span>
                                    </div>
                                </div>
                            </GlowingCard>

                            {/* Quick Stats */}
                            <GlowingCard className="p-6" glowColor="rgba(16, 185, 129, 0.1)">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                                        <Heart className="w-6 h-6 text-green-600 mx-auto mb-2" />
                                        <p className="text-xs text-gray-600 mb-1">Avg HR</p>
                                        <p className="text-lg font-bold text-gray-900">142 bpm</p>
                                    </div>
                                    <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
                                        <Zap className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                                        <p className="text-xs text-gray-600 mb-1">Energy</p>
                                        <p className="text-lg font-bold text-gray-900">87%</p>
                                    </div>
                                </div>
                            </GlowingCard>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FitnessActivityDashboard;
