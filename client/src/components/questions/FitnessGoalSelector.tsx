
import React, { useState } from "react";
import { Check } from "lucide-react";
import GoBack from "@/components/common/GoBack.tsx";
import GoNext from "../common/GoNext";

interface FitnessGoal {
  id: string;
  label: string;
  icon: string;
}

interface FitnessGoalSelectorProps {
  handleContinue?: () => void;
  onGoalChange?: (goalId: string) => void;
  onBack?: () => void;
}

const FitnessGoalSelector: React.FC<FitnessGoalSelectorProps> = ({
  handleContinue,
  onGoalChange,
  onBack,
}) => {
  const [selectedGoal, setSelectedGoal] = useState<string>("lose-weight");

  const fitnessGoals: FitnessGoal[] = [
    { id: "lose-weight", label: "Lose weight", icon: "🧘‍♀️" },
    { id: "gain-weight", label: "Gain Weight", icon: "🏃‍♀️" },
    { id: "build-muscle", label: "Build Muscle", icon: "💪" },
    { id: "modify-diet", label: "Modify your Diet", icon: "🥗" },
    { id: "manage-stress", label: "Manage Stress", icon: "🧘‍♀️" },
    { id: "intermittent-fasting", label: "Intermittent Fasting", icon: "⏰" },
  ];

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
    if (onGoalChange) {
      onGoalChange(goalId);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full p-6 box-border">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 text-center mb-4 sm:mb-6">
          Select your primary fitness goal
        </h1>
        <div className="space-y-2 sm:space-y-3 w-full max-w-xs sm:max-w-sm">
          {fitnessGoals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => handleGoalSelect(goal.id)}
              className={`w-full flex items-center justify-between p-2 sm:p-3 rounded-full transition-all duration-200 ${selectedGoal === goal.id
                  ? 'bg-primary border-teal-400 text-white shadow-lg transform scale-102'
                  : 'bg-gray-100 text-gray-700 hover:border-teal-300 hover:shadow-md hover:scale-101'
                }`}
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-base sm:text-lg ${selectedGoal === goal.id
                      ? "bg-white bg-opacity-20"
                      : "bg-white"
                    }`}
                >
                  {goal.icon}
                </div>
                <span
                  className={`text-xs sm:text-sm font-medium ${selectedGoal === goal.id ? "text-white" : "text-gray-900"
                    }`}
                >
                  {goal.label}
                </span>
              </div>
              {selectedGoal === goal.id && (
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full flex items-center justify-center">
                  <Check className="w-2 h-2 sm:w-3 sm:h-3 text-teal-400" />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="pt-12 flex items-center justify-center gap-3 sm:gap-5">
          <GoBack onClick={onBack} />
          <GoNext onClick={handleContinue} />
        </div>

      </div>

    </div>
  );
};

export default FitnessGoalSelector;
