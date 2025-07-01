import React from 'react';
import { Check } from 'lucide-react'; // Assuming you're using lucide-react for icons

export const SleepSection: React.FC = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-3 gap-12 items-center max-w-7xl mx-auto">
                    {/* Left Section - Moonlit Bedroom Scene */}
                    <div className="relative">
                        <div
                            className="relative rounded-3xl overflow-hidden h-96 lg:h-[500px] bg-cover bg-center"
                            style={{ backgroundImage: "url('/sample.png')" }}
                        >
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40"></div>

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                                    <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Center Section - Phone Mockup */}
                    <div className="relative mx-auto">
                        <div
                            className="relative w-64 h-[520px] bg-black rounded-[3rem] p-2 shadow-2xl"
                            style={{
                                backgroundImage: "url('/images/phone-mockup.png')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            {/* Simulated Screen Content */}
                            <div className="w-full h-full bg-teal-100 rounded-[2.5rem] overflow-hidden relative">
                                {/* Status Bar */}
                                <div className="bg-teal-200/50 px-6 py-3 flex justify-between items-center text-xs">
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-600">←</span>
                                        <span className="text-gray-700 font-medium">Better Sleep</span>
                                    </div>
                                </div>

                                {/* App Content Grid */}
                                <div className="p-4 grid grid-cols-2 gap-3 h-full">
                                    {Array.from({ length: 8 }).map((_, index) => (
                                        <div key={index} className="bg-teal-200/60 rounded-2xl p-3 relative overflow-hidden">
                                            <div className="absolute top-2 left-2 text-xs text-gray-600">Sample</div>
                                            <div className="mt-6 h-16 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl relative">
                                                {/* Mini play button */}
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center">
                                                        <div className="w-0 h-0 border-l-[4px] border-l-gray-600 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent ml-0.5"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-2 text-xs text-gray-600">
                                                {index === 0 ? "Calm & Mindful Music" : "Relaxing Sounds"}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Phone notch */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl"></div>
                        </div>
                    </div>

                    {/* Right Section - Text and Features */}
                    <div className="space-y-8">
                        <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
                            Get <span className="text-teal-400">Better</span> Sleep<br />
                            Now With <span className="text-teal-400">Us!</span>
                        </h2>

                        {/* Stats Section */}
                        <div className="space-y-6">
                            <div>
                                <div className="grid grid-cols-4">
                                    <div>
                                        <div className="text-sm text-gray-400">Sound</div>
                                        <div className="text-2xl font-bold text-gray-700">99+</div>
                                    </div>
                                    <div className="col-span-3 text-left pl-4">
                                        <div className="text-sm text-gray-400">Used by 100+ people</div>
                                        <div className="text-xl font-bold text-purple-500">Calm & Mindful Sleep</div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-b border-gray-200 my-4"></div>

                            <div>
                                <div className="grid grid-cols-4">
                                    <div>
                                        <div className="text-sm text-gray-400">Tracks</div>
                                        <div className="text-2xl font-bold text-gray-700">200+</div>
                                    </div>
                                    <div className="col-span-3 text-left pl-4">
                                        <div className="text-sm text-gray-400">High-quality sleep tracks</div>
                                        <div className="text-xl font-bold text-blue-500">All Categories</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Benefits */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="bg-teal-400 rounded-full p-1">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-gray-700">Increase Muscle and Strength</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="bg-teal-400 rounded-full p-1">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-gray-700">Be Healthier than before</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="bg-teal-400 rounded-full p-1">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-gray-700">Improve Stamina</span>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
                            >
                                Try Now
                            </button>
                            <button
                                className="text-teal-500 hover:text-teal-600 font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300 border border-teal-500 hover:border-teal-600"
                            >
                                Contact us
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};