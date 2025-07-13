import React, { useState } from 'react';
import {ArrowRight, Check} from 'lucide-react';
import GoBack from "@/components/common/GoBack.tsx";

interface DietType {
  id: string;
  name: string;
  emoji: string;
}

interface DietTypeProp {
  onContinue?: () => void;
  onDietChange?: (selectedDiet: string) => void;
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
  const [selectedDiet, setSelectedDiet] = useState<string>('traditional');

  const handleSelectDiet = (dietId: string) => {
    setSelectedDiet(dietId);
    onDietChange?.(dietId);
  };

  return (
      <div className="py-2">
        <div className=" max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
            Choose your diet type
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-4 mb-12">
            {dietTypes.map((diet) => {
              const isSelected = selectedDiet === diet.id;
              return (
                  <button
                      key={diet.id}
                      onClick={() => handleSelectDiet(diet.id)}
                      className={`
                  relative flex items-center justify-between p-2 rounded-full transition-all duration-200 border-2 pr-6
                  ${isSelected
                          ? 'bg-primary border-teal-400 text-white shadow-lg transform scale-105'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-teal-300 hover:shadow-md hover:scale-102'
                      }
                `}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-2xl
                    ${isSelected ? 'bg-white/20' : 'bg-gray-100'}
                  `}>
                        {diet.emoji}
                      </div>
                      <span className="font-semibold text-lg">{diet.name}</span>
                    </div>

                    {isSelected && (
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                          <Check className="w-5 h-5 text-primary-500" />
                        </div>
                    )}
                  </button>
              );
            })}
          </div>

          {/* Continue Button */}
          <div className={'flex items-center justify-center gap-5 mt-12'}>
            <GoBack onClick={onBack}/>
            <button
                onClick={onContinue}
                disabled={!selectedDiet}
                className="inline-flex items-center justify-between gap-2 rounded-full bg-primary hover:bg-primary-600 text-white font-medium border w-auto h-auto px-8 py-4 transition-all duration-200"
            >
              Continue
              <ArrowRight className="w-5 h-5"/>
            </button>
          </div>
        </div>
      </div>
  );
};

export default DietTypeSelector;
