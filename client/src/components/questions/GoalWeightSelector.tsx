import { useState, useRef, useEffect } from 'react';
import GoBack from "@/components/common/GoBack.tsx";
import {ArrowRight} from "lucide-react";

interface WeightSelectorProps {
    onContinue?: (weight: number, unit: 'kg' | 'lbs') => void;
    onBack?: () => void;
}

export default function WeightSelector({ onContinue, onBack }: WeightSelectorProps) {
    const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');
    const [weight, setWeight] = useState(48);
    const [railPosition, setRailPosition] = useState(38);
    const [isDraggingRail, setIsDraggingRail] = useState(false);

    const sliderRef = useRef<HTMLDivElement>(null);
    const railRef = useRef<HTMLDivElement>(null);

    // Weight ranges for different units
    const ranges = {
        kg: { min: 30, max: 150, step: 1 },
        lbs: { min: 66, max: 330, step: 1 }
    };

    const currentRange = ranges[unit];
    const visibleRange = 20; // Show 20 units at a time

    // Calculate weight based on rail position (center of slider = selected weight)
    useEffect(() => {
        const centerWeight = railPosition + visibleRange / 2;
        const clampedWeight = Math.max(currentRange.min, Math.min(currentRange.max, Math.round(centerWeight)));
        setWeight(clampedWeight);
    }, [railPosition, currentRange, visibleRange]);

    // Calculate BMI (assuming height of 170 cm for demo)
    const calculateBMI = (weight: number, unit: 'kg' | 'lbs') => {
        const heightInM = 1.7; // 170cm
        const weightInKg = unit === 'lbs' ? weight * 0.453592 : weight;
        return weightInKg / (heightInM * heightInM);
    };

    const getBMICategory = (bmi: number) => {
        if (bmi < 18.5) return 'Underweight';
        if (bmi < 25) return 'Normal weight';
        if (bmi < 30) return 'Overweight';
        return 'Obese';
    };

    const currentBMI = calculateBMI(weight, unit);
    const bmiCategory = getBMICategory(currentBMI);

    // Handle rail dragging
    const handleRailMouseDown = () => {
        if (!sliderRef.current) return;
        setIsDraggingRail(true);
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

            setRailPosition(Math.max(minPosition, Math.min(maxPosition, newRailPosition)));
        };

        const handleMouseUp = () => {
            setIsDraggingRail(false);
        };

        if (isDraggingRail) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDraggingRail, railPosition, visibleRange, currentRange]);

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
                        className={`absolute ${isMainTick ? 'h-4 bg-gray-400' : 'h-2 bg-gray-300'} w-0.5 -translate-x-0.5`}
                        style={{ left: `${position}%` }}
                    />
                );

                if (isMainTick) {
                    ticks.push(
                        <div
                            key={`label-${i}`}
                            className="absolute text-xs text-gray-500 -translate-x-1/2 mt-6"
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

    const handleUnitChange = (newUnit: 'kg' | 'lbs') => {
        if (newUnit === unit) return;

        // Convert weight to a new unit
        const convertedWeight = newUnit === 'lbs'
            ? Math.round(weight * 2.20462)
            : Math.round(weight / 2.20462);

        setUnit(newUnit);
        // Update rail position to center the converted weight
        const newRailPosition = convertedWeight - visibleRange / 2;
        const newRange = ranges[newUnit];
        const maxPosition = newRange.max - visibleRange;
        const minPosition = newRange.min;

        setRailPosition(Math.max(minPosition, Math.min(maxPosition, newRailPosition)));
    };

    // Handle is always in the center (50%)
    const handlePosition = 50;

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden">
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
                                onClick={() => handleUnitChange('kg')}
                                className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                                    unit === 'kg'
                                        ? 'bg-teal-500 text-white shadow-md'
                                        : 'text-gray-600 hover:text-gray-800'
                                }`}
                            >
                                Kg
                            </button>
                            <button
                                onClick={() => handleUnitChange('lbs')}
                                className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                                    unit === 'lbs'
                                        ? 'bg-teal-500 text-white shadow-md'
                                        : 'text-gray-600 hover:text-gray-800'
                                }`}
                            >
                                lbs
                            </button>
                        </div>
                    </div>

                    {/* Weight Display */}
                    <div className="text-center mb-8">
                        <div className="text-6xl font-bold text-teal-500 mb-2">
                            {weight}
                            <span className="text-2xl text-gray-600 ml-2">{unit}</span>
                        </div>
                    </div>

                    {/* Slider */}
                    <div className="mb-8">
                        <div
                            ref={sliderRef}
                            className="relative h-16 cursor-pointer select-none"
                            onMouseDown={handleRailMouseDown}
                        >
                            {/* Rail with tick marks */}
                            <div
                                ref={railRef}
                                className={`absolute top-1/2 w-full h-1 bg-gray-200 rounded-full transition-all duration-200 ${
                                    isDraggingRail ? 'cursor-grabbing' : 'cursor-grab'
                                }`}
                                style={{ transform: 'translateY(-50%)' }}
                            >
                                {/* Grip indicators */}
                                <div className="absolute -left-2 top-1/2 w-4 h-4 -translate-y-1/2 opacity-50">
                                    <div className="w-1 h-1 bg-gray-400 rounded-full mb-1"></div>
                                    <div className="w-1 h-1 bg-gray-400 rounded-full mb-1"></div>
                                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                </div>
                                <div className="absolute -right-2 top-1/2 w-4 h-4 -translate-y-1/2 opacity-50">
                                    <div className="w-1 h-1 bg-gray-400 rounded-full mb-1"></div>
                                    <div className="w-1 h-1 bg-gray-400 rounded-full mb-1"></div>
                                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                </div>
                            </div>

                            {/* Tick marks */}
                            <div className="absolute top-1/2 w-full" style={{ transform: 'translateY(-50%)' }}>
                                {generateTicks()}
                            </div>

                            {/* Handle - Fixed in center */}
                            <div
                                className="absolute top-1/2 w-6 h-6 bg-teal-500 rounded-full shadow-lg transition-all duration-200 -translate-y-1/2 -translate-x-1/2 border-2 border-white pointer-events-none"
                                style={{ left: `${handlePosition}%` }}
                            />

                            {/* Center line indicator */}
                            <div className="absolute top-1/2 left-1/2 w-0.5 h-8 bg-teal-500 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>

                    {/* BMI Status */}
                    <div className="text-center mb-8">
                        <p className="text-teal-600 text-lg">
                            Your current BMI is {currentBMI.toFixed(1)} which is {bmiCategory}.
                        </p>
                    </div>

                    <div className={'flex items-center justify-center gap-5 mt-12'}>
                        <GoBack onClick={onBack} />
                        <button
                            onClick={() => onContinue?.(weight, unit)}
                            className="inline-flex items-center justify-between gap-2 rounded-full bg-primary hover:bg-primary-600 text-white font-medium border w-auto h-auto px-8 py-4 transition-all duration-200"
                        >
                            Continue
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}