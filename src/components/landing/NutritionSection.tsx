import React from 'react';
import { Button } from '../ui/button';

export const NutritionSection: React.FC = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
                    {/* Left Content - Text */}
                    <div className="space-y-8">
                        <div>
                            <p className="text-teal-600 font-semibold text-lg mb-4">NUTRITION TRACKING</p>
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                Tracking your nutrition<br />
                                like it's your <span className="text-teal-600">secret</span><br />
                                weapon
                            </h2>

                            <p className="text-xl text-gray-600 leading-relaxed mb-8">
                                Transform your relationship with food through intelligent tracking and
                                personalized nutrition insights that adapt to your lifestyle and goals.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                                    <span className="text-teal-600 font-bold text-sm">✓</span>
                                </div>
                                <span className="text-gray-700 font-medium">Smart calorie and macro tracking</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                                    <span className="text-teal-600 font-bold text-sm">✓</span>
                                </div>
                                <span className="text-gray-700 font-medium">Personalized meal recommendations</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                                    <span className="text-teal-600 font-bold text-sm">✓</span>
                                </div>
                                <span className="text-gray-700 font-medium">Progress insights and analytics</span>
                            </div>
                        </div>

                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
                        >
                            Start Tracking
                        </Button>
                    </div>

                    {/* Right Content - Image and Stats */}
                    <div className="relative">
                        <div className="relative">
                            <img
                                src="/api/placeholder/500/600"
                                alt="Healthy nutrition bowl"
                                className="w-full h-auto rounded-2xl shadow-2xl"
                            />

                            {/* Stats Card */}
                            <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-2xl border border-gray-100">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-teal-600 mb-2">2345</div>
                                    <div className="text-gray-600 font-medium">Calories Today</div>
                                    <div className="flex items-center justify-center mt-3">
                                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="w-16 h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"></div>
                                        </div>
                                        <span className="ml-2 text-sm text-gray-500">80%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Recipe Card */}
                            <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <span className="text-orange-600 text-xl">🥗</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Today's Recipe</p>
                                        <p className="text-sm text-gray-500">Superfood Bowl</p>
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
