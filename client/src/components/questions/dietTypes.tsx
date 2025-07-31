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
                  {diet.image ? (
                    <img 
                      src={diet.image} 
                      className=" object-cover h-12 w-12 rounded-full"
                    />
                  ) : null}
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
