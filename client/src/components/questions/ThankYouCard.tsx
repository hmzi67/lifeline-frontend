import React, {useState, useEffect} from 'react';
import GoBack from "@/components/common/GoBack.tsx";
import {ArrowRight} from "lucide-react";

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
        <>
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
                <div className="mb-8 animate-fade-in">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 drop-shadow-lg">
                        Thank You!
                    </h1>
                </div>

                <div className="mb-12 animate-slide-up">
                    <h2 className="text-3xl md:text-4xl font-semibold text-teal-400 mb-6 drop-shadow-md">
                        Getting Ready Your Plan
                    </h2>
                    <div className="max-w-2xl mx-auto">
                        <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed drop-shadow-sm">
                            {currentConfig.title}
                        </p>
                        <p className="text-xl md:text-2xl text-gray-700 font-medium mt-2 drop-shadow-sm">
                            {currentConfig.subtitle}
                        </p>
                    </div>
                </div>

                <div className="w-full max-w-md mx-auto mb-8">
                    <div className="bg-white/30 backdrop-blur-sm rounded-full h-3 overflow-hidden shadow-lg">
                        <div
                            className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full transition-all duration-300 ease-out shadow-sm"
                            style={{width: `${progress}%`}}
                        />
                    </div>
                    <p className="text-gray-950 text-sm mt-2 font-medium">
                        {Math.round(progress)}% Complete
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex space-x-2 animate-pulse">
                        <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-white rounded-full animate-bounce"
                             style={{animationDelay: '0.1s'}}></div>
                        <div className="w-3 h-3 bg-white rounded-full animate-bounce"
                             style={{animationDelay: '0.2s'}}></div>
                    </div>
                ) : (
                    <>
                        {/* Continue Button */}
                        <div className={'flex items-center justify-center gap-5 mt-12'}>
                            <GoBack onClick={onBack} />
                            <button
                                onClick={onComplete}
                                className="inline-flex items-center justify-between gap-2 rounded-full bg-primary hover:bg-primary-600 text-white font-medium border w-auto h-auto px-8 py-4 transition-all duration-200"
                            >
                                Continue
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default ThankYouCard;
