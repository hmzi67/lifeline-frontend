import React, { useState } from 'react';

interface FitnessGoalCardProps {
  gender: 'male' | 'female';
  onSelect?: (isSelected: boolean) => void;
  isSelected?: boolean;
}

export const FitnessGraph: React.FC<FitnessGoalCardProps> = ({ 
  gender, 
  onSelect,
  isSelected = false 
}) => {
  const [selected, setSelected] = useState(isSelected);

  const handleClick = () => {
    const newSelected = !selected;
    setSelected(newSelected);
    onSelect?.(newSelected);
  };

  // Sample data points for the goal graph
  const dataPoints = [
    { month: 'July', value: 95 },
    { month: 'Aug', value: 85 },
    { month: 'Sep', value: 78 },
    { month: 'Oct', value: 65 },
    { month: 'Nov', value: 58 },
    { month: 'Dec', value: 55 },
  ];

  // Generate SVG path for the curve
  const generatePath = () => {
    const width = 400;
    const height = 200;
    const points = dataPoints.map((point, index) => ({
      x: (index / (dataPoints.length - 1)) * width,
      y: height - (point.value / 100) * height,
    }));

    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prevPoint = points[i - 1];
      const currentPoint = points[i];
      const controlPointX = (prevPoint.x + currentPoint.x) / 2;
      
      path += ` Q ${controlPointX} ${prevPoint.y} ${currentPoint.x} ${currentPoint.y}`;
    }

    return path;
  };

  return (
    <div 
      className={`bg-white rounded-2xl p-8 cursor-pointer transition-all duration-300 ${
        selected 
          ? 'ring-4 ring-pink-400 shadow-2xl scale-105' 
          : 'shadow-lg hover:shadow-xl hover:scale-102'
      }`}
      onClick={handleClick}
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-pink-500 mb-2">
          User, your wish is our command
        </h1>
        <p className="text-gray-600 text-lg">
          Empowering Dreams, Visualize Success!
        </p>
      </div>

      <div className="flex items-center justify-between">
        {/* Graph Section */}
        <div className="flex-1 mr-8">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-6">
            Active goal graph
          </h2>
          
          <div className="relative">
            {/* SVG Graph */}
            <svg 
              width="400" 
              height="200" 
              viewBox="0 0 400 200"
              className="w-full max-w-md"
            >
              {/* Grid lines */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <line
                  key={i}
                  x1={i * 80}
                  y1="0"
                  x2={i * 80}
                  y2="200"
                  stroke="#f3f4f6"
                  strokeWidth="1"
                />
              ))}
              
              {/* Area under curve */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#ff6b6b', stopOpacity: 0.3 }} />
                  <stop offset="100%" style={{ stopColor: '#ff6b6b', stopOpacity: 0.1 }} />
                </linearGradient>
              </defs>
              
              <path
                d={`${generatePath()} L 400 200 L 0 200 Z`}
                fill="url(#gradient)"
              />
              
              {/* Main curve line */}
              <path
                d={generatePath()}
                stroke="#ff6b6b"
                strokeWidth="3"
                fill="none"
                className="drop-shadow-sm"
              />
              
              {/* Data point at November */}
              <circle
                cx="320"
                cy="116"
                r="6"
                fill="#ff6b6b"
                className="drop-shadow-sm"
              />
            </svg>
            
            {/* Month labels */}
            <div className="flex justify-between mt-4 text-gray-400 text-sm">
              {dataPoints.map((point) => (
                <span key={point.month}>{point.month}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Model Section */}
        <div className="flex-shrink-0">
          {gender === 'female' ? (
            <div className="w-64 h-80 bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg flex items-end justify-center overflow-hidden">
              <div className="text-center text-gray-500 mb-8">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👩‍🦰</span>
                </div>
                <div className="text-sm">Female Fitness Model</div>
                <div className="text-xs text-gray-400 mt-1">Athletic wear & confident pose</div>
              </div>
            </div>
          ) : (
            <div className="w-64 h-80 bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg flex items-end justify-center overflow-hidden">
              <div className="text-center text-gray-500 mb-8">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">🧑‍🦱</span>
                </div>
                <div className="text-sm">Male Fitness Model</div>
                <div className="text-xs text-gray-400 mt-1">Workout attire & confident stance</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Selection indicator */}
      <div className="mt-6 text-center">
        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
          selected 
            ? 'bg-pink-500 text-white' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          {selected ? '✓ Selected' : 'Click to select'}
        </div>
      </div>
    </div>
  );
};


     
