import React from 'react';
import { Play, Check, Download } from 'lucide-react';

export const SleepSection: React.FC = () => {
    return (
        <div className="min-h-screen overflow-hidden">
            <div className="py-8 lg:py-16">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Left Side - Hero Video/Image */}
                    <div className="relative">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            {/* Background Image */}
                            <div className="aspect-video relative">
                                {/* Moonlit Ocean Scene */}
                                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-slate-900/90"></div>
                                {/* Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <button className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105">
                                        <Play className="w-8 h-8 text-slate-700 ml-1" fill="currentColor" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - App Info */}
                    <div className="flex items-center justify-start gap-5 space-y-8">
                        {/* Phone Mockup */}
                        <div className="relative mx-auto lg:mx-0 w-64">
                            <div className="relative">
                                {/* Phone Frame */}
                                <div className="w-64 h-[520px] bg-slate-800 rounded-[3rem] p-2 shadow-2xl">
                                    <div className="w-full h-full bg-slate-700 rounded-[2.5rem] overflow-hidden relative">
                                        {/* Notch */}
                                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-slate-800 rounded-full"></div>

                                        {/* Screen Content */}
                                        <div className="pt-8 px-4 h-full bg-gradient-to-br from-teal-600 to-teal-700">
                                            {/* Header */}
                                            <div className="flex items-center justify-between mb-6">
                                                <button className="text-white/80">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                    </svg>
                                                </button>
                                                <h3 className="text-white font-semibold text-lg">Better Sleep</h3>
                                                <div className="w-6"></div>
                                            </div>

                                            {/* Content Grid */}
                                            <div className="grid grid-cols-2 gap-3">
                                                {[...Array(8)].map((_, i) => (
                                                    <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 h-20 flex flex-col justify-between">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-white/80 text-xs">Lorem Ipsum</span>
                                                            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                                                                <Play className="w-3 h-3 text-white" fill="currentColor" />
                                                            </div>
                                                        </div>
                                                        <div className="text-white/60 text-xs">Lorem Ipsum</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="text-center lg:text-left">
                            <h1 className="text-4xl lg:text-5xl font-bold  mb-6">
                                Get <span className="text-teal-400">Better</span> Sleep<br />
                                Now With <span className="text-teal-400">Us!</span>
                            </h1>

                            {/* Stats */}
                            <div className="space-y-6 mb-8">
                                <div className="flex items-center justify-center lg:justify-start gap-4">
                                    <div>
                                        <div className="text-sm">Sounds</div>
                                        <div className="text-2xl font-bold">99+</div>
                                    </div>
                                    <div>
                                        <div className="text-teal-400 text-sm">Next of sleep 10 sounds</div>
                                        <div className="font-semibold">Calm & Mindful Sleep</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center lg:justify-start gap-4">
                                    <div>
                                        <div className="text-sm">Stories</div>
                                        <div className="text-2xl font-bold">99+</div>
                                    </div>
                                    <div>
                                        <div className="text-teal-400 text-sm">Next of sleep 10 sounds</div>
                                        <div className="font-semibold">Calm & Mindful Sleep</div>
                                    </div>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="space-y-3 mb-8">
                                <div className="flex items-center justify-center lg:justify-start gap-3">
                                    <div className="w-5 h-5 bg-teal-400 rounded-full flex items-center justify-center">
                                        <Check className="w-3 h-3" />
                                    </div>
                                    <span className="">Decrease Muscle and Strength</span>
                                </div>
                                <div className="flex items-center justify-center lg:justify-start gap-3">
                                    <div className="w-5 h-5 bg-teal-400 rounded-full flex items-center justify-center">
                                        <Check className="w-3 h-3" />
                                    </div>
                                    <span className="">Be Healthier than before</span>
                                </div>
                                <div className="flex items-center justify-center lg:justify-start gap-3">
                                    <div className="w-5 h-5 bg-teal-400 rounded-full flex items-center justify-center">
                                        <Check className="w-3 h-3" />
                                    </div>
                                    <span className="">Increase Stamina</span>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button className="px-8 py-3 bg-teal-400 hover:bg-teal-500 font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg">
                                    Try Now
                                </button>
                                <button className="px-8 py-3 bg-white/10 hover:bg-white/20 font-semibold rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20 flex items-center justify-center gap-2">
                                    <Download className="w-4 h-4" />
                                    Download Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};