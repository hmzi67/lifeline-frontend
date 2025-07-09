import React, { useState } from 'react';
import { Check } from 'lucide-react';  // assuming you're using lucide-react icons

interface GenderOption {
    id: 'male' | 'female';
    label: string;
    image: string;
}

interface GenderSelectorProps {
    onGenderSelect?: (gender: 'male' | 'female') => void;
    onContinue?: (gender: 'male' | 'female') => void;
}

const GenderSelector: React.FC<GenderSelectorProps> = ({ onGenderSelect, onContinue }) => {
    const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null);

    const genderOptions: GenderOption[] = [
        {
            id: 'male',
            label: 'Male',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
        },
        {
            id: 'female',
            label: 'Female',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b332b1a?w=300&h=300&fit=crop&crop=face'
        }
    ];

    const handleGenderSelect = (gender: 'male' | 'female') => {
        setSelectedGender(gender);
        onGenderSelect?.(gender);
    };

    const handleContinue = () => {
        if (selectedGender) {
            onContinue?.(selectedGender);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-teal-400 to-teal-500 rounded-full opacity-100 transform translate-x-40 -translate-y-40"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-teal-300 to-teal-400 rounded-full opacity-80 transform -translate-x-32 translate-y-32"></div>

            <div className="relative z-10 max-w-3xl w-full">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                        How would you describe your gender?
                    </h1>
                    <p className="text-xl text-gray-600 font-medium">
                        Lose weight, tone up and gain strength at home
                    </p>
                </div>

                {/* Gender Cards */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-12">
                    {genderOptions.map((option) => (
                        <div
                            key={option.id}
                            onClick={() => handleGenderSelect(option.id)}
                            className={`relative flex-1 bg-white rounded-3xl p-8 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                                selectedGender === option.id ? 'ring-4 ring-teal-400 shadow-2xl' : 'shadow-lg hover:shadow-xl'
                            }`}
                        >
                            {selectedGender === option.id && (
                                <div className="absolute top-6 right-6 w-10 h-10 bg-teal-400 rounded-full flex items-center justify-center shadow-lg">
                                    <Check className="w-6 h-6 text-white" />
                                </div>
                            )}

                            <div className="flex justify-center mb-8">
                                <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-lg">
                                    <img
                                        src={option.image}
                                        alt={`${option.label} representative`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            <div className="text-center">
                                <h3 className="text-3xl font-semibold text-gray-800">
                                    {option.label}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="text-center text-base text-gray-500 space-y-3 mb-8">
                    <p>
                        By selecting your gender and continuing you agree to our{' '}
                        <a href="#" className="text-teal-500 hover:text-teal-600 underline">Terms of Service</a> |{' '}
                        <a href="#" className="text-teal-500 hover:text-teal-600 underline">Privacy Policy</a>
                    </p>
                    <p>Please review before continuing</p>
                </div>

                {/* Continue Button */}
                {selectedGender && (
                    <div className="text-center">
                        <button
                            onClick={handleContinue}
                            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-16 py-5 rounded-full font-semibold text-xl hover:from-teal-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            Continue
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenderSelector;
