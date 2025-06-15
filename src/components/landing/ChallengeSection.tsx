import React from 'react';
import { Button } from '../ui/button';
import { AppleIcon } from 'lucide-react';

export const ChallengeSection: React.FC = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 text-white">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
                    {/* Left Content - Image */}
                    <div className="relative">
                        <div className="relative">
                            <img
                                src="/api/placeholder/500/600"
                                alt="People running together"
                                className="w-full h-auto rounded-2xl shadow-2xl"
                            />

                            {/* Floating Challenge Badge */}
                            <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-6 shadow-2xl">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center mb-3">
                                        <span className="text-white text-2xl font-bold">🏃</span>
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900">Daily Challenge</div>
                                    <div className="text-xs text-gray-500">5K Run</div>
                                </div>
                            </div>

                            {/* Progress Indicator */}
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <span className="text-green-600 font-bold">3/5</span>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">Weekly Progress</div>
                                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                                            <div className="w-4/5 h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Text */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                                Ready, Set, Run! The<br />
                                <span className="text-yellow-300">Challenge</span> is Live - Don't<br />
                                Miss Out!
                            </h2>

                            <p className="text-xl text-blue-100 leading-relaxed mb-8">
                                Join thousands of fitness enthusiasts in our daily challenges.
                                Push your limits, achieve your goals, and celebrate your victories
                                with our supportive community.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white mb-2">Daily Challenges</h4>
                                    <p className="text-blue-100">New challenges every day to keep you motivated and engaged.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white mb-2">Community Support</h4>
                                    <p className="text-blue-100">Connect with like-minded individuals and celebrate achievements together.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white mb-2">Rewards System</h4>
                                    <p className="text-blue-100">Earn points and unlock achievements as you complete challenges.</p>
                                </div>
                            </div>
                        </div>

                        {/* App Download Buttons */}
                        <div className="space-y-4">
                            <p className="text-blue-100 font-medium">Download the app and join the challenge:</p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white hover:text-gray-900 font-semibold px-6 py-3 rounded-full transition-all duration-300"
                                >
                                    <AppleIcon className="w-5 h-5 mr-2" />
                                    App Store
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white hover:text-gray-900 font-semibold px-6 py-3 rounded-full transition-all duration-300"
                                >
                                    {/* <AndroidIcon className="w-5 h-5 mr-2" /> */}
                                    Google Play
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
