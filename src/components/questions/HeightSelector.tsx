import React, { useState } from 'react';

interface HeightSelectorProps {
  onContinue?: (height: number, unit: 'cm' | 'ft') => void;
}

const HeightSelector: React.FC<HeightSelectorProps> = ({ onContinue }) => {
  const [unit, setUnit] = useState<'cm' | 'ft'>('ft');
  const [heightCm, setHeightCm] = useState(165);
  const [feet, setFeet] = useState(4);
  const [inches, setInches] = useState(7);

  const handleUnitChange = (newUnit: 'cm' | 'ft') => {
    setUnit(newUnit);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeightCm(Number(e.target.value));
  };

  const handleContinue = () => {
    if (unit === 'cm') {
      onContinue?.(heightCm, unit);
    } else {
      const totalInches = feet * 12 + inches;
      const heightInCm = Math.round(totalInches * 2.54);
      onContinue?.(heightInCm, unit);
    }
  };

  // Generate tick marks for cm ruler
  const generateTicks = () => {
    const ticks = [];
    const minHeight = 150;
    const maxHeight = 180;
    const tickCount = 7; // Major ticks every 5cm

    for (let i = 0; i < tickCount; i++) {
      const value = minHeight + (i * 5);
      const position = ((value - minHeight) / (maxHeight - minHeight)) * 100;

      ticks.push(
        <div
          key={i}
          className="absolute flex flex-col items-center"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        >
          <div className={`bg-gray-400 ${i % 2 === 0 ? 'w-0.5 h-8' : 'w-0.5 h-6'}`}></div>
          {i % 2 === 0 && (
            <span className="text-sm text-gray-500 mt-2">{value}</span>
          )}
        </div>
      );
    }

    // Add minor ticks
    for (let i = minHeight; i <= maxHeight; i++) {
      if (i % 5 !== 0) {
        const position = ((i - minHeight) / (maxHeight - minHeight)) * 100;
        ticks.push(
          <div
            key={`minor-${i}`}
            className="absolute"
            style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-px h-4 bg-gray-300"></div>
          </div>
        );
      }
    }

    return ticks;
  };

  const sliderPercentage = ((heightCm - 150) / (180 - 150)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-teal-300 to-teal-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/20 rounded-full -translate-y-20 translate-x-20"></div>
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-teal-500/30 rounded-full translate-y-20 -translate-x-20"></div>
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl  border border-white/10">
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            What is your height?
          </h1>
          <p className="text-gray-600 text-base">
            We need this to calculate your BMI
          </p>
        </div>

        {/* Unit Toggle */}
        <div className="flex mb-8 bg-white/30 rounded-2xl p-1 backdrop-blur-sm">
          <button
            onClick={() => handleUnitChange('cm')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${unit === 'cm'
                ? 'bg-teal-500 text-white shadow-lg'
                : 'text-teal-700 hover:bg-white/20'
              }`}
          >
            cm
          </button>
          <button
            onClick={() => handleUnitChange('ft')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${unit === 'ft'
                ? 'bg-teal-500 text-white shadow-lg'
                : 'text-primary-700 hover:bg-white/20'
              }`}
          >
            ft
          </button>
        </div>

        {/* Conditional Rendering based on unit */}
        {unit === 'ft' ? (
          // Feet and Inches Display with Single Slider - Exact copy of screenshot
          <div className="mb-16">
            {/* Main display container */}
            <div className="bg-white rounded-3xl p-12 shadow-xl mb-12 mx-8">
              <div className="flex justify-center items-center">
                {/* Feet Display */}
                <div className="text-center">
                  <span className="text-8xl font-bold text-primary-500">
                    {feet}
                  </span>
                  <span className="text-3xl font-medium text-primary-500 ml-1">
                    ft
                  </span>
                </div>

                {/* Divider Line */}
                <div className="mx-8 w-0.5 h-20 bg-gray-300"></div>

                {/* Inches Display */}
                <div className="text-center">
                  <span className="text-8xl font-bold text-primary-500">
                    {inches}
                  </span>
                  <span className="text-3xl font-medium text-primary-500 ml-1">
                    in
                  </span>
                </div>
              </div>
            </div>

            {/* Single Slider for Height Control */}
            <div className="px-8 mb-8">
              <input
                type="range"
                min="48"
                max="96"
                step="1"
                value={feet * 12 + inches}
                onChange={(e) => {
                  const totalInches = Number(e.target.value);
                  setFeet(Math.floor(totalInches / 12));
                  setInches(totalInches % 12);
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${((feet * 12 + inches - 48) / (96 - 48)) * 100}%, #e5e7eb ${((feet * 12 + inches - 48) / (96 - 48)) * 100}%, #e5e7eb 100%)`
                }}
              />
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center mb-8">
              <div className="w-4 h-4 bg-teal-500 rounded-full"></div>
            </div>
          </div>
        ) : (
          // CM Display with Ruler
          <div className="mb-16">
            {/* Large CM Display */}
            <div className="text-center mb-12">
              <div className="text-8xl font-bold text-primary-600 leading-none">
                {heightCm}
                <span className="text-4xl text-gray-600 ml-2">cm</span>
              </div>
            </div>

            {/* Ruler Style Slider */}
            <div className="px-4">
              <div className="relative">
                {/* Ruler ticks */}
                <div className="relative h-12 mb-6">
                  {generateTicks()}
                </div>

                {/* Slider track */}
                <div className="relative">
                  <input
                    type="range"
                    min="150"
                    max="180"
                    step="1"
                    value={heightCm}
                    onChange={handleSliderChange}
                    className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                  />

                  {/* Custom slider thumb */}
                  <div
                    className="absolute top-1/2 w-8 h-8 bg-teal-500 rounded-full border-4 border-white shadow-lg transform -translate-y-1/2 pointer-events-none"
                    style={{
                      left: `calc(${sliderPercentage}% - 16px)`,
                      transition: 'left 0.1s ease-out'
                    }}
                  >
                    {/* Vertical line indicator */}
                    <div className="absolute top-full left-1/2 w-0.5 h-8 bg-teal-500 transform -translate-x-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
        >
          Continue
        </button>
      </div>
      </div>

      {/* Decorative elements */}

      {/* Custom CSS for slider */}
      <style dangerouslySetInnerHTML={{
        __html: `
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #14b8a6;
            border: 4px solid white;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            cursor: pointer;
          }
          
          input[type="range"]::-moz-range-thumb {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #14b8a6;
            border: 4px solid white;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            border: none;
          }
        `
      }} />
    </div>
  );
};

export default HeightSelector;