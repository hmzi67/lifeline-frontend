import React from 'react';
import {
    MapPin,
    Bell,
    Plus,
    LogOut,
    Menu,
    X,
    Zap,
    User,
} from 'lucide-react';
import type { NavigationItem } from '@/types';
import { useAuthStore } from '@/store/useAuthStore';

// Logout Button Component
const LogoutButton: React.FC<{ sidebarOpen: boolean }> = ({ sidebarOpen }) => {
    const logout = useAuthStore((s) => s.logout);
    const loading = useAuthStore((s) => s.loading);

    return (
        <button
            onClick={() => logout()}
            disabled={loading}
            className={`w-full flex items-center gap-3 px-4 py-3 text-gray-600 
                       hover:bg-red-50 hover:text-red-600 rounded-xl 
                       transition-all duration-300 disabled:opacity-60 ${!sidebarOpen && 'justify-center'}`}
            aria-label="Log out"
        >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Log Out</span>}
        </button>
    );
};

// Sidebar Component
export const Sidebar: React.FC<{
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
            <LogoutButton sidebarOpen={sidebarOpen} />
        </div>
    </aside>
);

// Header Component
export const Header: React.FC<{ activeNav: string }> = ({ activeNav }) => {
    const user = useAuthStore((s) => s.user);

    const displayName = user?.username ?? 'Admin';
    const displayEmail = user?.email ?? '';

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
                    {/* <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-500">Seattle, United States</span>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-label="Active" />
                    </div> */}
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                        {getPageTitle()}
                    </h1>
                    <p className="text-gray-500 mt-1 flex items-center gap-2">
                        {new Date().toDateString()}
                        <span className="px-2 py-1 bg-teal-100 text-teal-600 rounded-full text-xs font-medium">Live</span>
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-6">
                {/* <button className="relative" aria-label="Notifications">
                    <Bell className="w-6 h-6 text-gray-400 hover:text-teal-500 transition-colors" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" aria-label="New notifications" />
                </button> */}
                <div className="text-right">
                    <p className="font-semibold text-gray-900">{displayName}</p>
                    <p className="text-sm text-gray-500">{displayEmail}</p>
                </div>
                <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 p-0.5 flex items-center justify-center">
                        <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                            <User className="w-6 h-6 text-teal-500" />
                        </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full" aria-label="Online" />
                </div>
                {/* <button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-xl 
                                 flex items-center gap-2 hover:from-teal-600 hover:to-cyan-600 
                                 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    <Plus className="w-5 h-5" />
                    <span className="font-medium">Add Activity</span>
                </button> */}
            </div>
        </header>
    );
};