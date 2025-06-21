import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface AllergenOption {
  id: string;
  name: string;
  icon: string;
}

const AllergenSelector: React.FC = () => {
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>(['dairy']);

  const allergenOptions: AllergenOption[] = [
    { id: 'dairy', name: 'Dairy', icon: '🥛' },
    { id: 'gluten', name: 'Gluten', icon: '🌾' },
    { id: 'eggs', name: 'Eggs', icon: '🥚' },
    { id: 'fish', name: 'Fish', icon: '🐟' },
    { id: 'everything', name: 'I eat everything', icon: '🍽️' }
  ];

  const toggleAllergen = (allergenId: string) => {
    if (allergenId === 'everything') {
      // If "I eat everything" is selected, clear all other selections
      setSelectedAllergens(selectedAllergens.includes('everything') ? [] : ['everything']);
    } else {
      // If any specific allergen is selected, remove "I eat everything"
      const newSelected = selectedAllergens.filter(id => id !== 'everything');
      
      if (newSelected.includes(allergenId)) {
        setSelectedAllergens(newSelected.filter(id => id !== allergenId));
      } else {
        setSelectedAllergens([...newSelected, allergenId]);
      }
    }
  };

  const handleContinue = () => {
    console.log('Selected allergens:', selectedAllergens);
    // Handle continue action here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Do you have any allergen food?
          </h1>
        </div>

        <div className="space-y-4 mb-8">
          {allergenOptions.map((option) => {
            const isSelected = selectedAllergens.includes(option.id);
            
            return (
              <button
                key={option.id}
                onClick={() => toggleAllergen(option.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-200 transform hover:scale-105 ${
                  isSelected
                    ? 'bg-white bg-opacity-90 shadow-lg'
                    : 'bg-white bg-opacity-20 hover:bg-opacity-30'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white bg-opacity-80 rounded-full flex items-center justify-center text-xl">
                    {option.icon}
                  </div>
                  <span className={`font-medium text-lg ${
                    isSelected ? 'text-gray-800' : 'text-white'
                  }`}>
                    {option.name}
                  </span>
                </div>
                
                {isSelected && (
                  <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleContinue}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-4 px-6 rounded-2xl transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Continue
        </button>
      </div>

      {/* Decorative background elements */}
      <div className="fixed top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="fixed bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
    </div>
  );
};

export default AllergenSelector;