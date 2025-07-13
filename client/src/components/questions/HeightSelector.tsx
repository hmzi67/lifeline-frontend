import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface HeightSelectorProps {
  onContinue?: (height: number, unit: 'cm' | 'ft') => void;
  onBack?: () => void;
}

const HeightSelector: React.FC<HeightSelectorProps> = ({ onContinue, onBack }) => {
  const [unit, setUnit] = useState<'cm' | 'ft'>('cm');
  const [heightCm, setHeightCm] = useState(165);
  const [feet, setFeet] = useState(4);
  const [inches, setInches] = useState(7);
  const [railPosition, setRailPosition] = useState(145);
  const [isDraggingRail, setIsDraggingRail] = useState(false);
  const [lastTouchX, setLastTouchX] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const ranges = {
    cm: { min: 140, max: 200, step: 1 },
    ft: { min: 48, max: 96, step: 1 }
  };

  const currentRange = ranges[unit];
  const visibleRange = 20;

  useEffect(() => {
    const centerHeight = railPosition + visibleRange / 2;
    const clampedHeight = Math.max(currentRange.min, Math.min(currentRange.max, Math.round(centerHeight)));
    setHeightCm(clampedHeight);
  }, [railPosition, currentRange, visibleRange]);

  const handleRailMouseDown = () => {
    if (!sliderRef.current) return;
    setIsDraggingRail(true);
  };

  const handleRailTouchStart = (e: React.TouchEvent) => {
    if (!sliderRef.current) return;
    setIsDraggingRail(true);
    setLastTouchX(e.touches[0].clientX);
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sliderRef.current || !isDraggingRail) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const sliderWidth = rect.width;
      const deltaX = e.movementX;
      const deltaHeight = (deltaX / sliderWidth) * visibleRange;
      const newRailPosition = railPosition - deltaHeight;
      const maxPosition = currentRange.max - visibleRange;
      const minPosition = currentRange.min;
      setRailPosition(Math.max(minPosition, Math.min(maxPosition, newRailPosition)));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!sliderRef.current || !isDraggingRail) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const sliderWidth = rect.width;
      const currentTouchX = e.touches[0].clientX;
      const deltaX = currentTouchX - lastTouchX;
      const deltaHeight = (deltaX / sliderWidth) * visibleRange;
      const newRailPosition = railPosition - deltaHeight;
      const maxPosition = currentRange.max - visibleRange;
      const minPosition = currentRange.min;
      setRailPosition(Math.max(minPosition, Math.min(maxPosition, newRailPosition)));
      setLastTouchX(currentTouchX);
      e.preventDefault();
    };

    const handleMouseUp = () => {
      setIsDraggingRail(false);
    };

    const handleTouchEnd = () => {
      setIsDraggingRail(false);
    };

    if (isDraggingRail) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDraggingRail, railPosition, visibleRange, currentRange, lastTouchX]);

  const generateTicks = () => {
    const ticks = [];
    const startValue = Math.floor(railPosition);
    const endValue = Math.ceil(railPosition + visibleRange);

    for (let i = startValue; i <= endValue; i++) {
      if (i >= currentRange.min && i <= currentRange.max) {
        const position = ((i - railPosition) / visibleRange) * 100;
        const isMainTick = i % 5 === 0;
        ticks.push(
          <div
            key={i}
            className={`absolute ${isMainTick ? 'w-1 rounded-full h-12 bg-gray-400' : 'rounded-full h-6 bg-gray-600'} w-0.5 -translate-x-0.5`}
            style={{ left: `${position}%` }}
          />
        );
        if (isMainTick) {
          ticks.push(
            <div
              key={`label-${i}`}
              className="absolute text-xs text-gray-500 -translate-x-1/2 mt-24"
              style={{ left: `${position}%` }}
            >
              {i}
            </div>
          );
        }
      }
    }
    return ticks;
  };

  const handleUnitChange = (newUnit: 'cm' | 'ft') => {
    setUnit(newUnit);
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

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md ">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            What is your height?
          </h1>
          <p className="text-gray-600 text-base">
            We need this to calculate your BMI
          </p>
        </div>

        <div className="flex mb-8 bg-gray-100 rounded-2xl p-1">
          <button
            onClick={() => handleUnitChange('cm')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
              unit === 'cm'
                ? 'bg-teal-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            cm
          </button>
          <button
            onClick={() => handleUnitChange('ft')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
              unit === 'ft'
                ? 'bg-teal-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            ft
          </button>
        </div>

        {unit === 'ft' ? (
          <div className="mb-16">
            <div className="bg-white rounded-3xl p-12 shadow-xl mb-12 mx-8">
              <div className="flex justify-center items-center">
                <div className="text-center">
                  <span className="text-8xl font-bold text-teal-500">
                    {feet}
                  </span>
                  <span className="text-3xl font-medium text-teal-500 ml-1">
                    ft
                  </span>
                </div>
                <div className="mx-8 w-0.5 h-20 bg-gray-300"></div>
                <div className="text-center">
                  <span className="text-8xl font-bold text-teal-500">
                    {inches}
                  </span>
                  <span className="text-3xl font-medium text-teal-500 ml-1">
                    in
                  </span>
                </div>
              </div>
            </div>
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
          </div>
        ) : (
          <div className="mb-16">
            <div className="text-center mb-12">
              <div className="text-8xl font-bold text-teal-500 leading-none">
                {heightCm}
                <span className="text-4xl text-gray-500 ml-2">cm</span>
              </div>
            </div>
            <div className="mb-8">
              <div
                ref={sliderRef}
                className="relative h-20 cursor-pointer select-none touch-none"
                onMouseDown={handleRailMouseDown}
                onTouchStart={handleRailTouchStart}
              >
                <div className="absolute flex items-center justify-center top-1/2 w-full">
                  {generateTicks()}
                </div>
                <div className="absolute top-1/2 left-1/2 w-1 rounded-full h-24 bg-teal-500 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center gap-5 mt-12">
          <button
            onClick={onBack}
            className="inline-flex items-center justify-between gap-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium border w-auto h-auto px-8 py-4 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <button
            onClick={handleContinue}
            className="inline-flex items-center justify-between gap-2 rounded-full bg-teal-500 hover:bg-teal-600 text-white font-medium border w-auto h-auto px-8 py-4 transition-all duration-200"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeightSelector;
