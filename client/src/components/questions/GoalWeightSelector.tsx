import React, { useState, useRef, useEffect } from "react";
import GoNext from "@/components/common/GoNext.tsx";
import api from '../../lib/axios'; // Adjust path as needed

interface WeightSelectorProps {
  onContinue?: (weight: number, unit: "kg" | "lbs") => void;
  onBack?: () => void;
  heightValue: number;
  heightUnit?: string;
}

export default function WeightSelector({
  heightValue,
  heightUnit,
  onContinue,
}: WeightSelectorProps) {
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");
  const [weight, setWeight] = useState(48);
  const [weightInput, setWeightInput] = useState<string>("48");
  const [railPosition, setRailPosition] = useState(38);
  const [isDraggingRail, setIsDraggingRail] = useState(false);
  const [lastTouchX, setLastTouchX] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sliderRef = useRef<HTMLDivElement>(null);

  // Weight ranges for different units
  const ranges = {
    kg: { min: 25, max: 160, step: 1 },
    lbs: { min: 66, max: 330, step: 1 },
  };

  const currentRange = ranges[unit];
  const visibleRange = 20;

  // Fetch weight data on component mount
  useEffect(() => {
    const fetchWeightData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/questionnaire/weight-data');
        
        if (response.data.success && response.data.data?.weightData) {
          const { weight, weightUnit } = response.data.data.weightData;
          
          if (weight !== null && weightUnit) {
            const numericWeight = Math.round(weight);
            setWeight(numericWeight);
            setWeightInput(String(numericWeight));
            
            if (weightUnit === 'lbs') {
              setUnit('lbs');
            }
            
            // Set rail position
            const newRailPosition = numericWeight - visibleRange / 2;
            const range = ranges[weightUnit as "kg" | "lbs"] || ranges.kg;
            const clampedPosition = Math.max(
              range.min,
              Math.min(range.max - visibleRange, newRailPosition)
            );
            setRailPosition(clampedPosition);
          }
        }
      } catch (err: any) {
        console.error('Error fetching weight data:', err);
        setError('Failed to load weight data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeightData();
  }, []);

  // Save weight data
  const saveWeightData = async (weight: number, unit: 'kg' | 'lbs') => {
    try {
      await api.put('/questionnaire/weight-data', {
        weight: parseFloat(weight.toFixed(2)),
        weightUnit: unit
      });
      setError(null);
    } catch (err: any) {
      console.error('Error saving weight data:', err);
      setError('Failed to save weight data');
    }
  };

  // Keep input synced when weight changes externally
  useEffect(() => {
    setWeightInput(String(weight));
  }, [weight]);

  // Calculate weight based on rail position
  useEffect(() => {
    const centerWeight = railPosition + visibleRange / 2;
    const clampedWeight = Math.max(
      currentRange.min,
      Math.min(currentRange.max, Math.round(centerWeight))
    );
    setWeight(clampedWeight);
  }, [railPosition, currentRange, visibleRange]);

  // Calculate BMI
  const calculateBMI = (weight: number, unit: "kg" | "lbs") => {
    const heightInCm = heightUnit === "ft" ? heightValue * 30.48 : heightValue;
    const heightInM = heightInCm / 100;
    const weightInKg = unit === "lbs" ? weight * 0.453592 : weight;
    return weightInKg / (heightInM * heightInM);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  const currentBMI = calculateBMI(weight, unit);
  const bmiCategory = getBMICategory(currentBMI);

  // Handle rail dragging
  const handleRailMouseDown = () => setIsDraggingRail(true);
  const handleRailTouchStart = (e: React.TouchEvent) => {
    setIsDraggingRail(true);
    setLastTouchX(e.touches[0].clientX);
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sliderRef.current || !isDraggingRail) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const deltaWeight = (e.movementX / rect.width) * visibleRange;
      const newRailPosition = railPosition - deltaWeight;
      const maxPosition = currentRange.max - visibleRange;
      const minPosition = currentRange.min;
      setRailPosition(
        Math.max(minPosition, Math.min(maxPosition, newRailPosition))
      );
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!sliderRef.current || !isDraggingRail) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const currentTouchX = e.touches[0].clientX;
      const deltaX = currentTouchX - lastTouchX;
      const deltaWeight = (deltaX / rect.width) * visibleRange;
      const newRailPosition = railPosition - deltaWeight;
      const maxPosition = currentRange.max - visibleRange;
      const minPosition = currentRange.min;
      setRailPosition(
        Math.max(minPosition, Math.min(maxPosition, newRailPosition))
      );
      setLastTouchX(currentTouchX);
      e.preventDefault();
    };

    const stopDragging = () => {
      setIsDraggingRail(false);
      // Save when user finishes dragging
      saveWeightData(weight, unit);
    };

    if (isDraggingRail) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", stopDragging);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", stopDragging);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", stopDragging);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", stopDragging);
    };
  }, [isDraggingRail, railPosition, visibleRange, currentRange, lastTouchX, weight, unit]);

  // Generate tick marks
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
            className={`absolute ${
              isMainTick
                ? "w-1 rounded-full h-16 bg-gray-400"
                : "rounded-full h-8 bg-gray-900"
            } w-0.5 -translate-x-0.5`}
            style={{ left: `${position}%` }}
          />
        );
        if (isMainTick) {
          ticks.push(
            <div
              key={`label-${i}`}
              className="absolute text-xs text-gray-500 -translate-x-1/2 mt-32"
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

  // Handle unit change
  const handleUnitChange = (newUnit: "kg" | "lbs") => {
    if (newUnit === unit) return;
    const convertedWeight =
      newUnit === "lbs"
        ? Math.round(weight * 2.20462)
        : Math.round(weight / 2.20462);
    setUnit(newUnit);
    setWeight(convertedWeight);
    setWeightInput(String(convertedWeight));
    const newRailPosition = convertedWeight - visibleRange / 2;
    const newRange = ranges[newUnit];
    const maxPosition = newRange.max - visibleRange;
    const minPosition = newRange.min;
    setRailPosition(
      Math.max(minPosition, Math.min(maxPosition, newRailPosition))
    );
    
    // Save when unit changes
    setTimeout(() => {
      saveWeightData(convertedWeight, newUnit);
    }, 0);
  };

  // Handle manual input change
  const handleWeightInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeightInput(e.target.value);
  };

  // Handle input blur (when user finishes typing)
  const handleWeightInputBlur = () => {
    const val = Number(weightInput);
    if (!isNaN(val) && weightInput.trim() !== "") {
      const clamped = Math.max(
        currentRange.min,
        Math.min(currentRange.max, val)
      );
      setWeight(clamped);
      setWeightInput(String(clamped));
      const newRailPosition = clamped - visibleRange / 2;
      const maxPosition = currentRange.max - visibleRange;
      const minPosition = currentRange.min;
      setRailPosition(
        Math.max(minPosition, Math.min(maxPosition, newRailPosition))
      );
      
      // Save when user finishes typing
      saveWeightData(clamped, unit);
    } else {
      setWeightInput(String(weight));
    }
  };

  // Handle continue button
  const handleContinue = () => {
    saveWeightData(weight, unit);
    onContinue?.(weight, unit);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500 mb-4"></div>
          <p className="text-gray-600">Loading weight data...</p>
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
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 relative overflow-hidden">
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              What is your current weight?
            </h1>
            <p className="text-gray-600">We need this to calculate your BMI</p>
          </div>

          {/* Unit Toggle */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-gray-100 rounded-2xl p-1 w-48 sm:w-64">
              <button
                onClick={() => handleUnitChange("kg")}
                className={`flex-1 py-2 px-2 sm:px-4 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base ${
                  unit === "kg"
                    ? "bg-primary text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Kg
              </button>
              <button
                onClick={() => handleUnitChange("lbs")}
                className={`flex-1 py-2 px-2 sm:px-4 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base ${
                  unit === "lbs"
                    ? "bg-primary text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                lbs
              </button>
            </div>
          </div>

          {/* Weight Display */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center text-6xl font-bold text-primary-500 mb-2">
              <input
                type="text"
                value={weightInput}
                onChange={handleWeightInputChange}
                onBlur={handleWeightInputBlur}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    (e.target as HTMLInputElement).blur();
                  }
                }}
                className="w-24 text-center bg-transparent focus:outline-none focus:border-primary-500"
              />
              <span className="text-2xl text-gray-600 ml-2">{unit}</span>
            </div>
          </div>

          {/* Slider */}
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
              <div className="absolute top-1/2 left-1/2 w-[6px] rounded-full h-32 bg-primary-500 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* BMI Status */}
          <div className="text-center pt-12 mb-8">
            <p className="text-primary-600 text-lg">
              Your current BMI is {currentBMI.toFixed(1)} which is {bmiCategory}.
            </p>
          </div>

          <div className="flex items-center justify-center gap-5 mt-12">
            <GoNext onClick={handleContinue} />
          </div>
        </div>
      </div>
    </div>
  );
}