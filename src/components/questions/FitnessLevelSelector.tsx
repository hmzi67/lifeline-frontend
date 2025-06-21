import React, { useState } from 'react';

interface FitnessLevelSelectorProps {
  onLevelChange?: (level: number) => void;
  initialLevel?: number;
}

const FitnessLevelSelector: React.FC<FitnessLevelSelectorProps> = ({ 
  onLevelChange, 
  initialLevel = 3 
}) => {
  const [selectedLevel, setSelectedLevel] = useState<number>(initialLevel);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const levels = [
    { value: 1, label: 'Beginner' },
    { value: 2, label: 'Novice' },
    { value: 3, label: 'Somewhat Athletic' },
    { value: 4, label: 'Athletic' },
    { value: 5, label: 'Very Athletic' }
  ];

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLevel = parseInt(event.target.value);
    setSelectedLevel(newLevel);
    onLevelChange?.(newLevel);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleContinue = () => {
    console.log(`Selected fitness level: ${selectedLevel} (${levels[selectedLevel - 1].label})`);
    // Add your continue logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-cyan-50 flex items-center justify-center p-4">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-teal-400 to-cyan-300 rounded-full opacity-20 transform translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-teal-300 to-cyan-200 rounded-full opacity-30 transform -translate-x-24 translate-y-24"></div>
      
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full mx-auto relative">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            How would you rate your fitness level?
          </h1>
          <p className="text-gray-500 text-lg">Drag to adjust</p>
        </div>

        <div className="mb-12">
          {/* Current level display */}
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-teal-400 to-cyan-400 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg">
              {levels[selectedLevel - 1].label}
            </div>
          </div>

          {/* Custom slider */}
          <div className="relative mb-8">
            <div className="flex justify-between items-center mb-4">
              {levels.map((level) => (
                <div
                  key={level.value}
                  className="flex flex-col items-center"
                >
                  <div
                    className={`w-4 h-4 rounded-full mb-2 transition-all duration-300 ${
                      level.value <= selectedLevel
                        ? 'bg-gradient-to-r from-teal-400 to-cyan-400 shadow-md'
                        : 'bg-gray-300'
                    }`}
                  />
                  <span className="text-sm font-medium text-gray-600">
                    {level.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Progress bar background */}
            <div className="relative h-2 bg-gray-200 rounded-full">
              {/* Active progress bar */}
              <div
                className="absolute top-0 left-0 h-2 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full transition-all duration-300"
                style={{ width: `${((selectedLevel - 1) / 4) * 100}%` }}
              />
              
              {/* Custom range input */}
              <input
                type="range"
                min="1"
                max="5"
                value={selectedLevel}
                onChange={handleSliderChange}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
                className={`absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer ${
                  isDragging ? 'cursor-grabbing' : 'cursor-grab'
                }`}
              />
              
              {/* Custom thumb */}
              <div
                className={`absolute top-1/2 w-6 h-6 bg-white border-4 border-teal-400 rounded-full shadow-lg transform -translate-y-1/2 transition-all duration-200 ${
                  isDragging ? 'scale-110 shadow-xl' : 'hover:scale-105'
                }`}
                style={{ left: `calc(${((selectedLevel - 1) / 4) * 100}% - 12px)` }}
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleContinue}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-4 px-12 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default FitnessLevelSelector;