import React, { useState } from 'react';
import GoBack from "@/components/common/GoBack.tsx";
import {ArrowRight} from "lucide-react";

interface FitnessLevelSelectorProps {
  onContinue?: () => void;
  onBack?: () => void;
  onLevelChange?: (level: number) => void;
  initialLevel?: number;
}

const FitnessLevelSelector: React.FC<FitnessLevelSelectorProps> = ({
  onContinue,
  onLevelChange, 
  initialLevel = 3,
  onBack
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

  return (
    <div className="py-24">
      <div className="max-w-2xl w-full mx-auto ">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            How would you rate your fitness level?
          </h1>
          <p className="text-gray-500 text-lg">Drag to adjust</p>
        </div>

        <div className="mb-12">
          {/* Current level display */}
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-teal-400 to-teal-400 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg">
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
                    className={`z-10 w-2 h-8 mb-2 tranform translate-y-[64px] duration-300 ${
                      level.value <= selectedLevel
                        ? 'bg-gradient-to-r from-teal-400 to-teal-400 shadow-md'
                        : 'bg-gray-200'
                    }`}
                  />
                  <span className="text-sm font-medium text-gray-600">
                    {level.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Progress bar background */}
            <div className="relative h-2 bg-gray-200">
              {/* Active progress bar */}
              <div
                className="absolute top-0 left-0 h-2 bg-gradient-to-r from-teal-400 to-cyan-400  transition-all duration-300"
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
              {/* <div
                className={`absolute top-1/2 w-6 h-6 bg-white border-4 border-teal-400 rounded-full shadow-lg transform -translate-y-1/2 transition-all duration-200 ${
                  isDragging ? 'scale-110 shadow-xl' : 'hover:scale-105'
                }`}
                style={{ left: `calc(${((selectedLevel - 1) / 4) * 100}% - 12px)` }}
              /> */}
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className={'flex items-center justify-center gap-5 mt-12'}>
          <GoBack onClick={onBack} />
          <button
              onClick={onContinue}
              className="inline-flex items-center justify-between gap-2 rounded-full bg-primary hover:bg-primary-600 text-white font-medium border w-auto h-auto px-8 py-4 transition-all duration-200"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FitnessLevelSelector;