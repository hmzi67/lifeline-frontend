import AllergenSelector from "@/components/questions/AllergenSelector";
import DietTypeSelector from "@/components/questions/dietTypes";
import FitnessGoalSelector from "@/components/questions/FitnessGoalSelector";
import GenderSelector from "@/components/questions/GenderSelector";
import LifeLineFitness from "@/components/questions/LifeLineFitness";
import ThankYouCard from "@/components/questions/ThankYouCard";
import { useState, useEffect } from "react";
import FitnessLevelSelector from "@/components/questions/FitnessLevelSelector.tsx";
import TypicalDaySelector from "@/components/questions/TypicalDaySelector";
import { FocusAreaSelector } from "@/components/questions/FocusAreaSelector";
import AgeSelector from "@/components/questions/AgeSelector.tsx";
import HeightSelector from "@/components/questions/HeightSelector.tsx";
import FitnessMotivationSelector from "@/components/questions/FitnessMotivation.tsx";
import PersonalizingPlans from "@/components/questions/PersonalizingPlans.tsx";
import {FitnessGraph} from "@/components/questions/fitnessgraph.tsx";


const LOCAL_STORAGE_KEY = "currentStepIndex";

export default function Questions() {
    const [currentStep, setCurrentStep] = useState(0);

    // Load saved step from localStorage
    useEffect(() => {
        const savedStep = parseInt(localStorage.getItem(LOCAL_STORAGE_KEY) as string, 10);
        if (!isNaN(savedStep)) {
            setCurrentStep(savedStep);
        }
    }, []);

    // Save current step to localStorage whenever it changes
    useEffect(() => {
        return localStorage.setItem(LOCAL_STORAGE_KEY, String(currentStep));
    }, [currentStep]);

    const steps = [
        <GenderSelector key="GenderSelector" />,
        <LifeLineFitness key="LifeLineFitness" gender="women" onContinue={() => goToNext()} />,
        <FitnessGoalSelector key="FitnessGoalSelector" />,
        <DietTypeSelector key="DietTypeSelector" />,
        <AllergenSelector key="AllergenSelector" />,
        <ThankYouCard key="ThankYouCard1" />,
        <FitnessLevelSelector key="FitnessLevelSelector" />,
        <TypicalDaySelector key="TypicalDaySelector" />,
        // <PhysicalLimitationSelector key="PhysicalLimitationSelector" />,
        <FocusAreaSelector
            key="FocusAreaSelector"
            gender="female"
            onSelectionChange={(areas) => console.log(areas)}
            onContinue={() => goToNext()}
        />,
        <ThankYouCard key="ThankYouCard2" />,
        <AgeSelector key="AgeSelector" />,
        <HeightSelector key="HeightSelector" />,
        // <WeightSelector key="WeightSelector" />,
        // <GoalWeightSelector key="GoalWeightSelector" />,
        <FitnessMotivationSelector key="FitnessMotivationSelector" />,
        <PersonalizingPlans key="PersonalizingPlans" />,
        <FitnessGraph key="FitnessGraph" gender="female" />
    ];

    const goToNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const goToPrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    return (
        <div className="p-4">
            <div className="mb-4">
                <p>Step {currentStep + 1} of {steps.length}</p>
            </div>

            <div className="mb-4">
                {steps[currentStep]}
            </div>

            <div className="flex justify-between">
                <button
                    onClick={goToPrevious}
                    disabled={currentStep === 0}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Back
                </button>
                <button
                    onClick={goToNext}
                    disabled={currentStep === steps.length - 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
