import MenGraph from "@/assets/images/question/men_graph.png";
import WomenGraph from "@/assets/images/question/women_graph.png";
import GraphImage from "@/assets/images/question/graph.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface FitnessGoalCardProps {
  gender: string;
  onSelect?: (isSelected: boolean) => void;
  isSelected?: boolean;
  onBack?: () => void;
}

export const FitnessGraph: React.FC<FitnessGoalCardProps> = ({
  gender
}) => {

  const navigate = useNavigate();
  const [message, setMessage] = useState("1")

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("")
      navigate('/plan')
    }, 7000);

    // cleanup timer on unmount
    return () => clearTimeout(timer);
  });

  return (
    <div className="p-6">
      <div
        className={`bg-white rounded-2xl p-12 transition-all duration-300 max-w-6xl mx-auto`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-12">
          {/* Graph Section */}
          <div className="flex-1">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-pink-500 mb-4">
                user, your wish is our command
              </h1>
              <p className="text-gray-600 text-xl">
             Empowering Dreams, Visualizing Success!
              </p>
              <p className='font-bold text-2xl text-primary mt-4'>
                Active goal graph
              </p>
            </div>
            <img
              src={GraphImage}
              className='h-96'
            />
          </div>

          {/* Model Section */}
          <div className="flex-shrink-0">
            {gender === 'female' ? (
              <img
                src={WomenGraph}
                alt="Female Fitness Model"
                className="w-56 h-auto object-contain"
              />
            ) : (
              <img
                src={MenGraph}
                alt="Male Fitness Model"
                className="w-56 h-auto object-contain"
              />
            )}
          </div>
        </div>
        <div className="w-full flex items-center justify-center text-gray-700">
          {
          message && 
          <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p>Redirecting to pricing. Please wait...</p>
          </>
          }
        </div>
      </div>
    </div>
  );
};