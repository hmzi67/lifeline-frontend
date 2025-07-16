import React from 'react';
import { CheckCircle } from "lucide-react";
import progressTrackerImage from "../../assets/images/landing/trackerSectionBoth.svg"
import { Button } from '../ui/button';

// Done For responsive design and better user experience

export const ProgressSection: React.FC = () => {
    const desktopFeatures = [
        "Heart Rate Tracker",
        "Steps Counter",
        "Sleep Tracking",
        "Water Intake",
        "Calories Counter"
    ];

    const mobileFeatures = [
        "Increase Muscle and Strength",
        "Be Healthier than before",
        "Increase Stamina"
    ];

    return (
        <div className="py-12 sm:py-16 lg:py-20 bg-white">
            {/* Desktop Layout */}
            <div className="hidden lg:block">
                <div className="flex items-center">
                    {/* Left Content - Contained */}
                    <div className="w-1/2 pl-8 xl:pl-16 2xl:pl-24 pr-8">
                        <div className="max-w-xl">
                            <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-6 leading-tight">
                                <span className="text-teal-400">Track</span> Your <br />
                                Fitness, <span className="text-teal-400">See</span> Your <br />
                                Progress
                            </h1>

                            <ul className="mt-8 space-y-4">
                                {desktopFeatures.map((item) => (
                                    <li key={item} className="flex items-center text-lg xl:text-xl">
                                        <CheckCircle className="text-teal-400 w-6 h-6 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-10 flex items-center gap-6">
                                <Button className="bg-teal-400 hover:bg-teal-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-all duration-300">
                                    Buy Now
                                </Button>
                                <button className="text-lg font-semibold text-gray-700 hover:text-teal-400 transition-colors duration-300">
                                    Download App
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Image - Extends beyond screen */}
                    <div className="w-1/2 flex justify-start overflow-hidden">
                        <img
                            className="w-full max-w-none h-auto ml-8 xl:ml-16"
                            src={progressTrackerImage}
                            alt="Fitness Progress Tracker"
                        />
                    </div>
                </div>
            </div>

            {/* Mobile/Tablet Layout */}
            <div className="block lg:hidden">
                <div className="px-4 sm:px-6">
                    {/* Header at Top */}
                    <div className="text-center mb-8 sm:mb-12">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                            <span className="text-teal-400">Track</span> Your Fitness, <span className="text-teal-400">See</span> Your Progress
                        </h1>
                    </div>

                    {/* Image in Center - Extends to right edge */}
                    <div className="flex justify-center mb-12 sm:mb-16 -mr-4 sm:-mr-6 overflow-hidden">
                        <img
                            className="w-full max-w-sm sm:max-w-md md:max-w-lg h-auto"
                            src={progressTrackerImage}
                            alt="Fitness Progress Tracker"
                        />
                    </div>

                    {/* Features List Below Image - Centered with lighter styling */}
                    <div className="mb-12 sm:mb-16">
                        <ul className="space-y-8 sm:space-y-10">
                            {mobileFeatures.map((item) => (
                                <li key={item} className="flex items-center justify-center text-lg sm:text-xl md:text-2xl">
                                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-teal-400 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <svg
                                            className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={3}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-gray-500 font-normal text-center">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Buttons at Bottom - In one row for mobile */}
                    <div className="flex items-center justify-center gap-6 sm:gap-8">
                        <Button className="bg-teal-400 hover:bg-teal-500 text-white px-6 sm:px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-all duration-300">
                            Try Now
                        </Button>
                        <button className="text-lg font-semibold text-gray-700 hover:text-teal-400 transition-colors duration-300">
                            Contact us
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};