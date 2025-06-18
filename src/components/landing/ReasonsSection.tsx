import React from 'react';
import phoneImage from "@/assets/images/landing/reasons-1.svg";

export const ReasonsSection: React.FC = () => {
    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Background decorative circles */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-teal-100 rounded-full opacity-20"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-teal-100 rounded-full opacity-15"></div>
            <div className="absolute top-1/3 right-20 w-24 h-24 bg-cyan-100 rounded-full opacity-25"></div>

            <div className="container mx-auto px-6 relative">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <p className="text-teal-400 font-medium text-sm tracking-wider uppercase mb-4">
                        OF THE PRINTING AND TYPE
                    </p>
                    <h2 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
                        Reasons To <span className="text-teal-400">Run</span> With Us!
                    </h2>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-16 items-center max-w-7xl mx-auto">
                    {/* Left Column */}
                    <div className="space-y-24">
                        {/* BE HEALTHY - Left Aligned */}
                        <div className="text-left relative">
                            <div className="relative">
                                {/* Large Background Number */}
                                <div className="absolute -top-8 -left-12 text-8xl lg:text-9xl font-bold text-teal-100 opacity-50 z-0">
                                    01
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-6">
                                        <h3 className="text-2xl lg:text-3xl font-bold text-teal-400 tracking-wide whitespace-nowrap">
                                            BE HEALTHY
                                        </h3>
                                        {/* Horizontal line extending to the right */}
                                        <div className="flex-1 h-0.5 bg-teal-400"></div>
                                    </div>
                                    <p className="text-gray-500 text-lg leading-relaxed max-w-sm">
                                        Fresh air and early morning running trips sure can cure almost anything.
                                    </p>
                                </div>
                            </div>
                            {/* Dotted line connecting to phone */}
                            <div className="hidden lg:block mt-8">
                                <div className="w-32 h-px border-t-2 border-dotted border-teal-300"></div>
                            </div>
                        </div>

                        {/* FEEL FREE - Left Aligned */}
                        <div className="text-left relative">
                            <div className="relative">
                                {/* Large Background Number */}
                                <div className="absolute -top-8 -left-12 text-8xl lg:text-9xl font-bold text-teal-100 opacity-50 z-0">
                                    02
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-6">
                                        <h3 className="text-2xl lg:text-3xl font-bold text-teal-400 tracking-wide whitespace-nowrap">
                                            FEEL FREE
                                        </h3>
                                        {/* Horizontal line extending to the right */}
                                        <div className="flex-1 h-0.5 bg-teal-400"></div>
                                    </div>
                                    <p className="text-gray-500 text-lg leading-relaxed max-w-sm">
                                        Nothing makes you feel more free and independent as running open road.
                                    </p>
                                </div>
                            </div>
                            {/* Dotted line connecting to phone */}
                            <div className="hidden lg:block mt-8">
                                <div className="w-32 h-px border-t-2 border-dotted border-teal-300"></div>
                            </div>
                        </div>
                    </div>

                    {/* Center Phone Mockup - Using Your Image */}
                    <div className="relative flex justify-center">
                        <div className="relative">
                            <img
                                src={phoneImage}
                                alt="Fitness app interface showing Emerson Dias profile with daily goals, water intake, calorie tracking, and workout challenges"
                                className="w-80 h-auto max-w-full drop-shadow-2xl"
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-24">
                        {/* BE ONE OF US - Right Aligned */}
                        <div className="text-right relative">
                            <div className="relative">
                                {/* Large Background Number */}
                                <div className="absolute -top-8 -right-12 text-8xl lg:text-9xl font-bold text-teal-100 opacity-50 z-0">
                                    03
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-6">
                                        {/* Horizontal line extending to the left */}
                                        <div className="flex-1 h-0.5 bg-teal-400"></div>
                                        <h3 className="text-2xl lg:text-3xl font-bold text-teal-400 tracking-wide whitespace-nowrap">
                                            BE ONE OF US
                                        </h3>
                                    </div>
                                    <p className="text-gray-500 text-lg leading-relaxed max-w-sm ml-auto">
                                        By joining our group, you get to experience 100% unforgettable moments.
                                    </p>
                                </div>
                            </div>
                            {/* Dotted line connecting to phone */}
                            <div className="hidden lg:block mt-8">
                                <div className="w-32 h-px border-t-2 border-dotted border-teal-300 ml-auto"></div>
                            </div>
                        </div>

                        {/* BE STRONG - Right Aligned */}
                        <div className="text-right relative">
                            <div className="relative">
                                {/* Large Background Number */}
                                <div className="absolute -top-8 -right-12 text-8xl lg:text-9xl font-bold text-teal-100 opacity-50 z-0">
                                    04
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-6">
                                        {/* Horizontal line extending to the left */}
                                        <div className="flex-1 h-0.5 bg-teal-400"></div>
                                        <h3 className="text-2xl lg:text-3xl font-bold text-teal-400 tracking-wide whitespace-nowrap">
                                            BE STRONG
                                        </h3>
                                    </div>
                                    <p className="text-gray-500 text-lg leading-relaxed max-w-sm ml-auto">
                                        Regular running helps you stay fit, healthy and hardy no matter what.
                                    </p>
                                </div>
                            </div>
                            {/* Dotted line connecting to phone */}
                            <div className="hidden lg:block mt-8">
                                <div className="w-32 h-px border-t-2 border-dotted border-teal-300 ml-auto"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};  