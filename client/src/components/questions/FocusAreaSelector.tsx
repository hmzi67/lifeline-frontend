import React, { useState, useEffect } from 'react';
import GoNext from "@/components/common/GoNext.tsx";
import menimg from "@/assets/images/question/mensolo.svg";
import womenimg from "@/assets/images/question/womensolo.svg";
import api from '@/lib/axios';

interface FocusAreaSelectorProps {
    gender: string;
    onSelectionChange?: (selectedAreas: string[]) => void;
    onContinue?: (selectedAreas: string[]) => void;
    onBack?: () => void;
}

export const FocusAreaSelector: React.FC<FocusAreaSelectorProps> = ({ gender, onSelectionChange, onContinue }) => {
    const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [saving, setSaving] = useState<boolean>(false);

    // Fetch saved focus areas on mount
    useEffect(() => {
        const fetchFocusAreas = async () => {
            setLoading(true);
            try {
                const res = await api.get('/questionnaire/body-focus');
                const data = res?.data?.data?.bodyFocusArea;

                // Normalize data: can be array or string
                let areas: string[] = [];
                if (Array.isArray(data)) {
                    areas = data;
                } else if (typeof data === 'string') {
                    areas = data.trim() === '' ? [] : data.split(',').map((a: string) => a.trim());
                }

                setSelectedAreas(areas);
                onSelectionChange?.(areas);
            } catch {
                // Optional error handling
            } finally {
                setLoading(false);
            }
        };

        fetchFocusAreas();
    }, [onSelectionChange]);

    // Update focus areas in backend with debounce logic to reduce rapid calls
    // For simplicity, save immediately here on toggle; debounce can be added as needed
    const saveFocusAreas = async (areas: string[]) => {
        setSaving(true);
        try {
            await api.put('/questionnaire/body-focus-area', { bodyFocusArea: areas });
        } catch {
            // Optional error handling
        } finally {
            setSaving(false);
        }
    };

    // Toggle selection logic with "Full Body" rules
    const toggleArea = (area: string) => {
        let newSelection: string[];

        if (area === 'Full Body') {
            newSelection = selectedAreas.includes('Full Body') ? [] : ['Full Body'];
        } else {
            const withoutFullBody = selectedAreas.filter(a => a !== 'Full Body');

            if (withoutFullBody.includes(area)) {
                newSelection = withoutFullBody.filter(a => a !== area);
            } else {
                newSelection = [...withoutFullBody, area];
            }
        }

        setSelectedAreas(newSelection);
        onSelectionChange?.(newSelection);
        saveFocusAreas(newSelection);
    };

    const isSelected = (area: string) => selectedAreas.includes(area);

    const handleContinue = () => {
        onContinue?.(selectedAreas);
    };

    return (
        <div className="flex items-center justify-center py-10 px-4">
            <div className="w-full max-w-7xl">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
                       Choose your focus area
                    </h1>
                    <p className="text-lg text-gray-600">
                        Tell us which part of your body you'd like to focus on during your workouts
                    </p>
                </div>

                {/* Content */}
                <div className="flex flex-col sm:flex-row items-center justify-center">

                    {/* Left side */}
                    <div className="flex flex-col space-y-4 sm:space-y-8 max-w-xs">
                        {['Shoulders', 'Chest', 'Arms', 'Thighs', 'Full Body'].map(area => (
                            <button
                                key={area}
                                type="button"
                                onClick={() => toggleArea(area)}
                                disabled={loading || saving}
                                className={`px-3 sm:px-6 py-2 rounded-lg border-2 transition duration-200 text-center text-sm sm:text-lg font-semibold
                  ${isSelected(area)
                                        ? 'bg-primary text-white border-primary shadow-lg'
                                        : 'border-gray-300 text-gray-700 hover:bg-primary hover:text-white hover:border-primary cursor-pointer'}
                `}
                            >
                                {area}
                            </button>
                        ))}
                    </div>

                    {/* Middle figure */}
                    <div className="mx-8 my-6 sm:my-0 flex-shrink-0">
                        <img
                            src={gender === 'female' ? womenimg : menimg}
                            alt={`${gender === 'female' ? 'Female' : 'Male'} figure`}
                            className="w-48 sm:w-72"
                        />
                    </div>

                    {/* Right side */}
                    <div className="flex flex-col space-y-4 sm:space-y-8 max-w-xs">
                        {['Belly', 'Back', 'Legs'].map(area => (
                            <button
                                key={area}
                                type="button"
                                onClick={() => toggleArea(area)}
                                disabled={loading || saving}
                                className={`px-3 sm:px-6 py-2 rounded-lg border-2 transition duration-200 text-center text-sm sm:text-lg font-semibold
                  ${isSelected(area)
                                        ? 'bg-primary text-white border-primary shadow-lg'
                                        : 'border-gray-300 text-gray-700 hover:bg-primary hover:text-white hover:border-primary cursor-pointer'}
                `}
                            >
                                {area}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Selected list for confirmation */}
                {selectedAreas.length > 0 && (
                    <div className="mt-10 text-center">
                        <h3 className="text-lg font-medium mb-3">Selected Areas:</h3>
                        <div className="flex flex-wrap justify-center gap-3">
                            {selectedAreas.map(area => (
                                <span key={area} className="bg-teal-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                                    {area}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="flex justify-center gap-6 mt-12">
                    <GoNext onClick={handleContinue} loading={loading || saving} />
                </div>
            </div>
        </div>
    );
};

export default FocusAreaSelector;
