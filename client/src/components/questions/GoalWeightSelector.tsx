import React, { useState, useRef, useEffect } from "react";
import GoNext from "@/components/common/GoNext.tsx";


interface WeightSelectorProps {
  onContinue?: (weight: number, unit: "kg" | "lbs") => void;
  onBack?: () => void;
  heightValue: number;
  heightUnit?: string;
}

export default function WeightSelector({
  heightValue,
  heightUnit,
  onContinue
}: WeightSelectorProps) {
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");
  const [weight, setWeight] = useState(48);
  const [railPosition, setRailPosition] = useState(38);
  const [isDraggingRail, setIsDraggingRail] = useState(false);
  const [lastTouchX, setLastTouchX] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);

  // Weight ranges for different units
  const ranges = {
    kg: { min: 25, max: 160, step: 1 },
    lbs: { min: 66, max: 330, step: 1 },
  };

  const currentRange = ranges[unit];
  const visibleRange = 20; // Show 20 units at a time

  // Calculate weight based on rail position (center of slider = selected weight)
  useEffect(() => {
    const centerWeight = railPosition + visibleRange / 2;
    const clampedWeight = Math.max(
      currentRange.min,
      Math.min(currentRange.max, Math.round(centerWeight))
    );
    setWeight(clampedWeight);
  }, [railPosition, currentRange, visibleRange]);

  // Calculate BMI - CORRECTED ALGORITHM
  const calculateBMI = (weight: number, unit: "kg" | "lbs") => {
    // Convert height to centimeters using the correct conversion factor
    const heightInCm = heightUnit === "ft" ? heightValue * 2.54 : heightValue;
    const heightInM = heightInCm / 100; // Convert cm to meters

    // Convert weight to kg if it's in lbs
    const weightInKg = unit === "lbs" ? weight * 0.453592 : weight;

    // Calculate BMI
    const bmi = weightInKg / (heightInM * heightInM);

    return bmi;
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  const currentBMI = calculateBMI(weight, unit);
  const bmiCategory = getBMICategory(currentBMI);

  // Handle rail dragging - mouse events
  const handleRailMouseDown = () => {
    if (!sliderRef.current) return;
    setIsDraggingRail(true);
  };

  // Handle rail dragging - touch events
  const handleRailTouchStart = (e: React.TouchEvent) => {
    if (!sliderRef.current) return;
    setIsDraggingRail(true);
    setLastTouchX(e.touches[0].clientX);
    e.preventDefault(); // Prevent scrolling
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sliderRef.current || !isDraggingRail) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const sliderWidth = rect.width;

      // Calculate movement based on mouse delta
      const deltaX = e.movementX;
      const deltaWeight = (deltaX / sliderWidth) * visibleRange;

      // Move rail in the opposite direction to mouse movement (natural scrolling feel)
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
      const sliderWidth = rect.width;

      // Calculate movement based on touch delta
      const currentTouchX = e.touches[0].clientX;
      const deltaX = currentTouchX - lastTouchX;
      const deltaWeight = (deltaX / sliderWidth) * visibleRange;

      // Move rail in the opposite direction to touch movement (natural scrolling feel)
      const newRailPosition = railPosition - deltaWeight;
      const maxPosition = currentRange.max - visibleRange;
      const minPosition = currentRange.min;

      setRailPosition(
        Math.max(minPosition, Math.min(maxPosition, newRailPosition))
      );
      setLastTouchX(currentTouchX);

      e.preventDefault(); // Prevent scrolling
    };

    const handleMouseUp = () => {
      setIsDraggingRail(false);
    };

    const handleTouchEnd = () => {
      setIsDraggingRail(false);
    };

    if (isDraggingRail) {
      // Mouse events
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      // Touch events
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      // Clean up mouse events
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      // Clean up touch events
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDraggingRail, railPosition, visibleRange, currentRange, lastTouchX]);

  // Generate tick marks for the visible range
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
            className={`absolute ${isMainTick ? "w-1 rounded-full h-16 bg-gray-400" : "rounded-full h-8 bg-gray-900"} w-0.5 -translate-x-0.5`}
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

  const handleUnitChange = (newUnit: "kg" | "lbs") => {
    if (newUnit === unit) return;

    // Convert weight to a new unit
    const convertedWeight =
      newUnit === "lbs"
        ? Math.round(weight * 2.20462)
        : Math.round(weight / 2.20462);

    setUnit(newUnit);
    // Update rail position to center the converted weight
    const newRailPosition = convertedWeight - visibleRange / 2;
    const newRange = ranges[newUnit];
    const maxPosition = newRange.max - visibleRange;
    const minPosition = newRange.min;

    setRailPosition(
      Math.max(minPosition, Math.min(maxPosition, newRailPosition))
    );
  };

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
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <button
                onClick={() => handleUnitChange("kg")}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                  unit === "kg"
                    ? "bg-teal-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Kg
              </button>
              <button
                onClick={() => handleUnitChange("lbs")}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                  unit === "lbs"
                    ? "bg-teal-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                lbs
              </button>
            </div>
          </div>

          {/* Weight Display */}
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-primary-500 mb-2">
              {weight}
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
              {/* Tick marks */}
              <div className="absolute flex items-center justify-center top-1/2 w-full">
                {generateTicks()}
              </div>
              {/* Center line indicator */}
              <div className="absolute top-1/2 left-1/2 w-[6px] rounded-full h-32 bg-primary-500 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* BMI Status */}
          <div className="text-center mb-8">
            <p className="text-primary-600 text-lg">
              Your current BMI is {currentBMI.toFixed(1)} which is {bmiCategory}
              .
            </p>
          </div>

          <div className={"flex items-center justify-center gap-5 mt-12"}>
            <GoNext onClick={() => onContinue?.(weight, unit)} />
          </div>
        </div>
      </div>
    </div>
  );
}
