import React, { useState } from 'react';
import { Check } from 'lucide-react';  // assuming you're using lucide-react icons
import menimg from "@/assets/images/question/man-gender.jpg";
import womenimg from "@/assets/images/question/women-gender.jpeg";
import eimg from "@/assets/images/question/Ellipse 4.svg";


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
    const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>('male');

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
        <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background  -y for up x for right -x for down x for left */}
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-100 transform translate-x-32 -translate-y-32 rotate-6 hidden md:block ">
                <img src={eimg} alt="" />
              </div>
            <div className="absolute bottom-0 left-0 w-96 h-96 opacity-100 transform -translate-x-24 translate-y-44 rotate-45 hidden md:block">
                <img src={eimg} alt="" />
            </div>

            <div className="relative z-10 max-w-7xl w-full rounded-3xl p-8 bg-white/60 backdrop-blur-sm">
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
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-12 items-center justify-center">
                    {genderOptions.map((option) => (
                        <div
                            key={option.id}
                            onClick={() => handleGenderSelect(option.id)}
                            className={`relative bg-white rounded-3xl cursor-pointer transition-all duration-300 transform hover:scale-105 
                            `}
                        >
                            <div className="flex justify-center mb-8">
                                {selectedGender === option.id && (
                                    <div className="absolute top-6 right-6 w-10 h-10 bg-teal-400 rounded-full flex items-center justify-center shadow-lg">
                                        <Check className="w-6 h-6 text-white" />
                                    </div>
                                )}
                                <div className={`w-64 h-64 rounded-2xl overflow-hidden shadow-lg ${selectedGender === option.id ? 'ring-4 ring-teal-400 shadow-2xl' : 'shadow-lg hover:shadow-xl'}`}>
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
               
            </div>
        </div>
    );
};

export default GenderSelector;
