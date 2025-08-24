import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import GoBack from "@/components/common/GoBack.tsx";
import image from "@/assets/images/Q-typicalday/office.webp";
import image1 from "@/assets/images/Q-typicalday/walking.webp";
import image2 from "@/assets/images/Q-typicalday/working.webp";
import image3 from "@/assets/images/Q-typicalday/At home.webp";
import image4 from "@/assets/images/Q-typicalday/park.webp";
import api from '@/lib/axios';

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
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  const dayOptions: DayOption[] = [
    { id: 'at-office', label: 'At Office', image },
    { id: 'walking-daily', label: 'Walking Daily', image: image1 },
    { id: 'working-physically', label: 'Working Physically', image: image2 },
    { id: 'mostly-at-home', label: 'Mostly at Home', image: image3 },
    { id: 'at-park', label: 'At Park', image: image4 }
  ];

  // Fetch saved typical day type on mount
  useEffect(() => {
    const fetchTypicalDayType = async () => {
      setLoading(true);
      try {
        const res = await api.get('/questionnaire/typical-day-type');
        const typicalDay = res?.data?.data?.typicalDayType;
        if (typicalDay && dayOptions.some(option => option.id === typicalDay)) {
          setSelectedOption(typicalDay);
          onSelection?.(typicalDay);
        }
      } catch {
        // Optionally handle errors here
      } finally {
        setLoading(false);
      }
    };
    fetchTypicalDayType();
  }, [onSelection]);

  // Handle option selection with save to backend
  const handleOptionSelect = async (optionId: string) => {
    setSelectedOption(optionId);
    onSelection?.(optionId);

    setSaving(true);
    try {
      await api.put('/questionnaire/typical-day-type', { typicalDayType: optionId });
    } catch {
      // Optionally handle errors here
    } finally {
      setSaving(false);
    }
  };

  const handleContinue = () => {
    onContinue?.(selectedOption);
  };

  return (
    <div className="flex items-center justify-center py-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-8 px-12 sm:px-0 py-2">
          What does your typical day look like?
        </h1>

        <div className="space-y-4 mb-8 px-4">
          {dayOptions.map((option) => {
            const isSelected = selectedOption === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                disabled={loading || saving}
                className={`w-full flex items-center justify-between p-4 rounded-full transition-all duration-200 pr-6 ${isSelected
                    ? 'bg-primary border-primary-400 text-white shadow-lg transform scale-102'
                    : 'bg-gray-100 text-gray-700 hover:border-primary-300 hover:shadow-md hover:scale-101'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="h-10 bg-white rounded-full flex items-center justify-center text-lg">
                    {option.image ? (
                      <img
                        src={option.image}
                        alt={option.label}
                        className="object-cover h-12 w-12 rounded-full border-2 border-white"
                      />
                    ) : null}
                  </div>
                  <span className="text-xs sm:text-lg font-medium text-gray-700">{option.label}</span>
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

        <div className="flex items-center justify-center gap-5 mt-10">
          <GoBack onClick={onBack}  />
          <GoNext onClick={handleContinue} loading={loading || saving} />
        </div>
      </div>
    </div>
  );
};

export default TypicalDaySelector;
