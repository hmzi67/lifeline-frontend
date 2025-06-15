import React from 'react';
import { Button } from '../ui/button';
import { TrendingUpIcon, TargetIcon, CalendarIcon } from 'lucide-react';

export const ProgressSection: React.FC = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
                    {/* Left Content - Text */}
                    <div className="space-y-8">
                        <div>
                            <p className="text-teal-600 font-semibold text-lg mb-4">PROGRESS TRACKING</p>
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                Track Your<br />
                                <span className="text-teal-600">Fitness,</span> See Your<br />
                                <span className="text-teal-600">Progress</span>
                            </h2>

                            <p className="text-xl text-gray-600 leading-relaxed mb-8">
                                Monitor your journey with comprehensive analytics and insights.
                                Visualize your progress, celebrate milestones, and stay motivated
                                with detailed tracking across all aspects of your wellness.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                                    <TrendingUpIcon className="w-6 h-6 text-teal-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Real-time Analytics</h4>
                                    <p className="text-gray-600">Get instant insights into your performance with live data tracking and analysis.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                                    <TargetIcon className="w-6 h-6 text-teal-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Goal Achievement</h4>
                                    <p className="text-gray-600">Set personalized goals and track your progress with detailed milestone tracking.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                                    <CalendarIcon className="w-6 h-6 text-teal-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Historical Data</h4>
                                    <p className="text-gray-600">Review your fitness journey with comprehensive historical data and trends.</p>
                                </div>
                            </div>
                        </div>

                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
                        >
                            Start Tracking
                        </Button>
                    </div>

                    {/* Right Content - Progress Dashboard */}
                    <div className="relative">
                        <div className="bg-gray-50 rounded-3xl p-8">
                            <img
                                src="/api/placeholder/500/600"
                                alt="Progress tracking dashboard"
                                className="w-full h-auto rounded-2xl shadow-lg"
                            />
                        </div>

                        {/* Floating Progress Cards */}
                        <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <span className="text-green-600 font-bold text-sm">85%</span>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-900">Weekly Goal</div>
                                    <div className="text-xs text-gray-500">4/5 workouts</div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <TrendingUpIcon className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-900">This Month</div>
                                    <div className="text-xs text-gray-500">+12% improvement</div>
                                </div>
                            </div>
                        </div>

                        {/* Progress Stats */}
                        <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl p-6 shadow-2xl text-white">
                            <div className="text-center">
                                <div className="text-3xl font-bold mb-2">28</div>
                                <div className="text-sm opacity-80">Day Streak</div>
                                <div className="mt-3 flex justify-center">
                                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                        <span className="text-yellow-300">🔥</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
