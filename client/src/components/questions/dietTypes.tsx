import React, { useState, useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import GoNext from "@/components/common/GoNext.tsx";
import image from "@/assets/images/Q-diet/traditional.webp";
import image1 from "@/assets/images/Q-diet/Mediterranean.webp";
import image2 from "@/assets/images/Q-diet/vegetarian.webp";
import image3 from "@/assets/images/Q-diet/diabeties type1.webp";
import image4 from "@/assets/images/Q-diet/keto.webp";
import image5 from "@/assets/images/Q-diet/diabeties type 2.webp";
import image6 from "@/assets/images/Q-diet/Pescatarian.webp";
import image7 from "@/assets/images/Q-diet/high protine.webp";
import image8 from "@/assets/images/Q-diet/vegan.webp";
import image9 from "@/assets/images/Q-diet/calories cutting.webp";
import image10 from "@/assets/images/Q-diet/paleo.webp";
import image11 from "@/assets/images/Q-diet/high calories.webp";
import api from '@/lib/axios';

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
  { id: 'traditional', name: 'Traditional', image },
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

const DietTypeSelector: React.FC<DietTypeProp> = ({ onContinue, onDietChange }) => {
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Fetch saved diet types on mount — runs only once
  useEffect(() => {
    let cancelled = false;

    const fetchDietTypes = async () => {
      setLoading(true);
      try {
        const res = await api.get('/questionnaire/diet-type');
        if (cancelled) return;
        const dietFromApi = res?.data?.data?.dietType;
        if (dietFromApi) {
          const diets = Array.isArray(dietFromApi)
            ? dietFromApi
            : dietFromApi.split(',').map((d: string) => d.trim());
          setSelectedDiets(diets);
          onDietChange?.(diets);
        }
      } catch {
        // optional error handling
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchDietTypes();

    return () => {
      cancelled = true;
    };
  }, []); // Empty deps ensure one-time fetch

  // Debounced save function to batch rapid toggles
  const scheduleSaveDietTypes = (diets: string[]) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      saveDietTypes(diets);
    }, 500); // 500ms debounce
  };

  const saveDietTypes = async (diets: string[]) => {
    setLoading(true);
    try {
      await api.put('/questionnaire/diet-type', { dietType: diets });

    } catch {
      // optional error handling
    } finally {
      setLoading(false);
    }
  };

  // Toggle diet selection and debounce save
  const handleSelectDiet = (dietId: string) => {
    setSelectedDiets(prevSelected => {
      let newSelected: string[];
      if (prevSelected.includes(dietId)) {
        newSelected = prevSelected.filter(id => id !== dietId);
      } else {
        newSelected = [...prevSelected, dietId];
      }
      onDietChange?.(newSelected);
      scheduleSaveDietTypes(newSelected);
      return newSelected;
    });
  };

  return (
    <div className="flex h-[650px] sm:h-auto flex-col w-full">
      {/* Header */}
      <div className="flex-shrink-0 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto w-full ">
          <h1 className="text-2xl m-4 sm:m-0 sm:text-3xl font-bold text-gray-900 text-center ">
            Choose your diet type
          </h1>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-hidden ">
        <div className="h-full overflow-y-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto w-full pb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 ">
              {dietTypes.map(diet => {
                const isSelected = selectedDiets.includes(diet.id);
                return (
                  <button
                    key={diet.id}
                    onClick={() => handleSelectDiet(diet.id)}
                    disabled={loading}
                    className={`relative w-full flex items-center justify-between p-3 sm:p-2 rounded-full transition-all duration-200 border-2 pr-4 sm:pr-6 ${isSelected
                        ? 'bg-primary border-primary text-white shadow-lg transform scale-102'
                        : 'bg-gray-100 text-gray-700 hover:border-primary hover:shadow-md hover:scale-101'
                      }`}
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className={`rounded-full flex items-center justify-center ${isSelected ? 'bg-white/20' : 'bg-gray-200'
                        }`}>
                        {diet.image && (
                          <img
                            src={diet.image}
                            alt={diet.name}
                            className="object-cover h-12 w-12 rounded-full border-2 border-white"
                          />
                        )}
                      </div>
                      <span className={`text-xs sm:text-lg font-medium text-gray-700 text-left ${isSelected ? 'text-white' : ''}`}>{diet.name}</span>
                    </div>
                    {isSelected && (
                      <div className="w-4 h-4 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex-shrink-0 p-4 sm:p-6 ">
        <div className="flex items-center justify-center max-w-4xl mx-auto">
          <GoNext onClick={onContinue} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default DietTypeSelector;
