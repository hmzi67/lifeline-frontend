import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface GenderOption {
    id: 'male' | 'female';
    label: string;
    image: string;
}

interface GenderSelectorProps {
    onGenderSelect?: (gender: 'male' | 'female') => void;
}

const GenderSelector: React.FC<GenderSelectorProps> = ({ onGenderSelect }) => {
    const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>('male');

    const genderOptions: GenderOption[] = [
        {
            id: 'male',
            label: 'Male',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="35" r="15" fill="%23E5E7EB"/%3E%3Cpath d="M50 55c-12 0-22 8-25 18h50c-3-10-13-18-25-18z" fill="%23E5E7EB"/%3E%3C/svg%3E'
        },
        {
            id: 'female',
            label: 'Female',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="35" r="15" fill="%23F9A8D4"/%3E%3Cpath d="M50 55c-12 0-22 8-25 18h50c-3-10-13-18-25-18z" fill="%23F9A8D4"/%3E%3Cpath d="M35 60c0-3 2-5 5-5h20c3 0 5 2 5 5v8c0 3-2 5-5 5H40c-3 0-5-2-5-5v-8z" fill="%23FBBF24"/%3E%3C/svg%3E'
        }
    ];

    const handleGenderSelect = (gender: 'male' | 'female') => {
        setSelectedGender(gender);
        onGenderSelect?.(gender);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 flex items-center justify-center p-4">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full opacity-20 transform translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-teal-300 to-cyan-400 rounded-full opacity-30 transform -translate-x-24 translate-y-24"></div>

            <div className="relative z-10 max-w-2xl w-full">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        How would you describe your gender?
                    </h1>
                    <p className="text-lg text-gray-600">
                        Lose weight, tone up and gain strength at home
                    </p>
                </div>

                {/* Gender Selection Cards */}
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-8">
                    {genderOptions.map((option) => (
                        <div
                            key={option.id}
                            onClick={() => handleGenderSelect(option.id)}
                            className={`relative flex-1 bg-white rounded-2xl p-8 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                                selectedGender === option.id
                                    ? 'ring-4 ring-teal-400 shadow-xl'
                                    : 'shadow-lg hover:shadow-xl'
                            }`}
                        >
                            {/* Selection Indicator */}
                            {selectedGender === option.id && (
                                <div className="absolute top-4 right-4 w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center">
                                    <Check className="w-5 h-5 text-white" />
                                </div>
                            )}

                            {/* Avatar/Image */}
                            <div className="flex justify-center mb-6">
                                <div className={`w-32 h-32 rounded-full flex items-center justify-center ${
                                    option.id === 'male'
                                        ? 'bg-gradient-to-br from-blue-100 to-blue-200'
                                        : 'bg-gradient-to-br from-pink-100 to-pink-200'
                                }`}>
                                    {/* Simple avatar representation */}
                                    <div className={`w-20 h-20 rounded-full ${
                                        option.id === 'male' ? 'bg-blue-300' : 'bg-pink-300'
                                    } flex items-center justify-center`}>
                                        <div className={`w-8 h-8 rounded-full ${
                                            option.id === 'male' ? 'bg-blue-500' : 'bg-pink-500'
                                        }`}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Label */}
                            <div className="text-center">
                                <h3 className="text-2xl font-semibold text-gray-800">
                                    {option.label}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="text-center text-sm text-gray-500 space-y-2">
                    <p>
                        By selecting your gender and continuing you agree to our{' '}
                        <a href="#" className="text-teal-500 hover:text-teal-600 underline">
                            Terms of Service
                        </a>{' '}
                        |{' '}
                        <a href="#" className="text-teal-500 hover:text-teal-600 underline">
                            Privacy Policy
                        </a>
                    </p>
                    <p>Please review before continuing</p>
                </div>

                {/* Continue Button */}
                {selectedGender && (
                    <div className="mt-8 text-center">
                        <button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-12 py-4 rounded-full font-semibold text-lg hover:from-teal-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                            Continue
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenderSelector;