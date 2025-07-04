   
import React from 'react';
import { Heart, Play, User, Clock } from 'lucide-react';


const EmployeeWellbeingLanding: React.FC = () => {
  return (
    <div className="h-[90vh] bg-gray-900 overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-8 py-16 max-w-7xl mx-auto">
        {/* Left Content */}
        <div className="lg:w-1/2 text-white mb-12 lg:mb-0">
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
            RETHINK{' '}
            <span className="text-teal-400">EMPLOYEE</span>
            <br />
            <span className="text-white">WELLBEING</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
            Cultivate a healthy, thriving, and unstoppable workforce with BetterMe's health transformation ecosystem
          </p>
          <button className="bg-teal-400 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-500 transition-all duration-300 transform hover:scale-105">
            Get Started
          </button>
        </div>

        {/* Right Content - Floating Cards and Mobile App */}
        <div className="lg:w-1/2 relative flex items-center justify-center">
          {/* Floating Meditation Cards */}
          <div className="absolute top-0  space-y-4 transform -translate-x-8 lg:translate-x-0 w-96">
            {[
              {
      heading: "Meditation",
      title: "Calm & Clarity",
      description: "For moments of quite refelection",
      duration: "10 mins",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
    },
    { 
      heading: "Meditation",
      title: "Inner Peace",
      description: "For moments when you need to reconnect with yourself and find balance",
      duration: "10 mins",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop"
    },
    { 
      heading: "Meditation",
      title: "Balance and Peace",
      description: "Ideal for those looking for a gentle stretching session to unwind",
      duration: "10 mins",
      image: "https://images.unsplash.com/photo-1529693662653-9d480530a697?w=400&h=300&fit=crop"
    },
    { 
      heading: "Meditation",
      title: "Evening Serenity",
      description: "For evening relaxation and better sleep preparation",
      duration: "15 mins",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop"
    }
            ].map((card, index) => (
              <div
            key={index}
            className="relative bg-white/15 backdrop-blur-lg rounded-3xl p-5 shadow-2xl w-full h-[120px] border border-white/20 hover:bg-white/20 transition-all duration-300 hover:shadow-3xl hover:scale-[1.02]"
          >
            <div className="flex gap-4 h-full">
              {/* Image with Play Button */}
              <div className="relative flex-shrink-0">
                <img
                  src={card.image}
                  alt="Meditation scene"
                  className="w-20 h-16 object-cover rounded-xl"
                />
                {/* Play Button Overlay */}
                <button className="absolute inset-0 flex items-center justify-center group">
                  <div className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-all duration-300 group-hover:scale-110 shadow-lg">
                    <Play className="w-2.5 h-2.5 text-gray-700 ml-0.5" fill="currentColor" />
                  </div>
                </button>
              </div>

              {/* Text Content */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-base font-bold text-white leading-tight">
                    {card.title}
                  </h3>
                  <span className="text-white/60 text-xs font-medium">
                    {card.duration}
                  </span>
                </div>
                <p className="text-white/70 text-xs leading-relaxed line-clamp-3">
                  {card.description}
                </p>
              </div>
            </div>
          </div>
            ))}
          </div>
          
          {/* Mobile App Image */}
        
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-teal-400 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-teal-400 rounded-full opacity-40 animate-pulse delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white rounded-full opacity-80 animate-pulse delay-500"></div>
    </div>
  );
};

export default EmployeeWellbeingLanding;