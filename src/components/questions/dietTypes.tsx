import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface DietType {
  id: string;
  name: string;
  emoji: string;
}

interface DietTypeProp {
  onContinue?: () => void;
  onDietChange?: (selectedDiet: string) => void;
}

const dietTypes: DietType[] = [
  { id: 'traditional', name: 'Traditional', emoji: '🍖' },
  { id: 'mediterranean', name: 'Mediterranean', emoji: '🥗' },
  { id: 'vegetarian', name: 'Vegetarian', emoji: '🥕' },
  { id: 'diabetes-type-1', name: 'Diabetes type 1', emoji: '🍎' },
  { id: 'keto', name: 'Keto', emoji: '🥑' },
  { id: 'diabetes-type-2', name: 'Diabetes type 2', emoji: '🥬' },
  { id: 'pescatarian', name: 'Pescatarian', emoji: '🐟' },
  { id: 'high-protein', name: 'High-Protein', emoji: '🍗' },
  { id: 'vegan', name: 'Vegan (Plant diet)', emoji: '🌱' },
  { id: 'calorie-cutting', name: 'Calorie-Cutting', emoji: '🍊' },
  { id: 'paleo', name: 'Paleo', emoji: '🥩' },
  { id: 'high-calories', name: 'High Calories', emoji: '🍰' }
];

const DietTypeSelector: React.FC<DietTypeProp> = ({ onContinue, onDietChange }) => {
  const [selectedDiet, setSelectedDiet] = useState<string>('traditional');

  const handleSelectDiet = (dietId: string) => {
    setSelectedDiet(dietId);
    onDietChange?.(dietId);
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-teal-400 to-cyan-400 rounded-full opacity-20 transform translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-teal-400 to-cyan-400 rounded-full opacity-20 transform -translate-x-24 translate-y-24"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Choose your diet type
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {dietTypes.map((diet) => {
              const isSelected = selectedDiet === diet.id;
              return (
                  <button
                      key={diet.id}
                      onClick={() => handleSelectDiet(diet.id)}
                      className={`
                  relative flex items-center justify-between p-4 rounded-2xl transition-all duration-200 border-2
                  ${isSelected
                          ? 'bg-gradient-to-r from-teal-400 to-teal-400 border-teal-400 text-white shadow-lg transform scale-105'
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

          <div className="flex justify-center">
            <button
                onClick={onContinue}
                disabled={!selectedDiet}
                className={`
              px-12 py-4 rounded-2xl font-semibold text-lg transition-all duration-200
              ${selectedDiet
                    ? 'bg-gradient-to-r from-teal-400 to-teal-400 text-white hover:from-teal-500 hover:to-teal-500 shadow-lg hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
            `}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
  );
};

export default DietTypeSelector;
