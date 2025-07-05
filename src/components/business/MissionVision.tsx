import MenImage from '../../assets/images/missionvision/men.svg'
import WomenImage from '../../assets/images/missionvision/women.svg'
const MissionVision = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 ">
      {/* Header */}
       <div className="space-y-24 pb-12">
         {/* BE HEALTHY - Left Aligned */}
            <div className="text-left relative ">
                  <div className="relative">
                    {/* Large Background Number */}
                       <div className="absolute -top-8 -left-24 text-8xl lg:text-9xl font-bold text-primary-200 opacity-50 z-0">
                       ABOUT US
                       </div>
                       <div className="relative z-10">
                          <div className="flex items-center gap-4 pt-4">
                            <h3 className="text-2xl lg:text-4xl font-bold text-gray-700 tracking-wide whitespace-nowrap">
                             Our Mission & Vision
                            </h3>
                          </div>
                       </div>
                  </div>
            </div>
        </div>

      {/* Mission and Vision Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Vision Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              "Arcu Arcu At Dictum Sapien, Mollis. Vulputate Sit Id Accumsan, Ultrices. In Ultrices 
              Malesuada Elit Mauris At Dictum Sapien, Mollis. Vulputate Sit Id Accumsan, Ultrices. In 
              Ultrices Malesuada Elit Mauris."
            </p>
          </div>
          <div className="h-48 bg-gray-200 overflow-hidden">
            <img 
              src={MenImage}
              alt="Person working at desk with plants"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Mission Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              "Arcu Arcu At Dictum Sapien, Mollis. Vulputate Sit Id Accumsan, Ultrices. In Ultrices 
              Malesuada Elit Mauris At Dictum Sapien, Mollis. Vulputate Sit Id Accumsan, Ultrices. In 
              Ultrices Malesuada Elit Mauris."
            </p>
          </div>
          <div className="h-48 bg-gray-200 overflow-hidden">
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