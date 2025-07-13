import React, { useState } from 'react';

interface GoalWeightProps {
    onContinue?: (weight: number, unit: 'kg' | 'lbs') => void;
    currentHeight?: number; // in cm for BMI calculation
}

const GoalWeightComponent: React.FC<GoalWeightProps> = ({
                                                            onContinue,
                                                            currentHeight = 170 // default height for BMI calculation
                                                        }) => {
    const [selectedUnit, setSelectedUnit] = useState<'kg' | 'lbs'>('kg');
    const [weight, setWeight] = useState<number>(48);

    // BMI calculation
    const calculateBMI = (weightValue: number, unit: 'kg' | 'lbs'): number => {
        const weightInKg = unit === 'lbs' ? weightValue * 0.453592 : weightValue;
        const heightInM = currentHeight / 100;
        return weightInKg / (heightInM * heightInM);
    };

    const getBMICategory = (bmi: number): string => {
        if (bmi < 18.5) return 'Underweight';
        if (bmi < 25) return 'Normal weight';
        if (bmi < 30) return 'Overweight';
        return 'Obese';
    };

    const currentBMI = calculateBMI(weight, selectedUnit);
    const bmiCategory = getBMICategory(currentBMI);

    const handleWeightChange = (newWeight: number) => {
        setWeight(newWeight);
    };

    const handleContinue = () => {
        onContinue?.(weight, selectedUnit);
    };

    // Get min/max values based on unit
    const getMinMax = () => {
        if (selectedUnit === 'kg') {
            return { min: 30, max: 150 };
        } else {
            return { min: 66, max: 330 }; // lbs equivalent
        }
    };

    // Generate scale marks
    const generateScaleMarks = () => {
        const marks = [];
        const { min, max } = getMinMax();
        const range = max - min;
        const step = selectedUnit === 'kg' ? 5 : 10;

        for (let i = min; i <= max; i += step) {
            const position = ((i - min) / range) * 100;

            marks.push(
                <div
                    key={i}
                    className="absolute top-0 bg-gray-300 h-6 w-0.5"
                    style={{ left: `${position}%` }}
                />
            );
        }

        return marks;
    };

    const getSliderPosition = () => {
        const { min, max } = getMinMax();
        return ((weight - min) / (max - min)) * 100;
    };

    // Handle unit change and convert weight
    const handleUnitChange = (newUnit: 'kg' | 'lbs') => {
        if (newUnit !== selectedUnit) {
            if (newUnit === 'lbs') {
                setWeight(Math.round(weight * 2.20462));
            } else {
                setWeight(Math.round(weight / 2.20462));
            }
            setSelectedUnit(newUnit);
        }
    };

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400 rounded-full opacity-30 -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-200 rounded-full opacity-40 translate-y-48 -translate-x-48"></div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
                    What is your Goal weight?
                </h1>

                {/* Subtitle */}
                <p className="text-gray-600 mb-12 text-center">
                    We need this to calculate your BMI
                </p>

                {/* Unit Toggle */}
                <div className="flex mb-16 bg-gray-100 rounded-lg p-1">
                    <button
                        onClick={() => handleUnitChange('kg')}
                        className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                            selectedUnit === 'kg'
                                ? 'bg-teal-400 text-white'
                                : 'text-gray-600 hover:text-gray-800'
                        }`}
                    >
                        Kg
                    </button>
                    <button
                        onClick={() => handleUnitChange('lbs')}
                        className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                            selectedUnit === 'lbs'
                                ? 'bg-teal-400 text-white'
                                : 'text-gray-600 hover:text-gray-800'
                        }`}
                    >
                        lbs
                    </button>
                </div>

                {/* Weight Display */}
                <div className="text-center mb-16">
                    <div className="text-8xl font-light text-teal-400 mb-2">
                        {weight}
                        <span className="text-4xl text-gray-600 ml-2">{selectedUnit}</span>
                    </div>
                </div>

                {/* Weight Slider */}
                <div className="w-full max-w-md mb-16 relative">
                    <div className="relative h-16 mb-8">
                        {/* Scale marks */}
                        {generateScaleMarks()}

                        {/* Slider track */}
                        <div className="absolute top-6 w-full h-1 bg-gray-200 rounded"></div>

                        {/* Slider thumb */}
                        <div
                            className="absolute top-3 w-3 h-12 bg-teal-400 rounded-full transform -translate-x-1.5 transition-all duration-150 shadow-lg"
                            style={{ left: `${getSliderPosition()}%` }}
                        ></div>
                    </div>

                    {/* Interactive range input */}
                    <input
                        type="range"
                        min={getMinMax().min}
                        max={getMinMax().max}
                        value={weight}
                        onChange={(e) => handleWeightChange(parseInt(e.target.value))}
                        className="w-full h-16 opacity-0 cursor-pointer absolute top-0 z-10"
                        style={{
                            background: 'transparent',
                            appearance: 'none',
                            WebkitAppearance: 'none'
                        }}
                    />

                    {/* Scale labels */}
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>{getMinMax().min}</span>
                        <span className="text-teal-400 font-semibold">{weight} {selectedUnit}</span>
                        <span>{getMinMax().max}</span>
                    </div>
                </div>

                {/* BMI Info */}
                <div className="text-center mb-12">
                    <p className="text-teal-400 font-medium">
                        Your current BMI is {currentBMI.toFixed(1)} which is {bmiCategory}.
                    </p>
                </div>

                {/* Continue Button */}
                <button
                    onClick={handleContinue}
                    className="w-full max-w-md bg-teal-400 text-white py-4 rounded-lg font-medium text-lg hover:bg-teal-500 transition-colors"
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default GoalWeightComponent;