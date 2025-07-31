import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import GoBack from "@/components/common/GoBack.tsx";
import image from "@/assets/images/Q-foodallergy/dairy.jpeg";
import image1 from "@/assets/images/Q-foodallergy/glutten.jpg";
import image2 from "@/assets/images/Q-foodallergy/eggs.jpg";
import image3 from "@/assets/images/Q-foodallergy/fish.jpg";
import image4 from "@/assets/images/Q-foodallergy/Everything.jpg";


interface AllergenOption {
  id: string;
  name: string;
  image: string;
}

interface AllergenSelectorProps {
  onContinue?: (allergens: string[]) => void;
  onAllergiesChange?: (allergens: string[]) => void;
  onBack?: () => void;
}

const AllergenSelector: React.FC<AllergenSelectorProps> = ({ onContinue, onAllergiesChange,onBack}) => {
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>(['dairy']);

  const allergenOptions: AllergenOption[] = [
    { id: 'dairy', name: 'Dairy', image: image },
    { id: 'gluten', name: 'Gluten', image: image1 },
    { id: 'eggs', name: 'Eggs', image: image2 },
    { id: 'fish', name: 'Fish', image: image3},
    { id: 'everything', name: 'I eat everything', image: image4 },
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
      <div className="space-y-4 mb-3 p-3 sm:p-0">
        {allergenOptions.map((option) => {
          const isSelected = selectedAllergens.includes(option.id);

          return (
            <button
              key={option.id}
              onClick={() => toggleAllergen(option.id)}
              className={`w-full flex items-center justify-between p-3 rounded-full transition-all duration-200 pr-6 ${
                isSelected
                   ? 'bg-primary border-primary-400 text-white shadow-lg transform scale-102'
                   : 'bg-gray-100 text-gray-700 hover:border-primary-300 hover:shadow-md hover:scale-101'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                  isSelected ? 'bg-white bg-opacity-20' : 'bg-white'
                }`}>
                  {option.image ? (
                   <img 
                     src={option.image} 
                     className=" object-cover h-12 w-12 rounded-full border-2 border-white"
                   />
                 ) : null}
                </div>
                <span className={`text-lg font-medium ${
                  isSelected ? 'text-white' : 'text-black'
                }`}>{option.name}</span>
              </div>

              {isSelected && (
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary-400" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Continue Button */}
      <div className={'flex items-center justify-center gap-5 mt-12'}>
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
