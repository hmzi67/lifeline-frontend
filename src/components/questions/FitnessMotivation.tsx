import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface MotivationOption {
  id: string;
  label: string;
  icon: string;
}

const FitnessMotivationSelector: React.FC = () => {
  const [selectedMotivation, setSelectedMotivation] = useState<string>('birthday');

  const motivationOptions: MotivationOption[] = [
    { id: 'birthday', label: 'Birthday', icon: '🎂' },
    { id: 'wedding', label: 'Wedding', icon: '💒' },
    { id: 'engagement', label: 'Engagement', icon: '💍' },
    { id: 'travelling', label: 'Travelling', icon: '✈️' },
    { id: 'other', label: 'Other', icon: '🎯' }
  ];

  const handleOptionSelect = (optionId: string) => {
    setSelectedMotivation(optionId);
  };

  const handleContinue = () => {
    console.log('Selected motivation:', selectedMotivation);
    // Handle continue logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-l from-teal-400 to-cyan-400 rounded-full opacity-20 transform translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full opacity-20 transform -translate-x-24 translate-y-24"></div>
      
      <div className="container mx-auto px-6 py-12 max-w-md relative z-10">
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
              className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 flex items-center space-x-4 ${
                selectedMotivation === option.id
                  ? 'bg-gradient-to-r from-teal-400 to-cyan-400 border-teal-400 text-white shadow-lg transform scale-105'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-teal-300 hover:shadow-md'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                selectedMotivation === option.id
                  ? 'bg-white bg-opacity-20'
                  : 'bg-gray-50'
              }`}>
                {option.icon}
              </div>
              
              <div className="flex-1 text-left">
                <span className="text-lg font-medium">{option.label}</span>
              </div>

              {selectedMotivation === option.id && (
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-teal-400" />
                </div>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={handleContinue}
          className="w-full bg-gradient-to-r from-teal-400 to-cyan-400 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default FitnessMotivationSelector;