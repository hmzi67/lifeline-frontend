import React from 'react';
import { Button } from '../ui/button';

export const HeroSection: React.FC = () => {
    return (
        <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-10 w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                <div className="absolute top-40 right-20 w-1 h-1 bg-teal-300 rounded-full animate-pulse delay-75"></div>
                <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse delay-150"></div>
                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-teal-400 rounded-full animate-pulse delay-300"></div>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-20 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-white space-y-8">
                        <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                            YOUR FITNESS{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                                PARTNER!
                            </span>
                        </h1>

                        <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                            Your preferred personal life balance and motivation tracker.
                            Find strength through each push to your wellness goals.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
                            >
                                Get Started
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-slate-900 font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300"
                            >
                                Learn More
                            </Button>
                        </div>
                    </div>

                    {/* Right Content - Hero Image */}
                    <div className="relative">
                        <div className="relative z-10">
                            <img
                                src="/api/placeholder/600/700"
                                alt="Fitness partner doing yoga"
                                className="w-full h-auto rounded-2xl shadow-2xl"
                            />
                        </div>
                        {/* Floating Elements */}
                        <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full opacity-80 animate-bounce"></div>
                        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full opacity-60 animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" className="w-full h-20 fill-white">
                    <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
                </svg>
            </div>
        </section>
    );
};
