import React, { useState } from 'react';
import { Check } from 'lucide-react';
import menimg from "@/assets/images/question/man-gender.jpg";
import womenimg from "@/assets/images/question/women-gender.jpeg";
import GoNext from '../common/GoNext';

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
            image: menimg
        },
        {
            id: 'female',
            label: 'Female',
            image: womenimg
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
        <div className="flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-4xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                        How would you describe your gender?
                    </h1>
                    <p className="text-base md:text-xl text-gray-600 font-medium">
                        Lose weight, tone up and gain strength at home
                    </p>
                </div>

                {/* Gender Cards */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center mb-6">
                    {genderOptions.map((option) => (
                        <div
                            key={option.id}
                            onClick={() => handleGenderSelect(option.id)}
                            className={`relative rounded-3xl cursor-pointer transition-all duration-300 transform hover:scale-105`}
                        >
                            <div className="flex justify-center mb-8">
                                <div className={`relative sm:w-64 sm:h-64 w-36 h-36 rounded-2xl overflow-hidden shadow-lg ${selectedGender === option.id ? 'ring-4 ring-primary-400 shadow-2xl' : 'shadow-xl ring-4 ring-white hover:shadow-xl'}`}>
                                    <img
                                        src={option.image}
                                        alt={`${option.label} representative`}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Checkmark for selected option */}
                                    {selectedGender === option.id && (
                                        <div className="absolute top-2 right-2 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center shadow-lg z-10">
                                            <Check className="w-5 h-5 text-white" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="text-center">
                                <h3 className="text-3xl font-semibold text-gray-800 sm:block hidden">
                                    {option.label}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="text-center text-xs sm:text-base text-gray-500 space-y-2 mb-6">
                    <p>
                        By selecting your gender and continuing you agree to our{' '}
                        <a href="#" className="text-primary-500 hover:text-primary-600 underline">Terms of Service</a> |{' '}
                        <a href="#" className="text-primary-500 hover:text-primary-600 underline">Privacy Policy</a>
                    </p>
                    <p>Please review before continuing</p>
                </div>

                {/* Continue Button */}
                {selectedGender && (
                    <div className="text-center">
                        <GoNext onClick={handleContinue} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenderSelector;