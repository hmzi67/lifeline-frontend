import MenGraph from "@/assets/images/question/men_graph.png";
import WomenGraph from "@/assets/images/question/women_graph.png";
import GraphImage from "@/assets/images/question/graph.png";

interface FitnessGoalCardProps {
  gender: string;
  onSelect?: (isSelected: boolean) => void;
  isSelected?: boolean;
  onBack?: () => void;
}

export const FitnessGraph: React.FC<FitnessGoalCardProps> = ({
  gender
}) => {

  return (
    <div className="min-h-screen p-8">
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
                Empowering Dreams, Visualize Success!
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
      </div>
    </div>
  );
};