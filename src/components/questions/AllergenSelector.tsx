import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import GoBack from "@/components/common/GoBack.tsx";

interface AllergenOption {
  id: string;
  name: string;
  icon: string;
}

interface AllergenSelectorProps {
  onContinue?: (allergens: string[]) => void;
  onAllergiesChange?: (allergens: string[]) => void;
  onBack?: () => void;
}

const AllergenSelector: React.FC<AllergenSelectorProps> = ({
                                                             onContinue,
                                                             onAllergiesChange,
                                                             onBack
                                                           }) => {
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>(['dairy']);

  const allergenOptions: AllergenOption[] = [
    { id: 'dairy', name: 'Dairy', icon: '🥛' },
    { id: 'gluten', name: 'Gluten', icon: '🌾' },
    { id: 'eggs', name: 'Eggs', icon: '🥚' },
    { id: 'fish', name: 'Fish', icon: '🐟' },
    { id: 'everything', name: 'I eat everything', icon: '🍽️' },
  ];

  const toggleAllergen = (allergenId: string) => {
    let newSelected: string[];

    if (allergenId === 'everything') {
      newSelected = selectedAllergens.includes('everything') ? [] : ['everything'];
    } else {
      newSelected = selectedAllergens.filter(id => id !== 'everything');

      if (newSelected.includes(allergenId)) {
        newSelected = newSelected.filter(id => id !== allergenId);
      } else {
        newSelected = [...newSelected, allergenId];
      }
    }

    setSelectedAllergens(newSelected);
    onAllergiesChange?.(newSelected); // Notify parent
  };

  const handleContinue = () => {
    const allergensToSend = selectedAllergens.includes('everything') ? [] : selectedAllergens;
    onContinue?.(allergensToSend);
  };

  return (
  <div className="py-4">
    <div className="max-w-md mx-auto">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
        Do you have any allergen food?
      </h1>

      {/* Allergen Options */}
      <div className="space-y-4 mb-3">
        {allergenOptions.map((option) => {
          const isSelected = selectedAllergens.includes(option.id);

          return (
            <button
              key={option.id}
              onClick={() => toggleAllergen(option.id)}
              className={`w-full flex items-center justify-between p-3 rounded-full transition-all duration-200 pr-6 ${
                isSelected
                  ? 'bg-teal-400 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                  isSelected ? 'bg-white bg-opacity-20' : 'bg-white'
                }`}>
                  {option.icon}
                </div>
                <span className={`text-lg font-medium ${
                  isSelected ? 'text-white' : 'text-black'
                }`}>{option.name}</span>
              </div>

              {isSelected && (
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-teal-400" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Continue Button */}
      <div className={'flex items-center justify-center gap-5'}>
        <GoBack onClick={onBack} />
        <button
          onClick={handleContinue}
          className="inline-flex items-center justify-between gap-2 rounded-full bg-primary hover:bg-primary-600 text-white font-medium border w-auto h-auto px-8 py-4 transition-all duration-200"
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
);
};

export default AllergenSelector;
