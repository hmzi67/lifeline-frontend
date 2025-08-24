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
import { FitnessGraph } from "@/components/questions/fitnessgraph.tsx";
import ellipseImage from "@/assets/images/question/Ellipse 4.svg";
import GoalWeightSelector from "@/components/questions/GoalWeightSelector.tsx";
import vdo from "@/assets/Q-thankyou/applause.mp4";
import api from "@/lib/axios";
import Loading from "@/components/common/Loading";
import GoBack from "@/components/common/GoBack";

export default function Questions() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);

  // questionnaire states
  const [gender, setGender] = useState("men");
  const [, setSelectedGoal] = useState<string>("");
  const [, setSelectedDiet] = useState<string[]>([]);
  const [, setAllergies] = useState<string[]>([]);
  const [, setSelectedLevel] = useState<number>(0);
  const [, setSelectedDayOption] = useState<string>("");
  const [, setFocusAreas] = useState<string[]>([]);
  const [, setAge] = useState<number>(24);
  const [, setBirthYear] = useState<number>(2025 - 24);
  const [height, setHeight] = useState<number>(0);
  const [heightUnit, setHeightUnit] = useState<string>("cm");

  // fetch questionnaire from API on mount
  useEffect(() => {
    const fetchQuestionnaire = async () => {
      try {
        const res = await api.get("/questionnaire");
        const q = res.data?.data?.questionnaire;

        if (q) {
          // pre-fill states if values exist
          if (q.gender) setGender(q.gender);
          if (q.goal) setSelectedGoal(q.goal);
          if (q.dietType) setSelectedDiet(q.dietType);
          if (q.allergenFood) setAllergies(q.allergenFood);
          if (q.fitnessLevel) setSelectedLevel(Number(q.fitnessLevel));
          if (q.typicalDayType) setSelectedDayOption(q.typicalDayType);
          if (q.bodyFocusArea) setFocusAreas(q.bodyFocusArea);
          if (q.dateOfBirth) {
            const year = new Date(q.dateOfBirth).getFullYear();
            setBirthYear(year);
            setAge(new Date().getFullYear() - year);
          }
          if (q.height) setHeight(q.height);
          if (q.heightUnit) setHeightUnit(q.heightUnit);

          // 👇 Jump to first missing step instead of 0
          const missingStep = findMissingStep(q);
          setCurrentStep(missingStep);
        }
      } catch (err) {
        console.error("Error fetching questionnaire:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionnaire();
  }, []);

  // helper function → which step is missing
  const findMissingStep = (q: any) => {
    if (!q.gender) return 0; // GenderSelector
    if (!q.goal) return 2; // FitnessGoalSelector
    if (!q.dietType) return 3; // DietTypeSelector
    if (!q.allergenFood) return 4; // AllergenSelector
    if (!q.fitnessLevel) return 6; // FitnessLevelSelector
    if (!q.typicalDayType) return 7; // TypicalDaySelector
    if (!q.bodyFocusArea) return 8; // FocusAreaSelector
    if (!q.dateOfBirth) return 10; // AgeSelector
    if (!q.height) return 11; // HeightSelector
    if (!q.goalWeight) return 12; // GoalWeightSelector
    if (!q.motivationFor) return 13; // FitnessMotivationSelector
    return 15; // Done → go to summary
  };

  // step navigation
  const goToNext = (gender: string) => {
    setGender(gender);
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const steps = [
    <GenderSelector
      key="GenderSelector"
      onContinue={(gender) => goToNext(gender)}
    />,

    <LifeLineFitness
      key="LifeLineFitness"
      gender={gender}
      onContinue={() => goToNext(gender)}
    />,

    <FitnessGoalSelector
      key="FitnessGoalSelector"
      handleContinue={() => goToNext(gender)}
      onGoalChange={(goalId: string) => setSelectedGoal(goalId)}
    />,

    <DietTypeSelector
      key="DietTypeSelector"
      onContinue={() => goToNext(gender)}
      onDietChange={(diet) => setSelectedDiet(diet)}
    />,

    <AllergenSelector
      key="AllergenSelector"
      onContinue={() => goToNext(gender)}
      onAllergiesChange={(allergens: string[]) => setAllergies(allergens)}
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
      onSelection={(selectedAge: number, selectedBirthYear: number) => {
        setAge(selectedAge);
        setBirthYear(selectedBirthYear);
      }}
      onContinue={() => goToNext(gender)}
      onBack={() => goToPrevious()}
    />,

    <HeightSelector
      key="HeightSelector"
      onContinue={(height: number, unit: "cm" | "ft") => {
        setHeight(height);
        setHeightUnit(unit);
        goToNext(gender);
      }}
      onBack={() => goToPrevious()}
    />,

    <GoalWeightSelector
      key={"GoalWeightSelector"}
      onContinue={(weight, unit) => {
        setHeight(weight);
        setHeightUnit(unit);
        goToNext(gender);
      }}
      onBack={() => goToPrevious()}
      heightValue={height}
      heightUnit={heightUnit}
    />,

    <FitnessMotivationSelector
      key="FitnessMotivationSelector"
      onContinue={(selectedMotivation: string) => {
        console.log(selectedMotivation);
        goToNext(gender);
      }}
      onBack={() => goToPrevious()}
    />,

    <PersonalizingPlans
      key="PersonalizingPlans"
      onContinue={() => goToNext(gender)}
      onBack={() => goToPrevious()}
    />,

    <FitnessGraph
      key="FitnessGraph"
      gender={gender}
      onBack={() => goToPrevious()}
    />,
  ];

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen flex bg-white items-center justify-center relative overflow-hidden">
      {(currentStep === 5 || currentStep === 9) && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={vdo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <div
        className={`absolute top-0 right-0 w-96 h-96 transform translate-x-32 -translate-y-32 rotate-6 ${currentStep === 5 || currentStep === 9 ? "md:hidden" : ""}`}
      >
        <img src={ellipseImage} alt="" />
      </div>
      <div
        className={`absolute bottom-0 left-0 w-96 h-96 transform -translate-x-24 translate-y-44 rotate-45 ${currentStep === 5 || currentStep === 9 ? "md:hidden" : ""}`}
      >
        <img src={ellipseImage} alt="" />
      </div>

      {/* Header */}
      <div className="absolute top-0 w-full flex items-center justify-center py-3">
        <img
          src="/logo.svg"
          className="w-20"
        />

        <div className={`absolute left-12 ${currentStep == 0 ? 'hidden' : 'block'}`}>
          <GoBack onClick={() => goToPrevious()} />
        </div>

      </div>

      <div
        className={`relative z-10 max-w-7xl w-full rounded-3xl ${currentStep === 5 || currentStep === 9 ? "bg-white/60 backdrop-blur py-20 px-1" : "bg-white/60 backdrop-blur-sm mx-4 sm:mx-0 "}`}
      >
        {steps[currentStep]}
      </div>
    </div>
  );
}
