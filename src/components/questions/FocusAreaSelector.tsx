import React, { useState } from 'react';

interface FocusAreaSelectorProps {
    gender: 'male' | 'female';
    onSelectionChange?: (selectedAreas: string[]) => void;
    onContinue?: (selectedAreas: string[]) => void;
}

export const FocusAreaSelector: React.FC<FocusAreaSelectorProps> = ({
                                                                 gender,
                                                                 onSelectionChange,
                                                                 onContinue
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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
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
                    <div className="flex flex-col space-y-6 mr-8">
                        {['Shoulders', 'Chest', 'Arms', 'Thighs', 'Full Body'].map((area) => (
                            <button
                                key={area}
                                onClick={() => handleAreaToggle(area)}
                                className={`px-6 py-3 rounded-lg border-2 transition-all duration-200 text-lg font-medium min-w-32 ${
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
                    <div className="relative mx-12">
                        {gender === 'female' ? (
                            <div className="relative">
                                <img
                                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 400' fill='none'%3E%3C!-- Female figure placeholder --%3E%3Crect x='85' y='20' width='30' height='30' rx='15' fill='%23f4a5a5'/%3E%3Crect x='75' y='55' width='50' height='40' rx='5' fill='%23e5e5e5'/%3E%3Crect x='70' y='95' width='60' height='80' rx='8' fill='%23000'/%3E%3Crect x='80' y='175' width='15' height='120' fill='%23000'/%3E%3Crect x='105' y='175' width='15' height='120' fill='%23000'/%3E%3Crect x='60' y='65' width='20' height='60' fill='%23f4a5a5'/%3E%3Crect x='120' y='65' width='20' height='60' fill='%23f4a5a5'/%3E%3C/svg%3E"
                                    alt="Female figure"
                                    className="w-48 h-96 object-contain"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center text-gray-600 text-sm">
                                        <div className="w-48 h-96 bg-gradient-to-b from-pink-100 to-pink-200 rounded-full opacity-30"></div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="relative">
                                <img
                                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 400' fill='none'%3E%3C!-- Male figure placeholder --%3E%3Crect x='85' y='20' width='30' height='30' rx='15' fill='%23d4a574'/%3E%3Crect x='70' y='55' width='60' height='50' rx='5' fill='%23a0a0a0'/%3E%3Crect x='65' y='105' width='70' height='80' rx='8' fill='%23000'/%3E%3Crect x='80' y='185' width='18' height='120' fill='%23000'/%3E%3Crect x='102' y='185' width='18' height='120' fill='%23000'/%3E%3Crect x='50' y='65' width='25' height='70' fill='%23d4a574'/%3E%3Crect x='125' y='65' width='25' height='70' fill='%23d4a574'/%3E%3C/svg%3E"
                                    alt="Male figure"
                                    className="w-48 h-96 object-contain"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center text-gray-600 text-sm">
                                        <div className="w-48 h-96 bg-gradient-to-b from-blue-100 to-blue-200 rounded-full opacity-30"></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Connection lines and dots */}
                        <div className="absolute inset-0 pointer-events-none">
                            {/* Shoulder line */}
                            <div className="absolute top-16 left-12 w-8 h-px bg-teal-400"></div>
                            <div className="absolute top-16 left-12 w-2 h-2 bg-teal-400 rounded-full -translate-y-1"></div>

                            {/* Chest line */}
                            <div className="absolute top-24 left-8 w-12 h-px bg-teal-400"></div>
                            <div className="absolute top-24 left-8 w-2 h-2 bg-teal-400 rounded-full -translate-y-1"></div>

                            {/* Arms line */}
                            <div className="absolute top-28 left-4 w-16 h-px bg-teal-400"></div>
                            <div className="absolute top-28 left-4 w-2 h-2 bg-teal-400 rounded-full -translate-y-1"></div>

                            {/* Thighs line */}
                            <div className="absolute top-48 left-4 w-16 h-px bg-teal-400"></div>
                            <div className="absolute top-48 left-4 w-2 h-2 bg-teal-400 rounded-full -translate-y-1"></div>

                            {/* Right side lines */}
                            {/* Belly line */}
                            <div className="absolute top-32 right-8 w-12 h-px bg-teal-400"></div>
                            <div className="absolute top-32 right-10 w-2 h-2 bg-teal-400 rounded-full -translate-y-1"></div>

                            {/* Back line */}
                            <div className="absolute top-36 right-4 w-16 h-px bg-teal-400"></div>
                            <div className="absolute top-36 right-6 w-2 h-2 bg-teal-400 rounded-full -translate-y-1"></div>

                            {/* Legs line */}
                            <div className="absolute top-64 right-4 w-16 h-px bg-teal-400"></div>
                            <div className="absolute top-64 right-6 w-2 h-2 bg-teal-400 rounded-full -translate-y-1"></div>
                        </div>
                    </div>

                    {/* Right side buttons */}
                    <div className="flex flex-col space-y-6 ml-8">
                        {['Belly', 'Back', 'Legs'].map((area) => (
                            <button
                                key={area}
                                onClick={() => handleAreaToggle(area)}
                                className={`px-6 py-3 rounded-lg border-2 transition-all duration-200 text-lg font-medium min-w-32 ${
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
                <div className="text-center">
                    <button
                        onClick={handleContinue}
                        className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-4 px-12 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        Continue
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
                                    className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium"
                                >
                  {area}
                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-teal-400 rounded-full opacity-20 -translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-teal-300 rounded-full opacity-20 translate-x-20 translate-y-20"></div>
            </div>
        </div>
    );
};