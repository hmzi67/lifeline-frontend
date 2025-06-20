import React from 'react';

type GenderType = 'women' | 'men';

interface LifeLineFitnessProps {
    gender: GenderType;
    onContinue?: () => void;
}

const LifeLineFitness: React.FC<LifeLineFitnessProps> = ({ gender, onContinue }) => {

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
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-teal-50 to-white">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-teal-400 to-teal-300 rounded-full opacity-20 -translate-y-20 translate-x-20"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-teal-300 to-teal-200 rounded-full opacity-30 translate-y-32 -translate-x-32"></div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-8">
                {/* Main Content */}
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                        {content[gender].title}
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                        {content[gender].subtitle}
                    </p>

                    {/* Image Section */}
                    <div className="mb-12 relative">
                        <div className="relative inline-block">
                            <img
                                src={content[gender].image}
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

                {/* Stats Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="flex space-x-2">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    i === 0 ? 'bg-teal-500' : 'bg-gray-300'
                                }`}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LifeLineFitness;