import React, { useState, useEffect } from 'react';
import GoBack from "@/components/common/GoBack.tsx";
import { ArrowRight } from "lucide-react";

interface PlanPreparationProps {
    planType?: 'diet' | 'exercise';
    onComplete?: () => void;
    onBack?: () => void;
}

const ThankYouCard: React.FC<PlanPreparationProps> = ({
    planType = 'diet',
    onComplete,
    onBack
}) => {
    const [currentPlan] = useState<'diet' | 'exercise'>(planType);
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsLoading(false);
                    return 100;
                }
                return prev + 2;
            });
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const planConfig = {
        diet: {
            title: "We're Customizing Your Diet Plan",
            subtitle: "According To Your Taste.",
        },
        exercise: {
            title: "We're Customizing Your Exercise Plan",
            subtitle: "According To Your Physique.",
        }
    };

    const currentConfig = planConfig[currentPlan];

    return (
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 text-center">
            <div className="mb-6 animate-fade-in w-full">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-3 sm:mb-4 drop-shadow-lg">
                    Thank You!
                </h1>
            </div>
            <div className="mb-8 animate-slide-up w-full">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-primary-400 mb-4 sm:mb-6 drop-shadow-md">
                    Getting Ready Your Plan
                </h2>
                <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl mx-auto">
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-medium leading-relaxed drop-shadow-sm">
                        {currentConfig.title}
                    </p>
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-medium mt-2 drop-shadow-sm">
                        {currentConfig.subtitle}
                    </p>
                </div>
            </div>
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto mb-6">
                <div className="bg-white/30 backdrop-blur-sm rounded-full h-3 overflow-hidden shadow-lg">
                    <div
                        className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full transition-all duration-300 ease-out shadow-sm"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="text-gray-950 text-xs sm:text-sm mt-2 font-medium">
                    {Math.round(progress)}% Complete
                </p>
            </div>
            {isLoading ? (
                <div className="flex space-x-1 sm:space-x-2 animate-pulse">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
            ) : (
                <div className="flex items-center justify-center gap-3 sm:gap-5 mt-8 sm:mt-12">
                    <GoBack onClick={onBack} />
                    <button
                        onClick={onComplete}
                        className="inline-flex items-center justify-between gap-2 rounded-full bg-primary hover:bg-primary-600 text-white font-medium border px-4 sm:px-8 py-2 sm:py-4 text-sm sm:text-base transition-all duration-200"
                    >
                        Continue
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ThankYouCard;
