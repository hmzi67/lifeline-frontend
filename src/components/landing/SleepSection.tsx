import React from 'react';
import { Button } from '../ui/button';

export const SleepSection: React.FC = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
                    {/* Left Content - Sleep Visualization */}
                    <div className="relative">
                        <div className="relative bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                            <img
                                src="/api/placeholder/500/400"
                                alt="Sleep tracking interface"
                                className="w-full h-auto rounded-2xl"
                            />

                            {/* Sleep Stats Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                    <div className="text-center">
                                        <div className="text-3xl mb-2">🌙</div>
                                        <div className="text-2xl font-bold text-blue-300 mb-1">7h 32m</div>
                                        <div className="text-sm text-blue-200">Last Night</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Sleep Quality Card */}
                        <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-2xl">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                                    <span className="text-indigo-600 text-xl">⭐</span>
                                </div>
                                <div>
                                    <div className="text-lg font-bold text-gray-900">85%</div>
                                    <div className="text-sm text-gray-500">Sleep Quality</div>
                                </div>
                            </div>
                        </div>

                        {/* Sleep Cycle Indicator */}
                        <div className="absolute -top-6 -left-6 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl p-4 shadow-xl">
                            <div className="text-center">
                                <div className="text-white font-semibold text-sm">REM</div>
                                <div className="text-white/80 text-xs">Sleep Phase</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Text */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                                Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Better</span> Sleep<br />
                                Now With <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Us!</span>
                            </h2>

                            <p className="text-xl text-gray-300 leading-relaxed mb-8">
                                Transform your sleep quality with intelligent tracking, personalized insights,
                                and science-backed recommendations for optimal rest and recovery.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white mb-2">Smart Sleep Tracking</h4>
                                    <p className="text-gray-300">Advanced algorithms monitor your sleep cycles and provide detailed insights.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white mb-2">Personalized Recommendations</h4>
                                    <p className="text-gray-300">Get custom sleep tips based on your unique patterns and lifestyle.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-6 h-6 bg-indigo-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white mb-2">Sleep Environment Control</h4>
                                    <p className="text-gray-300">Optimize your bedroom conditions for the perfect night's rest.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-blue-400">7.5h</div>
                                    <div className="text-sm text-gray-400">Avg Sleep</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-purple-400">92%</div>
                                    <div className="text-sm text-gray-400">Efficiency</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-indigo-400">4</div>
                                    <div className="text-sm text-gray-400">REM Cycles</div>
                                </div>
                            </div>
                        </div>

                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
                        >
                            Improve Sleep Quality
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
