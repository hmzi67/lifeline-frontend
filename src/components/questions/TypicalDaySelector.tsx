import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface DayOption {
  id: string;
  label: string;
  icon: string;
}

const TypicalDaySelector: React.FC = () => {
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
  };

  const handleContinue = () => {
    console.log('Selected option:', selectedOption);
    // Handle continue action here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">
          What does your typical day look like?
        </h1>
        
        <div className="space-y-4 mb-8">
          {dayOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              className={`w-full flex items-center justify-between p-4 rounded-full transition-all duration-200 ${
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
                  <Check className="w-4 h-4 text-teal-400" />
                </div>
              )}
            </button>
          ))}
        </div>
        
        <button
          onClick={handleContinue}
          className="w-full bg-teal-400 text-white font-semibold py-4 rounded-full hover:bg-teal-500 transition-colors duration-200 shadow-lg"
        >
          Continue
        </button>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-300 rounded-full opacity-50 -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-teal-300 rounded-full opacity-50 translate-y-20 -translate-x-20"></div>
    </div>
  );
};

export default TypicalDaySelector;