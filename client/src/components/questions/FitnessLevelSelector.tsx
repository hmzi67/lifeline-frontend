import React, { useState, useEffect } from 'react';
import GoNext from "@/components/common/GoNext.tsx";
import api from '@/lib/axios';

interface FitnessLevelSelectorProps {
  onContinue?: () => void;
  onBack?: () => void;
  onLevelChange?: (level: number) => void;
}

const FitnessLevelSelector: React.FC<FitnessLevelSelectorProps> = ({
  onContinue,
  onLevelChange
}) => {
  const [selectedLevel, setSelectedLevel] = useState<number>(3);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  const levels = [
    { value: 1, label: 'Beginner' },
    { value: 2, label: 'Novice' },
    { value: 3, label: 'Somewhat Athletic' },
    { value: 4, label: 'Athletic' },
    { value: 5, label: 'Very Athletic' }
  ];

  // Fetch fitness level on mount
  useEffect(() => {
    const fetchFitnessLevel = async () => {
      setLoading(true);
      try {
        const res = await api.get('/questionnaire/fitness-level');
        const levelFromApi = res?.data?.data?.fitnessLevel;
        if (levelFromApi) {
          // Map level string to number index
          const index = levels.findIndex(l => l.label === levelFromApi);
          if (index !== -1) setSelectedLevel(levels[index].value);
          else setSelectedLevel(3); // Default fallback
          onLevelChange?.(levels[index]?.value || 3);
        }
      } catch {
        // Optionally handle error
      } finally {
        setLoading(false);
      }
    };
    fetchFitnessLevel();
  }, [onLevelChange]);

  // Update fitness level on change
  const handleSliderChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLevel = parseInt(event.target.value);
    setSelectedLevel(newLevel);
    onLevelChange?.(newLevel);

    setSaving(true);
    try {
      // Save enum string value expected by backend
      await api.put('/questionnaire/fitness-level', {
        fitnessLevel: levels.find(l => l.value === newLevel)?.label
      });
    } catch {
      // Optionally handle error
    } finally {
      setSaving(false);
    }
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="py-20">
      <div className="max-w-2xl w-full mx-auto ">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 p-1 sm:p-0">
            How would you rate your fitness level?
          </h1>
          <p className="text-gray-500 text-lg">Drag to adjust</p>
        </div>

        <div className="mb-12">
          {/* Current level display */}
          <div className="flex justify-center mb-8 ">
            <div className="bg-gradient-to-r from-primary-400 to-primary-400 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg">
              {levels[selectedLevel - 1]?.label}
            </div>
          </div>

          {/* Custom slider */}
          <div className="relative mb-8 px-5">
            <div className="flex justify-between items-center mb-4 ">
              {levels.map(level => (
                <div key={level.value} className="flex flex-col items-center">
                  <div
                    className={`z-10 w-2 h-8 mb-2 tranform translate-y-[64px] duration-300 ${level.value <= selectedLevel
                        ? 'bg-gradient-to-r from-primary-400 to-primary-400 shadow-md'
                        : 'bg-gray-200'
                      }`}
                  />
                  <span className="text-sm font-medium text-gray-600">{level.value}</span>
                </div>
              ))}
            </div>

            {/* Progress bar background */}
            <div className="relative h-2 bg-gray-200">
              {/* Active progress bar */}
              <div
                className="absolute top-0 left-0 h-2 bg-gradient-to-r from-primary-400 to-primary-400 transition-all duration-300"
                style={{ width: `${((selectedLevel - 1) / 4) * 100}%` }}
              />

              {/* Range input */}
              <input
                type="range"
                min="1"
                max="5"
                value={selectedLevel}
                onChange={handleSliderChange}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
                disabled={loading || saving}
                className={`absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer ${isDragging ? 'cursor-grabbing' : 'cursor-grab'
                  }`}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-5 mt-12">
          <GoNext onClick={onContinue} loading={loading || saving} />
        </div>
      </div>
    </div>
  );
};

export default FitnessLevelSelector;
