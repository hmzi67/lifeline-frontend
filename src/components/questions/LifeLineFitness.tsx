import React from 'react';
import GoBack from "@/components/common/GoBack.tsx";

interface LifeLineFitnessProps {
    gender: string;
    onContinue?: () => void;
    onBack?: () => void;
}

const LifeLineFitness: React.FC<LifeLineFitnessProps> = ({ gender, onContinue, onBack }) => {

    const content = {
        women: {
            title: "Over 10 Million women have use this",
            subtitle: "LifeLine will help you in this fitness journey with science based approach this",
            image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&h=400&fit=crop&crop=faces"
        },
        men: {
            title: "Over 8 Million men have use this",
            subtitle: "LifeLine will help you in this fitness journey with science based approach this",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=faces"
        }
    };

    const handleContinue = () => {
        onContinue?.();
    };

    return (
        <div className="my-8">

            {/* go back icon */}
            <GoBack onClick={onBack} />


            {/* Background Decorative Elements */}
            
            <div className="flex items-center justify-center">
                {/* Main Content */}
                <div className="text-center max-w-4xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 leading-tight">
                        {gender == 'male' ? content.men.title : content.women.title}
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                        {gender == 'male' ? content.men.subtitle : content.women.subtitle}
                    </p>

                    {/* Image Section */}
                    <div className="mb-12 relative">
                        <div className="relative inline-block">
                            <img
                                src={gender == 'male' ? content.men.image : content.women.image}
                                alt={`${gender} fitness group`}
                                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl transition-all duration-500 transform hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-teal-500/20 to-transparent rounded-2xl"></div>
                        </div>
                    </div>

                    {/* Continue Button */}
                    <button
                        onClick={handleContinue}
                        className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-4 px-12 rounded-2xl text-lg shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-teal-300"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LifeLineFitness;