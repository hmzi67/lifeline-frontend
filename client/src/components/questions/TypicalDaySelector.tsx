import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import GoBack from "@/components/common/GoBack.tsx";  // Assuming you're using lucide-react for icons
import image from "@/assets/images/Q-typicalday/office.jpeg";
import image1 from "@/assets/images/Q-typicalday/walking.jpeg";
import image2 from "@/assets/images/Q-typicalday/working.jpeg";
import image3 from "@/assets/images/Q-typicalday/At home.jpeg";
import image4 from "@/assets/images/Q-typicalday/park.jpg";

interface DayOption {
  id: string;
  label: string;
  image: string;
}

interface TypicalDaySelectorProps {
  onContinue?: (selectedOption: string) => void;
  onSelection?: (selectedOption: string) => void;
  onBack?: () => void;
}

const TypicalDaySelector: React.FC<TypicalDaySelectorProps> = ({ onContinue, onSelection, onBack }) => {
  const [selectedOption, setSelectedOption] = useState<string>('at-office');

  const dayOptions: DayOption[] = [
    { id: 'at-office', label: 'At Office', image: image },
    { id: 'walking-daily', label: 'Walking Daily', image: image1 },
    { id: 'working-physically', label: 'Working Physically', image: image2 },
    { id: 'mostly-at-home', label: 'Mostly at Home', image: image3 },
    { id: 'at-park', label: 'At Park', image: image4 }
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
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-8 px-12 sm:px-0 py-2">
            What does your typical day look like?
          </h1>

          <div className="space-y-4 mb-8 px-4">
            {dayOptions.map((option) => (
                <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-full transition-all duration-200 pr-6 ${
                        selectedOption === option.id
                              ? 'bg-primary border-primary-400 text-white shadow-lg transform scale-102'
                              : 'bg-gray-100 text-gray-700 hover:border-primary-300 hover:shadow-md hover:scale-101'
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg">
                     {option.image ? (
                    <img 
                      src={option.image} 
                      alt={option.label}
                      className=" object-cover h-[43px] w-16 rounded-full  border-2 border-white"
                    />
                  ) : null}
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

           <div className={'flex items-center justify-center gap-5 mt-10'}>
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
