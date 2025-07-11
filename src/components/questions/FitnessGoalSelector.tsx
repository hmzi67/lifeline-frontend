import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import GoBack from "@/components/common/GoBack.tsx";

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

const FitnessGoalSelector: React.FC<FitnessGoalSelectorProps> = ({ handleContinue, onGoalChange, onBack }) => {
  const [selectedGoal, setSelectedGoal] = useState<string>('lose-weight');

  const fitnessGoals: FitnessGoal[] = [
    { id: 'lose-weight', label: 'Lose weight', icon: '🧘‍♀️' },
    { id: 'gain-weight', label: 'Gain Weight', icon: '🏃‍♀️' },
    { id: 'build-muscle', label: 'Build Muscle', icon: '💪' },
    { id: 'modify-diet', label: 'Modify your Diet', icon: '🥗' },
    { id: 'manage-stress', label: 'Manage Stress', icon: '🧘‍♀️' },
    { id: 'intermittent-fasting', label: 'Intermittent Fasting', icon: '⏰' }
  ];

    const handleGoalSelect = (goalId: string) => {
        setSelectedGoal(goalId);
        if (onGoalChange) {
            onGoalChange(goalId);
        }
    };


    return (
    <div className="py-4">

      
      <div className="max-w-md mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Select your primary fitness goal
        </h1>

        {/* Goal Options */}
        <div className="space-y-4 mb-3">
          {fitnessGoals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => handleGoalSelect(goal.id)}
              className={`w-full flex items-center justify-between p-3 rounded-full transition-all duration-200 pr-6 ${
                selectedGoal === goal.id
                  ? 'bg-teal-400 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                  selectedGoal === goal.id ? 'bg-white bg-opacity-20' : 'bg-white'
                }`}>
                  {goal.icon}
                </div>
               <span className={`text-lg font-medium ${
                  selectedGoal === goal.id ? 'text-white' : 'text-black'
                }`}>{goal.label}</span>
              </div>

              {selectedGoal === goal.id && (
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-teal-400" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <div className={'flex items-center justify-center gap-5'}>
                        <GoBack onClick={onBack} />
                        <button
                            onClick={handleContinue}
                            className="inline-flex items-center justify-between gap-2 rounded-full bg-primary hover:bg-primary-600 text-white font-medium border w-auto h-auto px-8 py-4 transition-all duration-200"
                        >
                            Continue
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
      </div>
    </div>
  );
};

export default FitnessGoalSelector;