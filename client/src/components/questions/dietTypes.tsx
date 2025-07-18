import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import GoBack from "@/components/common/GoBack.tsx";

interface DietType {
  id: string;
  name: string;
  emoji: string;
}

interface DietTypeProp {
  onContinue?: () => void;
  onDietChange?: (selectedDiets: string[]) => void;
  onBack?: () => void;
}

const dietTypes: DietType[] = [
  { id: 'traditional', name: 'Traditional', emoji: '🍖' },
  { id: 'mediterranean', name: 'Mediterranean', emoji: '🥗' },
  { id: 'vegetarian', name: 'Vegetarian', emoji: '🥕' },
  { id: 'diabetes-type-1', name: 'Diabetes type 1', emoji: '🍎' },
  { id: 'keto', name: 'Keto', emoji: '🥑' },
  { id: 'diabetes-type-2', name: 'Diabetes type 2', emoji: '🥬' },
  { id: 'pedestrian', name: 'Pedestrian', emoji: '🐟' },
  { id: 'high-protein', name: 'High-Protein', emoji: '🍗' },
  { id: 'vegan', name: 'Vegan (Plant diet)', emoji: '🌱' },
  { id: 'calorie-cutting', name: 'Calorie-Cutting', emoji: '🍊' },
  { id: 'paleo', name: 'Paleo', emoji: '🥩' },
  { id: 'high-calories', name: 'High Calories', emoji: '🍰' }
];

const DietTypeSelector: React.FC<DietTypeProp> = ({ onContinue, onDietChange, onBack }) => {
  const [selectedDiets, setSelectedDiets] = useState<string[]>(['traditional']);

  const handleSelectDiet = (dietId: string) => {
    setSelectedDiets(prevSelectedDiets => {
      if (prevSelectedDiets.includes(dietId)) {
        // Remove the diet if it's already selected
        return prevSelectedDiets.filter(id => id !== dietId);
      } else {
        // Add the diet if it's not selected
        return [...prevSelectedDiets, dietId];
      }
    });
    onDietChange?.(selectedDiets);
  };

  return (
    <div className="flex flex-col min-h-screen w-full p-2 box-border">
      <div className="flex flex-col items-center flex-1 w-full">
        <div className="max-w-4xl mx-auto w-full px-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4 sm:mb-6">
            Choose your diet type
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-8">
            {dietTypes.map((diet) => {
              const isSelected = selectedDiets.includes(diet.id);
              return (
                <button
                  key={diet.id}
                  onClick={() => handleSelectDiet(diet.id)}
                  className={`relative flex items-center justify-between p-2 sm:p-3 rounded-full transition-all duration-200 border-2 pr-4 sm:pr-6 ${
                    isSelected
                      ? 'bg-primary border-teal-400 text-white shadow-lg transform scale-102'
                      : 'bg-gray-100 text-gray-700 hover:border-teal-300 hover:shadow-md hover:scale-101'
                  }`}
                >
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-lg sm:text-xl ${
                      isSelected ? 'bg-white/20' : 'bg-gray-200'
                    }`}>
                      {diet.emoji}
                    </div>
                    <span className="font-medium text-sm sm:text-base">{diet.name}</span>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary-500" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 sm:gap-5 mt-2 mb-6">
        <GoBack onClick={onBack} />
        <button
          onClick={onContinue}
          disabled={selectedDiets.length === 0}
          className="inline-flex items-center justify-between gap-2 rounded-full bg-primary hover:bg-primary-600 text-white font-medium border w-auto h-auto px-6 sm:px-8 py-3 sm:py-4 transition-all duration-200"
        >
          Continue
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};

export default DietTypeSelector;
