import React, { useState, useEffect } from 'react';

interface PlanPreparationProps {
  planType?: 'diet' | 'exercise';
  onComplete?: () => void;
}

const ThankYouCard: React.FC<PlanPreparationProps> = ({ 
  planType = 'diet', 
  onComplete 
}) => {
  const [currentPlan, setCurrentPlan] = useState<'diet' | 'exercise'>(planType);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsLoading(false);
          if (onComplete) {
            setTimeout(onComplete, 1000);
          }
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  const planConfig = {
    diet: {
      title: "We're Customizing Your Diet Plan",
      subtitle: "According To Your Taste.",
      backgroundImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      gradientOverlay: "linear-gradient(135deg, rgba(255,193,7,0.9) 0%, rgba(255,87,34,0.8) 100%)"
    },
    exercise: {
      title: "We're Customizing Your Exercise Plan",
      subtitle: "According To Your Physique.",
      backgroundImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      gradientOverlay: "linear-gradient(135deg, rgba(76,175,80,0.9) 0%, rgba(139,195,74,0.8) 100%)"
    }
  };

  const currentConfig = planConfig[currentPlan];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${currentConfig.backgroundImage})`,
        }}
      >
        <div 
          className="absolute inset-0 transition-all duration-1000 ease-in-out"
          style={{
            background: currentConfig.gradientOverlay
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        {/* Thank You Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 drop-shadow-lg">
            Thank You!
          </h1>
        </div>

        {/* Getting Ready Section */}
        <div className="mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-semibold text-cyan-400 mb-6 drop-shadow-md">
            Getting Ready Your Plan
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed drop-shadow-sm">
              {currentConfig.title}
            </p>
            <p className="text-xl md:text-2xl text-gray-700 font-medium mt-2 drop-shadow-sm">
              {currentConfig.subtitle}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto mb-8">
          <div className="bg-white/30 backdrop-blur-sm rounded-full h-3 overflow-hidden shadow-lg">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300 ease-out shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white text-sm mt-2 font-medium">
            {Math.round(progress)}% Complete
          </p>
        </div>

        {/* Loading Animation */}
        {isLoading && (
          <div className="flex space-x-2 animate-pulse">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        )}

        {/* Toggle Button */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => setCurrentPlan(currentPlan === 'diet' ? 'exercise' : 'diet')}
            className="bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-3 rounded-full text-white font-medium hover:bg-white/30 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Switch to {currentPlan === 'diet' ? 'Exercise' : 'Diet'} Plan
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default ThankYouCard;

