import React, { useState } from 'react';

interface BodyProps {
  onContinue?: (selectedAreas: string[]) => void;
}

const Body: React.FC<BodyProps> = ({ onContinue }) => {
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  const focusAreas = [
    { id: 'shoulders', label: 'Shoulders', position: 'top-16 left-12' },
    { id: 'chest', label: 'Chest', position: 'top-32 left-4' },
    { id: 'arms', label: 'Arms', position: 'top-40 left-2' },
    { id: 'belly', label: 'Belly', position: 'top-32 right-4' },
    { id: 'back', label: 'Back', position: 'top-40 right-2' },
    { id: 'thighs', label: 'Thighs', position: 'top-56 left-8' },
    { id: 'legs', label: 'Legs', position: 'top-64 right-4' },
    { id: 'fullbody', label: 'Full Body', position: 'bottom-32 left-4' }
  ];

  const toggleArea = (areaId: string) => {
    setSelectedAreas(prev => 
      prev.includes(areaId) 
        ? prev.filter(id => id !== areaId)
        : [...prev, areaId]
    );
  };

  const handleContinue = () => {
    if (onContinue) {
      onContinue(selectedAreas);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400 rounded-full opacity-60 transform translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-300 rounded-full opacity-40 transform -translate-x-12 translate-y-12"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-teal-200 rounded-full opacity-60"></div>
      
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full border-2 border-blue-400">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Focus Area</h1>
          <p className="text-gray-600 text-sm">Tell us which part of your body you'd like to focus on during your workouts</p>
        </div>

        <div className="relative flex justify-center mb-8">
          {/* Person illustration container */}
          <div className="relative w-48 h-80 bg-gradient-to-b from-gray-100 to-gray-50 rounded-lg flex flex-col items-center justify-center border-2 border-gray-200">
            {/* Simple person illustration */}
            <div className="relative">
              {/* Head */}
              <div className="w-12 h-12 bg-yellow-200 rounded-full mx-auto mb-2 border-2 border-gray-300 flex items-center justify-center">
                <div className="text-lg">😊</div>
              </div>
              
              {/* Body */}
              <div className="w-16 h-20 bg-gray-400 rounded-lg mx-auto mb-2 flex items-center justify-center text-white font-medium text-xs">
                Body
              </div>
              
              {/* Arms */}
              <div className="absolute top-12 -left-6 w-4 h-12 bg-gray-400 rounded-full"></div>
              <div className="absolute top-12 -right-6 w-4 h-12 bg-gray-400 rounded-full"></div>
              
              {/* Legs */}
              <div className="flex gap-2 justify-center">
                <div className="w-6 h-16 bg-black rounded-lg"></div>
                <div className="w-6 h-16 bg-black rounded-lg"></div>
              </div>
              
              {/* Feet */}
              <div className="flex gap-2 justify-center mt-1">
                <div className="w-8 h-4 bg-green-600 rounded-full"></div>
                <div className="w-8 h-4 bg-green-600 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Focus area labels with connecting lines */}
          {focusAreas.map((area) => (
            <div key={area.id} className={`absolute ${area.position}`}>
              <button
                onClick={() => toggleArea(area.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                  selectedAreas.includes(area.id)
                    ? 'bg-teal-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-teal-300 hover:bg-teal-50'
                }`}
              >
                {area.label}
              </button>
              
              {/* Connecting line */}
              <div className="absolute top-1/2 left-1/2 w-8 h-px bg-teal-300 transform -translate-y-1/2 origin-left rotate-45"></div>
            </div>
          ))}
        </div>

        {/* Selected areas display */}
        {selectedAreas.length > 0 && (
          <div className="mb-6 p-3 bg-teal-50 rounded-lg">
            <p className="text-sm text-teal-700 font-medium mb-2">Selected focus areas:</p>
            <div className="flex flex-wrap gap-2">
              {selectedAreas.map(areaId => (
                <span key={areaId} className="px-2 py-1 bg-teal-200 text-teal-800 rounded-full text-xs">
                  {focusAreas.find(area => area.id === areaId)?.label}
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleContinue}
          className="w-full bg-teal-500 text-white py-3 rounded-lg font-medium text-lg hover:bg-teal-600 transition-colors duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Body;