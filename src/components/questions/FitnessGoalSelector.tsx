import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface FitnessGoal {
  id: string;
  label: string;
  icon: string;
}

const FitnessGoalSelector: React.FC = () => {
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
  };

  const handleContinue = () => {
    console.log('Selected goal:', selectedGoal);
    // Handle continue action here
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400 rounded-full opacity-20 transform translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-teal-300 rounded-full opacity-30 transform -translate-x-20 translate-y-20"></div>
      
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Select your primary fitness goal
        </h1>

        {/* Goal Options */}
        <div className="space-y-4 mb-12">
          {fitnessGoals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => handleGoalSelect(goal.id)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-200 ${
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
                <span className="text-lg font-medium">{goal.label}</span>
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
        <button
          onClick={handleContinue}
          className="w-full bg-teal-400 text-white text-lg font-semibold py-4 rounded-2xl hover:bg-teal-500 transition-colors duration-200 shadow-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default FitnessGoalSelector;