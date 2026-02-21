import React, { useState, useRef, useEffect } from "react";
import GoNext from "../common/GoNext";
import api from '../../lib/axios'; // Adjust the path as needed

interface HeightSelectorProps {
  onContinue?: (height: number, unit: "cm" | "ft") => void;
  onBack?: () => void;
}

const HeightSelector: React.FC<HeightSelectorProps> = ({
  onContinue
}) => {
  const [unit, setUnit] = useState<"cm" | "ft">("cm");
  const [heightCm, setHeightCm] = useState(165);
  const [feet, setFeet] = useState(4);
  const [inches, setInches] = useState(7);
  const [railPosition, setRailPosition] = useState(145);
  const [isDraggingRail, setIsDraggingRail] = useState(false);
  const [lastTouchX, setLastTouchX] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Fetch height data when component mounts
  useEffect(() => {
    const fetchHeightData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/questionnaire/height-data');
        
        if (response.data.success && response.data.data?.heightData) {
          const { height, heightUnit } = response.data.data.heightData;
          
          if (height !== null && heightUnit) {
            if (heightUnit === 'cm') {
              setUnit('cm');
              setHeightCm(Math.round(height));
              setRailPosition(Math.round(height) - 10); // Adjust for visible range
            } else if (heightUnit === 'ft') {
              setUnit('ft');
              const totalInches = Math.round(height);
              setFeet(Math.floor(totalInches / 12));
              setInches(totalInches % 12);
            }
          }
        }
      } catch (err: any) {
        console.error('Error fetching height data:', err);
        setError('Failed to load height data');
      } finally {
        setLoading(false);
      }
    };

    fetchHeightData();
  }, []);

  // Save height data when values change
  const saveHeightData = async (height: number, unit: 'cm' | 'ft') => {
    try {     
      await api.put('/questionnaire/height-data', {
        height: parseFloat(height.toFixed(2)),
        heightUnit: unit
      });
      setError(null); // Clear any previous errors
    } catch (err: any) {
      console.error('Error saving height data:', err);
      setError('Failed to save height data');
    }
  };

  const ranges = {
    cm: { min: 100, max: 250, step: 1 }, // Adjusted min/max for realistic values
    ft: { min: 48, max: 96, step: 1 },   // 4ft to 8ft
  };

  const currentRange = ranges[unit];
  const visibleRange = 20;

  useEffect(() => {
    const centerHeight = railPosition + visibleRange / 2;
    const clampedHeight = Math.max(
      currentRange.min,
      Math.min(currentRange.max, Math.round(centerHeight))
    );
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
      setRailPosition(
        Math.max(minPosition, Math.min(maxPosition, newRailPosition))
      );
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
      setRailPosition(
        Math.max(minPosition, Math.min(maxPosition, newRailPosition))
      );
      setLastTouchX(currentTouchX);
      e.preventDefault();
    };

    const handleMouseUp = () => {
      setIsDraggingRail(false);
      // Save data when user finishes dragging
      if (unit === 'cm') {
        saveHeightData(heightCm, unit);
      } else {
        const totalInches = feet * 12 + inches;
        saveHeightData(totalInches, unit);
      }
    };

    const handleTouchEnd = () => {
      setIsDraggingRail(false);
      // Save data when user finishes touch interaction
      if (unit === 'cm') {
        saveHeightData(heightCm, unit);
      } else {
        const totalInches = feet * 12 + inches;
        saveHeightData(totalInches, unit);
      }
    };

    if (isDraggingRail) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDraggingRail, railPosition, visibleRange, currentRange, lastTouchX, unit, heightCm, feet, inches]);

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
            className={`absolute ${isMainTick ? "w-1 rounded-full h-8 sm:h-12 bg-gray-400" : "rounded-full h-4 sm:h-6 bg-black"} w-0.5 -translate-x-0.5`}
            style={{ left: `${position}%` }}
          />
        );
        if (isMainTick) {
          ticks.push(
            <div
              key={`label-${i}`}
              className="absolute text-xs text-gray-500 -translate-x-1/2 mt-16 sm:mt-28"
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

  const handleUnitChange = (newUnit: "cm" | "ft") => {
    setUnit(newUnit);
    // Save when unit changes
    setTimeout(() => {
      if (newUnit === 'cm') {
        saveHeightData(heightCm, newUnit);
      } else {
        const totalInches = feet * 12 + inches;
        saveHeightData(totalInches, newUnit);
      }
    }, 0);
  };

  // Handle feet input change
  const handleFeetChange = (value: string) => {
    if (value === "") {
      setFeet(0); // Allow empty state
      return;
    }
    
    const feetVal = parseInt(value, 10);
    if (!isNaN(feetVal) && feetVal >= 4 && feetVal <= 8) {
      setFeet(feetVal);
    }
  };

  // Handle inches input change
  const handleInchesChange = (value: string) => {
    if (value === "") {
      setInches(0); // Allow empty state
      return;
    }
    
    const inchesVal = parseInt(value, 10);
    if (!isNaN(inchesVal) && inchesVal >= 0 && inchesVal <= 11) {
      setInches(inchesVal);
    }
  };

  // Save data when feet or inches change
  useEffect(() => {
    if (unit === 'ft') {
      const totalInches = feet * 12 + inches;
      // Only save if we have valid values
      if (feet > 0 || inches > 0) {
        saveHeightData(totalInches, unit);
      }
    }
  }, [feet, inches, unit]);

  const handleContinue = () => {
    let heightValue: number;
    let heightUnit: "cm" | "ft" = unit;
    
    if (unit === "cm") {
      heightValue = heightCm;
    } else {
      heightValue = feet * 12 + inches;
    }
    
    // Save before continuing
    saveHeightData(heightValue, unit);
    onContinue?.(heightValue, heightUnit);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500 mb-4"></div>
          <p className="text-gray-600">Loading height data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center bg-red-50 p-6 rounded-lg max-w-md">
          <div className="text-red-500 text-xl mb-2">Error</div>
          <p className="text-gray-700 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-24 sm:p-6 ">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-3">
            What is your height?
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            We need this to calculate your BMI
          </p>
        </div>

        {/* Unit Selection */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="flex bg-gray-100 rounded-2xl p-1 w-48 sm:w-64">
            <button
              onClick={() => handleUnitChange("cm")}
              className={`flex-1 py-2 px-2 sm:px-4 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base ${
                unit === "cm"
                  ? "bg-primary-500 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              cm
            </button>
            <button
              onClick={() => handleUnitChange("ft")}
              className={`flex-1 py-2 px-2 sm:px-4 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base ${
                unit === "ft"
                  ? "bg-primary-500 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              ft
            </button>
          </div>
        </div>

        {/* Height Inputs */}
        {unit === "ft" ? (
          <div className="mb-12 sm:mb-16">
            {/* Feet/Inches Display - Now Editable */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl mb-8 sm:mb-12 mx-2 sm:mx-4 lg:mx-8">
              <div className="flex justify-center items-center">
                <div className="text-center">
                  <input
                    type="number"
                    min="4"
                    max="8"
                    value={feet === 0 ? "" : feet}
                    onChange={(e) => handleFeetChange(e.target.value)}
                    placeholder="4"
                    className="text-4xl sm:text-6xl lg:text-8xl font-bold text-primary-500 bg-transparent text-center focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-opacity-50 rounded-lg w-20 sm:w-28 lg:w-36 remove-spinner"
                    style={{
                      appearance: 'textfield',
                      MozAppearance: 'textfield'
                    }}
                  />
                  <span className="text-lg sm:text-2xl lg:text-3xl font-medium text-primary-500 ml-1">
                    ft
                  </span>
                </div>
                <div className="mx-4 sm:mx-6 lg:mx-8 w-0.5 h-12 sm:h-16 lg:h-20 bg-gray-300"></div>
                <div className="text-center">
                  <input
                    type="number"
                    min="0"
                    max="11"
                    value={inches === 0 ? "" : inches}
                    onChange={(e) => handleInchesChange(e.target.value)}
                    placeholder="0"
                    className="text-3xl sm:text-4xl lg:text-6xl font-bold text-primary-500 bg-transparent text-center focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-opacity-50 rounded-lg w-16 sm:w-20 lg:w-28 remove-spinner"
                    style={{
                      appearance: 'textfield',
                      MozAppearance: 'textfield'
                    }}
                  />
                  <span className="text-lg sm:text-2xl lg:text-3xl font-medium text-primary-500 ml-1">
                    in
                  </span>
                </div>
              </div>
            </div>

            {/* Range Slider */}
            <div className="px-4 sm:px-6 lg:px-8 mb-8">
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
                  background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${
                    ((feet * 12 + inches - 48) / (96 - 48)) * 100
                  }%, #e5e7eb ${
                    ((feet * 12 + inches - 48) / (96 - 48)) * 100
                  }%, #e5e7eb 100%)`,
                }}
              />
            </div>
          </div>
        ) : (
          <div className="mb-12 sm:mb-16">
            <div className="text-center mb-8 sm:mb-12">
              <div className="flex justify-center items-baseline gap-2">
                <input
                  type="number"
                  className="remove-spinner text-center bg-transparent text-4xl sm:text-6xl lg:text-7xl font-bold text-primary-500 w-24 sm:w-32 focus:outline-none focus:ring-0 appearance-none"
                  min={currentRange.min}
                  max={currentRange.max}
                  value={heightCm}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (!isNaN(val)) {
                      const clampedVal = Math.max(currentRange.min, Math.min(currentRange.max, val));
                      setHeightCm(clampedVal);
                      setRailPosition(clampedVal - visibleRange / 2);
                      // Save when user types
                      saveHeightData(clampedVal, unit);
                    }
                  }}
                />
                <span className="text-2xl sm:text-3xl lg:text-4xl text-gray-500">
                  cm
                </span>
              </div>
            </div>

            {/* Custom Slider */}
            <div className="mb-8 px-5 sm:px-24">
              <div
                ref={sliderRef}
                className="relative h-16 sm:h-20 cursor-pointer select-none touch-none"
                onMouseDown={handleRailMouseDown}
                onTouchStart={handleRailTouchStart}
              >
                <div className="absolute flex items-center justify-center top-1/2 w-full">
                  {generateTicks()}
                </div>
                <div className="absolute top-1/2 left-1/2 w-1 rounded-full h-16 sm:h-20 lg:h-24 bg-primary-500 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        )}

        {/* Continue / Back Buttons */}
        <div className="flex items-center justify-center gap-3 sm:gap-5">
          <GoNext onClick={handleContinue} />
        </div>
      </div>
    </div>
  );
};

export default HeightSelector;