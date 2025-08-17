import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { Sidebar, Header } from '@/components/admin/layout';
import { UsersComponent, DietComponent, ExerciseComponent, GenericComponent } from '@/components/admin/pages';

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
                return <GenericComponent title="Coupons" icon={BookOpen} description="Discount codes and promotions" />;
            case 'blog':
                return <GenericComponent title="Blog" icon={BookOpen} description="Articles and blog posts" />;
            case 'foodPlans':
                return <GenericComponent title="Food Plans" icon={BookOpen} description="Meal planning and nutrition guides" />;
            case 'packages':
                return <GenericComponent title="Packages" icon={BookOpen} description="Subscription packages and plans" />;
            case 'todos':
                return <GenericComponent title="Todos" icon={BookOpen} description="Task management and reminders" />;
            case 'category':
                return <GenericComponent title="Categories" icon={BookOpen} description="Content categorization and organization" />;
            case 'plans':
                return <GenericComponent title="Plans" icon={BookOpen} description="Workout and diet plans" />;
            case 'deleteFood':
                return <GenericComponent title="Delete Food" icon={BookOpen} description="Remove food items from database" />;
            case 'leftUsers':
                return <GenericComponent title="Left Users" icon={BookOpen} description="Users who have left the platform" />;
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