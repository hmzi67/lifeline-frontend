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
    const [gender, setGender] = useState("men")
    const [selectedGoal, setSelectedGoal] = useState<string>("");
    const [selectDiet, setSelectedDiet] = useState<string>("")
    const [allergies, setAllergies] = useState<string[]>([])
    const [selectedLevel, setSelectedLevel] = useState<number>(0);
    const [selectedDayOption, setSelectedDayOption] = useState<string>("");
    const [focusAreas, setFocusAreas] = useState<string[]>([])
    const [age, setAge] = useState<number>(24);
    const [birthYear, setBirthYear] = useState<number>(2025 - 24);


    useEffect(() => {
        console.log(gender);
        console.log(selectedGoal);
        console.log(selectDiet);
        console.log(allergies);
        console.log(selectedLevel);
        console.log(selectedDayOption);
        console.log(focusAreas);
        console.log(age);
        console.log(birthYear);
    }, [age, birthYear, focusAreas, gender, selectedDayOption, selectedGoal, selectDiet, selectedLevel, allergies]);


    // Load saved a step from localStorage
    useEffect(() => {
        const savedStep = parseInt(localStorage.getItem(LOCAL_STORAGE_KEY) as string, 10);
        if (!isNaN(savedStep)) {
            setCurrentStep(savedStep);
        }
    }, []);

    // Save the current step to localStorage whenever it changes
    useEffect(() => {
        return localStorage.setItem(LOCAL_STORAGE_KEY, String(currentStep));
    }, [currentStep]);


    const steps = [
        <GenderSelector
            key="GenderSelector"
            onContinue={(gender) => goToNext(gender)}
        />,

        <LifeLineFitness
            key="LifeLineFitness"
            gender={gender}
            onContinue={() => goToNext(gender)}
            onBack={() => goToPrevious()}
        />,

        <FitnessGoalSelector
            key="FitnessGoalSelector"
            handleContinue={() => goToNext(gender)}
            onGoalChange={(goalId: string) => setSelectedGoal(goalId)}
            onBack={() => goToPrevious()}
        />,

        <DietTypeSelector
            key="DietTypeSelector"
            onContinue={() => goToNext(gender)}
            onDietChange={(diet) => setSelectedDiet(diet)}
            onBack={() => goToPrevious()}
        />,

        <AllergenSelector
            key="AllergenSelector"
            onContinue={() => goToNext(gender)}
            onAllergiesChange={(allergens: string[]) => setAllergies(allergens)}
            onBack={() => goToPrevious()}
        />,

        <ThankYouCard
            key="ThankYouCard1"
            onComplete={() => goToNext(gender)}
            onBack={() => goToPrevious()}
        />,

        <FitnessLevelSelector
            key="FitnessLevelSelector"
            onContinue={() => goToNext(gender)}
            onLevelChange={(level) => setSelectedLevel(level)}
            onBack={() => goToPrevious()}
        />,

        <TypicalDaySelector
            key="TypicalDaySelector"
            onContinue={() => goToNext(gender)}
            onSelection={(optionId: string) => setSelectedDayOption(optionId)}
            onBack={() => goToPrevious()}
        />,

        <FocusAreaSelector
            key="FocusAreaSelector"
            gender={gender}
            onSelectionChange={(areas) => setFocusAreas(areas)}
            onContinue={() => goToNext(gender)}
            onBack={() => goToPrevious()}
        />,

        <ThankYouCard
            key="ThankYouCard2"
            onComplete={() => goToNext(gender)}
            onBack={() => goToPrevious()}
        />,

        <AgeSelector
            key="AgeSelector"
            onSelection={(selectedAge: number, selectedBirthYear: number) => {setAge(selectedAge);setBirthYear(selectedBirthYear);}}
            onContinue={() => goToNext(gender)}
            onBack={() => goToPrevious()}
        />,

        <HeightSelector
            key="HeightSelector"
            onContinue={(height: number, unit: 'cm' | 'ft') => {
                console.log(`Height: ${height} ${unit}`);
                goToNext(gender);
            }}
            onBack={() => goToPrevious()}
        />,

        <FitnessMotivationSelector
            key="FitnessMotivationSelector"
            onContinue={(selectedMotivation: string) => {
                console.log(selectedMotivation);
                goToNext(gender);
            }}
            onBack={() => goToPrevious()} />,

        <PersonalizingPlans
            key="PersonalizingPlans"
            onContinue={() => goToNext(gender)}
            onBack={() => goToPrevious()}
        />,

        <FitnessGraph
            key="FitnessGraph"
            gender={gender}
            onBack={() => goToPrevious()}
        />
    ];

    const goToNext = (gender: string) => {
        setGender(gender)
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
        <div className="">
            {steps[currentStep]}
        </div>
    );
}
