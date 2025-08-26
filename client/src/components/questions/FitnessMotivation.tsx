import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import image from "@/assets/images/Q-motivation/cake.webp";
import image1 from "@/assets/images/Q-motivation/wedding.webp";
import image2 from "@/assets/images/Q-motivation/ring.webp";
import image3 from "@/assets/images/Q-motivation/travel.webp";
import image4 from "@/assets/images/Q-motivation/fitness.webp";
import api from '@/lib/axios';

interface MotivationOption {
    id: string;
    label: string;
    image: string;
}

interface MotivationActions {
    onContinue?: (selectedMotivaton: string) => void;
    onBack?: () => void;
}

const FitnessMotivationSelector: React.FC<MotivationActions> = ({ onContinue }) => {
    const [selectedMotivation, setSelectedMotivation] = useState<string>('birthday');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const motivationOptions: MotivationOption[] = [
        { id: 'birthday', label: 'Birthday', image },
        { id: 'wedding', label: 'Wedding', image: image1 },
        { id: 'engagement', label: 'Engagement', image: image2 },
        { id: 'travelling', label: 'Travelling', image: image3 },
        { id: 'other', label: 'Other', image: image4 },
    ];

    // Fetch saved motivation on mount
    useEffect(() => {
        let cancelled = false;
        const fetchMotivation = async () => {
            setLoading(true);
            try {
                const res = await api.get('/questionnaire/motivation-for');
                if (cancelled) return;
                const motivation = res?.data?.data?.motivationFor;
                if (motivation && motivationOptions.some(opt => opt.id === motivation)) {
                    setSelectedMotivation(motivation);
                }
            } catch {
                // handle error as needed
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        fetchMotivation();
        return () => { cancelled = true; };
    }, []);

    // Update motivation on selection change
    const handleOptionSelect = async (optionId: string) => {
        setSelectedMotivation(optionId);
        setSaving(true);
        try {
            const response = await api.put('/questionnaire/motivation-for', { motivationFor: optionId });
            if (response.status == 200) {
                const timer = setTimeout(() => {
                    handleContinue();
                }, 1000);

                // cleanup timer on unmount
                return () => clearTimeout(timer);
            }
        } catch {
            // handle error as needed
        } finally {
            setSaving(false);
        }
    };

    const handleContinue = () => {
        onContinue?.(selectedMotivation);
    };

    return (
        <div className="">
            <div className="w-full mx-auto max-w-md">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 px-4 sm:px-0 py-4">
                        Tell us your motivation to get fit?
                    </h1>
                </div>

                <div className="space-y-4 mb-12 px-4 sm:px-0">
                    {motivationOptions.map(option => {
                        const isSelected = selectedMotivation === option.id;
                        return (
                            <button
                                key={option.id}
                                onClick={() => handleOptionSelect(option.id)}
                                disabled={loading || saving}
                                className={`w-full p-3 rounded-full border-2 transition-all duration-300 flex items-center space-x-4 pr-6 ${isSelected
                                    ? 'bg-primary border-primary-400 text-white shadow-lg transform scale-102'
                                    : 'bg-gray-100 text-gray-700 hover:border-primary-300 hover:shadow-md hover:scale-101'
                                    }`}
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${isSelected ? 'bg-white bg-opacity-20' : 'bg-gray-50'
                                    }`}>
                                    {option.image && (
                                        <img
                                            src={option.image}
                                            alt={option.label}
                                            className="object-cover h-12 w-12 rounded-full border-2 border-white"
                                        />
                                    )}
                                </div>

                                <div className="flex-1 text-left">
                                    <span className={`text-xs sm:text-lg font-medium text-gray-700 ${isSelected ? 'text-white' : ''}`}>{option.label}</span>
                                </div>

                                {isSelected && (
                                    <div className="w-4 h-4 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center">
                                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400" />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FitnessMotivationSelector;
