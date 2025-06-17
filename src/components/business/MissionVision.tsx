

const MissionVision = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-gray-50">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
          <span className="text-teal-400">A</span> Our Mission & Vision
        </h1>
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
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
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
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
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