import React, { useState } from 'react';
import GoBack from "@/components/common/GoBack.tsx";
import { ArrowRight } from 'lucide-react';
import menimg from "@/assets/images/question/mensolo.svg";
import womenimg from "@/assets/images/question/womensolo.svg";

interface FocusAreaSelectorProps {
    gender: string;
    onSelectionChange?: (selectedAreas: string[]) => void;
    onContinue?: (selectedAreas: string[]) => void;
    onBack?: () => void;
}

export const FocusAreaSelector: React.FC<FocusAreaSelectorProps> = ({
                                                                 gender,
                                                                 onSelectionChange,
                                                                 onContinue,
                                                                 onBack
                                                             }) => {
    const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
    const handleAreaToggle = (area: string) => {
        let newSelection: string[];

        if (area === 'Full Body') {
            // If Full Body is selected, clear all other selections
            newSelection = selectedAreas.includes('Full Body') ? [] : ['Full Body'];
        } else {
            // If another area is selected and Full Body was selected, remove Full Body
            const filteredSelection = selectedAreas.filter(item => item !== 'Full Body');

            if (filteredSelection.includes(area)) {
                newSelection = filteredSelection.filter(item => item !== area);
            } else {
                newSelection = [...filteredSelection, area];
            }
        }

        setSelectedAreas(newSelection);
        onSelectionChange?.(newSelection);
    };

    const handleContinue = () => {
        onContinue?.(selectedAreas);
    };

    const isSelected = (area: string) => selectedAreas.includes(area);

    return (
        <div className="flex items-center justify-center py-6">
            <div className="w-full max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Choose Your Focus Area
                    </h1>
                    <p className="text-lg text-gray-600">
                        Tell us which part of your body you'd like to focus on during your workouts
                    </p>
                </div>

                {/* Main Content */}
                <div className="relative flex items-center justify-center mb-12">
                    {/* Left side buttons */}
                    <div className="flex flex-col space-y-6 mr-6">
                        {['Shoulders', 'Chest', 'Arms', 'Thighs', 'Full Body'].map((area) => (
                            <button
                                key={area}
                                onClick={() => handleAreaToggle(area)}
                                className={`px-5 py-2 rounded-lg border-2 transition-all duration-200 text-lg font-medium min-w-32 ${
                                    isSelected(area)
                                        ? 'bg-teal-500 border-teal-500 text-white shadow-lg'
                                        : 'bg-white border-gray-300 text-gray-700 hover:border-teal-300 hover:bg-teal-50'
                                }`}
                            >
                                {area}
                            </button>
                        ))}
                    </div>

                    {/* Center figure */}
                    <div className="sm:mx-[-20px]">
                        {gender === 'female' ? (
                            <div className="relative">
                                <img
                                    src={womenimg}
                                    alt="Female figure"
                                    className="w-64 h-full object-contain"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center text-gray-600 text-sm">
                                        
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="relative">
                                <img
                                    src={menimg}
                                    alt="Male figure"
                                    className="w-64 h-full object-contain"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center text-gray-600 text-sm">
                                    </div>
                                </div>
                            </div>
                        )}

                        
                    </div>

                    {/* Right side buttons */}
                    <div className="flex flex-col space-y-6 ml-6 mb-6">
                        {['Belly', 'Back', 'Legs'].map((area) => (
                            <button
                                key={area}
                                onClick={() => handleAreaToggle(area)}
                                className={`px-5 py-2 rounded-lg border-2 transition-all duration-200 text-lg font-medium min-w-32 ${
                                    isSelected(area)
                                        ? 'bg-teal-500 border-teal-500 text-white shadow-lg'
                                        : 'bg-white border-gray-300 text-gray-700 hover:border-teal-300 hover:bg-teal-50'
                                }`}
                            >
                                {area}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Continue Button */}
                 <div className={'flex items-center justify-center gap-5 mt-12'}>
                     <GoBack onClick={onBack} />
                   <button
                       onClick={handleContinue}
                       className="inline-flex items-center justify-between p-4 rounded-full bg-primary hover:bg-primary-600 text-white font-medium border w-auto h-auto px-8 py-4 transition-all duration-200"
                   >
                       Continue
                       <ArrowRight className="w-5 h-5" />
                   </button>
                </div>

                {/* Selected areas display (for demo) */}
                {selectedAreas.length > 0 && (
                    <div className="mt-8 text-center">
                        <p className="text-gray-600 mb-2">Selected areas:</p>
                        <div className="flex flex-wrap justify-center gap-2">
                            {selectedAreas.map((area) => (
                                <span
                                    key={area}
                                    className="bg-teal-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium"
                                >
                  {area}
                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};