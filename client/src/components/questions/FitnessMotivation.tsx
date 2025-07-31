import React, {useState} from 'react';
import {ArrowRight, Check} from 'lucide-react';
import GoBack from "@/components/common/GoBack.tsx";
import image from "@/assets/images/Q-motivation/cake.jpg";
import image1 from "@/assets/images/Q-motivation/wedding.jpg";
import image2 from "@/assets/images/Q-motivation/ring.jpg";
import image3 from "@/assets/images/Q-motivation/travel.jpeg";
import image4 from "@/assets/images/Q-motivation/fitness.jpeg";

interface MotivationOption {
    id: string;
    label: string;
    image: string;
}

interface MotivationActions {
    onContinue?: (selectedMotivaton: string) => void;
    onBack?: () => void;
}

const FitnessMotivationSelector: React.FC<MotivationActions> = ({onContinue, onBack}) => {
    const [selectedMotivation, setSelectedMotivation] = useState<string>('birthday');

    const motivationOptions: MotivationOption[] = [
        {id: 'birthday', label: 'Birthday', image: image},
        {id: 'wedding', label: 'Wedding', image: image1},
        {id: 'engagement', label: 'Engagement', image: image2},
        {id: 'travelling', label: 'Travelling', image: image3},
        {id: 'other', label: 'Other', image: image4}
    ];

    const handleOptionSelect = (optionId: string) => {
        setSelectedMotivation(optionId);
    };

    const handleContinue = () => {
        onContinue?.(selectedMotivation)
    }

    return (
        <div className="">
            <div className="w-full mx-auto max-w-md">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Tell us your motivation to get fit?
                    </h1>
                </div>

                <div className="space-y-4 mb-12">
                    {motivationOptions.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleOptionSelect(option.id)}
                            className={`w-full p-3 rounded-full border-2 transition-all duration-300 flex items-center space-x-4 pr-6 ${
                                selectedMotivation === option.id
                                     ? 'bg-primary border-primary-400 text-white shadow-lg transform scale-102'
                                     : 'bg-gray-100 text-gray-700 hover:border-primary-300 hover:shadow-md hover:scale-101'
                            }`}
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                                selectedMotivation === option.id
                                    ? 'bg-white bg-opacity-20'
                                    : 'bg-gray-50'
                            }`}>
                               {option.image ? (
                    <img 
                      src={option.image} 
                      alt={option.label}
                      className=" object-cover h-12 w-12 rounded-full  border-2 border-white"
                    />
                  ) : null}
                            </div>

                            <div className="flex-1 text-left">
                                <span className="text-lg font-medium">{option.label}</span>
                            </div>

                            {selectedMotivation === option.id && (
                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                    <Check className="w-5 h-5 text-primary-400"/>
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                <div className={'flex items-center justify-center gap-5 mt-12'}>
                    <GoBack onClick={onBack}/>
                    <button
                        onClick={handleContinue}
                        className="inline-flex items-center justify-between p-4 rounded-full bg-primary hover:bg-primary-600 text-white font-medium border w-auto h-auto px-8 py-4 transition-all duration-200"
                    >
                        Continue
                        <ArrowRight className="w-5 h-5"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FitnessMotivationSelector;