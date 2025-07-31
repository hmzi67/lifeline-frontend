import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import GoBack from "@/components/common/GoBack.tsx";
import image from "@/assets/images/Q-diet/traditional.jpg";
import image1 from "@/assets/images/Q-diet/Mediterranean.jpeg";
import image2 from "@/assets/images/Q-diet/vegetarian.jpg";
import image3 from "@/assets/images/Q-diet/diabeties type1.jpg";
import image4 from "@/assets/images/Q-diet/keto.jpg";
import image5 from "@/assets/images/Q-diet/diabeties type 2.jpg";
import image6 from "@/assets/images/Q-diet/Pescatarian.jpg";
import image7 from "@/assets/images/Q-diet/high protine.jpg";
import image8 from "@/assets/images/Q-diet/vegan.jpg";
import image9 from "@/assets/images/Q-diet/calories cutting.jpg";
import image10 from "@/assets/images/Q-diet/paleo.jpg";
import image11 from "@/assets/images/Q-diet/high calories.jpg";

interface DietType {
  id: string;
  name: string;
  image: string;
}

interface DietTypeProp {
  onContinue?: () => void;
  onDietChange?: (selectedDiets: string[]) => void;
  onBack?: () => void;
}

const dietTypes: DietType[] = [
  { id: 'traditional', name: 'Traditional', image: image },
  { id: 'mediterranean', name: 'Mediterranean', image: image1 },
  { id: 'vegetarian', name: 'Vegetarian', image: image2 },
  { id: 'diabetes-type-1', name: 'Diabetes type 1', image: image3 },
  { id: 'keto', name: 'Keto', image: image4 },
  { id: 'diabetes-type-2', name: 'Diabetes type 2', image: image5 },
  { id: 'pedestrian', name: 'Pedestrian', image: image6 },
  { id: 'high-protein', name: 'High-Protein', image: image7 },
  { id: 'vegan', name: 'Vegan (Plant diet)', image: image8 },
  { id: 'calorie-cutting', name: 'Calorie-Cutting', image: image9 },
  { id: 'paleo', name: 'Paleo', image: image10 },
  { id: 'high-calories', name: 'High Calories', image: image11 }
];

const DietTypeSelector: React.FC<DietTypeProp> = ({ onContinue, onDietChange, onBack }) => {
  const [selectedDiets, setSelectedDiets] = useState<string[]>(['traditional']);

  const handleSelectDiet = (dietId: string) => {
    setSelectedDiets(prevSelectedDiets => {
      let newSelectedDiets;
      if (prevSelectedDiets.includes(dietId)) {
        // Remove the diet if it's already selected
        newSelectedDiets = prevSelectedDiets.filter(id => id !== dietId);
      } else {
        // Add the diet if it's not selected
        newSelectedDiets = [...prevSelectedDiets, dietId];
      }
      onDietChange?.(newSelectedDiets);
      return newSelectedDiets;
    });
  };

  return (
    <div className="flex h-[650px] sm:h-auto flex-col w-full">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto w-full ">
          <h1 className="text-2xl m-4 sm:m-0 sm:text-3xl font-bold text-gray-900 text-center ">
            Choose your diet type
          </h1>
        </div> 
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto w-full pb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {dietTypes.map((diet) => {
                const isSelected = selectedDiets.includes(diet.id);
                return (
                  <button
                    key={diet.id}
                    onClick={() => handleSelectDiet(diet.id)}
                    className={`relative w-full flex items-center justify-between p-3 sm:p-2 rounded-full transition-all duration-200 border-2 pr-4 sm:pr-6 ${
                      isSelected
                        ? 'bg-primary border-primary text-white shadow-lg transform scale-102'
                        : 'bg-gray-100 text-gray-700 hover:border-primary hover:shadow-md hover:scale-101'
                    }`}
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className={`rounded-full flex items-center justify-center ${
                        isSelected ? 'bg-white/20' : 'bg-gray-200'
                      }`}>
                        {diet.image ? (
                          <img 
                            src={diet.image} 
                            alt={diet.name}
                            className="object-cover h-12 w-12 rounded-full border-2 border-white"
                          />
                        ) : null}
                      </div>
                      <span className="font-medium text-sm sm:text-base text-left">{diet.name}</span>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary-500" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons - Fixed */}
      <div className="flex-shrink-0 p-4 sm:p-6 ">
        <div className="flex items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
          <GoBack onClick={onBack} />
          <button
            onClick={onContinue}
            disabled={selectedDiets.length === 0}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium border w-auto h-auto px-6 sm:px-8 py-3 sm:py-4 transition-all duration-200"
          >
            Continue
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DietTypeSelector;