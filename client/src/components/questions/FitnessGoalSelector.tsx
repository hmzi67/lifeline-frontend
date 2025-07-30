import React, { useState } from "react";
import { Check } from "lucide-react";
import GoBack from "@/components/common/GoBack.tsx";
import GoNext from "../common/GoNext";
import image from "@/assets/images/Q-goals/Ellipse10.3.png";
import image1 from "@/assets/images/Q-goals/excited lady.avif";
import image2 from "@/assets/images/Q-goals/buildmuscles.webp";
import image3 from "@/assets/images/Q-goals/food image.jpg";
import image4 from "@/assets/images/Q-goals/high stress.jpg";
import image5 from "@/assets/images/Q-goals/alarm-clock.jpg";

interface FitnessGoal {
  id: string;
  label: string;
  image?: string;
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
    { id: "lose-weight", label: "Lose weight", image: image },
    { id: "gain-weight", label: "Gain Weight", image: image1 },
    { id: "build-muscle", label: "Build Muscle", image: image2 },
    { id: "modify-diet", label: "Modify your Diet", image: image3 },
    { id: "manage-stress", label: "Manage Stress", image: image4 },
    { id: "intermittent-fasting", label: "Intermittent Fasting", image: image5 },
  ];

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
    if (onGoalChange) {
      onGoalChange(goalId);
    }
  };

  return (
    <div className="flex flex-col w-full p-6 box-border">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 text-center mb-4 sm:mb-6">
          Select your primary fitness goal
        </h1>
        <div className="space-y-2 sm:space-y-3 w-full h-full max-w-xs sm:max-w-sm">
          {fitnessGoals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => handleGoalSelect(goal.id)}
              className={`w-full flex items-center justify-between px-3 rounded-full transition-all duration-200 ${selectedGoal === goal.id
                  ? 'bg-primary border-teal-400 text-white shadow-lg transform scale-102'
                  : 'bg-gray-100 text-gray-700 hover:border-teal-300 hover:shadow-md hover:scale-101'
                }`}
            >
              <div className="flex items-center space-x-2 sm:space-x-3 translate-y-1">
                <div
                  className={`w-full sm:w-full flex items-center justify-center overflow-hidden ${selectedGoal === goal.id
                      
                    }`}
                >
                  {goal.image ? (
                    <img 
                      src={goal.image} 
                      alt={goal.label}
                      className=" object-cover h-16 w-16 rounded-full"
                    />
                  ) : null}
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
                  <Check className="w-2 h-2 sm:w-4 sm:h-4 text-teal-400" />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className=" pt-10 flex items-center justify-center gap-3 sm:gap-5">
          <GoBack onClick={onBack} />
          <GoNext onClick={handleContinue} />
        </div>

      </div>

    </div>
  );
};

export default FitnessGoalSelector;