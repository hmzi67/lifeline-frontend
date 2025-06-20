import React, { useState, useCallback } from 'react';

interface HeightSelectorProps {
  onContinue?: (height: number, unit: 'cm' | 'ft') => void;
}

const HeightSelector: React.FC<HeightSelectorProps> = ({ onContinue }) => {
  const [unit, setUnit] = useState<'cm' | 'ft'>('cm');
  const [height, setHeight] = useState(165);

  // Height ranges for different units
  const ranges = {
    cm: { min: 120, max: 220, step: 1 },
    ft: { min: 4.0, max: 7.2, step: 0.1 }
  };

  const convertHeight = useCallback((value: number, fromUnit: 'cm' | 'ft', toUnit: 'cm' | 'ft') => {
    if (fromUnit === toUnit) return value;
    if (fromUnit === 'cm' && toUnit === 'ft') {
      return Math.round((value / 30.48) * 10) / 10; // Convert cm to ft and round to 1 decimal
    }
    if (fromUnit === 'ft' && toUnit === 'cm') {
      return Math.round(value * 30.48); // Convert ft to cm and round to integer
    }
    return value;
  }, []);

  const handleUnitChange = (newUnit: 'cm' | 'ft') => {
    if (newUnit !== unit) {
      const convertedHeight = convertHeight(height, unit, newUnit);
      setHeight(convertedHeight);
      setUnit(newUnit);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(Number(e.target.value));
  };

  const handleContinue = () => {
    onContinue?.(height, unit);
  };

  const currentRange = ranges[unit];
  const percentage = ((height - currentRange.min) / (currentRange.max - currentRange.min)) * 100;

  // Generate tick marks
  const generateTicks = () => {
    const ticks = [];
    const tickCount = 11; // Number of major ticks
    for (let i = 0; i < tickCount; i++) {
      const value = currentRange.min + (i * (currentRange.max - currentRange.min) / (tickCount - 1));
      const position = (i / (tickCount - 1)) * 100;
      ticks.push(
        <div 
          key={i} 
          className="absolute flex flex-col items-center"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        >
          <div className="w-0.5 h-6 bg-gray-400"></div>
          {i % 2 === 0 && (
            <span className="text-sm text-gray-500 mt-2">
              {unit === 'cm' ? Math.round(value) : value.toFixed(1)}
            </span>
          )}
        </div>
      );
    }
    return ticks;
  };

  const formatDisplayHeight = (value: number) => {
    if (unit === 'ft') {
      const feet = Math.floor(value);
      const inches = Math.round((value - feet) * 12);
      return inches === 12 ? `${feet + 1}'0"` : `${feet}'${inches}"`;
    }
    return Math.round(value).toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-teal-300 to-cyan-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            What is your height?
          </h1>
          <p className="text-gray-600 text-lg">
            We need this to calculate your BMI
          </p>
        </div>

        {/* Unit Toggle */}
        <div className="flex mb-12 bg-white/20 rounded-xl p-1 backdrop-blur-sm">
          <button
            onClick={() => handleUnitChange('cm')}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
              unit === 'cm'
                ? 'bg-teal-500 text-white shadow-lg'
                : 'text-teal-700 hover:bg-white/20'
            }`}
          >
            cm
          </button>
          <button
            onClick={() => handleUnitChange('ft')}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
              unit === 'ft'
                ? 'bg-teal-500 text-white shadow-lg'
                : 'text-teal-700 hover:bg-white/20'
            }`}
          >
            ft
          </button>
        </div>

        {/* Height Display */}
        <div className="text-center mb-12">
          <div className="text-8xl font-bold text-teal-600 mb-2">
            {formatDisplayHeight(height)}
            <span className="text-4xl text-gray-600 ml-2">{unit}</span>
          </div>
        </div>

        {/* Slider Container */}
        <div className="mb-16 px-4">
          <div className="relative">
            {/* Tick marks */}
            <div className="relative h-8 mb-4">
              {generateTicks()}
            </div>

            {/* Slider track */}
            <div className="relative">
              <input
                type="range"
                min={currentRange.min}
                max={currentRange.max}
                step={currentRange.step}
                value={height}
                onChange={handleSliderChange}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${percentage}%, #d1d5db ${percentage}%, #d1d5db 100%)`
                }}
              />
              
              {/* Custom thumb */}
              <div 
                className="absolute top-1/2 w-6 h-6 bg-teal-500 rounded-full border-4 border-white shadow-lg transform -translate-y-1/2 pointer-events-none"
                style={{ 
                  left: `calc(${percentage}% - 12px)`,
                  transition: 'left 0.1s ease-out'
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default HeightSelector;