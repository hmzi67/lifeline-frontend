import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import GoBack from "@/components/common/GoBack.tsx";  // Assuming you're using lucide-react for icons

interface DayOption {
  id: string;
  label: string;
  icon: string;
}

interface TypicalDaySelectorProps {
  onContinue?: (selectedOption: string) => void;
  onSelection?: (selectedOption: string) => void;
  onBack?: () => void;
}

const TypicalDaySelector: React.FC<TypicalDaySelectorProps> = ({
                                                                 onContinue,
                                                                 onSelection,
                                                                 onBack
                                                               }) => {
  const [selectedOption, setSelectedOption] = useState<string>('at-office');

  const dayOptions: DayOption[] = [
    { id: 'at-office', label: 'At Office', icon: '🏢' },
    { id: 'walking-daily', label: 'Walking Daily', icon: '🚶' },
    { id: 'working-physically', label: 'Working Physically', icon: '💪' },
    { id: 'mostly-at-home', label: 'Mostly at Home', icon: '🏠' },
    { id: 'at-park', label: 'At Park', icon: '🌳' }
  ];

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    if (onSelection) {
      onSelection(optionId);
    }
  };

  const handleContinue = () => {
    console.log('Selected option:', selectedOption);
    if (onContinue) {
      onContinue(selectedOption);
    }
  };

  return (
      <div className="flex items-center justify-center py-6">

        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">
            What does your typical day look like?
          </h1>

          <div className="space-y-4 mb-8">
            {dayOptions.map((option) => (
                <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-full transition-all duration-200 pr-6 ${
                        selectedOption === option.id
                            ? 'bg-teal-400 text-white shadow-lg'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg">
                      {option.icon}
                    </div>
                    <span className="font-medium">{option.label}</span>
                  </div>

                  {selectedOption === option.id && (
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary-400" />
                      </div>
                  )}
                </button>
            ))}
          </div>

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
        </div>
      </div>
  );
};

export default TypicalDaySelector;
