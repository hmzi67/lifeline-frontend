import MenImage from '../../assets/images/missionvision/men.svg';
import WomenImage from '../../assets/images/missionvision/women.svg';

const MissionVision = () => {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-24 py-6 sm:py-12">
      {/* Header */}
      <div className="space-y-8 sm:space-y-12 pb-6 sm:pb-12">
        {/* BE HEALTHY - Left Aligned */}
        <div className="text-left relative">
          <div className="relative">
            {/* Large Background Number */}
            <div className="absolute -top-2 sm:-top-12 -left-4 sm:-left-20 text-6xl sm:text-8xl lg:text-9xl font-bold text-primary-200 opacity-50 z-0">
              ABOUT US
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 sm:gap-4 pt-2 sm:pt-4">
                <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-700 tracking-wide whitespace-nowrap">
                  Our Mission & Vision
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission and Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        {/* Vision Card */}
        <div className="bg-white rounded-lg shadow-sm border hover:shadow-xl transition-shadow duration-300 overflow-hidden">
          <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-4">Our Vision</h2>
            <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed">
              "Arcu Arcu At Dictum Sapien, Mollis. Vulputate Sit Id Accumsan, Ultrices. In Ultrices
              Malesuada Elit Mauris At Dictum Sapien, Mollis. Vulputate Sit Id Accumsan, Ultrices. In
              Ultrices Malesuada Elit Mauris."
            </p>
          </div>
          <div className="h-32 sm:h-48 bg-gray-200 overflow-hidden">
            <img
              src={MenImage}
              alt="Person working at desk with plants"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Mission Card */}
        <div className="bg-white rounded-lg shadow-sm border hover:shadow-xl transition-shadow duration-300 overflow-hidden">
          <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed">
              "Arcu Arcu At Dictum Sapien, Mollis. Vulputate Sit Id Accumsan, Ultrices. In Ultrices
              Malesuada Elit Mauris At Dictum Sapien, Mollis. Vulputate Sit Id Accumsan, Ultrices. In
              Ultrices Malesuada Elit Mauris."
            </p>
          </div>
          <div className="h-32 sm:h-48 bg-gray-200 overflow-hidden">
            <img
              src={WomenImage}
              alt="Stressed person at work"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;
