import React, { useState, useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import GoNext from "@/components/common/GoNext.tsx";
import image from "@/assets/images/Q-foodallergy/dairy.webp";
import image1 from "@/assets/images/Q-foodallergy/glutten.webp";
import image2 from "@/assets/images/Q-foodallergy/eggs.webp";
import image3 from "@/assets/images/Q-foodallergy/fish.webp";
import image4 from "@/assets/images/Q-foodallergy/Everything.webp";
import api from '@/lib/axios';

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

const allergenOptions: AllergenOption[] = [
  { id: 'dairy', name: 'Dairy', image: image },
  { id: 'gluten', name: 'Gluten', image: image1 },
  { id: 'eggs', name: 'Eggs', image: image2 },
  { id: 'fish', name: 'Fish', image: image3 },
  { id: 'everything', name: 'I eat everything', image: image4 },
];

const AllergenSelector: React.FC<AllergenSelectorProps> = ({ onContinue, onAllergiesChange }) => {
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [loading, setLoading] = useState(false); // For fetch
  const [saving, setSaving] = useState(false);   // For save debounce
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch saved allergen food once on mount
  useEffect(() => {
    let cancelled = false;

    const fetchAllergens = async () => {
      setLoading(true);
      try {
        const res = await api.get('/questionnaire/allergen-food');
        if (cancelled) return;
        const allergenFromApi = res?.data?.data?.allergenFood;
        if (allergenFromApi) {
          const allergens = typeof allergenFromApi === 'string'
            ? allergenFromApi === ''
              ? []
              : allergenFromApi.split(',').map((a: string) => a.trim())
            : Array.isArray(allergenFromApi)
              ? allergenFromApi
              : [];
          setSelectedAllergens(allergens);
          onAllergiesChange?.(allergens);
        }
      } catch {
        // Optionally handle errors e.g. console.warn
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchAllergens();

    // Cleanup to prevent state update after unmount
    return () => { cancelled = true; };
  }, []); // empty deps so runs once only

  // Save allergens to backend
  const saveAllergens = async (allergens: string[]) => {
    setSaving(true);
    try {
      await api.put('/questionnaire/allergen-food', { allergenFood: allergens });
    } catch {
      // Optionally handle errors
    } finally {
      setSaving(false);
    }
  };

  // Debounce save calls to batch rapid toggles
  const scheduleSaveAllergens = (allergens: string[]) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      saveAllergens(allergens);
    }, 500); // 500ms debounce delay
  };

  // Toggle allergen selection with debounce saving
  const toggleAllergen = (allergenId: string) => {
    setSelectedAllergens(prev => {
      let newSelected: string[];

      if (allergenId === 'everything') {
        newSelected = prev.includes('everything') ? [] : ['everything'];
      } else {
        // Exclude "everything" if toggling other allergen
        newSelected = prev.filter(id => id !== 'everything');

        if (newSelected.includes(allergenId)) {
          newSelected = newSelected.filter(id => id !== allergenId);
        } else {
          newSelected = [...newSelected, allergenId];
        }
      }

      onAllergiesChange?.(newSelected);
      scheduleSaveAllergens(newSelected);

      return newSelected;
    });
  };

  const handleContinue = () => {
    // If "everything" selected, treat as no allergens
    const allergensToSend = selectedAllergens.includes('everything') ? [] : selectedAllergens;
    onContinue?.(allergensToSend);
  };

  return (
    <div className="py-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
         Do you have any food allergies?
        </h1>

        {/* Allergen Options */}
        <div className="space-y-4 mb-3 p-3 sm:p-0">
          {allergenOptions.map((option) => {
            const isSelected = selectedAllergens.includes(option.id);

            return (
              <button
                key={option.id}
                onClick={() => toggleAllergen(option.id)}
                disabled={loading || saving}
                className={`w-full flex items-center justify-between px-3 rounded-full transition-all duration-200 ${isSelected
                    ? 'bg-primary border-primary-400 text-white shadow-lg transform scale-102'
                    : 'bg-gray-100 text-gray-700 hover:border-primary-300 hover:shadow-md hover:scale-101'
                  }`}
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className={`h-16 rounded-full flex items-center justify-center text-xl `}>
                    {option.image ? (
                      <img
                        src={option.image}
                        alt={option.name}
                        className="object-cover h-12 w-12 rounded-full border-2 border-white"
                      />
                    ) : null}
                  </div>
                  <span className={`text-xs sm:text-lg font-medium ${isSelected ? 'text-white' : 'text-gray-700'
                    }`}>{option.name}</span>
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

        {/* Continue Button */}
        <div className="flex items-center justify-center gap-5 mt-12">
          <GoNext onClick={handleContinue} loading={loading || saving}  />
        </div>
      </div>
    </div>
  );
};

export default AllergenSelector;
