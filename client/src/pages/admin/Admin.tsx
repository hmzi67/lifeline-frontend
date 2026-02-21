import React, { useState } from 'react';
import { Sidebar, Header } from '@/components/admin/layout';
import { UsersComponent, DietComponent, ExerciseComponent, BlogComponent, MeditationComponent, RoleComponent, BlogCategoryComponent, MealTypeComponent, ChallengeComponent } from '@/components/admin/pages';

import { navigationItems, getStatsData } from '@/components/admin/constants';
import { DashboardComponent } from '@/components/admin/dashboard';
import { useAnimation } from '@/hooks/useAnimation';

const FitnessActivityDashboard: React.FC = () => {
    const [activeNav, setActiveNav] = useState<string>('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const animatedValues = useAnimation();

    const statsData = getStatsData(animatedValues);

    // Render content based on active navigation
    const renderContent = () => {
        switch (activeNav) {
            case 'dashboard':
                return <DashboardComponent statsData={statsData} animatedValues={animatedValues} />;
            case 'users':
                return <UsersComponent />;
            case 'roles':
                return <RoleComponent />;
            case 'diet':
                return <DietComponent />;
            case 'mealTypes':
                return <MealTypeComponent />;
            case 'exercise':
                return <ExerciseComponent />;
            case 'challenges':
                return <ChallengeComponent />;
            case 'mindMeditation':
                return <MeditationComponent />;
            case 'blogCategories':
                return <BlogCategoryComponent />;
            case 'blog':
                return <BlogComponent />;
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